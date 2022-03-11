
exports.f = function(conn, data, msg, callback){try{

	if(msg.poll && data.parent.name == 'vacancy' && data.parent._id){

		DB.redis.get(conn.user.session+'__'+msg.poll, (err, redisData)=>{try{
			
			var poll = JSON.parse(redisData);
			
			if(poll.name == 'poll' && poll._id){

				DB.addComplex(conn, {col: 'invite'}, [
					{col: 'vacancy', _id: data.parent._id},
					{col: 'poll', _id: ObjectId(poll._id)},
				], ()=>{
					callback({status: 'ok', msg: 'Приглашение отправлено'});
				});

			}else{ callback({status: 'err', errMsg: 'Ошибка(4)'}) }
		}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(3)'}) }});
	}else{ callback({status: 'err', errMsg: 'Ошибка(2)'}) }
}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(1)'}) }}