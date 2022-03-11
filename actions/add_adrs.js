exports.system = true;

exports.f = function(conn, data, msg, callback){try{
	console.log("msg", msg);
	if(msg.adrs){
		
		DB.addComplex(conn, {col: 'adrs'}, [], {
			state: msg.adrs.state,
			city: msg.adrs.city,
			population: msg.adrs.population,
			osm_lonlat: msg.adrs.osm_lonlat,
		}, (adrs)=>{ callback(adrs) });
	
	}else{
		
		DB.addComplex(conn, {col: 'adrs'}, [], {
			lonlat: msg.lonlat,
			osm_lonlat: msg.osm_lonlat,
		}, (adrs)=>{
			DB.getMysql((mysql)=>{
				async.parallel([(cb)=>{
					mysql.query("SELECT id FROM regions WHERE `region` = ? OR `osmRegion` = ? LIMIT 0,1", [msg.state, msg.state], (err, rows)=>{ if(rows.length){
						const regId = rows[0].id;
						mysql.query("SELECT title, shortTitle, population FROM osm WHERE `region_id` = ? AND (`title` = ? OR `title` LIKE ? OR  `shortTitle` = ?) ORDER BY CHAR_LENGTH(title) LIMIT 1", [regId, msg.city, "%"+msg.city+"%", msg.city], (err, rows)=>{
							if(rows.length){
								msg.population = rows[0].population;
								msg.shortTitle = rows[0].shortTitle;
								cb();
							}else{
								var shortCity = msg.city.replace(/(^| )[а-яё]+/g, '');
								shortCity = shortCity.replace(/^\s+|\s+$/gm,'');
								var veryShortCity = shortCity.replace(/[а-яё]{2}$/, '');
								mysql.query("SELECT title, shortTitle, population FROM osm WHERE `region_id` = ? AND ( `shortTitle` = ? OR `shortTitle` LIKE ? OR `shortTitle` LIKE ? ) ORDER BY CHAR_LENGTH(shortTitle) LIMIT 1", [regId, shortCity, shortCity, "%"+veryShortCity+"%"], (err, rows)=>{ if(rows.length){
									msg.population = rows[0].population;
									msg.shortTitle = rows[0].shortTitle;
									cb();
								}else{ cb() } });
							}
						});
					}else{ cb() } });
				}, (cb)=>{
					DB.saveField(conn, {name: 'state'}, {_id: adrs._id, col: 'adrs'}, {value: msg.state}, ()=>{ cb() });
				}, (cb)=>{
					DB.saveField(conn, {name: 'city'}, {_id: adrs._id, col: 'adrs'}, {value: msg.city}, ()=>{ cb() });
				}], (err, res)=>{
					DB.saveField(conn, {name: 'title'}, {_id: adrs._id, col: 'adrs'}, {value: msg.shortTitle}, ()=>{
						DB.saveField(conn, {name: 'population'}, {_id: adrs._id, col: 'adrs'}, {value: msg.population}, ()=>{
							
							DB.addComplex(conn, {col: 'vacancy'}, {
								col: 'adrs', _id: adrs._id, childLink: '__vacancy_head',
							}, {
								title: CONFIG.labels.vacancy.head,
							}, ()=>{							
								DB.addComplex(conn, {col: 'vacancy'}, {
									col: 'adrs', _id: adrs._id, childLink: '__vacancy_free', parentLink: '__adrs',
								}, {
									title: CONFIG.labels.vacancy.second,
								}, ()=>{
									mysql.destroy();
									callback(adrs);
								});
							});
						});
					});
				});
			});
		});
	}
	
}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(1)'}); }}