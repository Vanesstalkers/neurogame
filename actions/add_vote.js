exports.system = true;

exports.f = function(conn, data, msg, callback){try{

	if(msg.adrs || msg.publish === true){
		
		var parallel = [];
		
		if(msg.adrs && msg.adrs.state){
			parallel.push((cb)=>{
				ROUTER.route(conn, {action: 'add_adrs', adrs: msg.adrs}, (adrs)=>{
					msg.adrs = adrs._id;
					cb();
				}, true);
			});
		}
		
		async.parallel(parallel, (data)=>{try{
		
			if(msg.position == undefined) msg.position = CONFIG.labels.vacancy.head;
			if(msg.candidateNum == undefined) msg.candidateNum = CONFIG.voteBaseСandidateNum;
			if(msg.expertNum == undefined) msg.expertNum = CONFIG.voteBaseExpertNum;
			if(msg.questionNum == undefined) msg.questionNum = CONFIG.voteBaseQuestionNum;
			if(msg.questionStats == undefined) msg.questionStats = CONFIG.voteBaseQuestionStatsNum;
			if(msg.questionCustomStats == undefined) msg.questionCustomStats = [];
			
			var usedStats = {};
			
			var	field = {col: 'vote'}, parents = [{col: 'adrs', _id: msg.adrs}], values = {
				end_time: msg.end_time || (Date.now() + CONFIG.voteEndTime),
				position: msg.position,
				type: msg.type || 'base',
				tutorialLink: msg.tutorialLink,
			};
			if(msg.publish === false){
				msg.expertNum = 0;
				msg.candidateNum = 0;
				values.type = undefined;
			}else{
				if(msg.publish === true && msg._id){
					if(!msg.custom) msg.custom = {};
					field._id = ObjectId(msg._id);
					values = {type: msg.custom.type || 'base'};
					parents = [];
					if(msg.custom.expertNum) msg.expertNum = msg.custom.expertNum*1;
					if(msg.custom.candidateNum) msg.candidateNum = msg.custom.candidateNum*1;
					if(msg.custom.stats){
						msg.questionCustomStats = [];
						for(var s in msg.custom.stats) if(msg.custom.stats[s]) msg.questionCustomStats.push(s);
						if(msg.questionCustomStats.length > msg.questionStats) msg.questionStats = msg.questionCustomStats.length;
					} 
				}
				parents.push({col: '__game', _id: conn.user && conn.user.config.game ? ObjectId(conn.user.config.game) : true, parentLink: false, childLink: msg.type ? '__vote_'+msg.type : '__vote'});
			}
			
			DB.addComplex(conn, field, parents, values, (vote)=>{try{
				
				var questions = {}, experts = {}, candidates = [], addExpert = [], preparedExperts = [];
				
				for(var i = 0; i < msg.expertNum; i++){
					
					const I = i;
					questions[I] = {};
					
					addExpert.push((addExpertCB)=>{try{
				
						var field = {col: 'expert'};
						var parents = [{col: 'vote', _id: vote._id}];
						
						DB.addComplex(conn, field, parents, {}, (expert)=>{
							
							experts[I] = expert;
							expert.prepared = preparedExperts.shift();
							
							var addQuestion = [];
							
							for(var j = 0; j < msg.questionNum; j++){
								const J = j;
								addQuestion.push((addQuestionCB)=>{try{
									
									var stats = Object.keys(LST.stats.lst), baseStats = {};
									
									msg.questionCustomStats.forEach((s)=>{
										baseStats[stats.splice( stats.indexOf(s), 1)[0]] = {};
									});
									
									for(var s = msg.questionCustomStats.length; s < msg.questionStats; s++) baseStats[stats.splice( Math.floor(Math.random()*stats.length), 1)[0]] = {};
									
									var field = {col: 'question'};
									var values = {
										moderationCount: 0,
										minStatsCount: CONFIG.questionMinStatsCount,
										stats: baseStats,
									};
									
									if(expert.prepared && expert.prepared.id && expert.prepared.p){
										field._id = ObjectId(expert.prepared.id);
										values = {};
									}
									
									DB.addComplex(conn, field, [
										{col: 'vote', _id: vote._id},
										{col: 'expert', _id: expert._id},
									], values, (question)=>{try{
										
										DB.addComplex(conn, {
											col: 'poll',
										},[
											{col: 'question', _id: question._id},
										], {
											type: 'question',
											_count: 0, _sum: 0,
										}, (poll)=>{try{
											
											question.__poll = {l: [poll._id]};
											questions[I][J] = question;
											addQuestionCB();
										
										}catch(e){ console.log(e); addQuestionCB(); }});
									}catch(e){ console.log(e); addQuestionCB(); }});								
								}catch(e){ console.log(e); addQuestionCB(); }});
							}
							
							async.parallel(addQuestion, (err, res)=>{
								addExpertCB();
							});
						});
					}catch(e){ console.log(e); addExpertCB(); }});
				}
				
				DB.getMysql((mysql)=>{
					mysql.query("SELECT `id`, `p` FROM `questions` WHERE `p` != ? GROUP BY p LIMIT 0,?", 
					[conn.user ? conn.user.key : '', msg.expertNum], 
					(err, res)=>{try{
						
						if(err) console.log(err);				
						
						preparedExperts = res;
				
						async.parallel(addExpert, (err, res)=>{try{
							
							var addCandidate = [];
							
							for(var ci = 0; ci < msg.candidateNum; ci++){ addCandidate.push((addCandidateCB)=>{try{
								
								DB.addComplex(conn, {
									col: 'candidate',
								},[
									{col: 'vote', _id: vote._id},
								],{

								}, (candidate)=>{
									
									var addAnswer = [];
							
									for(var ei = 0; ei < msg.expertNum; ei++){ 
										for(var qi = 0; qi < msg.questionNum; qi++){ 
										
											const EI = ei;
											const QI = qi;
											
											addAnswer.push((addAnswerCB)=>{try{
												
												DB.addComplex(conn, { 
													col: 'answer',
												},[
													{col: 'vote', _id: vote._id},
													{col: 'candidate', _id: candidate._id},
													{col: 'question', _id: questions[EI][QI]._id},
												],{}, (answer)=>{try{
													
													DB.addComplex(conn, { 
														col: 'poll',
													},[
														{col: 'answer', _id: answer._id},
														{col: 'poll', link: '__question_poll', childLink: '__answer_poll', _id: questions[EI][QI].__poll.l[0]},
													], {
														type: 'answer',
														_count: 0, _sum: 0,
														//__question_poll: questions[EI][QI].__poll,
													}, (poll)=>{try{
													
														var addRate = [];
														
														for(var ej = 0; ej < msg.expertNum; ej++){ const EJ = ej; addRate.push((addRateCB)=>{try{
															
															DB.addComplex(conn, { 
																col: 'rate',
															},[
																{col: 'vote', _id: vote._id},
																{col: 'expert', _id: experts[EJ]._id},
																{col: 'answer', _id: answer._id},
																{col: 'poll', _id: poll._id},
															], {}, (rate)=>{ addRateCB() });
															
														}catch(e){ console.log(e); addRateCB(); }}) }
														
														async.parallel(addRate, (err, res)=>{ addAnswerCB() });
														
													}catch(e){ console.log(e); addAnswerCB(); }});
												}catch(e){ console.log(e); addAnswerCB(); }});
											}catch(e){ console.log(e); addAnswerCB(); }});
										}
									}
									
									async.parallel(addAnswer, (err, res)=>{ addCandidateCB() });
									
								});
							}catch(e){ console.log(e); addCandidateCB(); }}) }
							
							async.parallel(addCandidate, (err, res)=>{try{
								
								var prepared = [], usedQuestion = [];
								
								for(var e in experts){
									const expert = experts[e];
									if(expert.prepared && expert.prepared.id && expert.prepared.p){
										prepared.push((cb)=>{
											ROUTER.route(conn, {action: 'add_vote_expert', vote: vote._id, user: expert.prepared.p}, (data)=>{
												usedQuestion.push(expert.prepared.id);
												cb();
											}, {expert: expert._id});
										});
									}
								}
								
								async.parallel(prepared, ()=>{
									
									if(usedQuestion.length){
										
										mysql.query(usedQuestion.map(q=>"DELETE FROM `questions` WHERE `id` = ?").join('; '), 
										usedQuestion, (err, res)=>{
											mysql.destroy();
											callback(vote);
										});									
									}else{
										mysql.destroy();
										callback(vote);										
									}								
								});
							}catch(e){ console.log(e); mysql.destroy(); callback({status: 'err', errMsg: 'Ошибка(6)'}) }});
						}catch(e){ console.log(e); mysql.destroy(); callback({status: 'err', errMsg: 'Ошибка(5)'}) }});
					}catch(e){ console.log(e); mysql.destroy(); callback({status: 'err', errMsg: 'Ошибка(4)'}) }});
				});
			}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(3)'}) }});		
		}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(2)'}) }});
	}else{ callback({status: 'err', errMsg: 'Не указан город проведения выборов'}) }	
}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(1)'}) }}