exports.f = function(conn, data, msg, callback){try{

	if(data.parent.col == 'answer'){

		var _id = ObjectId(data.parent._id);
		var userId = ObjectId(conn.user.key);
		
		conn.db.collection('answer')
		.findOne({_id: _id}, {text: 1, __vote: 1, __question: 1, __rate: 1, __poll: 1}, (err, answer)=>{try{
			
			if(!err && answer){
				
				if(answer.text == undefined) answer.text = '';
				var text = answer.text.trim();
				
				if(text.length < 20){
					callback({status: 'err', errMsg: CONFIG.msg.length.answerMin});
				}else{
					
					if(text.length > 140){
						callback({status: 'err', errMsg: CONFIG.msg.length.answerMax});
					}else{
						
						conn.db.collection('vote')
						.findOne({_id: answer.__vote.l[0]}, {tutorial: 1, tutorialClones: 1, __user_expert: 1}, (err, vote)=>{try{
						
							conn.db.collection('answer')
							.update({_id: _id}, {$set: {ready: 1}}, (err, update)=>{try{
								
								conn.db.collection('question')
								.findOne({_id: answer.__question.l[0]}, {text: 1, __poll: 1}, (err, question)=>{try{

									var newRate = {
										rate: CONFIG.answerSelfRate,
									}
									
									DB.addComplex(conn, {
										col: 'rate',
									},[
										{col: 'user', _id: userId, childLink: false},
									], newRate, (rate)=>{try{
										
										newRate._id = rate._id;
										newRate.__user = {l: [userId]};
										
										var parents = [ // addComplex с parent '__game' в finish_vote
											{col: 'answer', _id: _id},
											{col: 'rate', _id: rate._id},
											{col: 'user', _id: userId, parentLink: false, childLink: false, sqlLink: true},
										];
										if(vote.__user_expert && vote.__user_expert.l && vote.__user_expert.l.length){
											vote.__user_expert.l.forEach((e)=>{
												parents.push({col: 'user', _id: e, parentLink: false, childLink: false, sqlLink: true});
											});
										}
										answer.__rate.l.forEach((r, i)=>{
											parents.push({col: 'rate', _id: vote.tutorial && vote.tutorialClones && vote.tutorialClones[r+''] ? ObjectId(vote.tutorialClones[r+'']) : r});
										});
										
										var subList = [];
										if(vote.__user_expert) subList = subList.concat(vote.__user_expert.l);
										
										subList.forEach((user)=>{
											DB.saveField(conn, {
												name: 'update_time.'+user, sub: true, notify: {
													title: CONFIG.notify.title,
													body: CONFIG.msg.vote.newAnswer
												},
											}, {
												_id: vote._id, col: 'vote',
											}, {
												value: {t: Date.now(), i: CONFIG.msg.vote.newAnswer}
											}, ()=>{ });
										});
											
										callback({status: 'ok', msg: CONFIG.msg.vote.newAnswerReady});
											
										if(!vote.tutorial){
										
											/*var newPoll = {
												type: 'answer',
												text: text,
												context: question.text,
												_count: 0, _sum: 0,
												__question_poll: question.__poll,
											}
											
											DB.addComplex(conn, {
												col: 'poll',
											}, parents, newPoll, (poll)=>{
												
												ROUTER.route(conn, {
													action: 'calc_poll', 
													_poll: newPoll,
													_rate: newRate,
												}, ()=>{ }, true);
											});*/
										}
									}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(8)'}); }});
								}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(7)'}); }});
							}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(6)'}); }});
						}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(5)'}); }});
					}
				}
			}else{ callback({status: 'err', errMsg: 'Ошибка(4)'}); }
		}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(3)'}); }});
	}else{ callback({status: 'err', errMsg: 'Ошибка(2)'}); }
}catch(e){
	console.log(e); callback({status: 'err', errMsg: 'Ошибка(1)'});
}}