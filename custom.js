/* project local script (e.c. cron-script) */

CONFIG.userExpertLimit = 3; // максимальное количество участий в качестве эксперта
CONFIG.userCandidateLimit = 1; // максимальное количество участий в качестве кандидата

CONFIG.voteEndTime = 4*60*60000; // время выборов
CONFIG.revoteTime = 7*24*60*60000; // время до перевыборов после победы
CONFIG.voteBaseСandidateNum = 3; // базовое количество кандидатов на выборох
CONFIG.voteBaseExpertNum = 3; // базовое количество экспертов на выборох
CONFIG.voteBaseQuestionNum = 1; // базовое количество вопросов эксперта на выборох
CONFIG.voteBaseQuestionStatsNum = 4; // базовое количество предложенных тем вопроса на выборах
CONFIG.questionMinStatsCount = 2; // минимальное количество обязательных тем в вопросе
CONFIG.questionFreeStatsNum = 4; // базовое количество предложенных тем свободного вопроса
CONFIG.questionFreeMinStatsCount = 2; // минимальное количество обязательных тем в свободном вопросе
CONFIG.questionSelfRate = 10; // базовая оценка вопроса (оценка экспертом самого себя)
CONFIG.answerSelfRate = 10; // базовая оценка ответа (оценка кандидатом самого себя)
CONFIG.storySelfRate = 10; // базовая оценка истории (оценка автором самого себя)

CONFIG.pollQuestionReadyTime = 10*60000; // максимальное время на отправку вопроса экспертом
if(CONFIG.voteEndTime <= CONFIG.pollQuestionReadyTime)
	console.log('ERROR :: CONFIG.voteEndTime <= CONFIG.pollQuestionReadyTime');

CONFIG.moderationVoteQuestionTime = 0//1*60*60000; // максимальное время нахождения вопроса эксперта на модерации
CONFIG.moderationVoteQuestionCount = 1; // количество попыток эксперта на прохождения модерации вопроса
CONFIG.moderationVoteQuestionRateCount = 0//3; // достаточное количество оценок для модерации вопроса эксперта
CONFIG.moderationVoteQuestionRateValue = -1//3; // минимальная средняя оценка для прохождения модерации вопроса эксперта (без учета своей)
CONFIG.moderationVoteAnswerRateValue = 3; // минимальная средняя оценка ответа кандидата для вынесения ответа на голосование

CONFIG.pollQuestionTime = 30*24*60*60000; // длительность голосования для вопросов (начнется с момента сохранения)
if(CONFIG.pollQuestionTime <= CONFIG.moderationVoteQuestionTime)
	console.log('ERROR :: CONFIG.pollQuestionTime < CONFIG.moderationVoteQuestionTime');
CONFIG.pollAnswerTime = 5*24*60*60000; // длительность голосования для ответов (начнется с момента окончания выборов)
CONFIG.pollStoryTime = 24*60*60000; // длительность голосования для историй
CONFIG.pollStoryLimitTime = 1*60*60000; // временное ограничение на созание новых историй

CONFIG.voteEndTimeCronDelay = 30000; // проверка окончания времени выборов
CONFIG.pollCheckCronDelay = 30000; // проверка окончания времени голосований
CONFIG.questionWaitForCheckCronDelay = 30000; // проверка наличия вопроса, заданного экспертом в установленное время
CONFIG.vacancyCheckCronDelay = 30000; // проверка окончания опросов для вакансий
CONFIG.waitForModerationCronDelay = 30000; // проверка окончания времени модерации

CONFIG.updateTopCronDelay = 10*60000; // новые слепки таблиц лидеров

CONFIG.labels = {
	title: 'Гражданин',
	position: 'Должность',
	city: 'Город',
	state: 'Область',
	population: 'Население',
	titles: 'Титулы',
	alias: 'Имения',
	exp: 'Опыт',
	power: 'Влияние',
	money: 'Популярность',
	vacancy: {
		head: 'Глава администрации',
		second: 'Зам.главы администрации',
	},
	answer: 'Ответ\x0aкандидата',
	answer_view: 'Эксперт должен задать вопрос, прежде чем увидит ответы кандидатов',
	question: 'Вопрос\x0aэксперта',
	question_view: 'Эксперт должен задать свой вопрос, прежде чем увидит чужие',
	question_empty: 'Вопрос еще не задан',
	question_on_modetaion: 'Вопрос\xa0на\x0aмодерации',
	question_send_to_modetaion: 'Вопрос отправлен на модерацию',
	question_bad_modetaion: 'Предыдущий вопрос не прошел модерацию',
	free_question: 'Свободный вопрос',
	story: {
		story: 'История из жизни',
		idea: 'Перспективная идея',
		storyMember: 'Этот персонаж - консерватор, опытный и всезнающий гуру-наставник.',
		ideaMember: 'Этот персонаж - технократ, перспективный и талантливый изобретатель или ученый.',
	},
	news: {
		award: 'Бонус за ежедневное задание',
		story: 'Бонус\x0aза\xa0оценку истории\xa0из\xa0жизни',
		idea: 'Бонус\x0aза\xa0оценку перспективной\xa0идеи',
		answer: 'Бонусы за\xa0оценку ответа на\xa0вопрос',
		question: 'Бонусы за\xa0оценку вопроса',
		alias: 'Новое имение',
		title: 'Новый титул',
		vote: 'Награда за\xa0участие в\xa0выборах',
		win: 'Награда за\xa0победу на\xa0выборах',
	},
}
CONFIG.msg = {
	limit: {
		all: 'Достигнуто\xa0ограничение\xa0на\xa0количество одновременно\xa0активных\xa0выборов',
		expert: 'Нельзя\xa0в\xa0качестве\xa0эксперта участвовать\xa0одновременно более\xa0чем\xa0в\xa0трех\xa0выборах',
		candidate: 'Нельзя\xa0в\xa0качестве\xa0кандидата участвовать\xa0одновременно более\xa0чем\xa0в\xa0одних\xa0выборах',
	},
	vote: {
		revote: 'Перевыборы\xa0пройдут не\xa0раньше\xa0чем',
		empty: 'Подходящих\xa0выборов\xa0не\xa0найдено',
		ready: 'Подходящие\xa0выборы\xa0найдены',
		occupy: 'Все\xa0выборы\xa0заполнены\xa0участниками',
		own: 'Ты\xa0уже\xa0участвуешь в\xa0этом\xa0конкурсе',
		noexpert: 'Все\xa0позиции\xa0экспертов в\xa0конкурсе\xa0уже\xa0заняты',
		nolink: 'Этот\xa0вопрос не\xa0связан с\xa0экспертом',
		newAnswer: 'Добавлен новый ответ кандидата',
		newAnswerReady: 'Ответ сохранен',
		newQuestion: 'Добавлен новый вопрос эксперта',
		questionModerationRefused: 'Вопрос не прошел модерацию',
	},
	poll: {
		addnew: 'Добавлен новый опрос',
		finished: 'Опрос уже завершен',
		hasrate: 'Оценка уже выставлена',
	},
	length: {
		themes: 'Нe\xa0указано\xa0необходимое\x0aколичество\xa0обязательных\xa0тем',
		answerMin: 'В\xa0тексте\xa0ответа\xa0должно\xa0быть\x0aкак\xa0минимум\xa020\xa0символов',
		answerMax: 'В\xa0тексте\xa0ответа\xa0не\xa0должно\xa0быть\x0aбольше\xa0140\xa0символов',
		questionMin: 'В\xa0тексте\xa0вопроса\xa0должно\xa0быть\x0aкак\xa0минимум\xa020\xa0символов',
		questionMax: 'В\xa0тексте\xa0вопроса\xa0не\xa0должно\xa0быть\x0aбольше\xa0140\xa0символов',
	}
}
CONFIG.notify = {
	title: 'Выборы-выборы',
}

userPrepare = function(user, callback){

	DB.getMongo((db) => {
		db.collection('__game').find({}, {fields: {_id : 1}}).limit(1).toArray((err, game)=>{
			if(!game) game = {};
			db.collection('__tutorial').find({}, {fields: {_id : 1}}).limit(1).toArray((err, tutorial)=>{
				if(!tutorial) tutorial = {};	
				DB.getMysql((mysql) => {try{
					
					var baseAlias = {}, ids = [];
					ids[0] = 0 + Math.floor(Math.random()*5000);
					ids[1] = 5000 + Math.floor(Math.random()*5000);
					ids[2] = 10000 + Math.floor(Math.random()*5000);
					ids[3] = 15000 + Math.floor(Math.random()*5000);
					ids[4] = 20000 + Math.floor(Math.random()*4000);
					
					mysql.query('SELECT `shortTitle` FROM `osm` WHERE `id` IN (?,?,?,?,?)', ids, (err, res)=>{try{
						
						if(res && res.length) res.forEach((r)=>{ baseAlias[r.shortTitle] = 1 });

						db.collection('user').update({_id: user._id}, {$set: {
							'config.game': game && game[0] ? game[0]._id : '',
							'config.tutorial': tutorial && tutorial[0] ? tutorial[0]._id : '',
							'tutorial.active': 'hello',
							'tutorial.links': {
								vote: '#guiEvents', poll: '#guiPoll', stats: '#guiStats',
								free_question: '', story: '', idea: '',
							},
							exp: 0,
							power: 0,
							money: 0,
							stats: {},
							statscount: 0,
							title: CONFIG.labels.title,
							titles: [],
							alias: baseAlias,
						}}, (err, update)=>{
							if(!user.config) user.config = {};
							user.config.game = game && game[0] ? game[0]._id : '';
							user.config.tutorial = tutorial && tutorial[0] ? tutorial[0]._id : '';
							callback(user);
						});
					}catch(e){ console.log(e); callback() }});
				}catch(e){ console.log(e); callback() }});
			});
		});
	});
}

cronGlobal = function(){
	
	function deletePoll(db, poll, field, parents){

		var conn = {db: db};		
		
		DB.deleteComplex(conn, field, parents, ()=>{
			if(poll.__rate){ // должно обнулить индексовые таблицы
				var parallel = [];
				poll.__rate.l.forEach((r)=>{
					const rr = r;
					parallel.push((cb)=>{
						DB.deleteComplex(conn, {col: 'rate', _id: rr}, [], ()=>{ cb() });
					});
				});
				DB.getStaticMysql(conn, ['mysql', 'mysqlLogs'], ()=>{
					async.parallel(parallel, ()=>{						
						DB.destroyStaticMysql(conn, ['mysql', 'mysqlLogs'], ()=>{});
					});
				});
			}	
		});
	}

	cronProcess(()=>{

		DB.getMongo((db) => {
			
			var fields = {__poll : 1}, today = moment().format('DDMMYY'), now = Date.now();
			fields['best.'+today] = 1;
			
			db.collection('__game').findOne({}, {fields: fields}, (err, game)=>{
				
				if(game.__poll){
					
					var pollIds = game.__poll.l;
					
					db.collection('poll')
					.find({_id: {$in: pollIds}}, {fields: {type: 1, subtype: 1, dateto : 1, _count: 1, _sum: 1, _stats: 1, __rate: 1, __answer: 1, __question: 1, __question_poll: 1, __story: 1, __vacancy: 1}}).toArray((err, polls)=>{
						
						polls.forEach((poll)=>{
							
							if(poll.dateto < now + CONFIG.pollCheckCronDelay && poll.dateto != '-'){
								
								if(poll.__rate){
									
									db.collection('rate')
									.find({_id: {$in: poll.__rate.l}}, {fields: {__user : 1, rate: 1, stats: 1, firstCalc: 1, myself: 1}}).toArray((err, rates)=>{
										
										var parallel = [];
										
										rates.forEach((r)=>{
											const rr = r;
											if(rr.rate){
												parallel.push((cb)=>{
													ROUTER.route({db: db}, {
														action: 'calc_poll', 
														_poll: poll,
														_rate: rr,
													}, (data)=>{ cb() }, true);
												});
											}
										});
										
										async.parallel(parallel, ()=>{try{

											deletePoll(db, poll, {
												col: 'poll',
												_id: poll._id,
											}, [{_id: game._id, col: '__game'}]);
											var type = poll.subtype || poll.type;
											
											if(!game.best) game.best = {};
											if(!game.best[today]) game.best[today] = {};
											if(!game.best[today][type]) game.best[today][type] = {rate: 0};
											var best = game.best[today][type];
											
											if(poll._count > 1 && best.rate < (poll._sum / poll._count)){
												var $set = {};
												$set['best.'+today+'.'+type] = {
													rate: poll._sum / poll._count,
													id: poll._id,
												}
												db.collection('__game').update({_id: game._id}, {$set: $set});
											}
											
											if(poll.__answer && poll.__answer.l && poll.__answer.l[0]){
												db.collection('answer').findOne(poll.__answer.l[0], {__candidate: 1}, (err, answer)=>{
													if(answer.__candidate && answer.__candidate.l && answer.__candidate.l[0]){
														db.collection('candidate').findOne(answer.__candidate.l[0], {__vacancy: 1}, (err, candidate)=>{
															if(candidate.__vacancy && candidate.__vacancy.l && candidate.__vacancy.l[0]){
																
																db.collection('vacancy')
																.update({_id: candidate.__vacancy.l[0]}, {
																	$inc: {
																		'rate.count': 1, 
																		'rate.sum': poll._count?poll._sum/poll._count:1, pollsReady: 1
																	},
																});
															}														
														});
													}
												});
											}
											
											if(poll.type == 'story') ROUTER.route({db: db}, {action: 'vacancy_select', poll: poll._id}, ()=>{}, true);
											
										}catch(e){ console.log(e) } });
									});
								}else{
									deletePoll(db, poll, {
										col: 'poll',
										_id: poll._id,
									}, [{_id: game._id, col: '__game'}]);
								}
							}
						});
					});
				}
			});
		});
	}, {}, CONFIG.pollCheckCronDelay);
	
	cronProcess(()=>{

		DB.getMongo((db) => {
			
			db.collection('__game').findOne({}, {fields: {__moderation: 1}}, (err, game)=>{
				
				if(game.__moderation && game.__moderation.l && game.__moderation.l.length > 0){
					
					var pollIds = game.__moderation.l;
					
					db.collection('poll')
					.find({_id: {$in: pollIds}}, {
						type: 1, dateto : 1, 
						waitForModeration: 1, rateCountForModeration: 1, rateValueForModeration: 1,
						_count: 1, _sum: 1, _stats: 1, 
						__rate: 1, __question: 1, __question_poll: 1
					}).toArray((err, polls)=>{
						
						var now = Date.now();
						
						polls.forEach((poll)=>{
							
							// достаточно ответов для модерации или время
							if(
								poll._count >= poll.rateCountForModeration || 
								poll.waitForModeration < now + CONFIG.waitForModerationCronDelay
							){
								
								db.collection(poll.type)
								.findOne(poll['__'+poll.type].l[0], {fields: {__vote: 1, __expert: 1, __user: 1, moderationCount: 1, free: 1}}, (err, obj)=>{
									
									var update = {$set: {waitForModeration: false}};

									// poll._count == 0 только для того, чтобы в следующем условии не было деления на ноль
									if(poll._count == 0 || (poll._sum / poll._count).toFixed(1)*1 > poll.rateValueForModeration){
										
										update.$set.ready = true;
										update.$set.wait_for_time = undefined;
										
										DB.deleteComplex({db: db}, {
											_id: poll._id, col: 'poll', deleteLinks: true,
											links: {
												poll: {__game_moderation: false},
												__game_moderation: '__moderation',
											}
										}, {
											_id: game._id, col: '__game', sfx: '_moderation',
										}, ()=>{
											
											DB.addComplex({db: db}, {
												_id: poll._id, col: 'poll',
											}, {
												_id: game._id, col: '__game', parentLink: false, sqlLink: true, childLink: '__poll',
											}, {waitForModeration: false}, ()=>{
										
											//db.collection('poll')
											//.update({_id: poll._id}, {$set: {waitForModeration: false}}, ()=>{
												
												var parallel = [], subList = [];
											
												// базовый бонус эксперту за вопрос
												parallel.push((cb)=>{
													db.collection('rate').findOne(poll.__rate.l[0], {fields: {__user: 1, rate: 1, stats: 1, }}, (err, rate)=>{
														ROUTER.route({db: db}, {action: 'calc_poll', _poll: poll, _rate: rate}, ()=>{ cb() }, true);
													});
												});
												
												if(obj.free){ // free question
													parallel.push((cb)=>{
														DB.getMysql((mysql)=>{
															mysql.query("INSERT INTO `questions` (`id`, `p`) VALUES (?, ?)", [obj._id+'', obj.__user.l[0]+''], (err)=>{
																if(err) console.log(err);
																mysql.destroy();
																cb();
															});
														});
													});
													
													// !!! сейчас не учитывается, что два вопроса могут одновременно пройти модерацию, т.е. в award учтется только один (второй перезатрет первый)
													
													parallel.push((cb)=>{
														db.collection('user').findOne(obj.__user.l[0], {'award.list': 1}, (err, user)=>{try{
															if(user && user.award && user.award.list){
																var ready = true;
																var award = user.award.list.map((a)=>{
																	if(!a.ready && ready){
																		a.ready = true;
																		ready = false;
																	}
																});
																if(ready === false){
																	db.collection('user').update({_id: user._id}, {$set: {'award.list': user.award.list}}, ()=>{ cb() });
																}else{ cb() }
															}else{ cb() }
														}catch(e){ console.log(e); cb() }});
													});
												}else{
													parallel.push((cb)=>{try{
													
														db.collection('vote')
														.findOne(obj.__vote.l[0], {fields: {__user_candidate: 1, __user_expert: 1}}, (err, vote)=>{
																												
															var waterfall = [], subList = [];
															
															if(vote.__user_candidate) subList = subList.concat(vote.__user_candidate.l);
															//if(vote.__user_expert) subList = subList.concat(vote.__user_expert.l);
															
															subList.forEach((user)=>{
																waterfall.push((cb)=>{
																	DB.saveField({db: db}, {
																		name: 'update_time.'+user, sub: true,
																		notify: {
																			title: CONFIG.notify.title,
																			body: CONFIG.msg.vote.newQuestion
																		},
																	}, {
																		_id: obj.__vote.l[0], col: 'vote',
																	}, {
																		value: {t: Date.now(), i: CONFIG.msg.vote.newQuestion}
																	}, ()=>{ cb() });
																});
															});
			
															async.waterfall(waterfall, ()=>{ cb() });
														});
													}catch(e){ console.log(e); cb() }});
												}
												
												async.parallel(parallel, ()=>{});
											});
										});
									}else{
										
										if(poll.__question){
										
											// в любом случае удаляем голосование, новый вопрос - новое голосование
											deletePoll(db, poll, {
												col: 'poll',
												_id: poll._id,
												links: {
													poll: {__game: false, question: false},
													__game: '__moderation',
													question: '__poll',
												}
											}, [
												{_id: game._id, col: '__game'},
												{_id: obj._id, col: 'question'},
											]);
											
											if(!obj.free){

												if(obj.moderationCount > CONFIG.moderationVoteQuestionCount - 1){ 
												// тут удаление эксперта

													update.$set.text = '';
													update.$set.moderationCount = 0;
													
													ROUTER.route({db: db}, {
														action: 'delete_vote_expert', 
														question: obj,
													}, ()=>{}, true);
												
												}else{ // повторный шанс
													
													update.$set.waitForModeration = false;
													update.$inc = {moderationCount: 1};

													DB.saveField({db: db}, {
														name: 'update_time.'+obj.__user.l[0], sub: true,
														notify: {
															title: CONFIG.notify.title,
															body: CONFIG.msg.vote.questionModerationRefused
														},
													}, {
														_id: obj.__vote.l[0], col: 'vote',
													}, {
														value: {t: Date.now(), i: CONFIG.msg.vote.questionModerationRefused}
													}, ()=>{ });
												}
											}
										}
									}
									
									db.collection(poll.type)
									.update({_id: obj._id}, update, (err, update)=>{});
								});
							}
						});
					});
				}
			});
		});
	}, {}, CONFIG.waitForModerationCronDelay);	
	
	cronProcess(()=>{

		DB.getMongo((db)=>{
			var now = Date.now();
			db.collection('__game').findOne({}, {fields: {__wait_for_question: 1}}, (err, game)=>{
				if(game.__wait_for_question && game.__wait_for_question.length){
					db.collection('question').find({_id: {$in: game.__wait_for_question}}, {fields: {wait_for_time: 1, __vote: 1, __expert: 1, __user: 1}}).toArray((err, questions)=>{
						if(questions && questions.length){
							questions.forEach((q)=>{
								if(q.wait_for_time < now){
									ROUTER.route({db: db}, {
										action: 'delete_vote_expert', 
										question: q,
									}, ()=>{
										db.collection('__game').update({_id: game._id}, {$pull: {'__wait_for_question': q._id}});
									}, true);
								}
							});
						}
					});
				}
			});
		});
	}, {}, CONFIG.questionWaitForCheckCronDelay);
	
	cronProcess(()=>{
		DB.getMongo((db)=>{
			var now = Date.now();
			db.collection('__game').findOne({}, {fields: {__vote: 1}}, (err, game)=>{
				if(game.__vote && game.__vote.l.length){
					db.collection('vote').find({_id: {$in: game.__vote.l}}, {fields: {finished: 1, end_time: 1, __rate: 1, ratesReady: 1}}).toArray((err, votes)=>{try{
						if(votes && votes.length){
							votes.forEach((v)=>{
								if((v.end_time < now || (v.__rate && v.__rate.l.length <= v.ratesReady)) && !v.finished){
									
									var conn = {db: db};
									
									DB.getStaticMysql(conn, ['mysql', 'mysqlLogs'], ()=>{
										ROUTER.route(conn, {
											action: 'finish_vote', 
											vote: v._id,
										}, (data)=>{
											DB.destroyStaticMysql(conn, ['mysql', 'mysqlLogs'], ()=>{});
										}, true);
									});
								}
							});
						}
					}catch(e){ console.log(e) }});
				}
			});
		});
	}, {}, CONFIG.voteEndTimeCronDelay);

	cronProcess(()=>{
		DB.getMongo((db)=>{
			db.collection('__game').findOne({}, {fields: {__vacancy: 1}}, (err, game)=>{
				if(game && game.__vacancy && game.__vacancy.l && game.__vacancy.l.length){					
					db.collection('vacancy')
					.find({_id: {$in: game.__vacancy.l}}, {__candidate: 1, polls: 1, pollsReady: 1, __adrs: 1, __user: 1, rate: 1}).toArray((err, vacancy)=>{
						if(vacancy && vacancy.length){
							vacancy.forEach((v)=>{
								
								var deleteVacancy = false;
								
								if(v.__candidate && v.__candidate.l && v.__candidate.l.length){
									
									if(v.polls*1 <= v.pollsReady*1){
										
										deleteVacancy = true;
										
										var rate = v.rate && v.rate.count ? (v.rate.sum / v.rate.count).toFixed(1) : 0;
										
										db.collection('adrs')
										.findOne(v.__adrs.l[0], {population: 1, money: 1}, (err, adrs)=>{try{

											if(!adrs.money) adrs.money = 0;
											adrs.money += ((adrs.population||0)*rate/10).toFixed(0)*1;
												
											db.collection('adrs').update({_id: adrs._id}, {$set: {money: adrs.money}});
												
											DB.saveField({db: db}, {name: 'money'}, {_id: v.__user.l[0], col: 'user'}, {value: adrs.money, $inc: true}, ()=>{});
										
											db.collection('vacancy').update({_id: v._id}, {$set: {'rate.value': rate}, $unset: {polls: "", pollsReady: ""}});
											
										}catch(e){ console.log(e) }});								
									}
								}else{
									deleteVacancy = true;
								}
								
								if(deleteVacancy){
									DB.deleteComplex({db: db}, {
										_id: v._id, col: 'vacancy', deleteLinks: true, childLink: false,
									}, {
										_id: game._id, col: '__game',
									}, ()=>{});
								}
							});
						}
					});
				}
			});
		});
	}, {}, CONFIG.vacancyCheckCronDelay);
	
	cronProcess(()=>{
		DB.getMysql((mysql)=>{
			
			var sql = '';
			
			sql += "DROP TABLE IF EXISTS `top__user_exp`; CREATE TABLE IF NOT EXISTS `top__user_exp` (`id` int(11) NOT NULL AUTO_INCREMENT, `_id` varchar(24) NOT NULL, `val` int(10) DEFAULT '0', PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8; ";
			sql += "INSERT INTO `top__user_exp` (`_id`, `val`) SELECT id, f FROM `user__exp` ORDER BY f DESC LIMIT 0, 20; ";
			
			sql += "DROP TABLE IF EXISTS `top__user_power`; CREATE TABLE IF NOT EXISTS `top__user_power` (`id` int(11) NOT NULL AUTO_INCREMENT, `_id` varchar(24) NOT NULL, `val` int(10) DEFAULT '0', PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8; ";
			sql += "INSERT INTO `top__user_power` (`_id`, `val`) SELECT id, f FROM `user__power` ORDER BY f DESC LIMIT 0, 20; ";
			
			sql += "DROP TABLE IF EXISTS `top__user_money`; CREATE TABLE IF NOT EXISTS `top__user_money` (`id` int(11) NOT NULL AUTO_INCREMENT, `_id` varchar(24) NOT NULL, `val` int(10) DEFAULT '0', PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8; ";
			sql += "INSERT INTO `top__user_money` (`_id`, `val`) SELECT id, f FROM `user__money` ORDER BY f DESC LIMIT 0, 20; ";
			
			sql += "DROP TABLE IF EXISTS `top__user_statscount`; CREATE TABLE IF NOT EXISTS `top__user_statscount` (`id` int(11) NOT NULL AUTO_INCREMENT, `_id` varchar(24) NOT NULL, `val` int(10) DEFAULT '0', PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8; ";
			sql += "INSERT INTO `top__user_statscount` (`_id`, `val`) SELECT id, f FROM `user__statscount` ORDER BY f DESC LIMIT 0, 20; ";
			
			mysql.query(sql, (err, rows, fields)=>{
				if(err) console.log(err);
							
				DB.getMongo((db) => {
					db.collection('__game').update({}, {$set:{nextTopUpdate: Date.now() + CONFIG.updateTopCronDelay}});
				});
				
				mysql.destroy();
			});
		});
	}, {nullFirstDelay: true}, CONFIG.updateTopCronDelay);
}