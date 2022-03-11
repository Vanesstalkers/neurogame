exports.system = true;

exports.f = function(conn, data, msg, callback){try{
	
	if(msg.vote){
		
		var now = Date.now();
		
		conn.db.collection('vote')
		.findOne({_id: msg.vote}, {fields: {
			__rate: 1, tutorial: 1, tutorialClones: 1, finished: 1,
			__answer: 1, __expert: 1, __candidate: 1, __question: 1, __adrs: 1, end_time: 1,
		}}, (err, vote)=>{try{
			
			if(vote.tutorial){
				vote.__rate.l.forEach((r, i)=>{ if(vote.tutorialClones[r+'']) vote.__rate.l[i] = ObjectId(vote.tutorialClones[r+'']) });
				vote.__answer.l.forEach((r, i)=>{ if(vote.tutorialClones[r+'']) vote.__answer.l[i] = ObjectId(vote.tutorialClones[r+'']) });
				vote.__expert.l.forEach((r, i)=>{ if(vote.tutorialClones[r+'']) vote.__expert.l[i] = ObjectId(vote.tutorialClones[r+'']) });
				vote.__candidate.l.forEach((r, i)=>{ if(vote.tutorialClones[r+'']) vote.__candidate.l[i] = ObjectId(vote.tutorialClones[r+'']) });
				vote.__question.l.forEach((r, i)=>{ if(vote.tutorialClones[r+'']) vote.__question.l[i] = ObjectId(vote.tutorialClones[r+'']) });
			}
			
			conn.db.collection('rate')
			.find({_id: {$in: vote.__rate.l}, rate: {$gt: 0}}, {fields: {rate: 1, __answer: 1, __expert: 1, tutorialReady: 1}}).toArray((err, rates)=>{try{
				
				// все оценки выставлены или закончилось время
				if(!vote.finished && (vote.__rate.l.length <= rates.length || (vote.end_time < now && !vote.tutorial))){
					
					conn.db.collection('__game').findOne({}, {fields: {_id : 1}}, (err, game)=>{
				
						var parallel = {};
						
						parallel.answer = (cb)=>{try{
							conn.db.collection('answer').find({_id: {$in: vote.__answer.l}}, {fields: {__candidate: 1, __question: 1, __user: 1, __poll: 1}}).toArray((err, res)=>{ cb(null, res) });
						}catch(e){ console.log(e); cb(); }};
						
						parallel.question = (cb)=>{try{
							conn.db.collection('question').find({_id: {$in: vote.__question.l}}, {fields: {ready: 1}}).toArray((err, res)=>{ cb(null, res) });
						}catch(e){ console.log(e); cb(); }};
						
						parallel.adrs = (cb)=>{try{
							conn.db.collection('adrs').find({_id: vote.__adrs.l[0]}, {fields: {title: 1, population: 1, __vacancy: 1, __vacancy_head: 1}}).toArray((err, res)=>{
								DB.deleteComplex(conn, {
									_id: vote._id, col: 'vote', deleteLinks: true, childLink: false,
								}, {
									_id: res[0]._id, col: 'adrs',
								}, ()=>{ cb(null, res[0]) });
							});
						}catch(e){ console.log(e); cb(); }};
						
						parallel.expert = (cb)=>{try{
							conn.db.collection('expert').find({_id: {$in: vote.__expert.l}}, {fields: {__user: 1, __question: 1}}).toArray((err, res)=>{ cb(null, res) });
						}catch(e){ console.log(e); cb(); }};
						
						parallel.candidate = (cb)=>{try{
							conn.db.collection('candidate').find({_id: {$in: vote.__candidate.l}}, {fields: {__user: 1, __answer: 1}}).toArray((err, res)=>{ cb(null, res) });
						}catch(e){ console.log(e); cb(); }};
					
						async.parallel(parallel, (err, data)=>{try{
							
							var results = {maxSum: data.expert.length*data.candidate.length*10}, winner = [0], tutorialWinner, oAnswers = {}, oQuestion = {}, oCandidate = {}, vacancyPolls = 0;
							
							data.answer.forEach((a)=>{ oAnswers[a._id+''] = a });
							data.question.forEach((q)=>{ oQuestion[q._id+''] = q });
							data.candidate.forEach((c)=>{ oCandidate[c._id+''] = c });
							
							if(!data.adrs.population > 0) data.adrs.population = 1000;
							
							rates.forEach((r)=>{
								
								var a = r.__answer.l[0]+'';
								if(vote.tutorial && vote.tutorialClones[a]) a = vote.tutorialClones[a];
								
								var e = r.__expert.l[0]+'';
								if(vote.tutorial && vote.tutorialClones[e]) e = vote.tutorialClones[e];

								var c = oAnswers[a].__candidate.l[0]+'';
								
								if(results[e] == undefined) results[e] = {};
								if(results[e][a] == undefined) results[e][a] = {};
								if(results[c] == undefined) results[c] = {rate: 0};
								
								r.rate *= 1;
								if(r.rate > 10) r.rate = 10;
								if(r.rate < 1) r.rate = 1;
								
								results[c].rate += r.rate;
								if(winner[0] < results[c].rate && oAnswers[a].__user && oAnswers[a].__user.l[0]){
									winner[0] = results[c].rate;
									winner[1] = c;
								}
							});
							
							var waterfall = [ (cb)=>{try{
								
								conn.db.collection('vote').update({_id: vote._id}, {$set: {finished: 1}}, ()=>{ cb() });

							}catch(e){ console.log(e); cb(); }} ];
							
							if(!vote.tutorial){
								data.answer.forEach((_, i)=>{ waterfall.push((cb)=>{try{ //answer
									
									if(_.__poll && _.__poll.l[0]){
										
										conn.db.collection('poll')
										.findOne({_id: _.__poll.l[0]}, {fields: { _count: 1, _sum: 1 }}, (err, poll)=>{try{

											if(poll._count > 0 && (poll._sum / poll._count > CONFIG.moderationVoteAnswerRateValue)){
												
												conn.db.collection('poll').update({_id: poll._id}, {$set: {dateto: now + CONFIG.pollAnswerTime}}, ()=>{
													
													if(_.__candidate.l[0]+'' == winner[1]) vacancyPolls++;
													
													DB.addComplex(conn, {
														col: 'poll', _id: poll._id,
													}, [{col: '__game', _id: game._id}], ()=>{ cb() });
												});
											}else{ cb() }
										}catch(e){ console.log(e); cb(); }});
									}else{ cb() }
								}catch(e){ console.log(e); cb(); }}) });
							}
							
							data.expert.forEach((_, i)=>{ waterfall.push((cb)=>{try{ //expert
								
								if(_.__user && _.__user.l[0]){
									
									conn.db.collection('user').findOne({_id: _.__user.l[0]}, {fields: {exp: 1, power: 1}}, (err, user)=>{try{
										
										if(!user.exp > 0) user.exp = 0;
										if(!user.power > 0) user.power = 0;
									
										var exp = Math.ceil( data.adrs.population / 100 );
										var power = Math.ceil( data.adrs.population / 1000 );
										
										if(!exp > 0) exp = 0;
										if(!power > 0) power = 0;
										
										if(vote.tutorial){
											exp = 100;
											power = 10;
										}else{
											if(!(_.__question && _.__question.l[0] && oQuestion[_.__question.l[0]+''].ready)){
												exp = 0;
												power = 0;										
											}
										}
									
										async.parallel([(cb)=>{
											if(exp > 0){
												DB.addComplex(conn, {col: 'news'}, [
													{col: 'user', _id: user._id},
													{col: 'vote', _id: vote._id, childLink: false},
												], {
													type: 'exp',
													source: 'vote_expert',
													val: exp,
												}, (n_exp)=>{ cb() });
											}else{ cb() }
										},(cb)=>{
											if(power > 0){
												DB.addComplex(conn, {col: 'news'}, [
													{col: 'user', _id: user._id},
													{col: 'vote', _id: vote._id, childLink: false},
												], {
													type: 'power',
													source: 'vote_expert',
													val: power,
												}, (n_power)=>{ cb() });
											}else{ cb() }
										},(cb)=>{
											if(exp > 0){
												DB.saveField(conn, {name: 'exp'}, {_id: user._id, col: 'user'}, {value: exp, $inc: true}, ()=>{ cb() });
											}else{ cb() }
										},(cb)=>{
											if(power > 0){
												DB.saveField(conn, {name: 'power'}, {_id: user._id, col: 'user'}, {value: power, $inc: true}, ()=>{ cb() });
											}else{ cb() }
										},(cb)=>{
											if(!vote.tutorial){
												DB.deleteComplex(conn, {
													_id: vote._id, col: 'vote', link: '__vote_expert', deleteLinks: true, childLink: false,
												}, {
													_id: user._id, col: 'user',
												}, ()=>{ cb() });
											}else{ cb() }
										}], (err, data)=>{ cb() });
									
									}catch(e){ console.log(e); cb(); }});
								}else{ cb() }
							}catch(e){ console.log(e); cb(); }}) });
							
							data.candidate.forEach((_, i)=>{ waterfall.push((cb)=>{try{ //candidate

								if(_.__user && _.__user.l[0]){
									
									conn.db.collection('user').findOne({_id: _.__user.l[0]}, {fields: {exp: 1, power: 1}}, (err, user)=>{try{
										
										if(!user.exp > 0) user.exp = 0;
										if(!user.power > 0) user.power = 0;
										if(!results[_._id+'']) results[_._id+''] = {rate: 0};
									
										var win = winner[1] == (_._id+'');
										var exp = Math.ceil( data.adrs.population / (10*results.maxSum) ) * (win ? 10 : 1);
										var power = Math.ceil( results[_._id+''].rate * data.adrs.population / (100*results.maxSum) );
										
										if(!exp > 0) exp = 0;
										if(!power > 0) power = 0;
										
										if(vote.tutorial){
											exp = 1000;
											power = 50;
											win = true;
										}
										
										async.parallel([(cb)=>{
											if(exp > 0){
												DB.addComplex(conn, {col: 'news'}, [
													{col: 'user', _id: user._id},
													{col: 'vote', _id: vote._id, childLink: false},
												], {
													type: 'exp',
													source: 'vote_candidate',
													spec: win ? 'win' : undefined,
													val: exp,
												}, (n_exp)=>{ cb() });
											}else{ cb() }
										},(cb)=>{
											if(power > 0){
												DB.addComplex(conn, {col: 'news'}, [
													{col: 'user', _id: user._id},
													{col: 'vote', _id: vote._id, childLink: false},
												], {
													type: 'power',
													source: 'vote_candidate',
													spec: win ? 'win' : undefined,
													val: power,
												}, (n_power)=>{ cb() });
											}else{ cb() }
										},(cb)=>{
											if(data.adrs.title && !vote.tutorial){
											
												var $update = {};
												if(win){
													$update.$set = {};
													$update.$set['alias.'+data.adrs.title] = -1;
												}else{
													$update.$inc = {};
													$update.$inc['alias.'+data.adrs.title] = 1;
												}
												
												conn.db.collection('user').update({_id: user._id}, $update, (err)=>{

													DB.addComplex(conn, {col: 'news'}, [
														{col: 'user', _id: user._id},
													], {
														type: 'alias',
														source: 'vote_candidate',
														spec: win ? 'win' : undefined,
														val: data.adrs.title,
													}, ()=>{
														
														if(win){
															
															DB.addComplex(conn, {col: 'adrs', _id: data.adrs._id, parentLink: '__user', sub: true}, [
																{col: 'user', _id: user._id, childLink: '__win_adrs'},
															], {
																revote: now + CONFIG.revoteTime,
															}, ()=>{
																
																if(vacancyPolls){
																	
																	DB.addComplex(conn, {
																		col: 'vacancy', 
																		_id: data.adrs.__vacancy_head.l[0],
																	}, [
																		{col: 'candidate', _id: ObjectId(winner[1])},
																		{col: 'user', _id: user._id, childLink: false},
																		{col: '__game', _id: game._id, parentLink: false},
																	], {polls: vacancyPolls}, ()=>{ cb() });
																}else{ cb() }
															});
														}else{
															cb();
														}
													});
												});
											}else{ cb() }
										},(cb)=>{
											if(exp > 0){
												DB.saveField(conn, {name: 'exp'}, {_id: user._id, col: 'user'}, {value: exp, $inc: true}, ()=>{ cb() });
											}else{ cb() }
										},(cb)=>{
											if(power > 0){
												DB.saveField(conn, {name: 'power'}, {_id: user._id, col: 'user'}, {value: power, $inc: true}, ()=>{ cb() });
											}else{ cb() }
										},(cb)=>{
											if(!vote.tutorial){
												DB.deleteComplex(conn, {
													_id: vote._id, col: 'vote', link: '__vote_candidate', deleteLinks: true, childLink: false,
												}, {
													_id: user._id, col: 'user',
												}, ()=>{ cb() });
											}else{ cb() }
										}], (err, data)=>{ cb() });
										
									}catch(e){ console.log(e); cb(); }});
								}else{ cb() }
							}catch(e){ console.log(e); cb(); }}) });
							
							async.waterfall(waterfall, (err, data)=>{
								
								if(!vote.tutorial){
									DB.deleteComplex(conn, {
										_id: vote._id, col: 'vote', deleteLinks: true, childLink: false,
									}, {
										_id: game._id, col: '__game',
									}, ()=>{
										callback({status: 'ok', msg: 'Выборы завершены'});
									});
								}else{
									callback({status: 'ok', msg: 'Выборы завершены'});
								}
							});
						}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка (7)'}); }});
					});
				}else{

					callback({status: 'ok', msg: 'В настоящий момент выборы не могут быть завершены'});

				}

			}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка (6)'}); }});
			
		}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка (5)'}); }});

	}else{ callback({status: 'err', errMsg: 'Ошибка (2)'}) }
	
}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка (1)'}); }}