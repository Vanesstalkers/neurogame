exports.system = true;

exports.f = function(conn, data, msg, callback){try{
	
	if(msg.vote && msg.user){

		var userId = ObjectId(msg.user);
		var now = Date.now();
			
		conn.db.collection('vote')
		.findOne({_id: ObjectId(msg.vote)}, {fields: {
			__candidate: 1, tutorial: 1, tutorialClones: 1,
			__user_candidate: 1, __user_expert: 1,
		}}, 
		(err, vote)=>{try{
			
			if(vote.tutorial || !((
				vote.__user_candidate && 
				vote.__user_candidate.l && 
				vote.__user_candidate.l.map(l=>l+'').indexOf(msg.user) != -1
				) || (
				vote.__user_expert && 
				vote.__user_expert.l && 
				vote.__user_expert.l.map(l=>l+'').indexOf(msg.user) != -1
			))){

				conn.db.collection('candidate')
				.find({_id: {$in: vote.__candidate.l}})
				.toArray((err, candidates)=>{try{
					
					var free = candidates.filter(q=>q.__user==undefined)[0];
					
					if(free){
						
						DB.addComplex(conn, { 
							col: 'vote',
							_id: vote._id,
							link: vote.tutorial ? '__vote_tutorial' : '__vote_candidate',
						},[
							{col: 'user', _id: msg.user, link: '__user_candidate'},
						],{

						}, (data)=>{

							var update = [];
							
							update.push((cb)=>{
								
								var candidateId = free._id;
								if(vote.tutorial && vote.tutorialClones[candidateId+'']) candidateId = ObjectId(vote.tutorialClones[candidateId+'']);
								
								conn.db.collection('candidate')
								.update({
									_id: candidateId, __user: {$exists: false},
								},{
									$set: {'__user.c': 1},
									$push: {'__user.l': userId},
								},()=>{ cb() });
							});
							
							update.push((cb)=>{
								
								var parents = [];
								
								free.__answer.l.forEach((r, i)=>{
									parents.push({col: 'answer', _id: vote.tutorial && vote.tutorialClones && vote.tutorialClones[r+''] ? ObjectId(vote.tutorialClones[r+'']) : r, parentLink: false, sqlLink: true});
								});
								
								DB.addComplex(conn, {
									col: 'user', _id: userId
								}, parents, ()=>{ cb() });
							});
							
							/*var subList = [userId];
							if(vote.__user_candidate) subList = subList.concat(vote.__user_candidate.l);
							var subValue = {t: now, i: 'Добавлен новый кандидат'};
							
							subList.forEach((user)=>{ update.push((cb)=>{
								DB.saveField(conn, {
									name: 'update_time.'+user, sub: true,
								}, {
									_id: vote._id, col: 'vote',
								}, {
									value: subValue
								}, ()=>{ cb() });
							}) });*/
							
							async.parallel(update, (err, res)=>{
								callback({status: 'ok'});
							});

						});
					}else{ callback({status: 'err', errMsg: 'Ошибка(6)'}) }
				
				}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(5)'}); }});
			
			}else{ callback({status: 'err', errMsg: CONFIG.msg.vote.own}) }
		
		}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(4)'}); }});

	}else{ callback({status: 'err', errMsg: 'Ошибка(2)'}) }
	
}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(1)'}); }}