
exports.f = function(conn, data, msg, callback){try{

	if(conn.user.role == 'admin'){

		var col = data.field.col || data.parent.col;
		
		switch(col){ case 'vote':

			conn.db.collection('vote').findOne(ObjectId(data.parent._id), {custom: 1, __adrs: 1}, (err, vote)=>{
				ROUTER.route(conn, {action: 'add_vote', publish: true, _id: vote._id, custom: vote.custom}, (v)=>{
					conn.db.collection('adrs').findOne(ObjectId(data.field._id || data.parent._id), {osm_lonlat: 1, __vote: 1}, (err, adrs)=>{
						DB.deleteComplex(conn, {
							col: 'user', _id: ObjectId(conn.user.key), deleteLinks: true, sub: true, 
							links: (cb)=>(cb({
								user: {adrs: '__custom_adrs'},
								adrs: '__custom_user',
							})),
						}, [{col: 'adrs', _id: vote.__adrs.l[0]}], ()=>{
							callback({status: 'ok', msg: 'Опубликовано успешно'});
						});
					});	
				}, data);
			});
		
		break; case 'adrs':

			conn.db.collection('adrs').findOne(ObjectId(data.field._id || data.parent._id), {osm_lonlat: 1, __vote: 1}, (err, adrs)=>{
				
				var address = adrs && adrs.__vote && adrs.osm_lonlat && adrs.osm_lonlat[0] == msg.lonlat[0] && adrs.osm_lonlat[1] == msg.lonlat[1] ? adrs._id : {state: "-", city: '-', population: 0, osm_lonlat: msg.lonlat};

				ROUTER.route(conn, {action: 'add_vote', publish: false, adrs: address}, (vote)=>{
					conn.db.collection('vote').findOne(vote._id, {__adrs: 1}, (err, vote)=>{
						DB.addComplex(conn, {col: 'adrs', _id: vote.__adrs.l[0], link: '__custom_adrs'}, [{col: 'user', _id: ObjectId(conn.user.key)}], {}, ()=>{ callback({status: 'ok', id: vote._id}) });
					});
				}, data);
			});
		break; default: callback({status: 'err', errMsg: 'Ошибка(3)'}) }
	}else{ console.log(e); callback({status: 'err', errMsg: 'Ошибка(2)'}) }
}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(1)'}) }}