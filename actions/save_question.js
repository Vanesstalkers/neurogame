exports.f = function(conn, data, msg, callback){try{

	if(data.parent.col == 'question' && msg.stats){
		
		var _id = ObjectId(data.parent._id);
		var userId = ObjectId(conn.user.key);
		
		conn.db.collection('question')
		.findOne({_id: _id}, {text: 1, stats: 1, minStatsCount: 1, __vote: 1, tutorial: 1, __user: 1, free: 1, __poll: 1}, (err, question)=>{try{

			if(!err && question){
				
				if(question.text == undefined) question.text = '';
				var text = question.text.trim();
				
				if(question.__user.l[0] != conn.user.key){
					callback({status: 'err', errMsg: CONFIG.msg.vote.nolink});
				}else{
					if(text.length < 20){
						callback({status: 'err', errMsg: CONFIG.msg.length.questionMin});
					}else{
						
						if(text.length > 140){
							callback({status: 'err', errMsg: CONFIG.msg.length.questionMax});
						}else{
							
							if(question.minStatsCount != undefined && msg.stats.length < question.minStatsCount){
								callback({status: 'err', errMsg: CONFIG.msg.length.themes});
							}else{
							
								var $set = {
									waitForModeration: true,
								};
								if(question.tutorial) $set = {ready: true};
								
								conn.db.collection('question')
								.update({_id: _id}, {$set: $set}, (err, update)=>{try{
									
									if(question.tutorial){

										callback({status: 'ok'});
									
									}else{
										
										var waterfall = [], context = '';
										
										if(question.free){											
											
											context = CONFIG.labels.free_question;
											
											waterfall.push((cb)=>{
												DB.deleteComplex(conn, {col: 'question', _id: question._id, deleteLinks: true, links: {
													question: {user: false},
													user: '__question_free',
												}}, {col: 'user', _id: userId}, ()=>{ cb() });
											});
										}else{										
											waterfall.push((cb)=>{
												conn.db.collection('vote')
												.findOne(question.__vote.l[0], {position: 1, __adrs: 1}, (err, vote)=>{try{
													conn.db.collection('adrs')
													.findOne(vote.__adrs.l[0], {state: 1, city: 1}, (err, adrs)=>{try{
														context = vote.position+', '+adrs.state+', '+adrs.city;
														cb();
													}catch(e){ console.log(e); cb() }});
												}catch(e){ console.log(e); cb() }});
											});
											if(conn.user.config.game){
												waterfall.push((cb)=>{
													conn.db.collection('__game').update({_id: ObjectId(conn.user.config.game)}, {$pull: {'__wait_for_question': _id}}, ()=>{ cb() });
												});
											}
										}
										
										async.waterfall(waterfall, ()=>{try{								
								
											var pollStats = {};
											for(var s in question.stats){
												pollStats[s] = {v: 0, c: 0, a: 0};
												question.stats[s].v = msg.stats.indexOf(s) != -1 ? 1 : 0;
											}
											
											var newRate = {
												rate: CONFIG.questionSelfRate,
												stats: question.stats,
											}
											
											DB.addComplex(conn, {
												col: 'rate',
											},[
												{col: 'user', _id: userId, childLink: false},
											], newRate, (rate)=>{try{
												
												newRate._id = rate._id;
												newRate.__user = {l: [userId]};

												var dateto = Date.now() + CONFIG.pollQuestionTime;
												var waitForModeration = Date.now() + (question.free ? CONFIG.moderationVoteQuestionTime : CONFIG.moderationVoteQuestionTime);
												
												DB.addComplex(conn, {
													col: 'poll',
												},[
													{col: '__game', sfx: '_moderation', _id: conn.user ? ObjectId(conn.user.config.game) : true, parentLink: false, childLink: '__moderation', sqlLink: true},
													{col: 'question', _id: _id},
													{col: 'rate', _id: rate._id},
													{col: 'user', _id: userId, parentLink: false, childLink: false, sqlLink: true},
												], {
													type: 'question',
													text: text,
													context: context,
													dateto: dateto,
													_stats: pollStats,
													_count: 0, _sum: 0,
													waitForModeration: waitForModeration,
													rateCountForModeration: question.free ? 
														CONFIG.moderationVoteQuestionRateCount : 
														CONFIG.moderationVoteQuestionRateCount,
													rateValueForModeration: question.free ? 
														CONFIG.moderationVoteQuestionRateValue : 
														CONFIG.moderationVoteQuestionRateValue,
												}, (poll)=>{
													callback({
														status: 'ok', msg: CONFIG.labels.question_send_to_modetaion, 
														skey: md5(poll._id+dateto), dateto: dateto
													});
												});
											}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(7)'}); }});
										}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(6)'}); }});
									}
								}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(5)'}); }});
							}
						}
					}
				}
			}else{ callback({status: 'err', errMsg: 'Ошибка(4)'}); }
		}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(3)'}); }});
	}else{ callback({status: 'err', errMsg: 'Ошибка(2)'}); }
}catch(e){
	console.log(e); callback({status: 'err', errMsg: 'Ошибка(1)'});
}}