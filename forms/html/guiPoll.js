exports.tpl = (_, d)=>{ return [

	['label', {class: 'mct poll-toggle *css*', style:()=>{/*css
		.*css* {
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
		.*css*:after {
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
		.*css*.active:after {
			//background-image: url(/static/img/close-white.png);
			background-image: url(/static/img/close1.png);
		}
		.*css*.active {
			font-size: 0px;
			cursor: pointer;
			background-image: url(/static/img/button1.png);
		}
		body.isMobile .*css*.active:after {
			background-image: url(/static/img/close1.png);
		}
	css*/}},[
		['span', {class: 'h', text: 'Опросы'}],
		_.f({name: 'togglePoll', type: 'action', front: {
			onClick: function (e, data){
				var $guiPoll = $('#guiPoll');
				$guiPoll.toggleClass('active');
				$guiPoll.find('> .poll-content').toggleClass('active');
				$guiPoll.find('> .poll-toggle').toggleClass('active');
				if($guiPoll.hasClass('active')) window.scrollCheck( $guiPoll.find('.list-block') );
			},
		}}),
	]],

	['div', {class: 'mcb poll-content *css*', style:()=>{/*css
		.*css* {
			text-align: left;
			border-left: 0px;
			height: 100%;
			padding-top: 40px;
			padding-bottom: 10px;
			padding-right: 10px;
			font-size: 13px;
		}
		.*css*.active {
			background-image: url(/static/img/panel3.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: top left;
			padding-top: 80px;
			padding-left: 40px;
			padding-right: 40px;
			padding-bottom: 120px;
		}
		.*css*.tutorial-hide {
			display:none;
		}
		.*css*.active > .list-block, .*css*.active > .find-poll {
			display: block;
		}
		
		body.isMobile .*css*.active {
			max-width: 300px;
			margin: auto;
		}
		
		.*css* .tutorial-active {
			-webkit-animation: tutorial_active 1s infinite alternate;
			-moz-animation: tutorial_active 1s infinite alternate;
			-ms-animation: tutorial_active 1s infinite alternate;
			-o-animation: tutorial_active 1s infinite alternate;
			animation: tutorial_active 1s infinite alternate;
		}
	css*/}},[
	
		['div', {class: 'f-slb find-poll *css*', style:()=>{/*css
			.*css* {
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
			.*css* > div {
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
			.*css* > div > button {
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
			.*css* > div > button:after {
				content: 'Найти\000aопрос';
				text-align: center;
				position: absolute;
				top: 10px;
				left: 0px;
				width: 100%;
				white-space: pre-wrap;
				line-height: 14px;
			}
			.*css* > div > button.passive:after {
				//content: 'Следующий';
			}
			.*css* > div > button:hover:after {
				opacity: 0.5;
			}
			
			.*css* > div > button.tutorial-active {
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
						onClick: function (e, data){
							if(!e.hasClass('tutorial-disabled')){
								wsSendCallback({action: '', code: e.attr('code'), passive: e.hasClass('passive')}, 
									function(data){ reloadComplex( $('#singlePoll > .complex-block') ) }, 
									function(data){ reloadComplex( $('#singlePoll > .complex-block') ) }
								);
							}
						},
					}}),
				]],
			]],
			
			['button', {id: 'toggleBestPoll', class: 'passive *css*', style:()=>{/*css
				.*css* {
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
				.*css*:after {
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
				.*css*.passive {
					background-image: url(/static/img/button1.png);
				}
				.*css*.passive:after {
					background-image: url(/static/img/close1.png);
				}
			css*/}}, [
				_.f({name: 'toggle_best', type: 'action', front: {
					onClick: function (e, data){
						if(e.hasClass('passive')){
							e.removeClass('passive');
							$('#singlePoll').addClass('active');
							$('#bestPoll').removeClass('active');
						}else{
							e.addClass('passive');
							$('#bestPoll').addClass('active');
							$('#singlePoll').removeClass('active');
						}
					},
				}}),
			]],
		]],

		
		['div', {id: 'singlePoll', class: '*css*', style:()=>{/*css
			.*css* {
				width: 100%;
				height: 100%;
				background-color: #d5ad51;
				border-radius: 5px;
				overflow: hidden;
				display: none;
			}
			.*css*.active {
				display: flex;
			}
			.*css*:after {
				content: '';
				width: 100%;
				flex-shrink: 1000;
			}
		css*/}},[
		
			['div', {class: 'scroller *css*', style:()=>{/*css
			css*/}}, [
				['div', {class: 'handle'}]
			]],
			
			['div', {onscroll: 'window.scrollMe(this)', class: 'scroll-content f-slb *css*', style:()=>{/*css
				.*css* > .empty {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100%;
				}
				.*css* > .empty > label {
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
					onItemLoad: function (e, d){
						$('#findPoll').addClass('passive');
						$('#bestPoll').removeClass('active');
						$('#toggleBestPoll').removeClass('passive');
						$('#singlePoll').addClass('active');
					},
				}}),
			]],
		
		]],

		['div', {id: 'bestPoll', class: 'active *css*', style:()=>{/*css
			.*css* {
				width: 100%;
				height: 100%;
				background-color: #d5ad51;
				border-radius: 5px;
				overflow: hidden;
				display: none;
			}
			.*css*.active {
				display: flex;
			}
		css*/}},[
		
			['div', {class: 'scroller *css*', style:()=>{/*css
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
					
						['div', {class: '*css*', style:()=>{/*css
							.*css* {
								display: flex;
								flex-wrap: wrap;
								width: 100%;
								padding-top: 10px;
							}
							body.isMobile .*css* {
								margin-right: 0px;
							}
							.*css* > .complex-item {
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
									['div', {class: 'label *css*', style:()=>{/*css
										.*css* > .header {
											color: #444;
											width: 100%;
											text-align: center;
											margin-bottom: 20px;
											padding-top: 4px;
										}
										.*css* > span {
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
										.*css* > .text {
											color: white;
											padding: 10px;
											text-align: center;
										}
										.*css* > .text > .context {
											color: #412c17;
											font-size: 11px;
											text-align: right;
											padding-left: 30%;
										}
										.*css* > .text > .user {
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


exports.func = ()=>{

}

exports.script = ()=>{

}

exports.style = ()=>{/*

*/}