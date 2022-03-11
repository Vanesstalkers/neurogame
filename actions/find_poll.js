
exports.f = function(conn, data, msg, callback){try{
	
	conn.db.collection('user').findOne(ObjectId(conn.user.key), {__poll: 1}, (err, user)=>{try{
		
		if(user && user.__poll && user.__poll.l && user.__poll.l.length > 0 && !msg.passive){
			
			callback({status: 'err', msg: 'Необходимо завершить предыдущий опрос'});
			
		}else{
			
			var waterfall = [];
			
			if(msg.passive && user.__poll && user.__poll.l && user.__poll.l.length) waterfall.push((cb)=>{
				DB.deleteComplex(conn, {
					col: 'poll', _id: user.__poll.l[0], deleteLinks: true, deleteMysql: false,
				}, {col: 'user', _id: user._id}, ()=>{ cb() });
			});
			
			async.waterfall(waterfall, ()=>{
			
				DB.getMysql((mysql)=>{try{
					
					var waterfall = [], id;
					
					waterfall.push((cb)=>{
						mysql.query("SELECT `poll_links____game_moderation`.id id FROM `poll_links____game_moderation` LEFT JOIN `poll_links__user` ON `poll_links____game_moderation`.id = `poll_links__user`.id AND `poll_links__user`.p = ? WHERE `poll_links__user`.id IS NULL LIMIT 0,1", [conn.user.key], (err, rows)=>{
							if(rows && rows[0]) id = rows[0].id;
							cb();
						});
					});
					
					waterfall.push((cb)=>{
						if(!id){
							mysql.query("SELECT `poll_links____game`.id id FROM `poll_links____game` LEFT JOIN `poll_links__user` ON `poll_links____game`.id = `poll_links__user`.id AND `poll_links__user`.p = ? WHERE `poll_links__user`.id IS NULL LIMIT 0,1", [conn.user.key], (err, rows)=>{
								if(rows && rows[0]) id = rows[0].id;
								cb();
							});
						}else{ cb() }
					});
					
					async.waterfall(waterfall, ()=>{try{
					
						if(err) console.log(err);

						if(!id){
							callback({status: 'ok', msg: 'Новых опросов не найдено', notnew: true});
						}else{
							ROUTER.route(conn, {
								action: 'add_poll_rates', 
								pollId: ObjectId(id),
							}, (data)=>{ callback(data) }, true);
						}
					}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(4)'}); }});
				}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(3)'}); }});
			});
		}
	}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(2)'}); }});
}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(1)'}); }}