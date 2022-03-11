exports.system = true;

exports.f = function(conn, data, msg, callback){try{
	
	conn.db.collection('__tutorial').findOne({}, {fields: {vote: 1}}, (err, __tutorial)=>{try{

		DB.mongoClone({db: conn.db, col: 'vote', _id: __tutorial.vote[0]}, (vote)=>{try{
				
			var clone = [], cloned = {}, modify = {query: {}, update: {}};
			
			cloned[__tutorial.vote[0]] = vote._id;
			
			clone.push((cb)=>{
			
				conn.db.collection('expert').find({_id: {$in: vote.__expert.l.map(l=>ObjectId(l))}}).toArray((err, experts)=>{
					
					experts.forEach((e)=>{ if(e.tutorial){
						
						DB.mongoClone({db: conn.db, col: 'expert', clone: e}, (expert)=>{
							
							cloned[e._id] = expert._id;
							modify.update['tutorialClones.'+e._id] = expert._id+'';
							
							DB.mongoClone({db: conn.db, col: 'question', _id: expert.__question.l[0]}, (question)=>{
								
								cloned[expert.__question.l[0]] = question._id;
								modify.update['tutorialClones.'+expert.__question.l[0]] = question._id+'';
								
								conn.db.collection('question')
								.findAndModify({_id: question._id}, [], {
									$set: {'__vote.l': [vote._id]},
								},(err, v)=>{ cb() });
							});
						});
					} })
				});
			});
			
			clone.push((cb)=>{
			
				conn.db.collection('candidate').find({_id: {$in: vote.__candidate.l.map(l=>ObjectId(l))}}).toArray((err, candidates)=>{
					candidates.forEach((c)=>{ if(c.tutorial){
						DB.mongoClone({db: conn.db, col: 'candidate', clone: c}, (candidate)=>{
							cloned[c._id] = candidate._id;
							modify.update['tutorialClones.'+c._id] = candidate._id+'';
							cb();
						});
					} })
				});
			});
			
			clone.push((cb)=>{
				conn.db.collection('answer').find({_id: {$in: vote.__answer.l.map(l=>ObjectId(l))}}).toArray((err, answers)=>{
					
					var parallel = [];
					
					answers.forEach((a)=>{ if(a.tutorial){

						parallel.push((cb)=>{
							
							for(var i in a.__candidate.l) if(cloned[a.__candidate.l[i]]) a.__candidate.l[i] = cloned[a.__candidate.l[i]];
							for(var i in a.__question.l) if(cloned[a.__question.l[i]]) a.__question.l[i] = cloned[a.__question.l[i]];
							
							DB.mongoClone({db: conn.db, col: 'answer', clone: a}, (answer)=>{
								cloned[a._id] = answer._id;
								modify.update['tutorialClones.'+a._id] = answer._id+'';
								cb();
							});
						});
					} });
					
					async.parallel(parallel, (err, res)=>{ cb() });
				});
			});
			
			clone.push((cb)=>{
				conn.db.collection('rate').find({_id: {$in: vote.__rate.l.map(l=>ObjectId(l))}}).toArray((err, rates)=>{
					var parallel = [];
					rates.forEach((r)=>{if(r.tutorial && !r.rate){
						parallel.push((cb)=>{
							
							for(var i in r.__vote.l) if(cloned[r.__vote.l[i]]) r.__vote.l[i] = cloned[r.__vote.l[i]];
							for(var i in r.__expert.l) if(cloned[r.__expert.l[i]]) r.__expert.l[i] = cloned[r.__expert.l[i]];
							for(var i in r.__answer.l) if(cloned[r.__answer.l[i]]) r.__answer.l[i] = cloned[r.__answer.l[i]];
							
							DB.mongoClone({db: conn.db, col: 'rate', clone: r}, (rate)=>{
								modify.update['tutorialClones.'+r._id] = rate._id+'';
								cb();
							});
						});
					} });
					async.parallel(parallel, (err, res)=>{
						cb();
					});
				});
			});
			
			modify.query._id = vote._id;
			
			async.waterfall(clone, (err, res)=>{
				
				conn.db.collection('vote')
				.findAndModify(modify.query, [], {
					$set: modify.update
				},(err, v)=>{
					ROUTER.route(conn, {action: 'add_vote_expert', vote: vote._id, user: conn.user.key}, (data)=>{
						ROUTER.route(conn, {action: 'add_vote_candidate', vote: vote._id, user: conn.user.key}, (data)=>{
							callback({_id: vote._id});
						}, true);
					}, true);
				});
			});
		}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(3)'}) }});
	}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(2)'}) }});
}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(1)'}) }}