
exports.f = function(conn, data, msg, callback){try{
	
	if(conn.user.config.game){
		
		conn.db.collection('user').findOne({_id: ObjectId(conn.user.key)}, {fields: {__vote_candidate: 1, __vote_expert: 1}}, (err, user)=>{
			
			var candidateLimit = user.__vote_candidate && user.__vote_candidate.l.length >= CONFIG.userCandidateLimit;
			var expertLimit = user.__vote_expert && user.__vote_expert.l.length >= CONFIG.userExpertLimit;
			
			if(candidateLimit && expertLimit){
				
				callback({status: 'err', errMsg: CONFIG.msg.limit.all});
			
			}else{
				
				conn.db.collection('__game').findOne({_id: ObjectId(conn.user.config.game)}, {fields: {__vote:1}}, (err, game)=>{
					
					if(!(game.__vote && game.__vote.l.length)){
						
						callback({status: 'err', errMsg: CONFIG.msg.vote.empty})
					
					}else{
						
						var action = expertLimit ? 'add_vote_candidate' : 'add_vote_expert';
						var votes = game.__vote.l.concat();
						
						function checkVote(v){
							
							var vote = v || votes.shift();
							
							ROUTER.route(conn, {action: action, vote: vote, user: conn.user.key}, (data)=>{

								if(data.status == 'ok'){
									callback({status: 'ok', msg: CONFIG.msg.vote.ready});
								}else{
									if(action == 'add_vote_expert' && !candidateLimit){
										action = 'add_vote_candidate';
										checkVote(vote);
									}else{
										if(votes.length){
											action = expertLimit ? 'add_vote_candidate' : 'add_vote_expert';
											checkVote();
										}else{
											callback({status: 'ok', msg: CONFIG.msg.vote.occupy});
										}
									}
								}
							}, true);
						}
						checkVote();
					}
				});
			}
		});
	}else{ callback({status: 'err', errMsg: 'Ошибка(2)'}) }

}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(1)'}); }}