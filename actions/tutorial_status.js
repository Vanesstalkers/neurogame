exports.f = function(conn, data, msg, callback){try{

	if(msg.tutorial && msg.step){
		
		if(!msg.data) msg.data = {};
		
		var lst = LST['tutorial_'+msg.tutorial];
		
		if(lst){
			
			var waterfall = [], nextStep = '', endTutorial;
			for(var i in lst.list.lst) if(lst.list.lst[i].v == msg.step && lst.list.lst[i*1+1]){
				nextStep = lst.list.lst[i*1+1].v;
			}
			
			var $set = {
				'tutorial.activeStep': nextStep,
			};

			if(!nextStep){
				endTutorial = true;
				$set['tutorial.active'] = '';
				$set['tutorial.links.'+msg.tutorial] = undefined;
			}
			
			switch(msg.tutorial){
				case 'hello':
					if(msg.data.endTutorial){
						endTutorial = true;
						$set['tutorial.active'] = '';
						$set['tutorial.activeStep'] = '';
						$set['tutorial.links'] = {};
					}
					break;
				case 'vote':
					switch(msg.step){
						case 'vote_rate':
							waterfall.push((cb)=>{
								conn.db.collection('user').findOne(ObjectId(conn.user.key), {fields: {__vote_tutorial: 1}}, (err, user)=>{
									ROUTER.route(conn, {
										action: 'finish_vote', 
										vote: user.__vote_tutorial.l[0],
									}, (data)=>{ cb() }, true);
								});
							});
							break;
					}
					break;
				case 'poll':
					if(msg.data.endTutorial){
						waterfall.push((cb)=>{
							conn.db.collection('user')
							.update({_id: ObjectId(conn.user.key)}, {$set: {__poll: {c: 0, l: []}}}, ()=>{
								ROUTER.route(conn, {action: 'find_poll'}, ()=>{ cb() });
							});
						});					
					}else{
						switch(msg.step){
							case 'poll_find_btn':
							case 'poll_answer_rate':
								waterfall.push((cb)=>{
									conn.db.collection('__tutorial').findOne(ObjectId(conn.user.config.tutorial), {fields: {__poll: 1}}, (err, tutorial)=>{
										var i = msg.step == 'poll_answer_rate' ? 1 : 0;
										DB.addComplex(conn, {col: 'poll', _id: tutorial.__poll.l[i], }, [
											{col: 'user', _id: conn.user.key, parentLink: false, sqlLink: true},
										], {}, ()=>{
											ROUTER.route(conn, {
												action: 'add_poll_rates', 
												pollId: tutorial.__poll.l[i],
												pollChildLink: false,
											}, (data)=>{ cb() }, true);
										});
									});
								});
								break;
							case 'poll_question_rate':
								if(conn.user.tutorialLastRate){
									waterfall.push((cb)=>{
										DB.addComplex(conn, {col: 'news'}, [
											{col: 'user', _id: conn.user.key},
											{col: 'rate', _id: conn.user.tutorialLastRate},
										], {
											type: 'stats',
											source: 'rate_question',
											stats: {
												ceo: 2,
												business: 2,
												politica: 2,
											},
											val: 6,
											spec: 'tmpStats tutorial',
										}, ()=>{
											DB.addComplex(conn, {col: 'news'}, [
												{col: 'user', _id: conn.user.key},
												{col: 'rate', _id: conn.user.tutorialLastRate},
											], {
												type: 'stats',
												source: 'rate_question',
												stats: {
													ceo: -1,
													business: 6,
													politica: 5,
												},
												val: 10,
												spec: 'tutorial',
											}, ()=>{ cb() });
										});
									});
								}
								break;
						}
					}
					break;
			}
			
			async.waterfall(waterfall, ()=>{
				conn.db.collection('user').update({_id: ObjectId(conn.user.key)}, {$set: $set}, ()=>{
					callback({status: 'ok', endTutorial: endTutorial});
				});
			});

		}else{ callback({status: 'err', errMsg: 'Ошибка(3)'}) }
	
	}else if(msg.link){
		
		var lst = LST['tutorial_'+msg.link];
		
		if(lst){
			
			var $set = {};
			$set['tutorial.active'] = msg.link;
			$set['tutorial.links.'+msg.link] = undefined;
				
			var waterfall = [];
			
			switch(msg.link){
				case 'poll':
					/*waterfall.push((cb)=>{
						conn.db.collection('__tutorial').findOne({_id: ObjectId(conn.user.config.tutorial)}, {fields: {__poll: 1}}, (err, tutorial)=>{
							DB.addComplex(conn, {col: 'poll', _id: tutorial.__poll.l[0], }, [
								{col: 'user', _id: conn.user.key, parentLink: false, sqlLink: true},
							], {}, ()=>{
								ROUTER.route(conn, {
									action: 'add_poll_rates', 
									pollId: tutorial.__poll.l[1],
									pollChildLink: false,
								}, (data)=>{ cb() }, true);
							});
						});
					});*/
					break;
			}
			
			async.waterfall(waterfall, ()=>{
				conn.db.collection('user').update({_id: ObjectId(conn.user.key)}, {$set: $set}, ()=>{
					callback({status: 'ok'});
				});
			});			
			
		}else{ callback({status: 'err', errMsg: 'Ошибка(4)'}) }
		
	}else{ callback({status: 'err', errMsg: 'Ошибка(2)'}) }
	
}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(1)'}); }}