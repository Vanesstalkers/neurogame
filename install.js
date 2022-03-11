
ROUTER = require('./../../core/process.js');
require(PROJECT_LINK+'/custom.js');

function init(){
	
	console.log('START init');
	
	DB.getMongo((db) => {
		
		if(process.argv[3] && process.argv[3] == 'drop'){
			
			DB.getMysql((mysql) => {
				
				var drop = [];
				
				drop.push((cb)=>{ db.dropDatabase(()=>{ cb() }) });
				//drop.push((cb)=>{ mysql.query("DROP DATABASE IF EXISTS `"+PROJECT+"`; CREATE DATABASE IF NOT EXISTS `"+PROJECT+"`;", ()=>{ cb() }) });

				drop.push((cb)=>{ mysql.query("DROP TABLE IF EXISTS `user_links__pp`", ()=>{ cb() }) });
				drop.push((cb)=>{ mysql.query("DROP TABLE IF EXISTS `user__login`", ()=>{ cb() }) });
				drop.push((cb)=>{ mysql.query("DROP TABLE IF EXISTS `user__exp`", ()=>{ cb() }) });
				drop.push((cb)=>{ mysql.query("DROP TABLE IF EXISTS `user__power`", ()=>{ cb() }) });
				drop.push((cb)=>{ mysql.query("DROP TABLE IF EXISTS `user__money`", ()=>{ cb() }) });
				drop.push((cb)=>{ mysql.query("DROP TABLE IF EXISTS `user__statscount`", ()=>{ cb() }) });
				drop.push((cb)=>{ mysql.query("DROP TABLE IF EXISTS `poll_links__user`", ()=>{ cb() }) });
				drop.push((cb)=>{ mysql.query("DROP TABLE IF EXISTS `poll_links____game`", ()=>{ cb() }) });
				drop.push((cb)=>{ mysql.query("DROP TABLE IF EXISTS `poll_links____game_moderation`", ()=>{ cb() }) });
				drop.push((cb)=>{ mysql.query("DROP TABLE IF EXISTS `rate_links__user`", ()=>{ cb() }) });
				drop.push((cb)=>{ mysql.query("DROP TABLE IF EXISTS `rate_links__poll`", ()=>{ cb() }) });
				drop.push((cb)=>{ mysql.query("DROP TABLE IF EXISTS `adrs__city`", ()=>{ cb() }) });
				drop.push((cb)=>{ mysql.query("DROP TABLE IF EXISTS `adrs__state`", ()=>{ cb() }) });
				
				drop.push((cb)=>{ mysql.query("DROP TABLE IF EXISTS `top__user_exp`", ()=>{ cb() }) });
				drop.push((cb)=>{ mysql.query("DROP TABLE IF EXISTS `top__user_power`", ()=>{ cb() }) });
				drop.push((cb)=>{ mysql.query("DROP TABLE IF EXISTS `top__user_money`", ()=>{ cb() }) });
				drop.push((cb)=>{ mysql.query("DROP TABLE IF EXISTS `top__user_statscount`", ()=>{ cb() }) });
				
				drop.push((cb)=>{ mysql.query("DROP TABLE IF EXISTS `questions`", ()=>{ cb() }) });
				
				async.parallel(drop, (err, res)=>{
					db.close();
					mysql.destroy();
					console.log('END drop');
					process.argv[3] = undefined;
					init();
				});
			});
		}else if(process.argv[3] && process.argv[3] == 'osm'){
			var sqlOsm = fs.readFileSync(PROJECT_LINK+'/static/osm.sql').toString();
			DB.getMysql((mysql) => {
				mysql.query(sqlOsm, (err, res)=>{
					if(err) console.log('err', err);
					if(res){
						console.log(res)
						console.log('Есть популяция!')
					}
				});
			});
		}else{
		
			db.collection('__content').stats((err, contentStats)=>{
				
				if(contentStats && contentStats.count){

					var createColKeys = [];

					createColKeys.push((cb)=>{
						DB.getMysql((mysql) => {
							mysql.query("CREATE TABLE IF NOT EXISTS `questions` ( `id` varchar(24) NOT NULL, `p` varchar(24) NOT NULL DEFAULT '', KEY `id` (`id`), KEY `p` (`p`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;", ()=>{
								mysql.destroy();
								cb();
							});
						});
					});
					
					createColKeys.push((cb)=>{
						DB.createColKeys(false, {col: 'rate', fields: [], links: ['__user', '__poll'], force: true}, (msg)=>{ console.log(msg); cb(); });
					});
					
					createColKeys.push((cb)=>{
						DB.createColKeys(false, {col: 'poll', fields: [], links: ['__user', '____game', '____game_moderation'], force: true}, (msg)=>{ console.log(msg); cb(); });
					});
					
					createColKeys.push((cb)=>{
						DB.createColKeys(false, {col: 'adrs', fields: ['state', 'city'], links: [], force: true}, (msg)=>{ console.log(msg); cb(); });
					});
					
					createColKeys.push((cb)=>{
						DB.createColKeys(false, {col: 'user', fields: ['login', 'exp|int', 'power|int', 'money|int', 'statscount|int'], links: ['__pp'], force: true}, (msg)=>{ console.log(msg); cb(); });
					});
					
					createColKeys.push((cb)=>{ DB.prepareGlobalData(()=>{ cb() }) });
					
					async.waterfall(createColKeys, (err, res)=>{
						
						console.log('END createKeys');

						db.collection('__game').stats((err, gameStats)=>{
							if(gameStats && gameStats.count){
								console.log('END INSTALL');
								db.close();
								return;
							}else{
								
								var conn = {db: db};
								
								DB.getStaticMysql(conn, ['mysql', 'mysqlLogs'], ()=>{
								
									console.log('START createGame');
									createGame(conn, (game)=>{
									//db.collection('__game').insert({}, (err, game)=>{ game._id = game.insertedIds[0];
										console.log('END createGame');
										console.log('START createTutorial');
										
										conn.user = {config: {}};
										
										createTutorial(conn, game, ()=>{
										//db.collection('__tutorial').insert({}, (err, tutorial)=>{
											console.log('END createTutorial');
											
											db.collection('user').find({login: {$in: ['admin', 'test']}}, {}).toArray((err, users)=>{
												var parallel = [];
												if(users && users.length) users.forEach((user)=>{
													const u = user;
													parallel.push((cb)=>{ userPrepare(u, ()=>{ cb() }) });
												})
												async.parallel(parallel, ()=>{
													console.log('END INSTALL');
													db.close();
													DB.destroyStaticMysql(conn, ['mysql', 'mysqlLogs'], ()=>{});
												})
											});
										});
									});
								});
							}
						});
					});
				}else{
					
					var mongoInsert = [];
					
					mongoInsert.push((cb)=>{
						db.collection('__content').insert({}, ()=>{ cb() });
					});
					mongoInsert.push((cb)=>{
						DB.addComplex({db: db}, {col: 'pp'}, {_id: true}, (pp)=>{
							DB.addComplex({db: db}, {col: 'user'}, {_id: pp._id, col: 'pp'}, {
								login: 'admin', pswd: md5('admin'), access: { edit: true }, config:{},
							}, (user)=>{
								DB.addComplex({db: db}, {col: 'user_roles'}, [{_id: pp._id, col: 'pp'},{_id: user._id, col: 'user'}], {
									role: "admin",
								}, (role)=>{ cb() });
							});
						});
					});
					mongoInsert.push((cb)=>{
						DB.addComplex({db: db}, {col: 'pp'}, {_id: true}, {config:{}}, (pp)=>{
							DB.addComplex({db: db}, {col: 'user'}, {_id: pp._id, col: 'pp'}, {
								login: 'test', pswd: md5('test'), config:{},
							}, (user)=>{ cb() });
						});
					});
					
					async.parallel(mongoInsert, (err, res)=>{
						db.close();
						console.log('END createContent');
						init();
					});
				}
			});
		}
	});
}
exports.init = init;

function createTutorial(conn, game, callback){
	
	conn.db.collection('__tutorial').insert({}, (err, tutorial)=>{
		
		var __tutorial = tutorial.insertedIds[0];

		ROUTER.route(conn, {
			action: 'add_vote',
			adrs: {
				state: 'Москва',
				city: '',
				population: 12380664,
				osm_lonlat: [4183990.945016906, 7512994.5546288015],
			},
			position: 'и.о.Мэра',
			candidateNum: 3,
			expertNum: 3,			
		}, (vote)=>{
			
			var tutorial = {
				experts: {1:{
					tutorial: true,
				},2:{
					
				},3:{
					
				}},
				questions: {1:{
					text: '',
					expert: 1,
					tutorial: true,
					_stats: {
						ceo: {},
						economy: {},
						sociology: {},
						politica: {},
					},
				},2:{
					text: 'Как быстро очистить город от бомжей?',
					expert: 2,
					ready: 1,
					_count: 10,
					_sum: 80,
					_stats: {
						economy: {v:10, c:7, a:70},
						ceo: {v:10, c:8, a:80},
					},
				},3:{
					text: 'Как избавиться от династий "чиновников-родственников"?',
					expert: 3,
					ready: 1,
					_count: 10,
					_sum: 40,												
					_stats: {
						chro: {v:10, c:7, a:70},
						education: {v:10, c:6, a:60},
						politica: {v:10, c:5, a:50},
					},
				}},
				candidates: {1:{
					tutorial: true,
				},2:{
					
				},3:{

				}},
				answers: {'1_1':{
					text: '',
					question: 1,
					candidate: 1,
					tutorial: true,
				},'1_2':{
					text: 'Начальнику не обязательно это знать!',
					question: 1,
					candidate: 2,
					ready: 1,
				},'1_3':{
					text: 'Это сложный вопрос. Вероятно он имеет решение, но правильнее всего было бы дождаться, пока время все расставит на свои месте.',
					question: 1,
					candidate: 3,
					ready: 1,
				},'2_1':{
					text: 'Выселять их в города за полярный круг - либо начнут работать, либо замерзнут',
					question: 2,
					candidate: 1,
					ready: 1,
					_count: 10,
					_sum: 55,
				},'2_2':{
					text: 'Вывезти всех в колхозы/совхозы, пусть работают',
					question: 2,
					candidate: 2,
					ready: 1,
					_count: 10,
					_sum: 75,
				},'2_3':{
					text: 'Искать родственников, чтобы те их забрали домой',
					question: 2,
					candidate: 3,
					ready: 1,
					_count: 10,
					_sum: 35,
				},'3_1':{
					text: 'Ввести максимальную меру наказаний (смертная казнь) и круговую поруку для родственников',
					question: 3,
					candidate: 1,
					ready: 1,
					_count: 10,
					_sum: 50,
				},'3_2':{
					text: 'Никак, в этом нет ничего плохого. Разбираться нужно только в доказанных случаях правонарушений',
					question: 3,
					candidate: 2,
					ready: 1,
					_count: 10,
					_sum: 60,
				},'3_3':{
					text: 'Законодательно запретить ближайшим родственникам действующих чиновников работать в гос.структурах',
					question: 3,
					candidate: 3,
					ready: 1,
					_count: 10,
					_sum: 40,
				}},
				rates: {
					'1_1_1': {rate: false, tutorial: true}, 
					'1_2_1': {rate: 1, tutorialReady: true}, 
					'1_3_1': {rate: 1, tutorialReady: true},
					'2_1_1': {rate: 3, tutorialReady: true}, 
					'2_2_1': {rate: false, tutorial: true}, 
					'2_3_1': {rate: 4, tutorialReady: true},
					'3_1_1': {rate: 6, tutorialReady: true}, 
					'3_2_1': {rate: 5, tutorialReady: true}, 
					'3_3_1': {rate: false, tutorial: true},
					'1_1_2': {rate: 5}, '1_2_2': {rate: 2}, '1_3_2': {rate: 4},
					'2_1_2': {rate: 4}, '2_2_2': {rate: 6}, '2_3_2': {rate: 5},
					'3_1_2': {rate: 4}, '3_2_2': {rate: 7}, '3_3_2': {rate: 5},
					'1_1_3': {rate: 6}, '1_2_3': {rate: 1}, '1_3_3': {rate: 2},
					'2_1_3': {rate: 3}, '2_2_3': {rate: 7}, '2_3_3': {rate: 6},
					'3_1_3': {rate: 9}, '3_2_3': {rate: 3}, '3_3_3': {rate: 3},
				},
			}
			
			conn.db.collection('vote').findOne(vote._id, (err, vote)=>{
				
				var waterfall = [], parallel = [];
				
				vote.__question.l.forEach((question, i)=>{
					tutorial.questions[i+1]._id = question;
					tutorial.questions[question] = tutorial.questions[i+1];
					tutorial.questions[question].i = i+1;

					waterfall.push((cb)=>{
						var $set = {
							text: tutorial.questions[question].text,
							ready: tutorial.questions[question].ready,
							stats: {},
						}
						for(var s in tutorial.questions[question]._stats) $set.stats[s] = {};
						if(tutorial.questions[question].tutorial){
							$set.tutorial = true;
						}else{
							$set.__user = {l:[]};
						}
						
						
						conn.db.collection('question')
						.findAndModify({_id: question}, [], {$set: $set}, (err, q)=>{

							if(tutorial.questions[question]._count){
								
								DB.addComplex(conn, {
									col: 'poll',
								},[
									{col: '__game', _id: game._id, parentLink: false, sqlLink: true, childLink: '__poll'},
									{col: 'question', _id: question},
								], {
									type: 'question',
									text: $set.text,
									context: 'Выборы губернатора',
									dateto: '-',
									_count: tutorial.questions[question]._count || 0,
									_sum: tutorial.questions[question]._sum || 0,
									_stats: tutorial.questions[question]._stats || {},
									//tutorial: true,
								}, (poll)=>{
									
									tutorial.questions[question].pollId = poll._id;
									
									cb();
								});
							}else{ cb() }
						});
					});
				});
				vote.__candidate.l.forEach((candidate, i)=>{
					tutorial.candidates[i+1]._id = candidate;
					tutorial.candidates[candidate] = tutorial.candidates[i+1];
					tutorial.candidates[candidate].i = i+1;
				});
				
				waterfall.push((cb)=>{
					conn.db.collection('vote').update({_id: vote._id}, {$set: {tutorial : true}}, ()=>{ cb() });
				});
				
				waterfall.push((cb)=>{
					conn.db.collection('answer').find({_id: {$in: vote.__answer.l}}).toArray((err, answers)=>{
						answers.forEach((answer, i)=>{
							var q = answer.__question.l[0];
							var c = answer.__candidate.l[0];
							var q_code = tutorial.questions[q].i;
							var c_code = tutorial.candidates[c].i;
							var code = q_code+'_'+c_code;
							tutorial.answers[code]._id = answer._id;
							tutorial.answers[answer._id] = tutorial.answers[code];
							tutorial.answers[answer._id].i = code;
							
							parallel.push((cb)=>{
								var $set = {
									text: tutorial.answers[answer._id].text,
								}
								if(tutorial.answers[answer._id].ready){
									$set.ready = 1;
									$set.__user = {l:[]};
								}
								if(tutorial.answers[answer._id].tutorial) $set.tutorial = true;
								conn.db.collection('answer').update({_id: answer._id}, {$set: $set}, ()=>{
									
									if(tutorial.answers[answer._id]._count){
										
										DB.addComplex(conn, {
											col: 'poll', _id: answer.__poll.l[0]
										},[
											{col: '__game', _id: game._id, parentLink: false, sqlLink: true},
											{col: 'answer', _id: answer._id},
											{col: 'poll', link: '__question_poll', childLink: '__answer_poll', _id: tutorial.questions[q].pollId},
										],{
											type: 'answer',
											text: $set.text,
											context: tutorial.questions[q].text,
											dateto: '-',
											_count: tutorial.answers[answer._id]._count || 0,
											_sum: tutorial.answers[answer._id]._sum || 0,
											//tutorial: true,
										}, ()=>{ cb() });
									}else{ cb() }
								});
							});
						});
						
						cb();
					});
				});
				
				waterfall.push((cb)=>{
					conn.db.collection('expert').find({_id: {$in: vote.__expert.l}}).toArray((err, experts)=>{
						
						var rates_parallel = [];
						
						experts.forEach((expert, i)=>{
							var question = tutorial.questions[expert.__question.l[0]];
							parallel.push((cb)=>{
								var $set = {};
								if(tutorial.experts[question.expert].tutorial){
									$set.tutorial = true;
								}else{
									$set.__user = {l:[false]};
								}
								conn.db.collection('expert').update({_id: expert._id}, {$set: $set}, ()=>{ cb() });
							});
							rates_parallel.push((cb)=>{
								conn.db.collection('rate').find({_id: {$in: expert.__rate.l}}).toArray((err, rates)=>{
									rates.forEach((rate, i)=>{
										var answer = tutorial.answers[rate.__answer.l[0]];
										parallel.push((cb)=>{
											var r = tutorial.rates[answer.i+'_'+question.i];
											var $set = {
												tutorialReady: r.tutorialReady,
											};
											if(r.rate){
												$set.rate = r.rate;
												$set.__user = {l:[]};
											}
											if(r.tutorial) $set.tutorial = true;
											conn.db.collection('rate').update({_id: rate._id}, {$set: $set}, ()=>{ cb() });
										});
									});
									cb();
								});
							});
						});
						
						async.parallel(rates_parallel, (err, res)=>{ cb() });
					});
				});
				
				waterfall.push((cb)=>{
					conn.db.collection('candidate').find({_id: {$in: vote.__candidate.l}}).toArray((err, candidates)=>{
						candidates.forEach((candidate, i)=>{
							parallel.push((cb)=>{
								var $set = {};
								var answer = tutorial.answers[candidate.__answer.l[0]];
								if(tutorial.candidates[answer.candidate].tutorial){
									$set.tutorial = true;
								}else{
									$set.__user = {l:[false]};
								}
								conn.db.collection('candidate').update({_id: candidate._id}, {$set: $set}, ()=>{ cb() });
							});
						});
						cb();
					});
				});

				async.waterfall(waterfall, (err, res)=>{
					
					parallel.push((cb)=>{
						DB.addComplex(conn, {col: 'poll'},[
							{col: '__tutorial', _id: __tutorial},
						],{
							type: 'answer',
							text: '(Тестовый ответ) Тогда уж сразу на В.И.Ленина...',
							context: '(Тестовый вопрос) Заменить виртуального помощника на скрепку из MS Word 95?',
							dateto: '-',
							tutorial: true,
						},(poll)=>{
							
							DB.addComplex(conn, {col: 'poll'},[
								{col: '__tutorial', _id: __tutorial},
							],{
								type: 'question',
								text: '(Тестовый вопрос) Заменить виртуального помощника на скрепку из MS Word 95?',
								context: 'Обучение',
								dateto: '-',
								tutorial: true,
								_count: 0,
								_sum: 0,
								_stats: {
									ceo: {},
									economy: {},
									sociology: {},
									politica: {},
								},
							},(poll)=>{
								cb();
							});
						});
					});
					
					async.parallel(parallel, (err, res)=>{
						conn.db.collection('__tutorial').update({_id: __tutorial}, {$push: {vote: vote._id}}, ()=>{
							callback();
						});
					});
				});
			});
		}, true);
	});
}


function createGame(conn, callback){
	
	conn.db.collection('__game').insert({}, (err, game)=>{
		
		var gameId = game.insertedIds[0];
		conn.user = {config: {game: gameId}};
		
		var parallel = [(cb)=>{
			ROUTER.route(conn, {
				action: 'add_vote',
				adrs: {
					state: 'Российская Федерация',
					city: '',
					population: 146804372,
					osm_lonlat: [4187338.546509096, 7508849.729081272],
				},
				type: 'super',
				tutorialLink: 'vote_president',
				position: 'Президент',
				candidateNum: 10,
				expertNum: 10,
				end_time: new Date('2024-03-17').getTime(),
			}, ()=>{ cb() }, true);
		},(cb)=>{
			ROUTER.route(conn, {
				action: 'add_vote',
				adrs: {
					state: 'Российская Федерация',
					city: 'Государственная Дума',
					population: 146804372,
					osm_lonlat: [4187334.9548738147, 7510427.234249047],
				},
				type: 'super',
				tutorialLink: 'vote_deputat',
				position: 'Депутат',
				candidateNum: 1,
				expertNum: 20,
				end_time: new Date('2021-09-19').getTime(),
			}, ()=>{ cb() }, true);
		},(cb)=>{
			ROUTER.route(conn, {
				action: 'add_vote',
				adrs: {
					state: 'Российская Федерация',
					city: 'Совет Федерации',
					population: 146804372,
					osm_lonlat: [4186999.6379638743, 7511686.4936528895],
				},
				type: 'super',
				tutorialLink: 'vote_senator',
				position: 'Сенатор',
				candidateNum: 1,
				expertNum: 20,
				end_time: new Date('2018-09-01').getTime(),
			}, ()=>{ cb() }, true);
		},(cb)=>{
			ROUTER.route(conn, {
				action: 'add_vote',
				adrs: {
					state: 'Российская Федерация',
					city: 'Правительство',
					population: 146804372,
					osm_lonlat: [4182605.1060017603, 7509800.6488456605],
				},
				type: 'super',
				tutorialLink: 'vote_predprav',
				position: 'Председатель правительства',
				candidateNum: 10,
				expertNum: 10,
				end_time: new Date('2018-05-01').getTime(),
			}, ()=>{ cb() }, true);
		}];
		
		async.parallel(parallel, (err, res)=>{
			callback({_id: gameId});
		});		
	});
}