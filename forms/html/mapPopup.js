exports.tpl = (_, d)=>{ return [

	['div', {id: 'mapPopup', class: 'mcb *css*', style:()=>{/*css
		.*css* {
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
		.*css* > .map-popup-content {
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
		.*css* > .map-popup-content > .complex-item {
			overflow-x: hidden;
			overflow-y: scroll;
			height: 100%;
			margin-right: -30px;
			padding-right: 10px;
		}
		body.isMobile .*css* > .map-popup-content > .complex-item {
			margin-right: -10px;
		}
	css*/}}, [
		
		['div', {id: 'mapPopupClose', class: 'btn-close'}],
		
		['div', {class: '*css*', style:()=>{/*css
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
					['div', {class: '*css*', style:()=>{/*css
						.*css* > .state, .*css* > .city, .*css* > .population {
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
					
						['div', {class: 'vote *css*', style:()=>{/*css
							.*css* {
								width: 100%;
								display: flex;
							}
							.*css* > div {
								width: 50%;
							}
							body.theme-fantasy .*css* > div {
								width: 100%;
							}
							body.theme-fantasy .*css* > .population {
								//display: none;
							}
						css*/}}, [
							['div', {class: '*css*', style:()=>{/*css
								.*css* > .controls {
									display: flex;
									flex-wrap: wrap;
									justify-content: center;
									border-radius: 10px;
									margin-top: 4px;
									background-color: #018da8;
									margin: 5px;
								}
								.*css* > .controls > a {
									width: 100%;
								}
								.*css* > .controls > .i {
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
								.*css* > .controls > .i:not([query]) {
									width: 60px;
									margin-left: 65px;
									margin-top: 0px;
									margin-bottom: 10px;
								}
								.*css* > .controls > .i > span {
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
								.*css* > .controls > .i.expert > span {
									background-color: #00a95b;
									background-image: url(/static/img/expert-icon.png);
								}
								.*css* > .controls > .i.candidate > span {
									background-color: #735a91;
									background-image: url(/static/img/candidate-icon.png);
								}
								.*css* > .controls > .i:before {
									color: white;
									width: 40px;
									position: absolute;
									left: -60px;
									text-align: left;
									bottom: -6px;
								}
								.*css* > .controls > #mapPopupNewVote:before {
									content: 'Начать новые выборы';
								}
								.*css* > .controls > #mapPopupAddCandidate:before {
									content: 'Стать кандидатом';
								}
								.*css* > .controls > #mapPopupAddExpert:before {
									content: 'Стать экспертом';
								}
								body.theme-fantasy .*css* > .complex-item {
									background-image: url(/static/img/panel6.png);
									background-size: contain;
									background-repeat: no-repeat;
									background-position: top center;
								}
								body.theme-fantasy .*css* > .controls {
									background-color: transparent;
									//flex-wrap: nowrap;
								}
								body.theme-fantasy .*css* > .controls.complex-item {
									padding-top: 50px;
								}	
								body.theme-fantasy .*css* > .controls > .i {
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
								body.theme-fantasy .*css* > .controls > .i:before {
									position: relative;
									width: 65%;
									padding-left: 5%;
									text-align: center;
									font-size: 13px;
									left: 0px;
									top: 0px;
								}
								body.theme-fantasy .*css* > .controls > .i > span {
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
								body.theme-fantasy .*css* > .controls > .show {
									position: absolute;
									background-image: url(/static/img/button1.png);
									width: 30px;
									top: 0px;
									left: 20px;
								}
								body.theme-fantasy .*css* > .controls > .show:after {
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
												
												['div', {class: '*css*', style:()=>{/*css
													.*css* {
														width: 100%;
														color: white;
														font-size: 18px;
														text-align: center;
														padding-top: 10px;
													}
													body.theme-fantasy .*css* {
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
						
						['div', {class: '*css*', style:()=>{/*css
							.*css* > .info {
								position: relative;
								color: white;
								border: 2px solid #018da8;
								padding: 4px;
								padding-left: 30px;
								margin: 4px 0px;
							}
							body.theme-fantasy .*css* > .info {
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
							body.theme-fantasy .*css* > .info > div {
								text-align: center;
								width: 100%;
								font-size: 10px;
								line-height: 8px;
							}
							body.theme-fantasy .*css* > .info > span {
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
							body.theme-fantasy .*css* > .info.money > div {
								font-size: 18px;
							}
							body.theme-fantasy .*css* > .info.money > span {
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
							
							['div', {class: '*css*', style:()=>{/*css
								.*css* {
									display: flex;
									flex-wrap: wrap;
								}
								.*css* > span {
									width: 100%;
									padding: 4px 0px;
								}
								.*css* > div {
									margin: 0px 2px;
									width: 20px;
									height: 20px;
									background-size: cover;
									background-position: center;
									background-repeat: no-repeat;
									background-image: url(/static/img/population.png);
								}
								.*css* > div.n10k { height: 30px; }
								.*css* > div.n100k { height: 40px; }
								.*css* > div.n1kk { height: 50px; }
								.*css* > div.n10kk { height: 60px; }
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

exports.script = ()=>{

}

exports.style = ()=>{/*

	#mapPopup .restriction {
		color: white;
		border: 2px solid;
		border-radius: 10px;
		margin: 5px;
		text-align: center;
	}
	#mapPopup .restriction > .exp, #mapPopup .restriction > .power {
		padding-left: 30px;
		margin-left: 20px;
		position: relative;
		text-align: left;
	}
	#mapPopup .restriction > .exp:before, #mapPopup .restriction > .power:before {
		content: '';
		position: absolute;
		top: 0px;
		left: 0px;
		width: 20px;
		height: 20px;
		background-size: 20px;
		background-position: center;
		background-repeat: no-repeat;
	}
	#mapPopup .restriction > .exp:before {
		background-image: url(/static/img/exp-icon.png);
	}
	#mapPopup .restriction > .power:before {
		background-image: url(/static/img/power-icon.png);
	}
	
	body.theme-fantasy #mapPopup .restriction {
		background-image: url(/static/img/panel5.png);
		background-size: contain;
		background-position: top center;
		background-repeat: no-repeat;
		border: none;
		padding: 8px 30px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-around;
	}
	body.theme-fantasy #mapPopup .restriction > * {
		margin: 0px;
	}
	
	#mapPopupContent div.custom-vote {
		background: transparent;
		width: 100%;
		text-align: center;
		border: 2px solid;
		margin-top: 10px;
		cursor: pointer;
	}
	#mapPopupContent div.custom-vote:before {
		content: 'Добавить новые выборы';
	}
	body.theme-fantasy #mapPopupContent div.custom-vote {
		background: #412c17;
		width: 100px;
		border-radius: 10px;
		font-size: 11px;
		border: none;
		margin: auto;
	}
*/}