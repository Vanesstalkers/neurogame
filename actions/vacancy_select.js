
exports.f = function(conn, data, msg, callback){try{
	
	conn.db.collection('poll').findOne(ObjectId(msg.poll), {__invite: 1, __story: 1, _count: 1, _sum: 1}, (err, poll)=>{try{

		if(poll.__invite && poll.__invite.l && poll.__invite.l.length){
	
			conn.db.collection('invite').find({_id: {$in: poll.__invite.l}}, {__vacancy: 1}).toArray((err, invites)=>{try{
				
				//console.log("invites", invites);
				
				if(invites && invites.length){
					
					conn.db.collection('vacancy').find({_id: {$in: invites.map(i=>i.__vacancy.l[0])}}, {__adrs: 1}).toArray((err, vacancies)=>{try{
						
						if(vacancies && vacancies.length){
							
							conn.db.collection('adrs').find({_id: {$in: vacancies.map(v=>v.__adrs.l[0])}}, {population: 1, money: 1, __user: 1}).toArray((err, adrses)=>{try{
								
								if(adrses && adrses.length){
									
									var adrs = adrses.sort((a, b)=>{
										return (b.money || b.population) - (a.money || a.population)
									})[0];
									
									var vacancy = vacancies.filter((v)=>(v.__adrs.l[0]+'' == adrs._id+''))[0];
									
									//console.log("vacancy", vacancy);
									//console.log("adrs", adrs);
									
									var rate = poll._count ? poll._sum / poll._count : 1;
									conn.db.collection('vacancy').update({_id: vacancy._id}, {$set:{ rate: rate }});
									
									DB.addComplex(conn, {col: 'vacancy', _id: vacancy._id}, [
										{col: 'story', _id: poll.__story.l[0]},
									], ()=>{});
									
									var money = ((adrs.population||0)*rate/10).toFixed(0)*1;
									conn.db.collection('adrs').update({_id: vacancy.__adrs.l[0]}, {
										$pull: {'__vacancy_free.l': vacancy._id},
										$push: {'__vacancy.l': vacancy._id},
										$inc: {
											'__vacancy_free.c': -1,
											'__vacancy.c': 1,
											'money': money,
										},
										$set: {
											'__vacancy.col': 'vacancy',
										}
									});
									
									if(adrs.__user && adrs.__user.l && adrs.__user.l.length){
										DB.saveField(conn, {name: 'money'}, {_id: adrs.__user.l[0], col: 'user'}, {value: money, $inc: true}, ()=>{});
									}
								}else{ callback({status: 'err', errMsg: 'Ошибка(9)'}) }
							}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(8)'}) }});
						}else{ callback({status: 'err', errMsg: 'Ошибка(7)'}) }
					}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(6)'}) }});
				}else{ callback({status: 'err', errMsg: 'Ошибка(5)'}) }
			}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(4)'}) }});
		}else{ callback({status: 'err', errMsg: 'Ошибка(3)'}) }
	}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(2)'}) }})
}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(1)'}) }}