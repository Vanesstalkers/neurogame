exports.fields = {".":{"_id":1,"__formMain.l":1,"map.zoom":1,"__win_adrs.l":1,"__custom_adrs.l":1,"title":1,"togglePoll":1,"statscount":1,"stats":1,"tmpStats":1,"__news.l":{"$slice":[-9,9]},"search_vote":1,"__vote_candidate.l":1,"__vote_expert.l":1,"find_poll":1,"toggle_best":1,"__poll.myRate":1,"__poll.l":1},".__adrs":{"revote":1,"_id":1,"__vote.l":1,"population":1,"money":1,"__vacancy_head.l":1,"__vacancy.l":1,"city":1,"state":1},".__adrs__vote":{"type":1,"__user_candidate":1,"__user_expert":1,"position":1},".__adrs__vacancy":{"rate.value":1,"title":1,"_id":1,"__user.l":1},".__adrs__vacancy__user":{"title":1},".__game_map":{"_id":1,"__vote_super.l":1,"__vote.l":1},".__game_map__vote_super":{"_id":1,"__adrs.l":1},".__game_map__vote_super__adrs":{"state":1,"city":1,"osm_lonlat":1},".__game_map__vote":{"_id":1,"__adrs.l":1},".__game_map__vote__adrs":{"state":1,"city":1,"osm_lonlat":1},".__myAdrs":{"state":1,"city":1,"osm_lonlat":1},".__news":{"type":1,"spec":1,"val":1},".__vote":{"__user_candidate":1,"__user_expert":1,"update_time":1},".__poll":{"type":1,"tutorial":1,"waitForModeration":1,"dateto":1,"context":1,"text":1,"_id":1,"__rate.l":{"$slice":[0,1]}},".__poll__rate":{"rate":1,"stats":1,"save_rate":1,"_id":1,"__user.l":1},".__poll__rate__user":{"_id":1,"__win_adrs.l":1},".__poll__rate__user__adrs":{"osm_lonlat":1,"show_adrs":1,"title":1,"_id":1,"__vacancy_free.l":1},".__poll__rate__user__adrs__vacancy":{"vacancy_invite":1,"title":1},".____game":{"_id":1},".____game__poll_del":{"_id":1,"__question.l":1,"__answer.l":1,"__story.l":1,"rate":1},".____game__poll_del__question":{"text":1,"_id":1,"__user.l":1},".____game__poll_del__question__user":{"title":1},".____game__poll_del__answer":{"_id":1,"__question.l":1,"text":1,"__user.l":1},".____game__poll_del__answer__question":{"text":1},".____game__poll_del__answer__user":{"title":1},".____game__poll_del__story":{"text":1,"_id":1,"__user.l":1},".____game__poll_del__story__user":{"title":1}}

exports.lst = {"addobj":"2021-02-13T09:48:31.810Z","stats":"2018-03-26T12:51:59.510Z"}

exports.process = {}
exports.html = {}
exports.process['.'] = {}
exports.process['.__adrs'] = {}
exports.process['.__adrs__vote'] = {}
exports.process['.__adrs__vacancy'] = {}
exports.process['.__adrs__vacancy__user'] = {}
exports.process['.__game_map'] = {}
exports.process['.__game_map__vote_super'] = {}
exports.process['.__game_map__vote_super__adrs'] = {}
exports.process['.__game_map__vote'] = {}
exports.process['.__game_map__vote__adrs'] = {}
exports.process['.__myAdrs'] = {}
exports.process['.__news'] = {}
exports.process['.__vote'] = {}
exports.process['.__poll'] = {}
exports.process['.__poll__rate'] = {}
exports.process['.__poll__rate__user'] = {}
exports.process['.__poll__rate__user__adrs'] = {}
exports.process['.__poll__rate__user__adrs__vacancy'] = {}
exports.process['.____game'] = {}
exports.process['.____game__poll_del'] = {}
exports.process['.____game__poll_del__question'] = {}
exports.process['.____game__poll_del__question__user'] = {}
exports.process['.____game__poll_del__answer'] = {}
exports.process['.____game__poll_del__answer__question'] = {}
exports.process['.____game__poll_del__answer__user'] = {}
exports.process['.____game__poll_del__story'] = {}
exports.process['.____game__poll_del__story__user'] = {}

exports.process['.']['loaded'] = true
exports.process['.']['id'] = (__, code, callback)=>{
	__.fields[code].col = 'user';
	__.queryIds[code] = [__.user.key];
	callback();
}
exports.process['.']['tpl'] = (_, d)=>{ return [
	
	['div', {class: '_7_', style:()=>{/*css

	css*/}}, [

		['div', {class: '_8_', style:()=>{/*css
			._8_ {
				position: fixed;
				top: 0px;
				left: 0px;
				width: 100%;
				height: 100%;
				background-image: url(/XAOC/images/clear-black-back.png);
				z-index: 999;
				color: white;
				display: none;
			}
			body.isLandscape ._8_ {
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
			}
		css*/}}, [
			['span', {text: 'Для продолжения работы необходимо повернуть экран вертикально'}],
		]],	
		
		['div', {class: '_9_', style:()=>{/*css
			position: fixed;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
			z-index: 0;
		css*/}}, [
			_.html('map', _, Object.assign(d, {mapFilter: {zoom: 7}})),
		]],

		['div', {class: '_10_', style:()=>{/*css
			._10_ > .notifyjs-wrapper {
				z-index: 100;
			}
		css*/}}, [
			_.html('gui', _, d),
		]],

		['div', {id: 'subFormMain', class: 'mcb _11_', style:()=>{/*css
			._11_ {
				display: none;
				z-index: 3;
				position: fixed;
				width: 600px;
				padding-bottom: 100px;
				bottom: 0px;
				left: calc(50% - 300px);
				font-size: 32px;
				border-bottom: none;
				height: 560px;
				max-height: 100%;
			}
			._11_ > div {
				background-image: url(/static/img/panel4.png);
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
				margin: auto;
				height: 100%;
				z-index: -1;
			}			
			._11_.loading {
				display: block;
			}
			body.isMobile ._11_ {
				width: 100%;
				height: 100%;
				max-height: 480px;
				top: auto;
				bottom: 80px;
				border-radius: 0px;
				left: 0px;
				padding: 6px;
			}
			body.isMobile.lowHeight ._11_ {
				bottom: 0px;
			}
			body.isMobile ._11_ > div {
				max-width: 360px;
				background-image: url(/static/img/panel3.png);
			}
			._11_.tutorial-hide {
				display: none!important;
			}
		css*/}}, [
			_.form({name: _.__.user.query.subform ? _.__.user.query.subform.form : '__blank' })
		]],

		['div', {id: 'subFormTutorial'}, [
			_.form({name: 'formTutorial', history: false }),
		]],
	]],
	
]}
exports.html['.'] = {}
exports.html['.']['map'] = {}
exports.html['.']['map']['tpl'] = (_, d)=>{ return [

	['script', {src:'static/libs/ol/ol.js'}],
	['style', {src:'static/libs/ol/ol.css'}],

	['div', {id: 'mapBlock', class: '_12_', style:()=>{/*css
		._12_ {
			position: relative;
			height: 100%;
			width: 100%;
		}
		._12_ > #map {
			height: 100%;
			width: 100%;
		}
		._12_ > #map.clicked div {
			cursor: wait;
		}
		._12_ .ol-zoom.ol-control {
			display: none;
		}
		._12_ .ol-attribution {
			width: 100%;
			text-align: center;
			padding: 0px;
			margin: 0px 0px -6px;
			opacity: 0.3;
			background: transparent!important;
		}
		._12_ .ol-attribution:hover {
			opacity: 1;
		}
	css*/}}, [
		['div', {id: 'map'}],
		((_, d)=>{ return !(d.mapFilter.zoom) ? [] :
			_.f({name: 'map.zoom', type: '*', value: d.mapFilter.zoom});
		})(_, d),
	]],
		
	_.html('mapPopup', _ , d),
	
	['div', {id: 'mapVoteList', class: '_13_', style:()=>{/*css
		display: none;
	css*/}}, [
		_.c({name: 'game_map', col: '__game', add: false, filter: {l: 1}, process: {
			parentDataNotRequired: true,
			id: (__, code, callback)=>{ __.queryIds[code] = [__.user.config.game]; callback() },
			tpl: (_, d)=>{ return [
				['div', {votetype: 'super'}, [
					_.c({name: 'vote_super', col: 'vote', link: '__vote_super', add: true, sub: true, process: {
						tpl: (_, d)=>{ return [
							['div', {}, [
								_.c({name: 'adrs', add: false, process: {
									tpl: (_, d)=>{ return [
										['div', {}, [
											_.f({name: 'state', type: '*'}),
											_.f({name: 'city', type: '*'}),
											_.f({name: 'osm_lonlat', type: '*', front: {
												onLoadElement: "f_e372068a305235e538b4ba6e121abb8b",
											}}),
										]],
									]},
								}}),
							]],
						]},
					}}),
				]],
				['div', {votetype: 'base'}, [
					_.c({name: 'vote', add: true, sub: true, process: {
						tpl: (_, d)=>{ return [
							['div', {}, [
								_.c({name: 'adrs', add: false, process: {
									tpl: (_, d)=>{ return [
										['div', {}, [
											_.f({name: 'state', type: '*'}),
											_.f({name: 'city', type: '*'}),
											_.f({name: 'osm_lonlat', type: '*', front: {
												onLoadElement: "f_e372068a305235e538b4ba6e121abb8b",
											}}),
										]],
									]},
								}}),
							]],
						]},
					}, front: {
						onSubDelete: "f_f682e9368656cfad113e849019234592",
					}}),
				]],
			]},
		}}),
	]],
	
	['div', {id: 'mapMyAdrsList', class: '_13_', style:()=>{/*css
		display: none;
	css*/}}, [
		['div', {}, [
			_.c({name: 'myAdrs', col: 'adrs', link: ['__win_adrs', '__custom_adrs'], add: true, sub: true, process: {
				tpl: (_, d)=>{ return [
					['div', {}, [
						_.f({name: 'state', type: '*'}),
						_.f({name: 'city', type: '*'}),
						_.f({name: 'osm_lonlat', type: '*', front: {
							onLoadElement: "f_b64d27d6595bb98d73ca4e8a20a94b21",
						}}),
					]],
				]},
			}, front: {
				onSubDelete: "f_8c45eea44aa60f6fab82fbfe37c0cc33",
			}}),
		]],
	]],
]}
exports.html['.']['mapPopup'] = {}
exports.html['.']['mapPopup']['tpl'] = (_, d)=>{ return [

	['div', {id: 'mapPopup', class: 'mcb _14_', style:()=>{/*css
		._14_ {
			padding: 10px;
			font-size: 18px;
			position: relative;
			background-image: url(/static/img/panel3.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
			width: 240px;
			height: 320px;
			margin-left: -120px;
			margin-top: -160px;
		}
		._14_ > .map-popup-content {
			position: absolute;
			z-index: 0;
			top: 24px;
			left: 10px;
			width: 220px;
			height: 240px;
			font-size: 13px;
			color: white;
			overflow: hidden;
		}
		._14_ > .map-popup-content > .complex-item {
			overflow-x: hidden;
			overflow-y: scroll;
			height: 100%;
			margin-right: -30px;
			padding-right: 10px;
		}
		body.isMobile ._14_ > .map-popup-content > .complex-item {
			margin-right: -10px;
		}
	css*/}}, [
		
		['div', {id: 'mapPopupClose', class: 'btn-close'}],
		
		['div', {class: '_15_', style:()=>{/*css
			background: rgba(213, 173, 81, 1);
			border-radius: 5px;
			width: 150px;
			height: 220px;
			margin-left: auto;
			margin-right: auto;
			margin-top: 40px;
		css*/}}],
		
		['div', {id: 'mapPopupContent', class: 'map-popup-content'},[
		
			_.c({name: 'adrs', add: false, process: {
				parentDataNotRequired: true,
				id: (__, code, callback)=>{
					var _ = __.fields[code];
					if(_.filter){
						if(_.filter.state && _.filter.city){
							DB.select(__, code, ()=>{
								if(__.queryIds[code].length){
									callback();
								}else{
									DB.getMongo((db)=>{
										ROUTER.route({db: db, user: __.user}, {
											action: 'add_adrs',
											city: _.filter.city,
											state: _.filter.state,
											lonlat: _.filter.lonlat,
											osm_lonlat: _.filter.osm_lonlat,
										}, (data)=>{
											__.queryIds[code] = [{_id: data._id}];
											callback();
										}, true);
									});
								}
							}, "SELECT `adrs__state`.id _id FROM `adrs__state`, `adrs__city` WHERE `adrs__state`.id = `adrs__city`.id AND `adrs__state`.f = ? AND `adrs__city`.f = ? LIMIT 0,1", [_.filter.state, _.filter.city]);
						}else{
							DB.redis.get(__.user.session+'__'+_.filter.code, (err, fieldData)=>{try{
								var field = JSON.parse(fieldData);
								__.queryIds[code] = [{_id: field._id}];
								callback();
							}catch(e){
								__.queryIds[code] = [];
								callback();								
							}});
						}
					}else{
						__.queryIds[code] = [];
						callback();
					}
				},
				dataReady: (__, data, callback)=>{
					if(data[0]){
						DB.getMongo((db)=>{
							db.collection('user').findOne({_id: ObjectId(__.user.key)}, {exp: 1, power: 1}, (err, user)=>{
								var p = data[0].population;
								if(p > 10000){
									p = p / 10;
									__.global.minExp = Math.ceil( p / 10 );
									if(__.global.minExp > 10000000) __.global.minExp = 10000000;
									__.global.minPower = Math.ceil( p / 100 );
									if(__.global.minPower > 1000000) __.global.minPower = 1000000;
									if(user.exp < __.global.minExp || user.power < __.global.minPower){
										__.global.restriction = true;
									}
								}
								callback();
							});
						});
					}else{ callback() }
				},
				tpl0: (_)=>{ return [
					['div', {}, [
						['div', {class: 'restriction', text: 'Тут не проводятся выборы'}],
						((_)=>[ _.__.user.role != 'admin' ? [] : [
							['div', {class: 'h custom-vote'}],
						]])(_),
					]],
				]},
				tpl: (_, d)=>{ return [
					['div', {class: '_16_', style:()=>{/*css
						._16_ > .state, ._16_ > .city, ._16_ > .population {
							text-align: center;
							padding-right: 43px;
							padding-left: 40px;
							font-size: 12px;
							//line-height: 12px;
						}
					css*/}}, [
					
						_.if(_.__.user.role == 'admin', ()=>[
							['div', {class: 'h custom-vote'}],
						]),
					
						['div', {class: 'vote _17_', style:()=>{/*css
							._17_ {
								width: 100%;
								display: flex;
							}
							._17_ > div {
								width: 50%;
							}
							body.theme-fantasy ._17_ > div {
								width: 100%;
							}
							body.theme-fantasy ._17_ > .population {
								//display: none;
							}
						css*/}}, [
							['div', {class: '_18_', style:()=>{/*css
								._18_ > .controls {
									display: flex;
									flex-wrap: wrap;
									justify-content: center;
									border-radius: 10px;
									margin-top: 4px;
									background-color: #018da8;
									margin: 5px;
								}
								._18_ > .controls > a {
									width: 100%;
								}
								._18_ > .controls > .i {
									color: #00a95b;
									border-radius: 50%;
									background-image: url(/static/img/vote_white.png);
									background-size: contain;
									background-position: center;
									background-repeat: no-repeat;
									width: 80px;
									height: 80px;
									position: relative;
									margin: 0px;
									margin-top: 10px;
								}
								._18_ > .controls > .i:not([query]) {
									width: 60px;
									margin-left: 65px;
									margin-top: 0px;
									margin-bottom: 10px;
								}
								._18_ > .controls > .i > span {
									background-size: contain;
									position: absolute;
									bottom: -10px;
									right: 0px;
									width: 35px;
									height: 35px;
									padding-top: 4px;
									border-radius: 50%;
									background-color: #018da8;
									background-image: url(/static/img/q-icon.png);
								}
								._18_ > .controls > .i.expert > span {
									background-color: #00a95b;
									background-image: url(/static/img/expert-icon.png);
								}
								._18_ > .controls > .i.candidate > span {
									background-color: #735a91;
									background-image: url(/static/img/candidate-icon.png);
								}
								._18_ > .controls > .i:before {
									color: white;
									width: 40px;
									position: absolute;
									left: -60px;
									text-align: left;
									bottom: -6px;
								}
								._18_ > .controls > #mapPopupNewVote:before {
									content: 'Начать новые выборы';
								}
								._18_ > .controls > #mapPopupAddCandidate:before {
									content: 'Стать кандидатом';
								}
								._18_ > .controls > #mapPopupAddExpert:before {
									content: 'Стать экспертом';
								}
								body.theme-fantasy ._18_ > .complex-item {
									background-image: url(/static/img/panel6.png);
									background-size: contain;
									background-repeat: no-repeat;
									background-position: top center;
								}
								body.theme-fantasy ._18_ > .controls {
									background-color: transparent;
									//flex-wrap: nowrap;
								}
								body.theme-fantasy ._18_ > .controls.complex-item {
									padding-top: 50px;
								}	
								body.theme-fantasy ._18_ > .controls > .i {
									background-image: url(/static/img/panel2b.png);
									background-position: center;
									margin: 0px;
									width: 140px;
									height: 52px;
									border-radius: 0px;
									display: flex;
									justify-content: center;
									align-items: center;
								}
								body.theme-fantasy ._18_ > .controls > .i:before {
									position: relative;
									width: 65%;
									padding-left: 5%;
									text-align: center;
									font-size: 13px;
									left: 0px;
									top: 0px;
								}
								body.theme-fantasy ._18_ > .controls > .i > span {
									position: relative;
									width: 35%;
									background-color: transparent;
									left: 0px;
									top: 0px;
									margin: 0px;
									padding: 0px;
									background-position: center;
									background-size: 80%;
									background-repeat: no-repeat;
									padding-right: 5%;
								}
								body.theme-fantasy ._18_ > .controls > .show {
									position: absolute;
									background-image: url(/static/img/button1.png);
									width: 30px;
									top: 0px;
									left: 20px;
								}
								body.theme-fantasy ._18_ > .controls > .show:after {
									content: '';
									position: absolute;
									left: 0px;
									top: 0px;
									background-image: url(/static/img/view.png);
									width: 100%;
									height: 100%;
									background-size: 16px;
									background-repeat: no-repeat;
									background-position: center;
								}
							css*/}}, [
								
								_.f({name: 'revote', type: '*-'}),
							
								_.if(!(d.__vote && d.__vote.l.length > 0), ()=>[
									['div', {class: 'controls'}, [
										_.if(!d.population, ()=>[
											['div', {class: 'restriction', text: 'Здесь нельзя проводить выборы'}],
										]),
										_.if(d.population, ()=>{ var now = Date.now(); return [
											_.if(d.revote && d.revote > now, ()=>[
												['div', {class: 'restriction'}, [
													['div', {text: 'Новые\xa0выборы\xa0не\xa0раньше\x0aчем '+moment(new Date(d.revote)).format('DD.MM.YY HH:mm')}],
												]],
											]),
											_.if(!(d.revote && d.revote > now), ()=>[
												_.if(_.__.global.restriction, ()=>[
													['div', {class: 'restriction'}, [
														['div', {text: 'Требования\xa0к участникам:'}],
														['div', {class: 'exp', text: _.__.global.minExp}],
														['div', {class: 'power', text: _.__.global.minPower}],
													]],
												]),
												_.if(!_.__.global.restriction, ()=>[
													['div', {id: 'mapPopupNewVote', class: 'h i'}, [
														['span', {}],
													]],
												]),
											]),
										]}),
									]],
								]),
								_.if(d.__vote && d.__vote.l.length > 0, ()=>[
									_.c({name: 'vote', add: false, process: {
										tpl: (_, d)=>{
											var user = {candidate: false, expert: false};
											var free = {candidate: true, expert: true};
											if(d.__user_candidate){
												if(d.__user_candidate.l.map(l=>l+'').indexOf(_.__.user.key) != -1) user.candidate = true;
												if(d.__user_candidate.l.length > 2) free.candidate = false;
											}
											if(d.__user_expert){
												if(d.__user_expert.l.map(l=>l+'').indexOf(_.__.user.key) != -1) user.expert = true;
												if(d.__user_expert.l.length > 2) free.expert = false;
											}
											user.admin = (_.__.user.role == 'admin');
										return[
											['div', {class: 'controls'}, [
												
												_.f({name: 'type', type: '*-'}),
												_.f({name: '__user_candidate', type: '*-'}),
												_.f({name: '__user_expert', type: '*-'}),
												
												['div', {class: '_19_', style:()=>{/*css
													._19_ {
														width: 100%;
														color: white;
														font-size: 18px;
														text-align: center;
														padding-top: 10px;
													}
													body.theme-fantasy ._19_ {
														width: 100%;
														position: absolute;
														top: 0px;
														left: 0px;
														padding: 4px 60px 8px 60px;
														color: #333;
														font-size: 12px;
														line-height: 10px;
														height: 40px;
														display: flex;
														justify-content: center;
														align-items: center;
													}
												css*/}}, [
													_.f({name: 'position', type: 'text-'}),
												]],
												_.if(_.__.global.restriction || user.candidate || user.expert || user.admin, ()=>[
													['div', {class: 'h i show', query: '{"form":"formVote", "container": "subFormMain", "filter":{"code": "'+_.code+'"}}'}],
													_.if(_.__.global.restriction && !user.admin, ()=>[
														['div', {class: 'restriction'}, [
															['div', {text: 'Ограничения на\xa0участие:'}],
															['div', {class: 'exp', text: _.__.global.minExp}],
															['div', {class: 'power', text: _.__.global.minPower}],
														]],
													]),
												]),
												_.if(!(user.candidate || user.expert || user.admin), ()=>[
													_.if(d.type !== 'super' || !_.__.global.restriction, ()=>[
														_.if(free.expert, ()=>[
															['div', {id: 'mapPopupAddExpert', class: 'h i expert'}, [
																['span', {}],
															]],
														]),
													]),
													_.if(!_.__.global.restriction, ()=>[
														_.if(free.candidate, ()=>[
															['div', {id: 'mapPopupAddCandidate', class: 'h i candidate'}, [ 
																['span', {}],
															]],
														]),
													]),
												]),
											]],
										]},
									}}),
								]),
							]],
						]],					
						
						['div', {class: '_20_', style:()=>{/*css
							._20_ > .info {
								position: relative;
								color: white;
								border: 2px solid #018da8;
								padding: 4px;
								padding-left: 30px;
								margin: 4px 0px;
							}
							body.theme-fantasy ._20_ > .info {
								border: none;
								background-image: url(/static/img/panel1.png);
								background-size: 140px;
								background-repeat: no-repeat;
								background-position: center;
								height: 34px;
								margin: 0px;
								padding: 0px 50px;
								display: flex;
								align-items: center;
								justify-content: space-between;
							}
							body.theme-fantasy ._20_ > .info > div {
								text-align: center;
								width: 100%;
								font-size: 10px;
								line-height: 8px;
							}
							body.theme-fantasy ._20_ > .info > span {
								text-align: center;
								flex-shrink: 0;
								height: 30px;
								width: 30px;
								line-height: 28px;
								background-image: url(/static/img/button1.png);
								background-size: contain;
								background-repeat: no-repeat;
								background-position: center;
								color: #333;
							}
							body.theme-fantasy ._20_ > .info.money > div {
								font-size: 18px;
							}
							body.theme-fantasy ._20_ > .info.money > span {
								background-image: url(/static/img/button66.png);
							}
						css*/}}, [
							['div', {class: 'info money'}, [
								['span', {}],
								['div', {}, [
									_.if(!d.money, ()=>[
										_.f({name: 'population', type: 'text-', value: '0'}),
									]),
									_.if(d.money, ()=>[
										_.f({name: 'money', type: 'text-'}),
									]),
								]],
							]],
							_.c({name: 'vacancy', link: ['__vacancy_head', '__vacancy'], add: false, process: {
								tpl: (_, d)=>{ return !_.__.pre && !(d.rate && d.rate.value) ? [] : [
									['div', {class: (d.__user ? 'head': '')+' f-slb vacancy info'}, [
										['span', {}, [
											_.f({name: 'rate.value', type: 'text-'}),
										]],
										['div', {}, [
											_.if(!(d.__user && d.__user.l.length), ()=>[
												_.f({name: 'title', type: 'text-'}),
											]),
											_.if(d.__user && d.__user.l.length, ()=>[
												_.c({name: 'user', add: false, process: {
													tpl: (_, d)=>{ return [
														_.f({name: 'title', type: 'text-'}),
													]},
												}}),
											]),
										]],
									]],
								]},
							}}),
						]],
						
						['div', {class: 'city'},[
							_.f({name: 'city', type: 'text-', value: ''}),
						]],
						['div', {class: 'state'}, [
							_.f({name: 'state', type: 'text-'}),
						]],
						
						['div', {class: 'population'},[
							
							['div', {class: '_21_', style:()=>{/*css
								._21_ {
									display: flex;
									flex-wrap: wrap;
								}
								._21_ > span {
									width: 100%;
									padding: 4px 0px;
								}
								._21_ > div {
									margin: 0px 2px;
									width: 20px;
									height: 20px;
									background-size: cover;
									background-position: center;
									background-repeat: no-repeat;
									background-image: url(/static/img/population.png);
								}
								._21_ > div.n10k { height: 30px; }
								._21_ > div.n100k { height: 40px; }
								._21_ > div.n1kk { height: 50px; }
								._21_ > div.n10kk { height: 60px; }
							css*/}}, [
								/*['span', {}, [
									_.f({name: 'population', type: 'text-', value: '', front: {
										textMask: function (_){ return _.value+'\xa0чел.' },
										onLoadElement: function (_){
											
											var $p = _.parent();

											var n  = parseInt(_.text());
											var n10kk = Math.floor(n/10000000);
											var n1kk = Math.floor(n%10000000*0.000001);
											var n100k = Math.floor(n%1000000*0.00001);
											var n10k = Math.floor(n%100000*0.0001);
											var n1k = Math.floor(n%10000*0.001);
											
											for(var i = 0; i < n10kk; i++) $p.append( $('<div />', {class: 'n10kk'}) );
											for(var i = 0; i < n1kk; i++) $p.append( $('<div />', {class: 'n1kk'}) );
											for(var i = 0; i < n100k; i++) $p.append( $('<div />', {class: 'n100k'}) );
											for(var i = 0; i < n10k; i++) $p.append( $('<div />', {class: 'n10k'}) );
											for(var i = 0; i < n1k; i++) $p.append( $('<div />', {class: 'n1k'}) );
										},
									}}),
								]],*/
							]],
						]],
					]],
				]},
			}}),
		]],
	]],
	
]}
exports.html['.']['gui'] = {}
exports.html['.']['gui']['tpl'] = (_, d)=>{ return [

	['div', {id: 'guiProfile', class: '_22_', style:()=>{/*css
		._22_ {
			z-index: 2;
			position: fixed;
			top: 20px;
			right: 0px;
			width: auto;
		}
		body.isMobile ._22_ {
			top: 0px;
		}
		._22_ > a {
			text-decoration: none;
		}
	css*/}}, [
		['a', {query: '{"form":"formProfile", "container": "subFormMain"}'},[
			_.html('guiProfile', _, d),
		]],
	]],
	
	['div', {id: 'guiRates', class: '_23_', style:()=>{/*css
		._23_ {
			z-index: 2;
			position: fixed;
			top: 80px;
			left: 0px;
			width: 260px;
		}
		._23_ > label {
			position: absolute;
			top: 0px;
			left: 0px;
			border-left: 0px;			
			padding: 0px;
			padding-left: 8px;
			text-align: left;
			line-height: 50px;
			background-image: url(/static/img/panel2a.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center left;
			cursor: pointer;
			width: 140px;
			font-size: 16px;
		}
		._23_ > label > a {
			text-decoration: none;
			color: white;
		}
		._23_ > label > a > div {
			width: 100%;
			height: 100%;
			background-image: url(/static/img/toprates-icon-white.png);
			background-size: 32px;
			background-repeat: no-repeat;
			background-position: left center;
			padding-left: 40px;
			padding-right: 16px;
			text-align: center;
		}
		
		body.isMobile ._23_ {
			top: 20px;
		}		
		body.isMobile ._23_ > label {
			top: -5px; 
			left: 70px;
			width: 50px;
			font-size: 0px;
			background-image: url(/static/img/button2.png);
		}
		body.isMobile ._23_ > label > a > div {
			padding: 0px;
		}
	css*/}}, [
		['label', {class: 'mcb'}, [
			['a', {query: '{"form":"formTopRates", "container": "subFormMain"}'},[
				['div', {class: 'mct h', text: 'Рейтинги'}],
			]],
		]],
	]],
	
	['div', {id: 'guiConfig', class: '_24_', style:()=>{/*css
		._24_ {
			z-index: 2;
			position: fixed;
			top: 20px;
			left: 0px;
			width: 260px;
		}
		._24_ > label {
			position: absolute;
			top: 0px;
			left: 0px;
			border-left: 0px;			
			padding: 0px;
			padding-left: 8px;
			text-align: left;
			line-height: 50px;
			background-image: url(/static/img/panel2a.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center left;
			cursor: pointer;
			width: 140px;
			font-size: 16px;
		}
		._24_ > label > a {
			text-decoration: none;
			color: white;
		}
		._24_ > label > a > div {
			width: 100%;
			height: 100%;
			background-image: url(/static/img/config-icon-white.png);
			background-size: 32px;
			background-repeat: no-repeat;
			background-position: left center;
			padding-left: 40px;
			padding-right: 16px;
			text-align: center;
		}
		
		body.isMobile ._24_ > label {
			top: -5px; 
			left: 10px;
			width: 50px;
			font-size: 0px;
			background-image: url(/static/img/button2.png);
		}
		body.isMobile ._24_ > label > a > div {
			padding: 0px;
		}
	css*/}}, [
		['label', {class: 'mcb'}, [
			['a', {query: '{"form":"formConfig", "container": "subFormMain"}'},[
				['div', {class: 'mct h', text: 'Настройки'}],
			]],
		]],
	]],
	
	['div', {id: 'guiStats', class: '_25_', style:()=>{/*css
		._25_ {
			z-index: 2;
			position: fixed;
			bottom: 0px;
			right: 0px;
			min-width: 150px;
			width: 150px;
			height: 50px;
		}
		._25_.active {
			height: 480px;
			max-height: 100%;
			width: 300px;
		}
		._25_:not(.active) > .tutorial-link {
			top: -40px;
		}
		body.isMobile ._25_ {
			bottom: 80px;
		}
		body.isMobile ._25_:not(.active) {
			width: 50px;
			min-width: 50px;
			height: 50px;
		}
		body.isMobile ._25_.active {
			width: 100%;
		}
		body.isMobile ._25_ > label {
			padding: 0px;
			font-size: 0px;
			background-image: url(/static/img/button2.png);
		}
		body.isMobile ._25_.active > label {
			background-image: url(/static/img/button1.png);
		}
		body.isMobile ._25_ > label > a > div {
			padding: 0px;
		}
	css*/}}, [
		_.html('guiStats', _, d),
	]],
	
	['div', {id: 'guiNews', class: '_26_', style:()=>{/*css
		._26_ {
			position: fixed;
			top: 0px;
			font-size: 32px;
			color: #888;
			z-index: 2;
			width: 600px;
			left: calc(50% - 300px);
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
		}
		body.isMobile ._26_ {
			width: 100%;
			left: 0px;
			top: 70px;
			z-index: 1;
		}
	css*/}}, [
		_.html('guiNews', _, d),
	]],
	
	['div', {id: 'guiEvents', class: '_27_', style:()=>{/*css
		._27_ {
			position: fixed;
			max-height: 120px;
			padding-bottom: 10px;
			bottom: 10px;
			left: calc(50% - 150px);
			width: 300px;
			font-size: 32px;
			color: #888;
			overflow: hidden;
			z-index: 4;
		}
		body.lowHeight ._27_ {
			z-index: 1;
			//display: none;
		}
		._27_ > .tutorial-link {
			top: 20px;
		}
	css*/}}, [
		_.html('guiEvents', _, d),
	]],
	
	['div', {id: 'guiPoll', class: '_28_', style:()=>{/*css
		._28_ {
			z-index: 2;
			position: fixed;
			bottom: 0px;
			left: 0px;
			min-width: 150px;
			width: 150px;
			height: 50px;
		}
		._28_.active {
			height: 480px;
			max-height: 100%;
			width: 300px;
		}
		._28_:not(.active) > .tutorial-link {
			left: 0px;
			top: -40px;
		}
		
		body.isMobile ._28_ {
			bottom: 80px;
		}
		body.isMobile ._28_:not(.active) {
			width: 50px;
			min-width: 50px;
			height: 50px;
		}
		body.isMobile ._28_.active {
			width: 100%;
		}
		body.isMobile ._28_ > label {
			padding: 0px;
			font-size: 0px;
			background-image: url(/static/img/button2.png);
		}
		body.isMobile ._28_.active > label {
			background-image: url(/static/img/button1.png);
		}
		body.isMobile ._28_ > label > a > div {
			padding: 0px;
		}
	css*/}}, [
		_.html('guiPoll', _, d),
	]],
	
]}
exports.html['.']['guiProfile'] = {}
exports.html['.']['guiProfile']['tpl'] = (_, d)=>{ return [

	['div', {class: 'mcb f-20 profile-content _29_', style:()=>{/*css
		._29_ {
			border-right: 0px;
			text-align: right;
			white-space: pre-wrap;
			font-size: 12px;			
			padding: 0px;
			text-align: right;
			background-image: url(/static/img/panel2b.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center right;
			top: auto;
			bottom: 0px;
			height: 80px;
			width: 180px;
		}
		._29_ > .title {
			text-align: center;
			color: white;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20px 60px 20px 15px;
			font-size: 14px;
			line-height: 12px;
		}
		._29_ > .title > span {
			color: white;
		}
	css*/}}, [
		['div', {class: 'title h'}, [
			_.f({name:'title', type:'text', value:'Гражданин', front: {
				textMask: "f_f6d24abc137214d2de02fc0840c17657"
			}}),
		]],
	]],
]}
exports.html['.']['guiStats'] = {}
exports.html['.']['guiStats']['tpl'] = (_, d)=>{ return [
		
	['label', {class: 'mct stats-toggle _30_', style:()=>{/*css
		._30_ {
			position: absolute;
			right: 0px;
			width: 100%;
			z-index: 1;
			font-size: 20px;
			color: white;			
			padding: 0px;
			padding-right: 60px;
			text-align: right;
			line-height: 50px;
			background-image: url(/static/img/panel2b.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center right;
			top: auto;
			bottom: 20px;
		}
		._30_:after {
			content: ' ';
			position: absolute;
			height: 36px;
			width: 36px;
			background-size: 36px;
			background-position: center;
			background-repeat: no-repeat;
			display: block;
			top: 8px;
			right: 6px;
			left: auto;
			background-image: url(/static/img/stats-icon-white.png);
		}
		._30_.active:after {
			//background-image: url(/static/img/close-white.png);
			background-image: url(/static/img/close1.png);
		}
		._30_.active {
			font-size: 0px;
			cursor: pointer;
			background-image: url(/static/img/button1.png);
		}
		body.isMobile ._30_.active:after {
			background-image: url(/static/img/close1.png);
		}
	css*/}}, [
		['span', {class: 'h', text: 'Навыки'}],
		_.f({name: 'togglePoll', type: 'action', front: {
			onClick: "f_2644899e27364b7b78b54a5f6dfcaf33",
		}}),	
	]],

	['div', {class: 'mcb stats-content f-slb _31_', style:()=>{/*css
		._31_ {
			padding: 10px 30px;
			border-right: 0px;
			height: 100%;
			padding-top: 40px;
			position: relative;
			overflow: hidden;
			text-align: right;
			font-size: 13px;
			display: none;
		}
		._31_.active {
			display: flex;
			background-image: url(/static/img/panel3.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: top right;
			padding-top: 80px;
			padding-left: 50px;
			padding-right: 40px;
			padding-bottom: 130px;
		}
		._31_.active > .count {
			display: flex;
		}
		._31_.active > .list {
			display: flex;
		}
		
		body.isMobile ._31_.active {
			max-width: 300px;
			margin: auto;
		}
		body.isMobile ._31_.active > .list {
			margin-right: 0px;
			padding-right: 0px;
		}
	css*/}},[
	
		['div', {class: 'count i-contain _32_', style:()=>{/*css
			._32_ {
				display: none;
				position: absolute;
				height: 80px;
				width: 180px;
				top: 0px;
				left: 60px;
				background-image: url(/static/img/panel2b.png);
				color: white;
				align-items: center;
				justify-content: space-between;
				text-align: center;
			}
			._32_ > div {
				flex-shrink: 0;
				width: 62px;
			}
			._32_ > span {
				width: 100%;
				padding-left: 20px;
				white-space: pre-wrap;
			}
		css*/}},[
			['span', {text: 'Сумма\x0aнавыков'}],
			['div', {}, [
				_.f({name: 'statscount', type: 'label', value: '0', sub: true}),
			]],
		]],
	
		['div', {class: '_33_', style:()=>{/*css
			body.theme-fantasy #guiStats.active ._33_ {
				position: absolute;
				width: 226px;
				height: 284px;
				background: rgba(213, 173, 81, 1);
				border-radius: 5px;
				left: 38px;
				top: 74px;
				z-index: 0;
			}
		css*/}}],
		
		['div', {class: 'scroller _34_', style:()=>{/*css
		css*/}}, [
			['div', {class: 'handle'}]
		]],
		
		['div', {onscroll: 'window.scrollMe(this)', class: 'scroll-content list _35_', style:()=>{/*css
			._35_ {
				display: none;
				flex-wrap: wrap;
				position: relative;
			}
			._35_ > .stat {
				justify-content: space-between;
				padding: 4px 0px;
				color: white;
				display: none;
				width: 100%;
				display: flex;
			}
			._35_ > .stat > span {
				width: 100%;
			}
			._35_ > .stat > .count {
				text-align: center;
				flex-shrink: 0;
				width: 40px;
				//z-index: 0;
			}
			._35_ > .stat > .title {
				line-height: 16px;
				width: 100%;
				text-align: left;
				align-items: flex-end;
				display: flex;
				position: relative;
				white-space: nowrap;
			}
			._35_ > .stat > .title.sm {
				font-size: 11px;
			}
			._35_ > .stat > .title > span {
				position: absolute;
				top: 0px;
				left: 0px;
			}
			._35_ > .stat > .title > div {
				background-color: #412c17;
				height: 4px;
				margin-top: 4px;
			}
			._35_ > .stat > .title > div.tmp {
				background-color: #ffd406;
			}
			._35_ > .stat > .title > div.tmp.m {
				background-color: #ffd406;
			}
			._35_ .notifyjs-container {
				min-width: 180px;
				max-width: 180px;
				white-space: normal;
			}
		css*/}},[
		
			['div', {}, [
				_.f({name:'stats', type:'*-', sub: true, lst:'stats', front: {
					onSub: "f_a8092c52a410475a847e4b709b9ecd04",
				}}),
			]],
			['div', {}, [
				_.f({name:'tmpStats', type:'*-', sub: true, lst:'stats', front: {
					onSub: "f_67bf0a6ff5170d967cfc85d87e88571b",
				}}),
			]],
			((_, d)=>{
				var result = [];
					LST.stats.list.lst.forEach((l)=>{
						var v = d.stats && d.stats[l.v] ? d.stats[l.v] : 0;
						var vt = d.tmpStats && d.tmpStats[l.v] ? d.tmpStats[l.v] : 0;
						result.push( ['div', {class: 'stat stat-'+l.v, style: 'order: '+v*-1, v: v, vt: vt}, [
							['div', {class: 'title '+(l.l.length>18?'sm':'')}, [
								['span', {help: '["lst","stats","'+l.v+'"]', helpPosition: 'bottom left', text: l.l+' '}],
								['div', {class: 'real', width:  v+(vt<0?vt:0)+'%'}],
								['div', {class: 'tmp '+(vt<0?"m":""), width: Math.abs(vt)+'%'}],
							]],
							['div', {class: 'scb count', text: v}],
						]] );
					});
				return result;
			})(_, d),
		]],
	]],
]}
exports.html['.']['guiNews'] = {}
exports.html['.']['guiNews']['tpl'] = (_, d)=>{ return [

	['div', {class: 'news-block f-slb _36_', style:()=>{/*css
		._36_ {
			width: 100%;
			max-height: 160px;
			overflow: hidden;
			border-top: none;
		}
	css*/}}, [

		['div', {class: 'mcb news-list f-slb _37_', style:()=>{/*css
			._37_ {
				min-height: 80px;
				justify-content: center;
				display: flex;
				flex-wrap: wrap;
				min-height: auto;
			}
			._37_.tutorial-active {
				background-image: url(/XAOC/images/clear-grey-back.png);
			}
			._37_.tutorial-active {
				-webkit-animation: tutorial_active 1s infinite alternate;
				-moz-animation: tutorial_active 1s infinite alternate;
				-ms-animation: tutorial_active 1s infinite alternate;
				-o-animation: tutorial_active 1s infinite alternate;
				animation: tutorial_active 1s infinite alternate;
			}
			._37_ > .complex-controls {
				display: none;
			}
			._37_ > .news {
				color: #00a95b;
				display: inline-block;
				position: relative;
				height: 36px;
				width: 36px;
				background-size: 36px;
				background-position: center;
				background-repeat: no-repeat;
				background-image: url(/static/img/button55.png);
				margin: 2px;
			}
			._37_ > .news.minus {
				color: #888;
			}
			._37_ > .news.alias {
				background-image: url(/static/img/button66.png);
				background-size: 32px;
			}
			._37_ > .news > span {
				position: absolute;
				text-align: center;
				padding-top: 4px;			
				border: none;
				font-size: 12px;
				left: 0px;
				top: 0px;
				width: 100%;
				height: 100%;
				line-height: 28px;
			}
			._37_ > .news.tmpStats  > span {
				color: #888;
			}
			
			._37_ > .news.alias > span, ._37_ > .news.title > span {
				display: none;
			}

		css*/}}, [
		
			_.c({name: 'news', add: true, sub: true, filter:{l: -9}, process: {
				tpl: (_, d)=>{ return [
					['div', {class: d.type+' '+d.spec+' '+(d.val <= 0 ?'minus':'')+' news h'}, [
						_.f({name: 'type', type: '*-'}),
						_.f({name: 'spec', type: '*-'}),
						
						['span', {},[
							_.f({name: 'val', type: 'text-', front: {
								textMask: "f_4e2632c661f489b20b54e25c4623d3be",
							}}),
						]],
					]],
				]},
			}, front: {
				onItemLoad: "f_6553c86ff58ffa11048fbbc48a46b3c1",
			}}),
		]],
	]],
	
	['div', {class: 'mcb news-details f-slb _38_', style:()=>{/*css
		._38_ {
			display: none;
			max-width: 100%;
			margin-top: 10px;
			padding: 10px;
			overflow: hidden;			
			position: relative;
		    background-color: #d5ad51;
			border: 2px solid #af753b;
			border-radius: 5px;
			font-size: 13px;
		}
		._38_.active {
			display: block;
		}
		._38_.tutorial-active {
			background-image: url(/XAOC/images/clear-grey-back.png);
		}
		._38_.tutorial-active {
			-webkit-animation: tutorial_active 1s infinite alternate;
			-moz-animation: tutorial_active 1s infinite alternate;
			-ms-animation: tutorial_active 1s infinite alternate;
			-o-animation: tutorial_active 1s infinite alternate;
			animation: tutorial_active 1s infinite alternate;
		}
		
		body.isMobile ._38_ {
			width: 100%;
			left: 0px;
			margin: 10px;
		}
	css*/}}, [
		['div', {class: '_39_', style:()=>{/*css
			._39_ {
				position: relative;
				padding-left: 60px;
			}
			._39_ > .btn-close {
				left: 4px;
			}
		css*/}}, [
			['div', {class: 'btn-close h'}],
			_.script(()=>{
				$(document).off('click', '#guiNews > .news-details > div > .btn-close');
				$(document).on('click', '#guiNews > .news-details > div > .btn-close', function(){
					var $details = $('#guiNews > .news-details');
					$details.removeClass('active');
					$details.find('.details-content').html('');
				});
			}),
			['div', {class: 'details-content _40_', style:()=>{/*css
				._40_ {
					display: flex;
					color: white;
				}			
				._40_ > .val {
					margin-right: 20px;
					margin-top: -8px;
					color: white;
					white-space: nowrap;
				}
				._40_ > .val > div {
					background-image: url(/static/img/panel7b.png);
					background-size: contain;
					height: 50px;
					width: 170px;
					background-repeat: no-repeat;
					background-position: center;
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
					padding-right: 36px;
					padding-left: 12px;
					text-align: center;
					white-space: pre-wrap;
					line-height: 12px;
					margin: 0px;
				}
				._40_ > .val > div > span {
					position: absolute;
					top: 0px;
					right: 0px;
					margin: 0px;
					border-radius: 50%;
					width: 36px;
					padding: 0px;
					text-align: center;
					font-size: 12px;
					padding-right: 4px;
					border: none;
					line-height: 52px;					
					color: white;
				}
				._40_ > .val > div.minus > span {
					color: #888;
				}
				._40_ > .val.tmpStats > div > span {
					color: #888;
					border-radius: 4px;
					padding: 0px 4px;
					opacity: 0.3;
				}
				._40_ > .source {
					position: relative;
					text-align: right;
					padding-right: 60px;
				}
				._40_ > .source > .alias, ._40_ > .source > .title {
					color: #412c17;
					font-size: 10px;
				}
				._40_ > .source > .text {
					font-size: 12px;
				}
				._40_ > .source > .icon {
					position: absolute;
					top: 0px;
					right: 40px;
				}
				._40_ > .source > .icon:after {
					position: absolute;
					top: 0px;
					left: 0px;
					width: 36px;
					height: 36px;
					background-size: contain;
					font-size: 16px;
					line-height: 34px;
					border-radius: 0px;
				}
				._40_ > .source > .icon.expert:after {
					background-color: #00a95b;
					background-image: url(/static/img/expert-icon.png);
				}
				._40_ > .source > .icon.candidate:after {
					background-color: #735a91;
					background-image: url(/static/img/candidate-icon.png);
				}
				
				body.isMobile ._40_ {
				    flex-wrap: wrap;
				}	
				body.isMobile ._40_ > .source {
					order: -1;
					padding-bottom: 10px;
					width: 100%;
				}
			css*/}}, [
			]],
		]],
	]],
]}
exports.html['.']['guiEvents'] = {}
exports.html['.']['guiEvents']['tpl'] = (_, d)=>{ return [

	['div', {class: 'mcb events-list f-slb _41_', style:()=>{/*css
		
		._41_ {
			display: flex;
			justify-content: center;
			border-bottom: none;
			height: 120px;
			background-image: url(/static/img/panel1.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: bottom center;
		}
		
		._41_ > .link {
			height: 50px;
			width: 54px;
			align-self: flex-end;
			margin-bottom: 10px;
		}
		
		._41_ > .link > div {
			color: #00a95b;
			display: inline-block;
			position: relative;		
			background-image: url(/static/img/button2.png);
			background-size: contain;
			height: 100%;
			width: 100%;
			background-position: center;
			background-repeat: no-repeat;
			margin: 0px;
			border-radius: 0px;
		}
		
		._41_ > .link > div > span {
			position: absolute;
			top: -2px;
			left: 0px;
			height: 100%;
			width: 100%;
			background-size: 32px;
			background-repeat: no-repeat;
			background-position: center;
		}
		
		._41_ > .link > div.expert > span {
			background-image: url(/static/img/expert-icon.png);
		}
		._41_ > .link > div.candidate > span {
			background-image: url(/static/img/candidate-icon.png);
		}

		._41_.tutorial-active, ._41_ .tutorial-active {
			-webkit-animation: tutorial_active 1s infinite alternate;
			-moz-animation: tutorial_active 1s infinite alternate;
			-ms-animation: tutorial_active 1s infinite alternate;
			-o-animation: tutorial_active 1s infinite alternate;
			animation: tutorial_active 1s infinite alternate;
		}
		._41_ > a.updated {
			-webkit-animation: scale 1s infinite alternate;
			-moz-animation: scale 1s infinite alternate;
			-ms-animation: scale 1s infinite alternate;
			-o-animation: scale 1s infinite alternate;
			animation: scale 1s infinite alternate;		
		}
		._41_ > .complex-controls {
			display: none;
		}
	css*/}}, [
		
		['div', {id: 'searchVoteBtn', userExpertLimit: CONFIG.userExpertLimit, userCandidateLimit: CONFIG.userCandidateLimit,  class: 'link _42_', notifyPosition: 'bottom right', style: {/*css
			._42_ {
				display: none;
			}
			._42_.active {
				display: block;
			}
			body.theme-fantasy ._42_ {
				position: absolute;
				background-image: url(/static/img/button22.png);
				background-size: contain;
				width: 90px!important;
				height: 50px;
				top: 12px;
				right: 24px;
				background-position: center;
				background-repeat: no-repeat;
				cursor: pointer;
			}
			body.theme-fantasy ._42_.tutorial-active {
				background-size: 80px;
			}
			body.theme-fantasy ._42_ > div {
				display: none;
			}
			body.theme-fantasy ._42_:after {
				content: '';
				font-size: 12px;
				color: white;
				position: absolute;
				width: 100%;
				height: 28px;
				text-align: center;
				line-height: 14px;
				top: 10px;
				white-space: pre-wrap;
				background-image: url(/static/img/find.png);
				background-size: 24px;
				background-position: center;
				background-repeat: no-repeat;
			}
			body.theme-fantasy ._42_:hover:after {
				opacity: 0.5;
			}
		css*/}}, [
			['div', {class: 'new h'}, [
				['span', {}],
			]],
			_.f({name: 'search_vote', type: 'action'}),
		]],
		_.func(()=>{
			window.toggleVoteSearchBtn = function(){
				var $searchVoteBtn = $('#searchVoteBtn');
				var userCandidateLimit = $searchVoteBtn.attr('userCandidateLimit');
				var userExpertLimit = $searchVoteBtn.attr('userExpertLimit');
				var userCandidateCount = $('#guiEvents > .events-list > a.link:not(.just-deleted) > div.candidate').length;
				var userExpertCount = $('#guiEvents > .events-list > a.link:not(.just-deleted) > div.expert').length;
				if(userCandidateLimit > userCandidateCount || userExpertLimit > userExpertCount){
					$searchVoteBtn.addClass('active');
				}else{
					$searchVoteBtn.removeClass('active');
				}
			}
		}),
		
		['a', {class: '_43_', style: {/*css
			body.theme-fantasy ._43_ {
				position: absolute;
				background-image: url(/static/img/button2.png);
				background-size: contain;
				width: 45px!important;
				height: 45px;
				top: 15px;
				left: 22px;
				background-position: center;
				background-repeat: no-repeat;
				cursor: pointer;
			}
			body.theme-fantasy ._43_:after {
				content: '';
				background-image: url(/static/img/story.png);
				background-size: contain;
				width: 100%;
				height: 100%;
				background-size: 24px;
				background-position: center;
				background-repeat: no-repeat;
				position: absolute;
			}
			body.theme-fantasy ._43_:hover:after {
				opacity: 0.5;
			}
		css*/}, query: '{"form":"formStory", "container": "subFormMain", "filter": {"type": "story"}}'}],
		
		['a', {class: '_44_', style: {/*css
			body.theme-fantasy ._44_ {
				position: absolute;
				background-image: url(/static/img/button2.png);
				background-size: contain;
				width: 45px!important;
				height: 45px;
				top: 15px;
				left: 70px;
				background-position: center;
				background-repeat: no-repeat;
				cursor: pointer;
			}
			body.theme-fantasy ._44_:after {
				content: '';
				background-image: url(/static/img/idea.png);
				background-size: 24px;
				background-position: center;
				background-repeat: no-repeat;
				position: absolute;
				width: 100%;
				height: 100%;
			}
			body.theme-fantasy ._44_:hover:after {
				opacity: 0.5;
			}
		css*/}, query: '{"form":"formStory", "container": "subFormMain", "filter": {"type": "idea"}}'}],

		['a', {class: '_45_', style: {/*css
			body.theme-fantasy ._45_ {
				position: absolute;
				background-image: url(/static/img/button2.png);
				background-size: contain;
				width: 60px!important;
				height: 60px;
				top: 2px;
				left: 120px;
				background-position: center;
				background-repeat: no-repeat;
				cursor: pointer;
			}
			body.theme-fantasy ._45_:after {
				content: '';
				background-image: url(/static/img/question.png);
				background-size: 36px;
				background-position: center;
				background-repeat: no-repeat;
				position: absolute;
				width: 100%;
				height: 100%;
			}
			body.theme-fantasy ._45_:hover:after {
				opacity: 0.5;
			}
		css*/}, query: '{"form":"formQuestion", "container": "subFormMain"}'}],
		
		_.c({name: 'vote', link: ['__vote_candidate', '__vote_expert'], add: true, sub: true, process: {
			tpl: (_, d)=>{
				var role = d && d.__user_candidate && d.__user_candidate.l.map(l=>l+'').indexOf(_.__.user.key) != -1 ? 'candidate' : d.__user_expert && d.__user_expert.l.map(l=>l+'').indexOf(_.__.user.key) != -1 ? 'expert' : 'new';
			return [
				['a', {class: 'link', query: '{"form":"formVote", "container": "subFormMain", "filter":{"code": "'+_.code+'"}}'},[
					['div', {class: role+' h'}, [
						_.f({name: '__user_candidate', type: '*-'}),
						_.f({name: '__user_expert', type: '*-'}),
						['span', {}],
						['div', {class: 'update-info'}, [
							((_, d)=>{ var result = [];
								
								var front = {
									onLoadElement: "f_1bca4409f8407bc4d9a88213f698fa5a",
									onSub: "f_c73f41573594603345641081dec7aac4",
								}
								
								if(_.__.pre){
									result = _.f({name: 'update_time', type: '*-', front: front});
								}else{
									result = _.f({name: 'update_time.'+_.__.user.key, label: 'update_time', type: '*+', sub: true, front: front});
								}

							return result; })(_, d),
						]],
					]],
				]],
			]},
		}, front: {
			onLoad: "f_2bacb8a9a8a978fbb3297d29b0cc987e",
			onLastItem: "f_2bacb8a9a8a978fbb3297d29b0cc987e",
			onSubAdd: "f_e136a478f329219bf4477ab54131df83",
			onSubDelete: "f_e136a478f329219bf4477ab54131df83",
		}}),
	]],
]}
exports.html['.']['guiPoll'] = {}
exports.html['.']['guiPoll']['tpl'] = (_, d)=>{ return [

	['label', {class: 'mct poll-toggle _46_', style:()=>{/*css
		._46_ {
			position: absolute;
			left: 0px;
			width: 100%;
			z-index: 1;
			font-size: 20px;
			color: white;			
			padding: 0px;
			padding-left: 60px;
			text-align: left;
			line-height: 50px;
			background-image: url(/static/img/panel2a.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center left;
			top: auto;
			bottom: 20px;
		}
		._46_:after {
			content: ' ';
			position: absolute;
			height: 36px;
			width: 36px;
			background-size: 36px;
			background-position: center;
			background-repeat: no-repeat;
			display: block;
			top: 6px;
			left: 6px;
			background-image: url(/static/img/poll-icon-white.png);
		}
		._46_.active:after {
			//background-image: url(/static/img/close-white.png);
			background-image: url(/static/img/close1.png);
		}
		._46_.active {
			font-size: 0px;
			cursor: pointer;
			background-image: url(/static/img/button1.png);
		}
		body.isMobile ._46_.active:after {
			background-image: url(/static/img/close1.png);
		}
	css*/}},[
		['span', {class: 'h', text: 'Опросы'}],
		_.f({name: 'togglePoll', type: 'action', front: {
			onClick: "f_207a0dcb4a91d61cff95d71ac474b2f0",
		}}),
	]],

	['div', {class: 'mcb poll-content _47_', style:()=>{/*css
		._47_ {
			text-align: left;
			border-left: 0px;
			height: 100%;
			padding-top: 40px;
			padding-bottom: 10px;
			padding-right: 10px;
			font-size: 13px;
		}
		._47_.active {
			background-image: url(/static/img/panel3.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: top left;
			padding-top: 80px;
			padding-left: 40px;
			padding-right: 40px;
			padding-bottom: 120px;
		}
		._47_.tutorial-hide {
			display:none;
		}
		._47_.active > .list-block, ._47_.active > .find-poll {
			display: block;
		}
		
		body.isMobile ._47_.active {
			max-width: 300px;
			margin: auto;
		}
		
		._47_ .tutorial-active {
			-webkit-animation: tutorial_active 1s infinite alternate;
			-moz-animation: tutorial_active 1s infinite alternate;
			-ms-animation: tutorial_active 1s infinite alternate;
			-o-animation: tutorial_active 1s infinite alternate;
			animation: tutorial_active 1s infinite alternate;
		}
	css*/}},[
	
		['div', {class: 'f-slb find-poll _48_', style:()=>{/*css
			._48_ {
				display: none;
				position: absolute;
				top: 20px;
				width: 100%;
				text-align: right;
				direction: rtl;
				overflow: hidden;
				padding-right: 10px;
				
				left: 0px;
				width: 100%;
				margin: 0px;
				padding: 0px;
			}
			._48_ > div {
				position: relative;
				//overflow-y: scroll;
				margin-left: -40px;
				padding-left: 30px;
				padding-right: 120px;
				
				width: 100%;
				margin: 0px;
				padding: 0px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			._48_ > div > button {
				border: none;
				line-height: 40px;
				text-align: right;
				color: white;			
				background-color: transparent;
				background-image: url(/static/img/button22.png);
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
			    height: 50px;
				width: 90px;
				padding: 0px;
				margin-right: 20px;
				font-size: 12px;
				
				//width: 100%;
				margin: 0px;
				padding: 0px;
				position: relative;
			}
			._48_ > div > button:after {
				content: 'Найти\000aопрос';
				text-align: center;
				position: absolute;
				top: 10px;
				left: 0px;
				width: 100%;
				white-space: pre-wrap;
				line-height: 14px;
			}
			._48_ > div > button.passive:after {
				//content: 'Следующий';
			}
			._48_ > div > button:hover:after {
				opacity: 0.5;
			}
			
			._48_ > div > button.tutorial-active {
				border: none;
				background-size: 80px;
				-webkit-animation: tutorial_active 1s infinite alternate;
				-moz-animation: tutorial_active 1s infinite alternate;
				-ms-animation: tutorial_active 1s infinite alternate;
				-o-animation: tutorial_active 1s infinite alternate;
				animation: tutorial_active 1s infinite alternate;
			}
		css*/}},[
		
			['div', {},[

				['button', {id: 'findPoll', class: 'scb '+(d.__poll && d.__poll.l && d.__poll.l.length ? 'passive' : '')}, [
					_.f({name: 'find_poll', type: 'action', front: {
						onClick: "f_4f31e7871d74f08f771f0b824d8f9cb3",
					}}),
				]],
			]],
			
			['button', {id: 'toggleBestPoll', class: 'passive _49_', style:()=>{/*css
				._49_ {
					left: 50px;
					position: absolute;
					bottom: 0px;
					width: 40px;
					height: 40px;
					border: none;
					background-color: transparent;
					background-image: url(/static/img/button2.png);
					background-size: contain;
					background-repeat: no-repeat;
					background-position: center;		
				}
				._49_:after {
					content: '';
					position: absolute;
					height: 100%;
					width: 100%;
					left: 0px;
					top: 0px;
					background-size: 26px;
					background-position: center;
					background-repeat: no-repeat;
					background-image: url(/static/img/best-w.png);
				}
				._49_.passive {
					background-image: url(/static/img/button1.png);
				}
				._49_.passive:after {
					background-image: url(/static/img/close1.png);
				}
			css*/}}, [
				_.f({name: 'toggle_best', type: 'action', front: {
					onClick: "f_3bb86bee0b1a7beb6d926f4b2b1a1b9a",
				}}),
			]],
		]],

		
		['div', {id: 'singlePoll', class: '_50_', style:()=>{/*css
			._50_ {
				width: 100%;
				height: 100%;
				background-color: #d5ad51;
				border-radius: 5px;
				overflow: hidden;
				display: none;
			}
			._50_.active {
				display: flex;
			}
			._50_:after {
				content: '';
				width: 100%;
				flex-shrink: 1000;
			}
		css*/}},[
		
			['div', {class: 'scroller _51_', style:()=>{/*css
			css*/}}, [
				['div', {class: 'handle'}]
			]],
			
			['div', {onscroll: 'window.scrollMe(this)', class: 'scroll-content f-slb _52_', style:()=>{/*css
				._52_ > .empty {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100%;
				}
				._52_ > .empty > label {
					text-align: center;
					color: white;
					padding: 20px;
				}
			css*/}},[
				_.f({name: '__poll.myRate', type: '*-'}),
				_.c({name: 'poll', add: false, deleteNotDB: true, filter: {force: true}, process: {
					tpl0: (_)=>{ return [
						['div', {class: 'empty'}, [
							['label', {text: 'Для участия в опросе найди новый через кнопку поиска'}],
						]],
					]},
					tpl: (_, d)=>{				
						if(!_.__.pre){
							var field = _.__.fields[_.code];
							var parent = _.__.fields[field.parent];
							var data = _.__.data[parent.parent];
							if(!d.__rate) d.__rate = {};
							d.__rate.l = [data.__poll.myRate];
						}						
					return [
						_.html('poll', _ ,d),
					]},
				}, front: {
					onItemLoad: "f_0fd757e1bd4278b332e2b03796ad7f14",
				}}),
			]],
		
		]],

		['div', {id: 'bestPoll', class: 'active _53_', style:()=>{/*css
			._53_ {
				width: 100%;
				height: 100%;
				background-color: #d5ad51;
				border-radius: 5px;
				overflow: hidden;
				display: none;
			}
			._53_.active {
				display: flex;
			}
		css*/}},[
		
			['div', {class: 'scroller _51_', style:()=>{/*css
			css*/}}, [
				['div', {class: 'handle'}]
			]],
		
			['div', {onscroll: 'window.scrollMe(this)', class: 'scroll-content f-slb'},[
				_.c({name: '__game', add: false, process: {
					parentDataNotRequired: true,
					id: (__, code, callback)=>{
						var field = __.fields[code];
						__.queryIds[code] = [__.user.config.game];
						__.queryFields[field.linecode]['best.'+moment().add(-1, 'days').format('DDMMYY')] = 1;
						callback();
					},
					tpl: (_, d)=>{ return [
					
						['div', {class: '_54_', style:()=>{/*css
							._54_ {
								display: flex;
								flex-wrap: wrap;
								width: 100%;
								padding-top: 10px;
							}
							body.isMobile ._54_ {
								margin-right: 0px;
							}
							._54_ > .complex-item {
								width: 100%;
								min-height: 50px;
								background-image: url(/static/img/panel6.png);
								background-size: 180px;
								background-repeat: no-repeat;
								background-position: center top;
							}
						css*/}},[
						
							_.c({name: 'poll_del', add: false, process: {
								parentDataNotRequired: true,
								id: (__, code, callback)=>{
									var field = __.fields[code];
									var data = __.data[field.parent];
									var b = data.best ? data.best[moment().add(-1, 'days').format('DDMMYY')] : false;

									__.queryIds[code] = [];
									__.queryIds[code].push(Object.assign({label: 'Вопрос дня', type: 'question'}, 
										b&&b.question ? {_id: b.question.id, rate: b.question.rate.toFixed(1)} : {_id: true}
									));
									__.queryIds[code].push(Object.assign({label: 'Ответ дня', type: 'answer'}, 
										b&&b.answer ? {_id: b.answer.id, rate: b.answer.rate.toFixed(1)} : {_id: true}
									));
									__.queryIds[code].push(Object.assign({label: 'Идея дня', type: 'story'}, 
										b&&b.idea ? {_id: b.idea.id, rate: b.idea.rate.toFixed(1)} : {_id: true}
									));
									__.queryIds[code].push(Object.assign({label: 'История дня', type: 'story'}, 
										b&&b.story ? {_id: b.story.id, rate: b.story.rate.toFixed(1)} : {_id: true}
									));
									
									callback();
								},
								tpl: (_, d)=>{ return [
									['div', {class: 'label _55_', style:()=>{/*css
										._55_ > .header {
											color: #444;
											width: 100%;
											text-align: center;
											margin-bottom: 20px;
											padding-top: 4px;
										}
										._55_ > span {
											position: absolute;
											top: 6px;
											right: 22px;
											background-image: url(/static/img/button2.png);
											background-size: contain;
											width: 30px;
											height: 30px;
											background-position: center;
											background-repeat: no-repeat;
											color: white;
											text-align: center;
											line-height: 28px;
										}
										._55_ > .text {
											color: white;
											padding: 10px;
											text-align: center;
										}
										._55_ > .text > .context {
											color: #412c17;
											font-size: 11px;
											text-align: right;
											padding-left: 30%;
										}
										._55_ > .text > .user {
											color: #412c17;
											font-size: 12px;
											font-family: 'TTWPGOTT';
											font-weight: normal;
										}
									css*/}}, [
										['div', {class: 'header', text: d.label}],
										['div', {class: 'text'}, [
											_.if(d.type == 'question', ()=>[
												_.c({name: 'question', add: false, process: {
													tpl: (_, d)=>{ return [
														_.f({name: 'text', type: 'input--', value: ''}),
														['div', {class: 'user'}, [
															_.c({name: 'user', add: false, process: {
																tpl: (_, d)=>{ return [
																	_.f({name: 'title', type: 'input--', value: ''}),
																]},
															}}),
														]],
													]},
												}}),
											]),
											_.if(d.type == 'answer', ()=>[
												_.c({name: 'answer', add: false, process: {
													tpl: (_, d)=>{ return [
														['div', {class: 'context'}, [
															_.c({name: 'question', add: false, process: {
																tpl: (_, d)=>{ return [
																	_.f({name: 'text', type: 'input--', value: ''}),
																]},
															}}),														
														]],
														_.f({name: 'text', type: 'input--', value: ''}),
														['div', {class: 'user'}, [
															_.c({name: 'user', add: false, process: {
																tpl: (_, d)=>{ return [
																	_.f({name: 'title', type: 'input--', value: ''}),
																]},
															}}),
														]],
													]},
												}})
											]),
											_.if(d.type == 'story', ()=>[
												_.c({name: 'story', add: false, process: {
													tpl: (_, d)=>{ return [
														_.f({name: 'text', type: 'input--', value: ''}),
														['div', {class: 'user'}, [
															_.c({name: 'user', add: false, process: {
																tpl: (_, d)=>{ return [
																	_.f({name: 'title', type: 'input--', value: ''}),
																]},
															}}),
														]],
													]},
												}})
											]),
										]],
										_.if(d.rate, ()=>[
											['span', {}, [
												_.f({name: 'rate', type: 'text'}),
											]],
										]),
									]],
								]},
							}}),
						]],
					]},
				}}),				
			]],
		]],
	]],
	
]}

exports.process['.__adrs']['loaded'] = true
exports.process['.__adrs']['parentDataNotRequired'] = true
exports.process['.__adrs']['id'] = (__, code, callback)=>{
					var _ = __.fields[code];
					if(_.filter){
						if(_.filter.state && _.filter.city){
							DB.select(__, code, ()=>{
								if(__.queryIds[code].length){
									callback();
								}else{
									DB.getMongo((db)=>{
										ROUTER.route({db: db, user: __.user}, {
											action: 'add_adrs',
											city: _.filter.city,
											state: _.filter.state,
											lonlat: _.filter.lonlat,
											osm_lonlat: _.filter.osm_lonlat,
										}, (data)=>{
											__.queryIds[code] = [{_id: data._id}];
											callback();
										}, true);
									});
								}
							}, "SELECT `adrs__state`.id _id FROM `adrs__state`, `adrs__city` WHERE `adrs__state`.id = `adrs__city`.id AND `adrs__state`.f = ? AND `adrs__city`.f = ? LIMIT 0,1", [_.filter.state, _.filter.city]);
						}else{
							DB.redis.get(__.user.session+'__'+_.filter.code, (err, fieldData)=>{try{
								var field = JSON.parse(fieldData);
								__.queryIds[code] = [{_id: field._id}];
								callback();
							}catch(e){
								__.queryIds[code] = [];
								callback();								
							}});
						}
					}else{
						__.queryIds[code] = [];
						callback();
					}
				}
exports.process['.__adrs']['dataReady'] = (__, data, callback)=>{
					if(data[0]){
						DB.getMongo((db)=>{
							db.collection('user').findOne({_id: ObjectId(__.user.key)}, {exp: 1, power: 1}, (err, user)=>{
								var p = data[0].population;
								if(p > 10000){
									p = p / 10;
									__.global.minExp = Math.ceil( p / 10 );
									if(__.global.minExp > 10000000) __.global.minExp = 10000000;
									__.global.minPower = Math.ceil( p / 100 );
									if(__.global.minPower > 1000000) __.global.minPower = 1000000;
									if(user.exp < __.global.minExp || user.power < __.global.minPower){
										__.global.restriction = true;
									}
								}
								callback();
							});
						});
					}else{ callback() }
				}
exports.process['.__adrs']['tpl0'] = (_)=>{ return [
					['div', {}, [
						['div', {class: 'restriction', text: 'Тут не проводятся выборы'}],
						((_)=>[ _.__.user.role != 'admin' ? [] : [
							['div', {class: 'h custom-vote'}],
						]])(_),
					]],
				]}
exports.process['.__adrs']['tpl'] = (_, d)=>{ return [
					['div', {class: '_16_', style:()=>{/*css
						._16_ > .state, ._16_ > .city, ._16_ > .population {
							text-align: center;
							padding-right: 43px;
							padding-left: 40px;
							font-size: 12px;
							//line-height: 12px;
						}
					css*/}}, [
					
						_.if(_.__.user.role == 'admin', ()=>[
							['div', {class: 'h custom-vote'}],
						]),
					
						['div', {class: 'vote _17_', style:()=>{/*css
							._17_ {
								width: 100%;
								display: flex;
							}
							._17_ > div {
								width: 50%;
							}
							body.theme-fantasy ._17_ > div {
								width: 100%;
							}
							body.theme-fantasy ._17_ > .population {
								//display: none;
							}
						css*/}}, [
							['div', {class: '_18_', style:()=>{/*css
								._18_ > .controls {
									display: flex;
									flex-wrap: wrap;
									justify-content: center;
									border-radius: 10px;
									margin-top: 4px;
									background-color: #018da8;
									margin: 5px;
								}
								._18_ > .controls > a {
									width: 100%;
								}
								._18_ > .controls > .i {
									color: #00a95b;
									border-radius: 50%;
									background-image: url(/static/img/vote_white.png);
									background-size: contain;
									background-position: center;
									background-repeat: no-repeat;
									width: 80px;
									height: 80px;
									position: relative;
									margin: 0px;
									margin-top: 10px;
								}
								._18_ > .controls > .i:not([query]) {
									width: 60px;
									margin-left: 65px;
									margin-top: 0px;
									margin-bottom: 10px;
								}
								._18_ > .controls > .i > span {
									background-size: contain;
									position: absolute;
									bottom: -10px;
									right: 0px;
									width: 35px;
									height: 35px;
									padding-top: 4px;
									border-radius: 50%;
									background-color: #018da8;
									background-image: url(/static/img/q-icon.png);
								}
								._18_ > .controls > .i.expert > span {
									background-color: #00a95b;
									background-image: url(/static/img/expert-icon.png);
								}
								._18_ > .controls > .i.candidate > span {
									background-color: #735a91;
									background-image: url(/static/img/candidate-icon.png);
								}
								._18_ > .controls > .i:before {
									color: white;
									width: 40px;
									position: absolute;
									left: -60px;
									text-align: left;
									bottom: -6px;
								}
								._18_ > .controls > #mapPopupNewVote:before {
									content: 'Начать новые выборы';
								}
								._18_ > .controls > #mapPopupAddCandidate:before {
									content: 'Стать кандидатом';
								}
								._18_ > .controls > #mapPopupAddExpert:before {
									content: 'Стать экспертом';
								}
								body.theme-fantasy ._18_ > .complex-item {
									background-image: url(/static/img/panel6.png);
									background-size: contain;
									background-repeat: no-repeat;
									background-position: top center;
								}
								body.theme-fantasy ._18_ > .controls {
									background-color: transparent;
									//flex-wrap: nowrap;
								}
								body.theme-fantasy ._18_ > .controls.complex-item {
									padding-top: 50px;
								}	
								body.theme-fantasy ._18_ > .controls > .i {
									background-image: url(/static/img/panel2b.png);
									background-position: center;
									margin: 0px;
									width: 140px;
									height: 52px;
									border-radius: 0px;
									display: flex;
									justify-content: center;
									align-items: center;
								}
								body.theme-fantasy ._18_ > .controls > .i:before {
									position: relative;
									width: 65%;
									padding-left: 5%;
									text-align: center;
									font-size: 13px;
									left: 0px;
									top: 0px;
								}
								body.theme-fantasy ._18_ > .controls > .i > span {
									position: relative;
									width: 35%;
									background-color: transparent;
									left: 0px;
									top: 0px;
									margin: 0px;
									padding: 0px;
									background-position: center;
									background-size: 80%;
									background-repeat: no-repeat;
									padding-right: 5%;
								}
								body.theme-fantasy ._18_ > .controls > .show {
									position: absolute;
									background-image: url(/static/img/button1.png);
									width: 30px;
									top: 0px;
									left: 20px;
								}
								body.theme-fantasy ._18_ > .controls > .show:after {
									content: '';
									position: absolute;
									left: 0px;
									top: 0px;
									background-image: url(/static/img/view.png);
									width: 100%;
									height: 100%;
									background-size: 16px;
									background-repeat: no-repeat;
									background-position: center;
								}
							css*/}}, [
								
								_.f({name: 'revote', type: '*-'}),
							
								_.if(!(d.__vote && d.__vote.l.length > 0), ()=>[
									['div', {class: 'controls'}, [
										_.if(!d.population, ()=>[
											['div', {class: 'restriction', text: 'Здесь нельзя проводить выборы'}],
										]),
										_.if(d.population, ()=>{ var now = Date.now(); return [
											_.if(d.revote && d.revote > now, ()=>[
												['div', {class: 'restriction'}, [
													['div', {text: 'Новые\xa0выборы\xa0не\xa0раньше\x0aчем '+moment(new Date(d.revote)).format('DD.MM.YY HH:mm')}],
												]],
											]),
											_.if(!(d.revote && d.revote > now), ()=>[
												_.if(_.__.global.restriction, ()=>[
													['div', {class: 'restriction'}, [
														['div', {text: 'Требования\xa0к участникам:'}],
														['div', {class: 'exp', text: _.__.global.minExp}],
														['div', {class: 'power', text: _.__.global.minPower}],
													]],
												]),
												_.if(!_.__.global.restriction, ()=>[
													['div', {id: 'mapPopupNewVote', class: 'h i'}, [
														['span', {}],
													]],
												]),
											]),
										]}),
									]],
								]),
								_.if(d.__vote && d.__vote.l.length > 0, ()=>[
									_.c({name: 'vote', add: false, process: {
										tpl: (_, d)=>{
											var user = {candidate: false, expert: false};
											var free = {candidate: true, expert: true};
											if(d.__user_candidate){
												if(d.__user_candidate.l.map(l=>l+'').indexOf(_.__.user.key) != -1) user.candidate = true;
												if(d.__user_candidate.l.length > 2) free.candidate = false;
											}
											if(d.__user_expert){
												if(d.__user_expert.l.map(l=>l+'').indexOf(_.__.user.key) != -1) user.expert = true;
												if(d.__user_expert.l.length > 2) free.expert = false;
											}
											user.admin = (_.__.user.role == 'admin');
										return[
											['div', {class: 'controls'}, [
												
												_.f({name: 'type', type: '*-'}),
												_.f({name: '__user_candidate', type: '*-'}),
												_.f({name: '__user_expert', type: '*-'}),
												
												['div', {class: '_19_', style:()=>{/*css
													._19_ {
														width: 100%;
														color: white;
														font-size: 18px;
														text-align: center;
														padding-top: 10px;
													}
													body.theme-fantasy ._19_ {
														width: 100%;
														position: absolute;
														top: 0px;
														left: 0px;
														padding: 4px 60px 8px 60px;
														color: #333;
														font-size: 12px;
														line-height: 10px;
														height: 40px;
														display: flex;
														justify-content: center;
														align-items: center;
													}
												css*/}}, [
													_.f({name: 'position', type: 'text-'}),
												]],
												_.if(_.__.global.restriction || user.candidate || user.expert || user.admin, ()=>[
													['div', {class: 'h i show', query: '{"form":"formVote", "container": "subFormMain", "filter":{"code": "'+_.code+'"}}'}],
													_.if(_.__.global.restriction && !user.admin, ()=>[
														['div', {class: 'restriction'}, [
															['div', {text: 'Ограничения на\xa0участие:'}],
															['div', {class: 'exp', text: _.__.global.minExp}],
															['div', {class: 'power', text: _.__.global.minPower}],
														]],
													]),
												]),
												_.if(!(user.candidate || user.expert || user.admin), ()=>[
													_.if(d.type !== 'super' || !_.__.global.restriction, ()=>[
														_.if(free.expert, ()=>[
															['div', {id: 'mapPopupAddExpert', class: 'h i expert'}, [
																['span', {}],
															]],
														]),
													]),
													_.if(!_.__.global.restriction, ()=>[
														_.if(free.candidate, ()=>[
															['div', {id: 'mapPopupAddCandidate', class: 'h i candidate'}, [ 
																['span', {}],
															]],
														]),
													]),
												]),
											]],
										]},
									}}),
								]),
							]],
						]],					
						
						['div', {class: '_20_', style:()=>{/*css
							._20_ > .info {
								position: relative;
								color: white;
								border: 2px solid #018da8;
								padding: 4px;
								padding-left: 30px;
								margin: 4px 0px;
							}
							body.theme-fantasy ._20_ > .info {
								border: none;
								background-image: url(/static/img/panel1.png);
								background-size: 140px;
								background-repeat: no-repeat;
								background-position: center;
								height: 34px;
								margin: 0px;
								padding: 0px 50px;
								display: flex;
								align-items: center;
								justify-content: space-between;
							}
							body.theme-fantasy ._20_ > .info > div {
								text-align: center;
								width: 100%;
								font-size: 10px;
								line-height: 8px;
							}
							body.theme-fantasy ._20_ > .info > span {
								text-align: center;
								flex-shrink: 0;
								height: 30px;
								width: 30px;
								line-height: 28px;
								background-image: url(/static/img/button1.png);
								background-size: contain;
								background-repeat: no-repeat;
								background-position: center;
								color: #333;
							}
							body.theme-fantasy ._20_ > .info.money > div {
								font-size: 18px;
							}
							body.theme-fantasy ._20_ > .info.money > span {
								background-image: url(/static/img/button66.png);
							}
						css*/}}, [
							['div', {class: 'info money'}, [
								['span', {}],
								['div', {}, [
									_.if(!d.money, ()=>[
										_.f({name: 'population', type: 'text-', value: '0'}),
									]),
									_.if(d.money, ()=>[
										_.f({name: 'money', type: 'text-'}),
									]),
								]],
							]],
							_.c({name: 'vacancy', link: ['__vacancy_head', '__vacancy'], add: false, process: {
								tpl: (_, d)=>{ return !_.__.pre && !(d.rate && d.rate.value) ? [] : [
									['div', {class: (d.__user ? 'head': '')+' f-slb vacancy info'}, [
										['span', {}, [
											_.f({name: 'rate.value', type: 'text-'}),
										]],
										['div', {}, [
											_.if(!(d.__user && d.__user.l.length), ()=>[
												_.f({name: 'title', type: 'text-'}),
											]),
											_.if(d.__user && d.__user.l.length, ()=>[
												_.c({name: 'user', add: false, process: {
													tpl: (_, d)=>{ return [
														_.f({name: 'title', type: 'text-'}),
													]},
												}}),
											]),
										]],
									]],
								]},
							}}),
						]],
						
						['div', {class: 'city'},[
							_.f({name: 'city', type: 'text-', value: ''}),
						]],
						['div', {class: 'state'}, [
							_.f({name: 'state', type: 'text-'}),
						]],
						
						['div', {class: 'population'},[
							
							['div', {class: '_21_', style:()=>{/*css
								._21_ {
									display: flex;
									flex-wrap: wrap;
								}
								._21_ > span {
									width: 100%;
									padding: 4px 0px;
								}
								._21_ > div {
									margin: 0px 2px;
									width: 20px;
									height: 20px;
									background-size: cover;
									background-position: center;
									background-repeat: no-repeat;
									background-image: url(/static/img/population.png);
								}
								._21_ > div.n10k { height: 30px; }
								._21_ > div.n100k { height: 40px; }
								._21_ > div.n1kk { height: 50px; }
								._21_ > div.n10kk { height: 60px; }
							css*/}}, [
								/*['span', {}, [
									_.f({name: 'population', type: 'text-', value: '', front: {
										textMask: function (_){ return _.value+'\xa0чел.' },
										onLoadElement: function (_){
											
											var $p = _.parent();

											var n  = parseInt(_.text());
											var n10kk = Math.floor(n/10000000);
											var n1kk = Math.floor(n%10000000*0.000001);
											var n100k = Math.floor(n%1000000*0.00001);
											var n10k = Math.floor(n%100000*0.0001);
											var n1k = Math.floor(n%10000*0.001);
											
											for(var i = 0; i < n10kk; i++) $p.append( $('<div />', {class: 'n10kk'}) );
											for(var i = 0; i < n1kk; i++) $p.append( $('<div />', {class: 'n1kk'}) );
											for(var i = 0; i < n100k; i++) $p.append( $('<div />', {class: 'n100k'}) );
											for(var i = 0; i < n10k; i++) $p.append( $('<div />', {class: 'n10k'}) );
											for(var i = 0; i < n1k; i++) $p.append( $('<div />', {class: 'n1k'}) );
										},
									}}),
								]],*/
							]],
						]],
					]],
				]}

exports.process['.__adrs__vote']['loaded'] = true
exports.process['.__adrs__vote']['tpl'] = (_, d)=>{
											var user = {candidate: false, expert: false};
											var free = {candidate: true, expert: true};
											if(d.__user_candidate){
												if(d.__user_candidate.l.map(l=>l+'').indexOf(_.__.user.key) != -1) user.candidate = true;
												if(d.__user_candidate.l.length > 2) free.candidate = false;
											}
											if(d.__user_expert){
												if(d.__user_expert.l.map(l=>l+'').indexOf(_.__.user.key) != -1) user.expert = true;
												if(d.__user_expert.l.length > 2) free.expert = false;
											}
											user.admin = (_.__.user.role == 'admin');
										return[
											['div', {class: 'controls'}, [
												
												_.f({name: 'type', type: '*-'}),
												_.f({name: '__user_candidate', type: '*-'}),
												_.f({name: '__user_expert', type: '*-'}),
												
												['div', {class: '_19_', style:()=>{/*css
													._19_ {
														width: 100%;
														color: white;
														font-size: 18px;
														text-align: center;
														padding-top: 10px;
													}
													body.theme-fantasy ._19_ {
														width: 100%;
														position: absolute;
														top: 0px;
														left: 0px;
														padding: 4px 60px 8px 60px;
														color: #333;
														font-size: 12px;
														line-height: 10px;
														height: 40px;
														display: flex;
														justify-content: center;
														align-items: center;
													}
												css*/}}, [
													_.f({name: 'position', type: 'text-'}),
												]],
												_.if(_.__.global.restriction || user.candidate || user.expert || user.admin, ()=>[
													['div', {class: 'h i show', query: '{"form":"formVote", "container": "subFormMain", "filter":{"code": "'+_.code+'"}}'}],
													_.if(_.__.global.restriction && !user.admin, ()=>[
														['div', {class: 'restriction'}, [
															['div', {text: 'Ограничения на\xa0участие:'}],
															['div', {class: 'exp', text: _.__.global.minExp}],
															['div', {class: 'power', text: _.__.global.minPower}],
														]],
													]),
												]),
												_.if(!(user.candidate || user.expert || user.admin), ()=>[
													_.if(d.type !== 'super' || !_.__.global.restriction, ()=>[
														_.if(free.expert, ()=>[
															['div', {id: 'mapPopupAddExpert', class: 'h i expert'}, [
																['span', {}],
															]],
														]),
													]),
													_.if(!_.__.global.restriction, ()=>[
														_.if(free.candidate, ()=>[
															['div', {id: 'mapPopupAddCandidate', class: 'h i candidate'}, [ 
																['span', {}],
															]],
														]),
													]),
												]),
											]],
										]}

exports.process['.__adrs__vacancy']['loaded'] = true
exports.process['.__adrs__vacancy']['tpl'] = (_, d)=>{ return !_.__.pre && !(d.rate && d.rate.value) ? [] : [
									['div', {class: (d.__user ? 'head': '')+' f-slb vacancy info'}, [
										['span', {}, [
											_.f({name: 'rate.value', type: 'text-'}),
										]],
										['div', {}, [
											_.if(!(d.__user && d.__user.l.length), ()=>[
												_.f({name: 'title', type: 'text-'}),
											]),
											_.if(d.__user && d.__user.l.length, ()=>[
												_.c({name: 'user', add: false, process: {
													tpl: (_, d)=>{ return [
														_.f({name: 'title', type: 'text-'}),
													]},
												}}),
											]),
										]],
									]],
								]}

exports.process['.__adrs__vacancy__user']['loaded'] = true
exports.process['.__adrs__vacancy__user']['tpl'] = (_, d)=>{ return [
														_.f({name: 'title', type: 'text-'}),
													]}

exports.process['.__game_map']['filter'] = {"l":1}
exports.process['.__game_map']['loaded'] = true
exports.process['.__game_map']['parentDataNotRequired'] = true
exports.process['.__game_map']['id'] = (__, code, callback)=>{ __.queryIds[code] = [__.user.config.game]; callback() }
exports.process['.__game_map']['tpl'] = (_, d)=>{ return [
				['div', {votetype: 'super'}, [
					_.c({name: 'vote_super', col: 'vote', link: '__vote_super', add: true, sub: true, process: {
						tpl: (_, d)=>{ return [
							['div', {}, [
								_.c({name: 'adrs', add: false, process: {
									tpl: (_, d)=>{ return [
										['div', {}, [
											_.f({name: 'state', type: '*'}),
											_.f({name: 'city', type: '*'}),
											_.f({name: 'osm_lonlat', type: '*', front: {
												onLoadElement: "f_e372068a305235e538b4ba6e121abb8b",
											}}),
										]],
									]},
								}}),
							]],
						]},
					}}),
				]],
				['div', {votetype: 'base'}, [
					_.c({name: 'vote', add: true, sub: true, process: {
						tpl: (_, d)=>{ return [
							['div', {}, [
								_.c({name: 'adrs', add: false, process: {
									tpl: (_, d)=>{ return [
										['div', {}, [
											_.f({name: 'state', type: '*'}),
											_.f({name: 'city', type: '*'}),
											_.f({name: 'osm_lonlat', type: '*', front: {
												onLoadElement: "f_e372068a305235e538b4ba6e121abb8b",
											}}),
										]],
									]},
								}}),
							]],
						]},
					}, front: {
						onSubDelete: "f_f682e9368656cfad113e849019234592",
					}}),
				]],
			]}

exports.process['.__game_map__vote_super']['loaded'] = true
exports.process['.__game_map__vote_super']['tpl'] = (_, d)=>{ return [
							['div', {}, [
								_.c({name: 'adrs', add: false, process: {
									tpl: (_, d)=>{ return [
										['div', {}, [
											_.f({name: 'state', type: '*'}),
											_.f({name: 'city', type: '*'}),
											_.f({name: 'osm_lonlat', type: '*', front: {
												onLoadElement: "f_e372068a305235e538b4ba6e121abb8b",
											}}),
										]],
									]},
								}}),
							]],
						]}

exports.process['.__game_map__vote_super__adrs']['loaded'] = true
exports.process['.__game_map__vote_super__adrs']['tpl'] = (_, d)=>{ return [
										['div', {}, [
											_.f({name: 'state', type: '*'}),
											_.f({name: 'city', type: '*'}),
											_.f({name: 'osm_lonlat', type: '*', front: {
												onLoadElement: "f_e372068a305235e538b4ba6e121abb8b",
											}}),
										]],
									]}

exports.process['.__game_map__vote']['loaded'] = true
exports.process['.__game_map__vote']['tpl'] = (_, d)=>{ return [
							['div', {}, [
								_.c({name: 'adrs', add: false, process: {
									tpl: (_, d)=>{ return [
										['div', {}, [
											_.f({name: 'state', type: '*'}),
											_.f({name: 'city', type: '*'}),
											_.f({name: 'osm_lonlat', type: '*', front: {
												onLoadElement: "f_e372068a305235e538b4ba6e121abb8b",
											}}),
										]],
									]},
								}}),
							]],
						]}

exports.process['.__game_map__vote__adrs']['loaded'] = true
exports.process['.__game_map__vote__adrs']['tpl'] = (_, d)=>{ return [
										['div', {}, [
											_.f({name: 'state', type: '*'}),
											_.f({name: 'city', type: '*'}),
											_.f({name: 'osm_lonlat', type: '*', front: {
												onLoadElement: "f_e372068a305235e538b4ba6e121abb8b",
											}}),
										]],
									]}

exports.process['.__myAdrs']['loaded'] = true
exports.process['.__myAdrs']['tpl'] = (_, d)=>{ return [
					['div', {}, [
						_.f({name: 'state', type: '*'}),
						_.f({name: 'city', type: '*'}),
						_.f({name: 'osm_lonlat', type: '*', front: {
							onLoadElement: "f_b64d27d6595bb98d73ca4e8a20a94b21",
						}}),
					]],
				]}

exports.process['.__news']['filter'] = {"l":-9}
exports.process['.__news']['loaded'] = true
exports.process['.__news']['tpl'] = (_, d)=>{ return [
					['div', {class: d.type+' '+d.spec+' '+(d.val <= 0 ?'minus':'')+' news h'}, [
						_.f({name: 'type', type: '*-'}),
						_.f({name: 'spec', type: '*-'}),
						
						['span', {},[
							_.f({name: 'val', type: 'text-', front: {
								textMask: "f_4e2632c661f489b20b54e25c4623d3be",
							}}),
						]],
					]],
				]}

exports.process['.__vote']['loaded'] = true
exports.process['.__vote']['tpl'] = (_, d)=>{
				var role = d && d.__user_candidate && d.__user_candidate.l.map(l=>l+'').indexOf(_.__.user.key) != -1 ? 'candidate' : d.__user_expert && d.__user_expert.l.map(l=>l+'').indexOf(_.__.user.key) != -1 ? 'expert' : 'new';
			return [
				['a', {class: 'link', query: '{"form":"formVote", "container": "subFormMain", "filter":{"code": "'+_.code+'"}}'},[
					['div', {class: role+' h'}, [
						_.f({name: '__user_candidate', type: '*-'}),
						_.f({name: '__user_expert', type: '*-'}),
						['span', {}],
						['div', {class: 'update-info'}, [
							((_, d)=>{ var result = [];
								
								var front = {
									onLoadElement: "f_1bca4409f8407bc4d9a88213f698fa5a",
									onSub: "f_c73f41573594603345641081dec7aac4",
								}
								
								if(_.__.pre){
									result = _.f({name: 'update_time', type: '*-', front: front});
								}else{
									result = _.f({name: 'update_time.'+_.__.user.key, label: 'update_time', type: '*+', sub: true, front: front});
								}

							return result; })(_, d),
						]],
					]],
				]],
			]}

exports.process['.__poll']['filter'] = {"force":true}
exports.process['.__poll']['loaded'] = true
exports.process['.__poll']['tpl0'] = (_)=>{ return [
						['div', {class: 'empty'}, [
							['label', {text: 'Для участия в опросе найди новый через кнопку поиска'}],
						]],
					]}
exports.process['.__poll']['tpl'] = (_, d)=>{				
						if(!_.__.pre){
							var field = _.__.fields[_.code];
							var parent = _.__.fields[field.parent];
							var data = _.__.data[parent.parent];
							if(!d.__rate) d.__rate = {};
							d.__rate.l = [data.__poll.myRate];
						}						
					return [
						_.html('poll', _ ,d),
					]}
exports.html['.__poll'] = {}
exports.html['.__poll']['poll'] = {}
exports.html['.__poll']['poll']['tpl'] = (_, d)=>{

	if(_.filter == undefined) _.filter = {};
	if(d.tutorial) _.filter.force = true;
	
return [

	['div', {skey: md5(d._id+d.dateto), dateto: d.dateto, realParent: _.filter.force ? _.parent : undefined, class: (_.filter.force ? ' loaded force ': ' ')+(d.tutorial?' tutorial-poll ':' ')+(' tutorial-'+d.type)+(_.filter.rate?' active ':' ')+' poll-skey item poll-item _56_', style:()=>{/*css
		._56_ {
			padding: 4px 10px;
			padding-top: 8px;
			margin: 10px;
			margin-top: 20px;
			border: 2px solid #444;
			border-top: none;
			direction: ltr;
		}
		._56_ > .item-controls {
			display: none!important;
		}
		._56_:not(.passive):hover, ._56_:not(.passive):hover > label > * {
			border-color: #ccc;
		}
		._56_.passive, ._56_.passive > label {
			color: #666;
		}
		._56_:not(.passive) > .text {
			cursor: pointer;
		}
		._56_:not(.active) > .rates, ._56_:not(.active) > .context {
			//display: none;
		}
		body.theme-fantasy ._56_ {
			border: none;
			background: rgba(213, 173, 81, 1);
			border-radius: 5px;
			margin: 0px;
			padding: 5px;
			color: white;
			width: 100%;
		}
		body.theme-fantasy ._56_ > label {
			display: none
		}
		body.theme-fantasy ._56_.passive {
			color: rgb(65, 44, 23);
			border: 2px solid rgb(65, 44, 23);
			background: none;
		}
	css*/}},[
	
		_.f({name: 'type', type: '*-'}),
		_.f({name: 'tutorial', type: '*-'}),
		_.f({name: 'waitForModeration', type: '*-'}),
		_.f({name: 'dateto', type: '*-', front: {
			onLoadElement: "f_4f897b4779dd2729e65ac02ab8cc7fa1",
		}}),
	
		['label', {class: 'type-'+d.type+' _57_', style:()=>{/*css
			._57_ {
				position: absolute;
				top: 0px;
				left: 0px;
				display: flex;
				width: 100%;
			}
			._57_.type-question {
				color: #735a91;
			}
			._57_.type-answer {
				color: #00a95b;
			}
			._57_ > p {
				border-top: 2px solid #444;
				width: 100%;
				margin: 0px;
			}
			._57_ > p.w10 {
				width: 10px;
			}
			._57_ > div {
				padding: 0px 10px;
				margin-top: -14px;
				position: relative;
			}
			._57_ > div.check {
				padding-left: 40px;
			}
			._57_ > div.check:before {
				content: ' ';
				position: absolute;
				left: 10px;
				top: 0px;
				background-image: url(/static/img/check-icon.png);
				height: 20px;
				width: 20px;
				background-size: 20px;
				background-position: center;
				background-repeat: no-repeat;
			}
		css*/}},[
			['p', {class: 'w10'}],
			['div', {class: d.waitForModeration?'check':'', text: d.type == 'question' ? 'Вопрос' : 'Ответ'}],
			['p', {}],
		]],
		
		//_.if(_.filter.rate || _.filter.force, ()=>{ return [
		
			['div', {class: 'context _58_', style:()=>{/*css
				._58_ > div {
					color: #888;
					display: flex;
				}
				._58_ > div > p {
					font-size: 16px;
					margin: 0px;
				}
				._58_ > div > span {
					text-align: right;
					width: 100%;
					padding-left: 10px;
				}
				body.theme-fantasy ._58_ > div > span {
					color: #412c17;
					font-size: 11px;
				}
				body.theme-fantasy ._58_ > div > p {
					display: none;
				}
			css*/}},[
				['div', {}, [
					['p', {text: d.type == 'question' ? 'Кому\xa0задан' : 'Вопрос'}],
					['span', {}, [
						_.f({name: 'context', type: 'text-', front: {
							onLoadElement: "f_82d3e76c674fa395242c610c1974c6f7",
						}}),
					]],
				]],
			]],
			
			['div', {class: 'text _59_', style:()=>{/*css
				
			css*/}},[
				_.f({name: 'text', type: 'text-'}),
			]],			
		
			['div', {class: 'rates _60_', style:()=>{/*css
				._60_ {
					position: relative;
				}
				._60_ > .rate-block {
					margin-top: 40px;
					padding: 10px 0px;
				}
				._60_ > .rate-block > .choiceRatesBlock {
					height: auto;
					padding-top: 10px;
					//top: -30px;
					//right: 2px;
				}
				._60_ > .rate-block > .select2 {
					width: 100%!important;
				}
				._60_ > .rate-block > .select2 > .selection > .select2-selection {
					background: transparent;
					border: none;
					cursor: pointer;
				}
				._60_ > .rate-block > .select2 > .selection > .select2-selection > ul {
					display: flex;
					flex-wrap: wrap;
					justify-content: flex-end;
					padding: 0px;
					width: 100%;
				}
				._60_ > .rate-block > .select2 > .selection > .select2-selection > ul > li.select2-selection__choice {
					background-color: transparent;
					color: #999;
					border: 2px solid #735a91;
				}
				._60_ > .rate-block > .select2 > .selection > .select2-selection > ul > li.select2-search {
					order: -1;
					width: 100%;
					height: 32px;
					border: 2px solid #735a91;
					border-radius: 5px;
				}
				._60_ > .rate-block > .select2 > .selection > .select2-selection > ul > li.select2-search > input {
					text-align: right;
					width: 100%!important;
					color: #999;
					padding-right: 10px;
				}
				._60_ > .rate-block > .select2 > .selection > .select2-selection > ul > li.select2-search:before {
					content: 'Тематика вопроса:';
					width: 150px;
					height: 28px;
					position: absolute;
					left: 0px;
					font-size: 16px;
					background-color: #735a91;
					text-align: center;
					color: #333;
					padding-top: 4px;
					top: 0px;
				}
				body.theme-fantasy ._60_ > .rate-block {
					padding-top: 30px;
					padding: 0px;
					margin: 0px;
				}
				body.theme-fantasy ._60_ > .rate-block > .choiceRatesBlock {
					flex-wrap: wrap;
					position: relative;
				}
				body.theme-fantasy ._60_ > .rate-block > .choiceRatesBlock > .rate {
					width: 20%;
				}
				body.theme-fantasy ._60_ > .rate-block > .choiceRatesBlock > .el {
					width: 35%;
				}
			css*/}},[
				_.c({name: 'rate', add: false, filter: {l: 1}, process: {
					//parentDataNotRequired: true,
					//id: DB.selectWithMultiParent,
					tpl: (_, d)=>{
						var parentData = !_.__.pre ? _.__.data[_.__.fields[_.parent].parent] : {};
					return [
						_.if(d.rate, ()=>[
							// тут надо вешать passive на item
						]),
						_.if(!d.rate, ()=>[
							['div', {class: 'rate-block'}, [
							
								_.f({name: 'rate', type: '*-'}),
								
								_.if(parentData.type == 'question', ()=>[
									
									['div', {class: 'pollStats _61_', style:()=>{/*css
										._61_ {
											white-space: nowrap;
										}
										._61_ > .label {
											padding-bottom: 10px;
											color: #888;
											text-align: right;
										}
										._61_ > .item {
											border: 2px solid #735a91;
											color: #888;
											text-align: center;
											margin: 5px;
											display: flex;
											justify-content: space-between;
										}
										._61_ > .item.y {
											color: white;
											border-color: #735a91;
											background-color: #735a91;											
										}
										._61_ > .item.n {
											color: #444;
											border-color: #777;
											background-color: #777;
										}
										._61_ > .item > p {
											margin: 0px;
										}
										._61_ > .item > span {
											color: #333;
											background-color: #735a91;
											padding: 0px 5px;
										}
										._61_ > .item.n > span, ._61_ > .item.y > span {
											color: #aaa;
											background-color: transparent;
										}
										._61_ > .item > span:hover {
											color: white;
											cursor: pointer;
										}
										body.theme-fantasy ._61_ {
											//padding-top: 10px;
											//padding-bottom: 40px;
										}
										body.theme-fantasy ._61_ > .item {
											border: none;
											white-space: pre-wrap;
											color: white;
											font-size: 12px;
											background-color: transparent!important;
										}
										body.theme-fantasy ._61_ > .item > span {
											color: #333;
											background-color: transparent;
											background-size: 36px;
											background-position: center;
											background-repeat: no-repeat;
											background-image: url(/static/img/button3.png);
											width: 36px;
											height: 36px;
											flex-shrink: 0;
											line-height: 34px;
										}
										body.theme-fantasy ._61_ > .item > p {
											display: flex;
											align-items: center;
											justify-content: center;
										}
										body.theme-fantasy ._61_ > .item.n > span, body.theme-fantasy ._61_ > .item.y > span {
											background-image: url(/static/img/button1.png);
											background-color: transparent;
											opacity: 0.5;
										}
										body.theme-fantasy ._61_ > .item.y > p {
											background-image: url(/static/img/panel1.png);
											background-size: contain;
											background-repeat: no-repeat;
											background-position: center;
											height: 36px;
											width: 140px;
											padding: 0px;
										}
										
										._61_ .notifyjs-container {
											min-width: 180px;
											max-width: 180px;
											white-space: normal;
										}
									css*/}},[
									
										_.f({name: 'stats', type: '*-'}),
										((_, d)=>{
											var result = [];
											if(d.stats){
												var keys = Object.keys(d.stats);
												const l = keys.length*1;
												for(var k=0;k<l;k++){
													var key = keys.splice( Math.floor(Math.random()*keys.length), 1)[0];
													if(key){try{
														result.push( ['div', {help: '["lst","stats","'+key+'"]', helpPosition: 'bottom right', stat: key, class: 'item'},[
															['span', {class: 'y', text: 'Да'}],
															['p', {text: LST.stats.lst[key].l}],
															['span', {class: 'n', text: 'Нет'}],
														]] );
													}catch(e){console.log(key,e)}}
												}
											}
											return result;
										})(_, d),
										
										_.script(()=>{
											$(document).off('click', '#guiPoll .pollStats > .item > span');
											$(document).on('click', '#guiPoll .pollStats > .item  > span', function(){
												
												var $this = $(this);
												
												var $item = $this.closest('.item');
												var $stats = $item.closest('.pollStats');
												
												$item.removeClass('y').removeClass('n').addClass('ready');
												$item.addClass($this.hasClass('y') ? 'y' : 'n');
												$item.find('> span').show();
												$this.hide();

											});
										}),										
									]],
								]),
								
								_.html('choiceRates', _, d),
							
								_.if(parentData.type == 'story', ()=>[
									['div', {class: ''}, [
										_.c({name: 'user', add: false, process: {
											tpl: (_, d)=>{ return [
												['div', {class: ''}, [
													['div', {class: ''}, [
														_.c({name: 'adrs', link: '__win_adrs', add: false, process: {
															tpl: (_, d)=>{ return [
																['div', {class: 'adrs _62_', style:()=>{/*css
																	._62_ {
																		display: none;
																		position: relative;
																		background-image: url(/static/img/panel6.png);
																		background-size: contain;
																		background-repeat: no-repeat;
																		background-position: top center;
																		margin-top: 20px;
																		height: 40px;
																	}
																	._62_.active {
																		display: block;
																	}
																	._62_ .complex-item {
																		position: inherit;
																	}
																	._62_ > .btn-show {
																		position: absolute;
																		width: 40px;
																		height: 40px;
																		background-image: url(/static/img/button1.png);
																		background-size: contain;
																		background-repeat: no-repeat;
																		background-position: top center;
																		background-color: transparent;
																		border: none;
																		top: 0px;
																		left: 8px;
																		cursor: pointer;
																		z-index: 1;
																	}
																	._62_ > .btn-show:after {
																		content: '';
																		background-image: url(/static/img/view.png);
																		background-repeat: no-repeat;
																		background-position: center;
																		background-size: 20px;
																		width: 100%;
																		height: 100%;
																		position: absolute;
																		left: 0px;
																		top: 0px;
																	}
																	._62_ .btn-invite {
																		position: absolute;
																		width: 40px;
																		height: 40px;
																		background-image: url(/static/img/button2.png);
																		background-size: contain;
																		background-repeat: no-repeat;
																		background-position: top center;
																		background-color: transparent;
																		border: none;
																		top: 0px;
																		right: 8px;
																		cursor: pointer;
																		z-index: 1;
																	}
																	._62_ .btn-invite:after {
																		content: '';
																		background-image: url(/static/img/q-icon.png);
																		background-position: center;
																		background-repeat: no-repeat;
																		background-size: 24px;
																		width: 100%;
																		height: 100%;
																		position: absolute;
																		left: 0px;
																		top: -2px;
																	}
																	._62_ > .btn-show:hover:after,
																	._62_ .btn-invite:hover:after {
																		opacity: 0.5;
																	}
																	._62_ span {
																		width: 100%;
																		text-align: center;
																		position: absolute;
																		bottom: 100%;
																	}
																	._62_ span.vacancy {
																		bottom: 0px;
																		padding: 4px 50px 10px 50px;
																		color: #333;
																		font-size: 10px;
																	}
																css*/}},[
																	['button', {class: 'btn-show'}, [
																		_.f({name: 'osm_lonlat', type: '*+'}),
																		_.f({name: 'show_adrs', type: 'action', front: {
																			onClick: "f_736db6527f71171e23cee7ee612d0fae",
																		}}),
																	]],
																	['span', {}, [
																		_.f({name: 'title', type: 'text-'}),
																	]],
																	['div', {class: ''}, [
																		_.c({name: 'vacancy', link: '__vacancy_free', add: false, process: {
																			tpl: (_, d)=>{ return [
																				['div', {class: ''}, [
																					['button', {class: 'btn-invite'}, [
																						_.f({name: 'vacancy_invite', type: 'action', front: {
																							onClick: "f_d1b901398cd453b0c9a18158c6320ea1",
																						}}),
																					]],
																					['span', {class: 'vacancy'}, [
																						_.f({name: 'title', type: 'text-'}),
																					]],
																				]],
																			]},
																		}, front: {
																			onItemLoad: "f_80619424f93febfaa4ae9200515cc850",
																		}}),		
																	]],
																]],
															]},
														}}),
													]],
												]],
											]},
										}}),
									]],
								]),
							]],
						]),
					]},
				}}),
			]],
		//]}),
	]],

]}

exports.process['.__poll__rate']['filter'] = {"l":1}
exports.process['.__poll__rate']['loaded'] = true
exports.process['.__poll__rate']['tpl'] = (_, d)=>{
						var parentData = !_.__.pre ? _.__.data[_.__.fields[_.parent].parent] : {};
					return [
						_.if(d.rate, ()=>[
							// тут надо вешать passive на item
						]),
						_.if(!d.rate, ()=>[
							['div', {class: 'rate-block'}, [
							
								_.f({name: 'rate', type: '*-'}),
								
								_.if(parentData.type == 'question', ()=>[
									
									['div', {class: 'pollStats _61_', style:()=>{/*css
										._61_ {
											white-space: nowrap;
										}
										._61_ > .label {
											padding-bottom: 10px;
											color: #888;
											text-align: right;
										}
										._61_ > .item {
											border: 2px solid #735a91;
											color: #888;
											text-align: center;
											margin: 5px;
											display: flex;
											justify-content: space-between;
										}
										._61_ > .item.y {
											color: white;
											border-color: #735a91;
											background-color: #735a91;											
										}
										._61_ > .item.n {
											color: #444;
											border-color: #777;
											background-color: #777;
										}
										._61_ > .item > p {
											margin: 0px;
										}
										._61_ > .item > span {
											color: #333;
											background-color: #735a91;
											padding: 0px 5px;
										}
										._61_ > .item.n > span, ._61_ > .item.y > span {
											color: #aaa;
											background-color: transparent;
										}
										._61_ > .item > span:hover {
											color: white;
											cursor: pointer;
										}
										body.theme-fantasy ._61_ {
											//padding-top: 10px;
											//padding-bottom: 40px;
										}
										body.theme-fantasy ._61_ > .item {
											border: none;
											white-space: pre-wrap;
											color: white;
											font-size: 12px;
											background-color: transparent!important;
										}
										body.theme-fantasy ._61_ > .item > span {
											color: #333;
											background-color: transparent;
											background-size: 36px;
											background-position: center;
											background-repeat: no-repeat;
											background-image: url(/static/img/button3.png);
											width: 36px;
											height: 36px;
											flex-shrink: 0;
											line-height: 34px;
										}
										body.theme-fantasy ._61_ > .item > p {
											display: flex;
											align-items: center;
											justify-content: center;
										}
										body.theme-fantasy ._61_ > .item.n > span, body.theme-fantasy ._61_ > .item.y > span {
											background-image: url(/static/img/button1.png);
											background-color: transparent;
											opacity: 0.5;
										}
										body.theme-fantasy ._61_ > .item.y > p {
											background-image: url(/static/img/panel1.png);
											background-size: contain;
											background-repeat: no-repeat;
											background-position: center;
											height: 36px;
											width: 140px;
											padding: 0px;
										}
										
										._61_ .notifyjs-container {
											min-width: 180px;
											max-width: 180px;
											white-space: normal;
										}
									css*/}},[
									
										_.f({name: 'stats', type: '*-'}),
										((_, d)=>{
											var result = [];
											if(d.stats){
												var keys = Object.keys(d.stats);
												const l = keys.length*1;
												for(var k=0;k<l;k++){
													var key = keys.splice( Math.floor(Math.random()*keys.length), 1)[0];
													if(key){try{
														result.push( ['div', {help: '["lst","stats","'+key+'"]', helpPosition: 'bottom right', stat: key, class: 'item'},[
															['span', {class: 'y', text: 'Да'}],
															['p', {text: LST.stats.lst[key].l}],
															['span', {class: 'n', text: 'Нет'}],
														]] );
													}catch(e){console.log(key,e)}}
												}
											}
											return result;
										})(_, d),
										
										_.script(()=>{
											$(document).off('click', '#guiPoll .pollStats > .item > span');
											$(document).on('click', '#guiPoll .pollStats > .item  > span', function(){
												
												var $this = $(this);
												
												var $item = $this.closest('.item');
												var $stats = $item.closest('.pollStats');
												
												$item.removeClass('y').removeClass('n').addClass('ready');
												$item.addClass($this.hasClass('y') ? 'y' : 'n');
												$item.find('> span').show();
												$this.hide();

											});
										}),										
									]],
								]),
								
								_.html('choiceRates', _, d),
							
								_.if(parentData.type == 'story', ()=>[
									['div', {class: ''}, [
										_.c({name: 'user', add: false, process: {
											tpl: (_, d)=>{ return [
												['div', {class: ''}, [
													['div', {class: ''}, [
														_.c({name: 'adrs', link: '__win_adrs', add: false, process: {
															tpl: (_, d)=>{ return [
																['div', {class: 'adrs _62_', style:()=>{/*css
																	._62_ {
																		display: none;
																		position: relative;
																		background-image: url(/static/img/panel6.png);
																		background-size: contain;
																		background-repeat: no-repeat;
																		background-position: top center;
																		margin-top: 20px;
																		height: 40px;
																	}
																	._62_.active {
																		display: block;
																	}
																	._62_ .complex-item {
																		position: inherit;
																	}
																	._62_ > .btn-show {
																		position: absolute;
																		width: 40px;
																		height: 40px;
																		background-image: url(/static/img/button1.png);
																		background-size: contain;
																		background-repeat: no-repeat;
																		background-position: top center;
																		background-color: transparent;
																		border: none;
																		top: 0px;
																		left: 8px;
																		cursor: pointer;
																		z-index: 1;
																	}
																	._62_ > .btn-show:after {
																		content: '';
																		background-image: url(/static/img/view.png);
																		background-repeat: no-repeat;
																		background-position: center;
																		background-size: 20px;
																		width: 100%;
																		height: 100%;
																		position: absolute;
																		left: 0px;
																		top: 0px;
																	}
																	._62_ .btn-invite {
																		position: absolute;
																		width: 40px;
																		height: 40px;
																		background-image: url(/static/img/button2.png);
																		background-size: contain;
																		background-repeat: no-repeat;
																		background-position: top center;
																		background-color: transparent;
																		border: none;
																		top: 0px;
																		right: 8px;
																		cursor: pointer;
																		z-index: 1;
																	}
																	._62_ .btn-invite:after {
																		content: '';
																		background-image: url(/static/img/q-icon.png);
																		background-position: center;
																		background-repeat: no-repeat;
																		background-size: 24px;
																		width: 100%;
																		height: 100%;
																		position: absolute;
																		left: 0px;
																		top: -2px;
																	}
																	._62_ > .btn-show:hover:after,
																	._62_ .btn-invite:hover:after {
																		opacity: 0.5;
																	}
																	._62_ span {
																		width: 100%;
																		text-align: center;
																		position: absolute;
																		bottom: 100%;
																	}
																	._62_ span.vacancy {
																		bottom: 0px;
																		padding: 4px 50px 10px 50px;
																		color: #333;
																		font-size: 10px;
																	}
																css*/}},[
																	['button', {class: 'btn-show'}, [
																		_.f({name: 'osm_lonlat', type: '*+'}),
																		_.f({name: 'show_adrs', type: 'action', front: {
																			onClick: "f_736db6527f71171e23cee7ee612d0fae",
																		}}),
																	]],
																	['span', {}, [
																		_.f({name: 'title', type: 'text-'}),
																	]],
																	['div', {class: ''}, [
																		_.c({name: 'vacancy', link: '__vacancy_free', add: false, process: {
																			tpl: (_, d)=>{ return [
																				['div', {class: ''}, [
																					['button', {class: 'btn-invite'}, [
																						_.f({name: 'vacancy_invite', type: 'action', front: {
																							onClick: "f_d1b901398cd453b0c9a18158c6320ea1",
																						}}),
																					]],
																					['span', {class: 'vacancy'}, [
																						_.f({name: 'title', type: 'text-'}),
																					]],
																				]],
																			]},
																		}, front: {
																			onItemLoad: "f_80619424f93febfaa4ae9200515cc850",
																		}}),		
																	]],
																]],
															]},
														}}),
													]],
												]],
											]},
										}}),
									]],
								]),
							]],
						]),
					]}
exports.html['.__poll__rate'] = {}
exports.html['.__poll__rate']['choiceRates'] = {}
exports.html['.__poll__rate']['choiceRates']['tpl'] = (_, d)=>{ return [

	['div', {class: 'choiceRatesBlock _63_', style:()=>{/*css
		._63_ {
			display: none;
			position: absolute;
			top: 0px;
			right: 0px;
			display: flex;
			height: 32px;
			width: 100%;
			justify-content: space-between;
			align-items: center;
		}
		._63_ > .rate {
			width: 32px;
			height: 32px;
			position: relative;
			cursor: pointer;
			flex-shrink: 0;
		}
		._63_ > .rate:hover {
			opacity: 0.5;
		}
		._63_ > .el {
			display: none;
			width: 160px;
			color: white;
			cursor: pointer;
			padding: 0px;
			text-align: center;
		}
		._63_.choice > .el:hover {
			opacity: 0.5;
		}
		._63_ > .el > button {
			padding: 0px;
			border: none;
			color: #00a95b;
			background: transparent;
		}
		._63_.choice > .el {
			display: block
		}
		._63_.choice > .rate:not(.active) {
			display: none;
		}
		._63_.choice > .rate.active {
			flex-shrink: 2;
			width: 100%;
			margin-right: 10px;
		}
		._63_.choice > .rate.active:after {
			width: 100%;
		}
		body.theme-fantasy ._63_ {
			font-size: 14px;
		}
		body.theme-fantasy ._63_ > .rate {
			height: 32px;
			width: 32px;
		}		
		body.theme-fantasy ._63_ > .el > button, body.theme-fantasy ._63_ > .el.close-btn {
			background-image: url(/static/img/button22.png);
			background-size: contain;
			background-repeat: no-repeat;
			height: 35px;
			line-height: 34px;
			font-size: 11px;
			min-width: 70px;
			text-align: center;
			background-position: center;
			color: white;
			padding-bottom: 4px;
		}
		body.theme-fantasy ._63_ > .el.close-btn {
			background-image: url(/static/img/button11.png);
			color: #333;
		}
	css*/}}, [ 
		
		(()=>{ return [1,2,3,4,5,6,7,8,9,10].map(i=>['div', {rate: i, class: 'rate rate-'+i}]) })(_, d),

		['div', {class: 'el close-btn', text: 'Изменить'}],
		
		['div', {class: 'el'}, [
			['button', {text: 'Сохранить'}, [
				_.f({name: 'save_rate', type: 'action', front: {
					onClick: "f_3124ce035387bc4d8ad8b9a73d9d47be",
				}}),
			]],
		]],
	]],

]}

exports.process['.__poll__rate__user']['loaded'] = true
exports.process['.__poll__rate__user']['tpl'] = (_, d)=>{ return [
												['div', {class: ''}, [
													['div', {class: ''}, [
														_.c({name: 'adrs', link: '__win_adrs', add: false, process: {
															tpl: (_, d)=>{ return [
																['div', {class: 'adrs _62_', style:()=>{/*css
																	._62_ {
																		display: none;
																		position: relative;
																		background-image: url(/static/img/panel6.png);
																		background-size: contain;
																		background-repeat: no-repeat;
																		background-position: top center;
																		margin-top: 20px;
																		height: 40px;
																	}
																	._62_.active {
																		display: block;
																	}
																	._62_ .complex-item {
																		position: inherit;
																	}
																	._62_ > .btn-show {
																		position: absolute;
																		width: 40px;
																		height: 40px;
																		background-image: url(/static/img/button1.png);
																		background-size: contain;
																		background-repeat: no-repeat;
																		background-position: top center;
																		background-color: transparent;
																		border: none;
																		top: 0px;
																		left: 8px;
																		cursor: pointer;
																		z-index: 1;
																	}
																	._62_ > .btn-show:after {
																		content: '';
																		background-image: url(/static/img/view.png);
																		background-repeat: no-repeat;
																		background-position: center;
																		background-size: 20px;
																		width: 100%;
																		height: 100%;
																		position: absolute;
																		left: 0px;
																		top: 0px;
																	}
																	._62_ .btn-invite {
																		position: absolute;
																		width: 40px;
																		height: 40px;
																		background-image: url(/static/img/button2.png);
																		background-size: contain;
																		background-repeat: no-repeat;
																		background-position: top center;
																		background-color: transparent;
																		border: none;
																		top: 0px;
																		right: 8px;
																		cursor: pointer;
																		z-index: 1;
																	}
																	._62_ .btn-invite:after {
																		content: '';
																		background-image: url(/static/img/q-icon.png);
																		background-position: center;
																		background-repeat: no-repeat;
																		background-size: 24px;
																		width: 100%;
																		height: 100%;
																		position: absolute;
																		left: 0px;
																		top: -2px;
																	}
																	._62_ > .btn-show:hover:after,
																	._62_ .btn-invite:hover:after {
																		opacity: 0.5;
																	}
																	._62_ span {
																		width: 100%;
																		text-align: center;
																		position: absolute;
																		bottom: 100%;
																	}
																	._62_ span.vacancy {
																		bottom: 0px;
																		padding: 4px 50px 10px 50px;
																		color: #333;
																		font-size: 10px;
																	}
																css*/}},[
																	['button', {class: 'btn-show'}, [
																		_.f({name: 'osm_lonlat', type: '*+'}),
																		_.f({name: 'show_adrs', type: 'action', front: {
																			onClick: "f_736db6527f71171e23cee7ee612d0fae",
																		}}),
																	]],
																	['span', {}, [
																		_.f({name: 'title', type: 'text-'}),
																	]],
																	['div', {class: ''}, [
																		_.c({name: 'vacancy', link: '__vacancy_free', add: false, process: {
																			tpl: (_, d)=>{ return [
																				['div', {class: ''}, [
																					['button', {class: 'btn-invite'}, [
																						_.f({name: 'vacancy_invite', type: 'action', front: {
																							onClick: "f_d1b901398cd453b0c9a18158c6320ea1",
																						}}),
																					]],
																					['span', {class: 'vacancy'}, [
																						_.f({name: 'title', type: 'text-'}),
																					]],
																				]],
																			]},
																		}, front: {
																			onItemLoad: "f_80619424f93febfaa4ae9200515cc850",
																		}}),		
																	]],
																]],
															]},
														}}),
													]],
												]],
											]}

exports.process['.__poll__rate__user__adrs']['loaded'] = true
exports.process['.__poll__rate__user__adrs']['tpl'] = (_, d)=>{ return [
																['div', {class: 'adrs _62_', style:()=>{/*css
																	._62_ {
																		display: none;
																		position: relative;
																		background-image: url(/static/img/panel6.png);
																		background-size: contain;
																		background-repeat: no-repeat;
																		background-position: top center;
																		margin-top: 20px;
																		height: 40px;
																	}
																	._62_.active {
																		display: block;
																	}
																	._62_ .complex-item {
																		position: inherit;
																	}
																	._62_ > .btn-show {
																		position: absolute;
																		width: 40px;
																		height: 40px;
																		background-image: url(/static/img/button1.png);
																		background-size: contain;
																		background-repeat: no-repeat;
																		background-position: top center;
																		background-color: transparent;
																		border: none;
																		top: 0px;
																		left: 8px;
																		cursor: pointer;
																		z-index: 1;
																	}
																	._62_ > .btn-show:after {
																		content: '';
																		background-image: url(/static/img/view.png);
																		background-repeat: no-repeat;
																		background-position: center;
																		background-size: 20px;
																		width: 100%;
																		height: 100%;
																		position: absolute;
																		left: 0px;
																		top: 0px;
																	}
																	._62_ .btn-invite {
																		position: absolute;
																		width: 40px;
																		height: 40px;
																		background-image: url(/static/img/button2.png);
																		background-size: contain;
																		background-repeat: no-repeat;
																		background-position: top center;
																		background-color: transparent;
																		border: none;
																		top: 0px;
																		right: 8px;
																		cursor: pointer;
																		z-index: 1;
																	}
																	._62_ .btn-invite:after {
																		content: '';
																		background-image: url(/static/img/q-icon.png);
																		background-position: center;
																		background-repeat: no-repeat;
																		background-size: 24px;
																		width: 100%;
																		height: 100%;
																		position: absolute;
																		left: 0px;
																		top: -2px;
																	}
																	._62_ > .btn-show:hover:after,
																	._62_ .btn-invite:hover:after {
																		opacity: 0.5;
																	}
																	._62_ span {
																		width: 100%;
																		text-align: center;
																		position: absolute;
																		bottom: 100%;
																	}
																	._62_ span.vacancy {
																		bottom: 0px;
																		padding: 4px 50px 10px 50px;
																		color: #333;
																		font-size: 10px;
																	}
																css*/}},[
																	['button', {class: 'btn-show'}, [
																		_.f({name: 'osm_lonlat', type: '*+'}),
																		_.f({name: 'show_adrs', type: 'action', front: {
																			onClick: "f_736db6527f71171e23cee7ee612d0fae",
																		}}),
																	]],
																	['span', {}, [
																		_.f({name: 'title', type: 'text-'}),
																	]],
																	['div', {class: ''}, [
																		_.c({name: 'vacancy', link: '__vacancy_free', add: false, process: {
																			tpl: (_, d)=>{ return [
																				['div', {class: ''}, [
																					['button', {class: 'btn-invite'}, [
																						_.f({name: 'vacancy_invite', type: 'action', front: {
																							onClick: "f_d1b901398cd453b0c9a18158c6320ea1",
																						}}),
																					]],
																					['span', {class: 'vacancy'}, [
																						_.f({name: 'title', type: 'text-'}),
																					]],
																				]],
																			]},
																		}, front: {
																			onItemLoad: "f_80619424f93febfaa4ae9200515cc850",
																		}}),		
																	]],
																]],
															]}

exports.process['.__poll__rate__user__adrs__vacancy']['loaded'] = true
exports.process['.__poll__rate__user__adrs__vacancy']['tpl'] = (_, d)=>{ return [
																				['div', {class: ''}, [
																					['button', {class: 'btn-invite'}, [
																						_.f({name: 'vacancy_invite', type: 'action', front: {
																							onClick: "f_d1b901398cd453b0c9a18158c6320ea1",
																						}}),
																					]],
																					['span', {class: 'vacancy'}, [
																						_.f({name: 'title', type: 'text-'}),
																					]],
																				]],
																			]}

exports.process['.____game']['loaded'] = true
exports.process['.____game']['parentDataNotRequired'] = true
exports.process['.____game']['id'] = (__, code, callback)=>{
						var field = __.fields[code];
						__.queryIds[code] = [__.user.config.game];
						__.queryFields[field.linecode]['best.'+moment().add(-1, 'days').format('DDMMYY')] = 1;
						callback();
					}
exports.process['.____game']['tpl'] = (_, d)=>{ return [
					
						['div', {class: '_54_', style:()=>{/*css
							._54_ {
								display: flex;
								flex-wrap: wrap;
								width: 100%;
								padding-top: 10px;
							}
							body.isMobile ._54_ {
								margin-right: 0px;
							}
							._54_ > .complex-item {
								width: 100%;
								min-height: 50px;
								background-image: url(/static/img/panel6.png);
								background-size: 180px;
								background-repeat: no-repeat;
								background-position: center top;
							}
						css*/}},[
						
							_.c({name: 'poll_del', add: false, process: {
								parentDataNotRequired: true,
								id: (__, code, callback)=>{
									var field = __.fields[code];
									var data = __.data[field.parent];
									var b = data.best ? data.best[moment().add(-1, 'days').format('DDMMYY')] : false;

									__.queryIds[code] = [];
									__.queryIds[code].push(Object.assign({label: 'Вопрос дня', type: 'question'}, 
										b&&b.question ? {_id: b.question.id, rate: b.question.rate.toFixed(1)} : {_id: true}
									));
									__.queryIds[code].push(Object.assign({label: 'Ответ дня', type: 'answer'}, 
										b&&b.answer ? {_id: b.answer.id, rate: b.answer.rate.toFixed(1)} : {_id: true}
									));
									__.queryIds[code].push(Object.assign({label: 'Идея дня', type: 'story'}, 
										b&&b.idea ? {_id: b.idea.id, rate: b.idea.rate.toFixed(1)} : {_id: true}
									));
									__.queryIds[code].push(Object.assign({label: 'История дня', type: 'story'}, 
										b&&b.story ? {_id: b.story.id, rate: b.story.rate.toFixed(1)} : {_id: true}
									));
									
									callback();
								},
								tpl: (_, d)=>{ return [
									['div', {class: 'label _55_', style:()=>{/*css
										._55_ > .header {
											color: #444;
											width: 100%;
											text-align: center;
											margin-bottom: 20px;
											padding-top: 4px;
										}
										._55_ > span {
											position: absolute;
											top: 6px;
											right: 22px;
											background-image: url(/static/img/button2.png);
											background-size: contain;
											width: 30px;
											height: 30px;
											background-position: center;
											background-repeat: no-repeat;
											color: white;
											text-align: center;
											line-height: 28px;
										}
										._55_ > .text {
											color: white;
											padding: 10px;
											text-align: center;
										}
										._55_ > .text > .context {
											color: #412c17;
											font-size: 11px;
											text-align: right;
											padding-left: 30%;
										}
										._55_ > .text > .user {
											color: #412c17;
											font-size: 12px;
											font-family: 'TTWPGOTT';
											font-weight: normal;
										}
									css*/}}, [
										['div', {class: 'header', text: d.label}],
										['div', {class: 'text'}, [
											_.if(d.type == 'question', ()=>[
												_.c({name: 'question', add: false, process: {
													tpl: (_, d)=>{ return [
														_.f({name: 'text', type: 'input--', value: ''}),
														['div', {class: 'user'}, [
															_.c({name: 'user', add: false, process: {
																tpl: (_, d)=>{ return [
																	_.f({name: 'title', type: 'input--', value: ''}),
																]},
															}}),
														]],
													]},
												}}),
											]),
											_.if(d.type == 'answer', ()=>[
												_.c({name: 'answer', add: false, process: {
													tpl: (_, d)=>{ return [
														['div', {class: 'context'}, [
															_.c({name: 'question', add: false, process: {
																tpl: (_, d)=>{ return [
																	_.f({name: 'text', type: 'input--', value: ''}),
																]},
															}}),														
														]],
														_.f({name: 'text', type: 'input--', value: ''}),
														['div', {class: 'user'}, [
															_.c({name: 'user', add: false, process: {
																tpl: (_, d)=>{ return [
																	_.f({name: 'title', type: 'input--', value: ''}),
																]},
															}}),
														]],
													]},
												}})
											]),
											_.if(d.type == 'story', ()=>[
												_.c({name: 'story', add: false, process: {
													tpl: (_, d)=>{ return [
														_.f({name: 'text', type: 'input--', value: ''}),
														['div', {class: 'user'}, [
															_.c({name: 'user', add: false, process: {
																tpl: (_, d)=>{ return [
																	_.f({name: 'title', type: 'input--', value: ''}),
																]},
															}}),
														]],
													]},
												}})
											]),
										]],
										_.if(d.rate, ()=>[
											['span', {}, [
												_.f({name: 'rate', type: 'text'}),
											]],
										]),
									]],
								]},
							}}),
						]],
					]}

exports.process['.____game__poll_del']['loaded'] = true
exports.process['.____game__poll_del']['parentDataNotRequired'] = true
exports.process['.____game__poll_del']['id'] = (__, code, callback)=>{
									var field = __.fields[code];
									var data = __.data[field.parent];
									var b = data.best ? data.best[moment().add(-1, 'days').format('DDMMYY')] : false;

									__.queryIds[code] = [];
									__.queryIds[code].push(Object.assign({label: 'Вопрос дня', type: 'question'}, 
										b&&b.question ? {_id: b.question.id, rate: b.question.rate.toFixed(1)} : {_id: true}
									));
									__.queryIds[code].push(Object.assign({label: 'Ответ дня', type: 'answer'}, 
										b&&b.answer ? {_id: b.answer.id, rate: b.answer.rate.toFixed(1)} : {_id: true}
									));
									__.queryIds[code].push(Object.assign({label: 'Идея дня', type: 'story'}, 
										b&&b.idea ? {_id: b.idea.id, rate: b.idea.rate.toFixed(1)} : {_id: true}
									));
									__.queryIds[code].push(Object.assign({label: 'История дня', type: 'story'}, 
										b&&b.story ? {_id: b.story.id, rate: b.story.rate.toFixed(1)} : {_id: true}
									));
									
									callback();
								}
exports.process['.____game__poll_del']['tpl'] = (_, d)=>{ return [
									['div', {class: 'label _55_', style:()=>{/*css
										._55_ > .header {
											color: #444;
											width: 100%;
											text-align: center;
											margin-bottom: 20px;
											padding-top: 4px;
										}
										._55_ > span {
											position: absolute;
											top: 6px;
											right: 22px;
											background-image: url(/static/img/button2.png);
											background-size: contain;
											width: 30px;
											height: 30px;
											background-position: center;
											background-repeat: no-repeat;
											color: white;
											text-align: center;
											line-height: 28px;
										}
										._55_ > .text {
											color: white;
											padding: 10px;
											text-align: center;
										}
										._55_ > .text > .context {
											color: #412c17;
											font-size: 11px;
											text-align: right;
											padding-left: 30%;
										}
										._55_ > .text > .user {
											color: #412c17;
											font-size: 12px;
											font-family: 'TTWPGOTT';
											font-weight: normal;
										}
									css*/}}, [
										['div', {class: 'header', text: d.label}],
										['div', {class: 'text'}, [
											_.if(d.type == 'question', ()=>[
												_.c({name: 'question', add: false, process: {
													tpl: (_, d)=>{ return [
														_.f({name: 'text', type: 'input--', value: ''}),
														['div', {class: 'user'}, [
															_.c({name: 'user', add: false, process: {
																tpl: (_, d)=>{ return [
																	_.f({name: 'title', type: 'input--', value: ''}),
																]},
															}}),
														]],
													]},
												}}),
											]),
											_.if(d.type == 'answer', ()=>[
												_.c({name: 'answer', add: false, process: {
													tpl: (_, d)=>{ return [
														['div', {class: 'context'}, [
															_.c({name: 'question', add: false, process: {
																tpl: (_, d)=>{ return [
																	_.f({name: 'text', type: 'input--', value: ''}),
																]},
															}}),														
														]],
														_.f({name: 'text', type: 'input--', value: ''}),
														['div', {class: 'user'}, [
															_.c({name: 'user', add: false, process: {
																tpl: (_, d)=>{ return [
																	_.f({name: 'title', type: 'input--', value: ''}),
																]},
															}}),
														]],
													]},
												}})
											]),
											_.if(d.type == 'story', ()=>[
												_.c({name: 'story', add: false, process: {
													tpl: (_, d)=>{ return [
														_.f({name: 'text', type: 'input--', value: ''}),
														['div', {class: 'user'}, [
															_.c({name: 'user', add: false, process: {
																tpl: (_, d)=>{ return [
																	_.f({name: 'title', type: 'input--', value: ''}),
																]},
															}}),
														]],
													]},
												}})
											]),
										]],
										_.if(d.rate, ()=>[
											['span', {}, [
												_.f({name: 'rate', type: 'text'}),
											]],
										]),
									]],
								]}

exports.process['.____game__poll_del__question']['loaded'] = true
exports.process['.____game__poll_del__question']['tpl'] = (_, d)=>{ return [
														_.f({name: 'text', type: 'input--', value: ''}),
														['div', {class: 'user'}, [
															_.c({name: 'user', add: false, process: {
																tpl: (_, d)=>{ return [
																	_.f({name: 'title', type: 'input--', value: ''}),
																]},
															}}),
														]],
													]}

exports.process['.____game__poll_del__question__user']['loaded'] = true
exports.process['.____game__poll_del__question__user']['tpl'] = (_, d)=>{ return [
																	_.f({name: 'title', type: 'input--', value: ''}),
																]}

exports.process['.____game__poll_del__answer']['loaded'] = true
exports.process['.____game__poll_del__answer']['tpl'] = (_, d)=>{ return [
														['div', {class: 'context'}, [
															_.c({name: 'question', add: false, process: {
																tpl: (_, d)=>{ return [
																	_.f({name: 'text', type: 'input--', value: ''}),
																]},
															}}),														
														]],
														_.f({name: 'text', type: 'input--', value: ''}),
														['div', {class: 'user'}, [
															_.c({name: 'user', add: false, process: {
																tpl: (_, d)=>{ return [
																	_.f({name: 'title', type: 'input--', value: ''}),
																]},
															}}),
														]],
													]}

exports.process['.____game__poll_del__answer__question']['loaded'] = true
exports.process['.____game__poll_del__answer__question']['tpl'] = (_, d)=>{ return [
																	_.f({name: 'text', type: 'input--', value: ''}),
																]}

exports.process['.____game__poll_del__answer__user']['loaded'] = true
exports.process['.____game__poll_del__answer__user']['tpl'] = (_, d)=>{ return [
																	_.f({name: 'title', type: 'input--', value: ''}),
																]}

exports.process['.____game__poll_del__story']['loaded'] = true
exports.process['.____game__poll_del__story']['tpl'] = (_, d)=>{ return [
														_.f({name: 'text', type: 'input--', value: ''}),
														['div', {class: 'user'}, [
															_.c({name: 'user', add: false, process: {
																tpl: (_, d)=>{ return [
																	_.f({name: 'title', type: 'input--', value: ''}),
																]},
															}}),
														]],
													]}

exports.process['.____game__poll_del__story__user']['loaded'] = true
exports.process['.____game__poll_del__story__user']['tpl'] = (_, d)=>{ return [
																	_.f({name: 'title', type: 'input--', value: ''}),
																]}

