
exports.f = function(conn, data, msg, callback){try{

	if(data.field && (data.field.sfx == 'idea' || data.field.sfx == 'story')){
		
		var userId = ObjectId(conn.user.key), now = Date.now();
		
		conn.db.collection('user').findOne(userId, {__story: 1, lastStory: 1}, (err, user)=>{try{
			
			if(user && user.__story && user.__story.l.length){
				
				var time = user.lastStory + CONFIG.pollStoryLimitTime;
				
				if(user.lastStory && time > now){
					callback({status: 'err', errMsg: 'Нового\xa0персонажа\x0aможно\xa0будет\xa0создать\x0a'+moment(new Date(time)).fromNow()});
				}else{
				
					conn.db.collection('story').findOne(user.__story.l[0], {text: 1}, (err, story)=>{try{
						
						if(!err && story && story._id){

							if(!story.text || story.text.length < 50){
								callback({status: 'err', errMsg: 'Длина\xa0текста\xa0должна\xa0быть\x0aбольше\xa050\xa0символов'});
							}else{
								if(story.text.length > 500){
									callback({status: 'err', errMsg: 'Длина\xa0текста\xa0не\xa0должна\x0aпревышать\xa0500\xa0символов'});
								}else{
									
									conn.db.collection('user').update({_id: userId}, {$set: {lastStory: now}}, (err, user)=>{try{
									
										DB.deleteComplex(conn, {
											col: 'story', _id: story._id, deleteLinks: true,
										}, {col: 'user', _id: userId}, ()=>{try{
									
											var dateto = now + CONFIG.pollStoryTime;
											
											var newRate = {
												rate: CONFIG.storySelfRate,
											}
											
											DB.addComplex(conn, {col: 'rate'},[
												{col: 'user', _id: userId, childLink: false},
											], newRate, (rate)=>{try{
												
												newRate._id = rate._id;
												newRate.__user = {l: [userId]};
											
												DB.addComplex(conn, {
													col: 'poll',
												},[
													{col: '__game', _id: conn.user ? ObjectId(conn.user.config.game) : true, parentLink: false, childLink: '__poll', sqlLink: true},
													{col: 'user', _id: userId, childLink: false, sqlLink: true},
													{col: 'story', _id: story._id},
													{col: 'rate', _id: rate._id},
												],{
													type: 'story',
													subtype: data.field.sfx,
													text: story.text,
													context: CONFIG.labels.story[data.field.sfx],
													dateto: dateto,
													_count: 0, _sum: 0,
												}, (poll)=>{try{
													
													conn.db.collection('story').update({_id: story._id}, {$set: {type: data.field.sfx}}, ()=>{try{
														
														DB.addComplex(conn, {
															col: 'story', _id: story._id,
														},{
															col: 'user', _id: userId, childLink: '__stories',
														}, ()=>{try{
															
															ROUTER.route(conn, {
																action: 'calc_poll', 
																_poll: poll,
																_rate: newRate,
															}, ()=>{try{

																callback({
																	status: 'ok', msg: 'Персонаж сохранен', 
																	skey: md5(poll._id+dateto), dateto: dateto
																});
																
															}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(11)'}) }}, true);
														}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(10)'}) }});
													}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(10)'}); }});
												}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(9)'}); }});
											}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(8)'}); }});
										}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(7)'}); }});
									}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(6)'}); }});
								}
							}
						}else{ callback({status: 'err', errMsg: 'Ошибка(5)'}) }
					}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(4)'}); }});
				}
			}else{ callback({status: 'err', errMsg: 'Ошибка(4)'}) }
		}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(3)'}); }});
	}else{ callback({status: 'err', errMsg: 'Ошибка(2)'}) }	
}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(1)'}); }}