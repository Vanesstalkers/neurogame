exports.system = true;

exports.f = function(conn, data, msg, callback){try{
	
	if(msg._poll && msg._rate && msg._rate.rate && msg._rate.__user){
	
		var poll = msg._poll;
		var rate = msg._rate;
		var userId = rate.__user.l[0];
		var questionStats = poll.questionStats;
		
		if(poll.dateto && poll.dateto == '-') rate.firstCalc = true;
		
		//console.log('poll', poll);
		//console.log('rate', rate);
		
		var waterfall = [];
		
		if(poll.__question_poll) waterfall.push((cb)=>{try{ // голосования по answer берут stats из question
			if(poll.__question_poll.l && poll.__question_poll.l.length){
				conn.db.collection('poll')
				.findOne({_id: poll.__question_poll.l[poll.__question_poll.l.length-1]}, {fields: {_stats: 1}}, (err, question_poll)=>{
					if(question_poll){
						questionStats = question_poll._stats;
						cb();
					}else{
						conn.db.collection('poll_del')
						.findOne({_id: poll.__question_poll.l[poll.__question_poll.l.length-1]}, {fields: {_stats: 1}}, (err, question_poll)=>{
							questionStats = question_poll ? question_poll._stats : {};
							cb();
						});
					}
				});
			}else{ cb() }
		}catch(e){ console.log(e); cb(); }});
		
		async.waterfall(waterfall, ()=>{try{
		
			if(poll._count == undefined) poll._count = 0;
			if(poll._sum == undefined) poll._sum = 0;
			if(poll._stats == undefined) poll._stats = {};
			
			var news = {stats: {}, statsSum: 0}, $inc = {}, $set = {
				_count: poll._count,
				_sum: poll._sum,
			};
			if(!rate.firstCalc){
				$set._count += 1;
				$set._sum += rate.rate;
			}
			
			var avRate = ($set._sum / $set._count).toFixed(1)*1;
			var diff = Math.abs(avRate - rate.rate);
			
			if(questionStats){

				for(var s in questionStats){
					if(questionStats[s].a >= 50){
						news.stats[s] = Math.ceil( (8 - 2*diff) * questionStats[s].a / 100 );
						news.statsSum += news.stats[s];
						if(rate.firstCalc){
							if(rate.firstCalc.stats) $inc['tmpStats.'+s] = -1*rate.firstCalc.stats[s];
							$inc['stats.'+s] = news.stats[s];
						}else{
							$inc['tmpStats.'+s] = news.stats[s];
						}
					}else{
						news.stats[s] = 0;
					}
				}
			}else{
				if(poll.type == 'story'){

					if(rate.firstCalc){
						
						$inc[poll.subtype == 'idea' ? 'power' : 'exp' ] = Math.ceil( (8 - 2*diff) );
					}
				}else{
					for(var s in rate.stats){
						
						if(poll._stats[s] == undefined) poll._stats[s] = {v:0, c:0, a:0}
						
						if(rate.stats[s].v != undefined){
							
							var set = {};
							set.v = poll._stats[s].v*1;
							set.c = poll._stats[s].c*1;
							set.a = set.v > 0 ? Math.floor( 100 * set.c / set.v ) : 0;
							
							if(!rate.firstCalc){
								set.v += 1;
								set.c += rate.stats[s].v ? 1 : 0;
								set.a = Math.floor( 100 * set.c / set.v );
								$set['_stats.'+s+'.v'] = set.v;
								$set['_stats.'+s+'.c'] = set.c;
								$set['_stats.'+s+'.a'] = set.a;
							}
							
							if(set.a >= 50/* || rate.stats[s].v == 0*/){
								news.stats[s] = Math.ceil( (8 - 2*diff) * set.a / 100 );
								if(!rate.stats[s].v) news.stats[s] = Math.ceil( -1 * (2 + diff) * set.a / 100);
								news.statsSum += news.stats[s];
								if(rate.firstCalc){
									if(rate.firstCalc.stats) $inc['tmpStats.'+s] = -1*rate.firstCalc.stats[s];
									$inc['stats.'+s] = news.stats[s];
								}else{
									$inc['tmpStats.'+s] = news.stats[s];
								}
							}else{
								news.stats[s] = 0;
							}
						}else{
							news.stats[s] = 0;
						}
					}
				}
			}
			
			var waterfall = [];

			if(!rate.firstCalc){ // это надо переделать для вопросов без firstCalc
				waterfall.push((cb)=>{
					conn.db.collection('poll').update({_id: poll._id}, {$set: $set}, ()=>{ cb() });
				});
			}
			
			//console.log("$inc", $inc);
			
			waterfall.push((cb)=>{

				if(Object.keys($inc).length > 0){
					
					conn.db.collection('user').update({_id: userId}, {$inc: $inc}, (err, res)=>{try{
						
						if(poll.type == 'story'){
							
							DB.addComplex(conn, {col: 'news'}, [
								{col: 'user', _id: userId},
								{col: 'story', _id: poll.__story.l[0]},
							], {
								type: $inc.power ? 'power' : 'exp',
								source: poll.subtype,
								val: $inc.power || $inc.exp,
							}, ()=>{ cb() });							
							
						}else{
							process.send({
								type: 'sub', action: 'saveField', _id: userId, val: $inc,
								key: {
									col: 'user',
									field: 'tmpStats',
									_id: userId, 
								},
							});
							if(rate.firstCalc){
								process.send({
									type: 'sub', action: 'saveField', _id: userId, val: $inc,
									key: {
										col: 'user',
										field: 'stats',
										_id: userId, 
									},
								});
								if(news.statsSum){
									DB.saveField(conn, {name: 'statscount', sub: true}, {_id: userId, col: 'user'}, {value: news.statsSum, $inc: true}, ()=>{});
								}
							}

							DB.addComplex(conn, {col: 'news'}, [
								{col: 'user', _id: userId},
								{col: 'rate', _id: rate._id},
							], {
								type: 'stats',
								source: 'rate_'+poll.type,
								stats: news.stats,
								spec: !rate.firstCalc ? "tmpStats" : undefined,
								val: news.statsSum,
							}, ()=>{ cb() });
						}
					}catch(e){ console.log(e); cb() }});
				}else{ cb() }
			});
			
			async.waterfall(waterfall, ()=>{try{
				
				var $setRateCalc = {firstCalc: news};
				if(rate.firstCalc) $setRateCalc = {lastCalc: news};
				
				conn.db.collection('rate')
				.update({_id: rate._id}, {$set: $setRateCalc}, (err, update)=>{ callback({status: 'ok'}) });
			
			}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка (4)'}) }});			
		}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка (3)'}) }});
	}else{ callback({status: 'err', errMsg: 'Ошибка (2)'}) }
}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка (1)'}) }}