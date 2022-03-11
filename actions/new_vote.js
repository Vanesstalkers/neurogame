exports.f = function(conn, data, msg, callback){try{
		
	if(data.field._id && (data.field.col == 'vote' || data.field.col == 'adrs')){
			
		conn.db.collection('user')
		.findOne({_id: ObjectId(conn.user.key)}, {fields: { __vote_expert: 1, __vote_candidate: 1 }},
		(err, user)=>{try{
	
			if(data.field.col == 'vote' && (msg.type == 'expert' || msg.type == 'candidate')){
				
				if(msg.type == 'candidate'){
					
					if(!(user.__vote_candidate && user.__vote_candidate.l.length >= CONFIG.userCandidateLimit)){
						
						ROUTER.route(conn, {action: 'add_vote_candidate', vote: data.field._id, user: conn.user.key}, (data)=>{
							callback(data);
						}, true);
					
					}else{ callback({status: 'err', errMsg: CONFIG.msg.limit.candidate}) }
					
				}else{
					
					if(!(user.__vote_expert && user.__vote_expert.l.length >= CONFIG.userExpertLimit)){
						
						ROUTER.route(conn, {action: 'add_vote_expert', vote: data.field._id, user: conn.user.key}, (data)=>{
							callback(data);
						}, true);
					
					}else{ callback({status: 'err', errMsg: CONFIG.msg.limit.expert}) }
				}
			}else{
				
				if(data.field.col == 'adrs'){
					
					if(!(user.__vote_candidate && user.__vote_candidate.l.length >= CONFIG.userCandidateLimit)){
						
						conn.db.collection('adrs')
						.findOne(ObjectId(data.field._id), {population: 1, money: 1, revote: 1, __user: 1, __vacancy_head: 1},
						(err, adrs)=>{try{
							
							if(adrs.revote && adrs.revote > Date.now()){
								callback({status: 'err', errMsg: CONFIG.msg.vote.revote+' '+moment(new Date(adrs.revote)).format('DD.MM.YY HH:mm')})
							}else{

								ROUTER.route(conn, {
									action: 'add_vote', 
									adrs: data.field._id,
									position: CONFIG.labels.vacancy.head,
									candidateNum: CONFIG.voteBaseСandidateNum,
									expertNum: CONFIG.voteBaseExpertNum,
								}, (vote)=>{

									ROUTER.route(conn, {action: 'add_vote_candidate', vote: vote._id, user: conn.user.key}, (data)=>{try{
										
										callback(data);
										
										if(adrs.__user && adrs.__user.l.length){
											
											DB.deleteComplex(conn, {
												_id: adrs.__user.l[0], col: 'user', deleteLinks: true,
												links: {
													user: {
														adrs: '__win_adrs',
														vacancy: false,
													},
													adrs: '__user',
													vacancy:  '__user',
												}
											}, [
												{_id: adrs._id, col: 'adrs'},
												{_id: adrs.__vacancy_head.l[0], col: 'vacancy'},
											], ()=>{});
											
											conn.db.collection('vacancy')
											.findOne(adrs.__vacancy_head.l[0], {rate: 1}, (err, vacancy)=>{
												
												if(vacancy && vacancy._id){
													
													conn.db.collection('vacancy')
													.update({_id: vacancy._id}, {$unset: {rate: ""}}, (err)=>{});
													
													conn.db.collection('adrs').update({_id: adrs._id}, {$inc: {
														money: ((adrs.population||0)*(vacancy.rate||0)/10).toFixed(0)*-1
													}}, (err)=>{});
												}
											})
											
											DB.saveField(conn, {name: 'money'}, {_id: adrs.__user.l[0], col: 'user'}, {value: -1*(adrs.money || 0), $inc: true}, ()=>{});
											
											if((adrs.__user.l[0]+'') != conn.user.key){
												
												// текущий глава города всегда участвует в повторных выборах
												ROUTER.route(conn, {action: 'add_vote_candidate', vote: vote._id, user: adrs.__user.l[0]}, ()=>{}, true);
											}
										}
									}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(6)'}); }}, true);
								}, true);
							}
						}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(5)'}); }});
					
					}else{ callback({status: 'err', errMsg: CONFIG.msg.limit.candidate}) }
					
				}else{ callback({status: 'err', errMsg: 'Ошибка(4)'}) }
			}
		}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(3)'}); }});

	}else{ callback({status: 'err', errMsg: 'Ошибка(2)'}) }

}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(1)'}); }}