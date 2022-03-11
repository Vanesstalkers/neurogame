exports.system = true;

exports.f = function(conn, data, msg, callback){try{
	
	if(msg.question && msg.question.__expert && msg.question.__vote && msg.question.__user){
		
		var question = msg.question;
		
		conn.db.collection('expert')
		.findOne({_id: question.__expert.l[0]}, {fields: {__rate: 1}}, (err, expert)=>{
			
			var parents = [];
			parents.push({
				col: 'vote', _id: question.__vote.l[0], 
				childLink: '__user_expert', parentLink: '__vote_expert',
			});
			parents.push({ col: 'question', _id: question._id });
			parents.push({ col: 'expert', _id: expert._id });
			expert.__rate.l.forEach((r)=>{
				parents.push({ col: 'rate', _id: r });
			});
		
			DB.deleteComplex(conn, {
				col: 'user', _id: question.__user.l[0], deleteLinks: true,
			}, parents, ()=>{ callback({status: 'ok'}) });
		});
	}else{ callback({status: 'err', errMsg: 'Ошибка(2)'}) }
	
}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(1)'}); }}