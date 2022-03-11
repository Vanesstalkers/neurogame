exports.system = true;

exports.f = function(conn, data, msg, callback){try{
	
	if(msg.pollId){
		
		conn.db.collection('poll').findOne({_id: msg.pollId}, {fields: {_stats: 1}}, (err, poll)=>{try{

			var stats = Object.keys(LST.stats.lst), baseStats = {};
			
			if(poll._stats){
				var pollStats = Object.keys(poll._stats).map(s=>({s:s, value:poll._stats[s].a})).sort((a,b)=>b.value-a.value).splice(0,5);

				for(var s in pollStats){
					stats.splice( stats.indexOf(pollStats[s].s), 1);
					baseStats[pollStats[s].s] = {};
				}

				for(var i = pollStats.length; i < 6; i++){
					baseStats[stats.splice( Math.floor(Math.random()*stats.length), 1)[0]] = {};
				}
			}
			var userId = ObjectId(conn.user.key);
			
			DB.addComplex(conn, {col: 'rate'}, [
				{col: 'poll', _id: msg.pollId, childLink: msg.pollChildLink},
				{col: 'user', _id: userId, childLink: false},
			], {
				stats: baseStats,
			}, (rate)=>{try{

				DB.addComplex(conn, {
					col: 'poll', _id: msg.pollId,
				},[
					{col: 'user', _id: userId, parentLink: false, sqlLink: true},
				],{},()=>{
					
					conn.db.collection('user').update({_id: userId}, {$set: {'__poll.myRate': rate._id}}, ()=>{
						callback({status: 'ok', msg: CONFIG.msg.poll.addnew});
					});
				});
			}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(6)'}); }});
		}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(5)'}); }});

	}else{ callback({status: 'err', errMsg: 'Ошибка (2)'}) }
	
}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка (1)'}); }}