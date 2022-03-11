exports.f = function(conn, data, msg, callback){try{
	
	if(!msg.rate){
		callback({status: 'err', errMsg: 'Оценка не выставлена.'});
	}else{
		
		msg.rate = msg.rate*1;

		if(data.parent.col == 'rate'){
			
			conn.db.collection('rate')
			.findOne(ObjectId(data.parent._id), {
				__vote: 1, __poll: 1, __user: 1, ready: 1, stats: 1
			}, (err, rate)=>{try{

				if(!rate){
					callback({status: 'ok', errMsg: CONFIG.msg.poll.finished});
				}else{
					if(rate.ready){
						callback({status: 'err', errMsg: CONFIG.msg.poll.hasrate});
					}else{
						
						var parallel = {}, tutorial;

						rate.rate = msg.rate;
						
						if(rate.stats && msg.stats){
							for(var s in rate.stats) if(msg.stats[s] != undefined) rate.stats[s].v = msg.stats[s];
						}
						
						parallel.rate = (cb)=>{
							conn.db.collection('rate')
							.update({
								_id: rate._id
							}, {
								$set: {rate: msg.rate, stats: rate.stats, ready: 1}
							}, (err, update)=>{ cb() });
						}

						if(rate.__poll) parallel.poll = (cb)=>{
							
							conn.db.collection('poll')
							.findOne({
								_id: rate.__poll.l[0]
							}, { fields: {
								type: 1, tutorial: 1, dateto: 1,
								_count: 1, _sum: 1, _stats: 1, 
								__question_poll: 1, __story: 1,
							}}, (err, poll)=>{try{
								
								if(!poll || err){
									if(err) console.log(err);
									cb();
								}else{							
									if(poll.tutorial){
										DB.deleteComplex(conn, {
											col: 'poll', _id: poll._id, deleteLinks: true, deleteMysql: false,
										}, {col: 'user', _id: ObjectId(conn.user.key)}, ()=>{
											conn.user.tutorialLastRate = rate._id;
											tutorial = true;
											cb();
										});
									}else{
										ROUTER.route(conn, {
											action: 'calc_poll', 
											_poll: poll,
											_rate: rate,
										}, ()=>{
											DB.deleteComplex(conn, {
												col: 'poll', _id: poll._id, deleteLinks: true, deleteMysql: false,
											}, {col: 'user', _id: ObjectId(conn.user.key)}, ()=>{
												ROUTER.route(conn, {action: 'find_poll'}, ()=>{ cb() });
											});
										}, true);
									}
								}
							}catch(e){ console.log(e); cb() }});
						}
						
						if(rate.__vote) parallel.vote = (cb)=>{
							conn.db.collection('vote')
							.update({_id: rate.__vote.l[0]}, {$inc: {ratesReady: 1}}, (err, update)=>{ cb() });
						}
						
						async.parallel(parallel, (err, data)=>{
							callback({status: 'ok', msg: 'Оценка сохранена', tutorial: tutorial});
						});
					}
				}
			}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка (3)'}); }});

		}else{ callback({status: 'err', errMsg: 'Ошибка (2)'}); }
	}
	
}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка (1)'}); }}