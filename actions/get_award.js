exports.f = function(conn, data, msg, callback){try{
	
	var userId = ObjectId(conn.user.key);
	
	conn.db.collection('user').findOne(userId, {'award.list': 1}, (err, user)=>{try{

		if(user && user.award && user.award.list){
			
			var ready = user.award.list.filter(a=>a.ready).length == 3;
			var used = user.award.list.filter(a=>a.used).length == 3;
			
			if(used){
				callback({status: 'err', errMsg: 'Все бонусы за сегодня уже получены'});
			}else{
				if(!ready){
					callback({status: 'err', errMsg: 'Для получения бонусов должны быть активированы все три звезды'});
				}else{
					
					var award = user.award.list.map((a)=>{
						if(!a.used && ready){
							a.used = true;
							ready = false;
						}
					});
					
					if(ready){
						callback({status: 'err', errMsg: 'На сегодня все бонусы закончились'});
					}else{
						
						var waterfall = [], $set = {};
						$set['award.list'] = user.award.list;
						
						var random = Math.floor(Math.random()*3);
						if(random < 1){
							waterfall.push((cb)=>{
								
								var val = 10;
								
								DB.addComplex(conn, {col: 'news'}, [
									{col: 'user', _id: userId},
								], {
									type: 'power',
									source: 'award',
									val: val,
								}, ()=>{
									DB.saveField(conn, {name: 'power'}, {_id: userId, col: 'user'}, {value: val, $inc: true}, ()=>{ cb() });
								});
							});
						}else if(random < 2){
							waterfall.push((cb)=>{
								
								var val = 100;
								
								DB.addComplex(conn, {col: 'news'}, [
									{col: 'user', _id: userId},
								], {
									type: 'exp',
									source: 'award',
									val: val,
								}, ()=>{
									DB.saveField(conn, {name: 'exp'}, {_id: userId, col: 'user'}, {value: val, $inc: true}, ()=>{ cb() });
								});
							});							
						}else{
							waterfall.push((cb)=>{
								DB.getMysql((mysql)=>{
									
									mysql.query('SELECT `shortTitle` FROM `osm` WHERE `id` = ?', [0 + Math.floor(Math.random()*24000)], (err, res)=>{
										
										mysql.destroy();
										
										if(res && res.length){
											
											var $inc = {};
											$inc['alias.'+res[0].shortTitle] = 1;
										
											DB.addComplex(conn, {col: 'news'}, [
												{col: 'user', _id: userId},
											], {
												type: 'alias',
												source: 'award',
												val: res[0].shortTitle,
											}, ()=>{
												conn.db.collection('user').update({_id: userId}, {$inc: $inc}, (err, res)=>{ cb() });
											});
										}else{ cb() }
									});
								})
							});
						}
						
						waterfall.push((cb)=>{
							conn.db.collection('user').update({_id: userId}, {$set: $set}, ()=>{ cb() });
						});
						
						async.waterfall(waterfall, ()=>{
							callback({status: 'ok'});
						});
					}
					/*
							
							var ready = true;
							var award = user.award.list.map((a)=>{
								if(!a.ready && ready){
									a.ready = true;
									ready = false;
								}
							});
							
							conn.db.collection('user').update({_id: userId}, {$inc: $inc}, (err, res)=>{try{
							
							DB.addComplex(conn, {col: 'news'}, [
								{col: 'user', _id: userId},
								{col: 'story', _id: poll.__story.l[0]},
							], {
								type: $inc.power ? 'power' : 'exp',
								source: poll.subtype,
								val: $inc.power || $inc.exp,
							}, ()=>{ cb() });*/
					
					
				}
			}
		}else{
			callback({status: 'err', errMsg: 'Ошибка(3)'});
		}
	}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(2)'}); }});
}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(1)'}); }}