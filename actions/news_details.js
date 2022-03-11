exports.f = function(conn, data, msg, callback){try{

	if(data.field.col == 'news'){
		
		conn.db.collection('news')
		.findOne({_id: ObjectId(data.field._id)}, {fields: {}}, (err, news)=>{try{

			var parallel = {};

			if(news.__vote) parallel.vote = (cb)=>{
				
				async.waterfall([(cb)=>{
					conn.db.collection('vote')
					.findOne({_id: news.__vote.l[0]}, {fields: {__adrs: 1}}, (err, vote)=>{try{
						if(vote){
							cb(null, {vote: vote});
						}else{
							conn.db.collection('vote_del')
							.findOne({_id: news.__vote.l[0]}, {fields: {__adrs: 1}}, (err, vote)=>{try{
								cb(null, {vote: vote});
							}catch(e){ cb(null, {vote: {}}) }});
						}
					}catch(e){ cb(null, {vote: {}}) }});
				}], (err, data)=>{
					if(data.vote){
						conn.db.collection('adrs')
						.findOne({_id: data.vote.__adrs.l[0]}, {fields: {state: 1, city: 1}}, (err, adrs)=>{try{
							adrs._id = undefined;
							cb(null, {adrs: adrs});
						}catch(e){ cb(null, {adrs: {}}) }});
					}else{
						cb(null, {adrs: {}});
					}
				});
			};
			if(news.__rate) parallel.rate = (cb)=>{
				
				var waterfall = [];
				
				waterfall.push((cb)=>{
					conn.db.collection('rate')
					.findOne({_id: news.__rate.l[0]}, {fields: {rate: 1, __poll: 1}}, (err, rate)=>{
						if(rate){
							cb(null, {rate: rate});
						}else{
							conn.db.collection('rate_del')
							.findOne({_id: news.__rate.l[0]}, {fields: {rate: 1, __poll: 1}}, (err, rate)=>{
								cb(null, {rate: rate});
							});
						}
					});
				});
				
				waterfall.push((res, cb)=>{
					
					conn.db.collection('poll')
					.findOne({_id: res.rate.__poll.l[0]}, {fields: {__answer: 1, __question: 1}}, (err, poll)=>{
						if(poll){
							res.poll = poll;
							cb(null, res);
						}else{
							conn.db.collection('poll_del')
							.findOne({_id: res.rate.__poll.l[0]}, {fields: {__answer: 1, __question: 1}}, (err, poll)=>{
								res.poll = poll;
								cb(null, res);
							});
						}
					});
				});
				
				async.waterfall(waterfall, (err, data)=>{
					
					if(data.poll.__answer){
						
						conn.db.collection('answer')
						.findOne({_id: data.poll.__answer.l[0]}, {fields: {text: 1}}, (err, answer)=>{try{
							cb(null, {rate: data.rate.rate, text: answer.text});
						}catch(e){ cb() }});
					
					}else if(data.poll.__question){
						
						conn.db.collection('question')
						.findOne({_id: data.poll.__question.l[0]}, {fields: {text: 1}}, (err, question)=>{try{
							cb(null, {rate: data.rate.rate, text: question.text});
						}catch(e){ cb() }});
					
					}else{ cb(null, {rate: data.rate.rate}) }
				});
			};
			
			async.parallel(parallel, (err, data)=>{try{
				
				data.val = news.val;
				data.type = news.type;
				data.source = news.source;
				data.spec = news.spec;
				data.stats = news.stats;
				data.text = '';
				data.title = '';
				
				switch(data.source){
					case 'rate_answer':
						data.title = CONFIG.labels.news.answer;
						data.text = data.rate.text || '';
						break;
					case 'rate_question':
						data.title = CONFIG.labels.news.question;
						data.text = data.rate.text || '';
						break;
					case 'vote_candidate':
						if(data.type == 'alias' || data.type == 'title'){
							data.title = data.val;
							data.text = CONFIG.labels.news[data.type];
						}else{
							data.title = data.spec && data.spec == 'win' ? CONFIG.labels.news.win : CONFIG.labels.news.vote;
							data.text = data.vote.adrs.state+(data.vote.adrs.state&&data.vote.adrs.city?', ':'')+data.vote.adrs.city;
						}
						break;
					case 'vote_expert':
						data.title = data.spec && data.spec == 'win' ? CONFIG.labels.news.win : CONFIG.labels.news.vote;
						data.text = data.vote.adrs.state+(data.vote.adrs.state&&data.vote.adrs.city?', ':'')+data.vote.adrs.city;
						break;
					case 'idea':
						data.text = CONFIG.labels.news.idea;
						break;
					case 'story':
						data.text = CONFIG.labels.news.story;
						break;
					case 'award':
						if(data.type == 'alias' || data.type == 'title'){
							data.title = data.val;
							data.text = CONFIG.labels.news.award;
						}
						data.text = CONFIG.labels.news.award;
						break;
				}
				
				callback({status: 'ok', news: data});
				
			}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(4)'}) }});
		}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(3)'}) }});
	}else{ callback({status: 'err', errMsg: 'Ошибка(2)'}) }
}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка(1)'}) }}