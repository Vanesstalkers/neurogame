exports.system = true;

exports.f = function(conn, data, msg, callback){try{
	
	if(msg.vote && msg.user){
		
		var userId = ObjectId(msg.user);
			
		conn.db.collection('vote')
		.findOne({_id: ObjectId(msg.vote)}, {fields: {
			__expert: 1, __rate: 1, tutorial: 1, tutorialClones: 1,
			__user_candidate: 1, __user_expert: 1,
		}}, 
		(err, vote)=>{try{
			
			if(!vote.tutorial && !data.expert && ((
				vote.__user_candidate && 
				vote.__user_candidate.l && 
				vote.__user_candidate.l.map(l=>l+'').indexOf(msg.user) != -1
				) || (
				vote.__user_expert && 
				vote.__user_expert.l && 
				vote.__user_expert.l.map(l=>l+'').indexOf(msg.user) != -1
			))){
				callback({status: 'err', errMsg: CONFIG.msg.vote.own});
			}else{

				conn.db.collection('expert').find({_id: {$in: data.expert ? [data.expert] : vote.__expert.l}}).toArray((err, experts)=>{try{
					
					var free = experts.filter(q=>(q.__user==undefined||q.__user.l[0]==undefined))[0];
					
					if(!free){
						callback({status: 'err', errMsg: CONFIG.msg.vote.noexpert})
					}else{
						
						DB.addComplex(conn, { 
							col: 'vote',
							_id: vote._id,
							link: vote.tutorial ? '__vote_tutorial' : '__vote_expert',
						},[
							{col: 'user', _id: msg.user, link: '__user_expert'},
						],{

						}, ()=>{try{

							var update = [];
							
							update.push((cb)=>{
								
								var expertId = free._id;
								if(vote.tutorial && vote.tutorialClones[expertId+'']) expertId = ObjectId(vote.tutorialClones[expertId+'']);
								
								DB.addComplex(conn, {
									col: 'user', _id: userId
								}, {col: 'expert', _id: expertId, parentLink: false}, ()=>{ cb() });
							});

							update.push((cb)=>{
								
								var questionIds = free.__question.l;
								if(vote.tutorial) questionIds.forEach((r, i)=>{ if(vote.tutorialClones[r+'']) questionIds[i] = ObjectId(vote.tutorialClones[r+'']) });
								
								var questionIds = questionIds.map((q)=>{
									if(!vote.tutorial && !data.expert && conn.user.config.game){
										conn.db.collection('question').update({_id: q}, {$set: {wait_for_time: Date.now()+CONFIG.pollQuestionReadyTime}});
										conn.db.collection('__game').update({_id: ObjectId(conn.user.config.game)}, {$push: {'__wait_for_question': q}});
									}
									return {col: 'question', _id: q, parentLink: false};
								});
								
								DB.addComplex(conn, {
									col: 'user', _id: userId
								}, questionIds, ()=>{ cb() });
							});
							
							update.push((cb)=>{
								conn.db.collection('expert').findOne({_id: free._id}, {fields: {__rate: 1}}, (err, expert)=>{try{
									
									var parents = [];
									
									expert.__rate.l.forEach((r, i)=>{
										parents.push({col: 'rate', _id: vote.tutorial && vote.tutorialClones && vote.tutorialClones[r+''] ? ObjectId(vote.tutorialClones[r+'']) : r, parentLink: false, sqlLink: true});
									});
									
									DB.addComplex(conn, {
										col: 'user', _id: userId
									}, parents, ()=>{ cb() });
								}catch(e){ console.log(e); cb() }});
							});
							
							async.parallel(update, (err, res)=>{
								callback({status: 'ok'});
							});
						}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(5)'}) }});
					}
				}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(4)'}) }});		
			}
		}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(3)'}) }});
	}else{ callback({status: 'err', errMsg: 'Ошибка(2)'}) }
}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(1)'}) }}