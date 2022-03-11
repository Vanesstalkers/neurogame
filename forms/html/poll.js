exports.tpl = (_, d)=>{

	if(_.filter == undefined) _.filter = {};
	if(d.tutorial) _.filter.force = true;
	
return [

	['div', {skey: md5(d._id+d.dateto), dateto: d.dateto, realParent: _.filter.force ? _.parent : undefined, class: (_.filter.force ? ' loaded force ': ' ')+(d.tutorial?' tutorial-poll ':' ')+(' tutorial-'+d.type)+(_.filter.rate?' active ':' ')+' poll-skey item poll-item *css*', style:()=>{/*css
		.*css* {
			padding: 4px 10px;
			padding-top: 8px;
			margin: 10px;
			margin-top: 20px;
			border: 2px solid #444;
			border-top: none;
			direction: ltr;
		}
		.*css* > .item-controls {
			display: none!important;
		}
		.*css*:not(.passive):hover, .*css*:not(.passive):hover > label > * {
			border-color: #ccc;
		}
		.*css*.passive, .*css*.passive > label {
			color: #666;
		}
		.*css*:not(.passive) > .text {
			cursor: pointer;
		}
		.*css*:not(.active) > .rates, .*css*:not(.active) > .context {
			//display: none;
		}
		body.theme-fantasy .*css* {
			border: none;
			background: rgba(213, 173, 81, 1);
			border-radius: 5px;
			margin: 0px;
			padding: 5px;
			color: white;
			width: 100%;
		}
		body.theme-fantasy .*css* > label {
			display: none
		}
		body.theme-fantasy .*css*.passive {
			color: rgb(65, 44, 23);
			border: 2px solid rgb(65, 44, 23);
			background: none;
		}
	css*/}},[
	
		_.f({name: 'type', type: '*-'}),
		_.f({name: 'tutorial', type: '*-'}),
		_.f({name: 'waitForModeration', type: '*-'}),
		_.f({name: 'dateto', type: '*-', front: {
			onLoadElement: function (e){
				var skey = e.attr('skey');
				if(skey && localStorage['poll_'+skey]){
					e.addClass('passive');
					e.find('> label > div.check').removeClass('check');
				}
			},
		}}),
	
		['label', {class: 'type-'+d.type+' *css*', style:()=>{/*css
			.*css* {
				position: absolute;
				top: 0px;
				left: 0px;
				display: flex;
				width: 100%;
			}
			.*css*.type-question {
				color: #735a91;
			}
			.*css*.type-answer {
				color: #00a95b;
			}
			.*css* > p {
				border-top: 2px solid #444;
				width: 100%;
				margin: 0px;
			}
			.*css* > p.w10 {
				width: 10px;
			}
			.*css* > div {
				padding: 0px 10px;
				margin-top: -14px;
				position: relative;
			}
			.*css* > div.check {
				padding-left: 40px;
			}
			.*css* > div.check:before {
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
		
			['div', {class: 'context *css*', style:()=>{/*css
				.*css* > div {
					color: #888;
					display: flex;
				}
				.*css* > div > p {
					font-size: 16px;
					margin: 0px;
				}
				.*css* > div > span {
					text-align: right;
					width: 100%;
					padding-left: 10px;
				}
				body.theme-fantasy .*css* > div > span {
					color: #412c17;
					font-size: 11px;
				}
				body.theme-fantasy .*css* > div > p {
					display: none;
				}
			css*/}},[
				['div', {}, [
					['p', {text: d.type == 'question' ? 'Кому\xa0задан' : 'Вопрос'}],
					['span', {}, [
						_.f({name: 'context', type: 'text-', front: {
							onLoadElement: function (e){
								e.closest('.item').addClass('loaded');
							},
						}}),
					]],
				]],
			]],
			
			['div', {class: 'text *css*', style:()=>{/*css
				
			css*/}},[
				_.f({name: 'text', type: 'text-'}),
			]],			
		
			['div', {class: 'rates *css*', style:()=>{/*css
				.*css* {
					position: relative;
				}
				.*css* > .rate-block {
					margin-top: 40px;
					padding: 10px 0px;
				}
				.*css* > .rate-block > .choiceRatesBlock {
					height: auto;
					padding-top: 10px;
					//top: -30px;
					//right: 2px;
				}
				.*css* > .rate-block > .select2 {
					width: 100%!important;
				}
				.*css* > .rate-block > .select2 > .selection > .select2-selection {
					background: transparent;
					border: none;
					cursor: pointer;
				}
				.*css* > .rate-block > .select2 > .selection > .select2-selection > ul {
					display: flex;
					flex-wrap: wrap;
					justify-content: flex-end;
					padding: 0px;
					width: 100%;
				}
				.*css* > .rate-block > .select2 > .selection > .select2-selection > ul > li.select2-selection__choice {
					background-color: transparent;
					color: #999;
					border: 2px solid #735a91;
				}
				.*css* > .rate-block > .select2 > .selection > .select2-selection > ul > li.select2-search {
					order: -1;
					width: 100%;
					height: 32px;
					border: 2px solid #735a91;
					border-radius: 5px;
				}
				.*css* > .rate-block > .select2 > .selection > .select2-selection > ul > li.select2-search > input {
					text-align: right;
					width: 100%!important;
					color: #999;
					padding-right: 10px;
				}
				.*css* > .rate-block > .select2 > .selection > .select2-selection > ul > li.select2-search:before {
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
				body.theme-fantasy .*css* > .rate-block {
					padding-top: 30px;
					padding: 0px;
					margin: 0px;
				}
				body.theme-fantasy .*css* > .rate-block > .choiceRatesBlock {
					flex-wrap: wrap;
					position: relative;
				}
				body.theme-fantasy .*css* > .rate-block > .choiceRatesBlock > .rate {
					width: 20%;
				}
				body.theme-fantasy .*css* > .rate-block > .choiceRatesBlock > .el {
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
									
									['div', {class: 'pollStats *css*', style:()=>{/*css
										.*css* {
											white-space: nowrap;
										}
										.*css* > .label {
											padding-bottom: 10px;
											color: #888;
											text-align: right;
										}
										.*css* > .item {
											border: 2px solid #735a91;
											color: #888;
											text-align: center;
											margin: 5px;
											display: flex;
											justify-content: space-between;
										}
										.*css* > .item.y {
											color: white;
											border-color: #735a91;
											background-color: #735a91;											
										}
										.*css* > .item.n {
											color: #444;
											border-color: #777;
											background-color: #777;
										}
										.*css* > .item > p {
											margin: 0px;
										}
										.*css* > .item > span {
											color: #333;
											background-color: #735a91;
											padding: 0px 5px;
										}
										.*css* > .item.n > span, .*css* > .item.y > span {
											color: #aaa;
											background-color: transparent;
										}
										.*css* > .item > span:hover {
											color: white;
											cursor: pointer;
										}
										body.theme-fantasy .*css* {
											//padding-top: 10px;
											//padding-bottom: 40px;
										}
										body.theme-fantasy .*css* > .item {
											border: none;
											white-space: pre-wrap;
											color: white;
											font-size: 12px;
											background-color: transparent!important;
										}
										body.theme-fantasy .*css* > .item > span {
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
										body.theme-fantasy .*css* > .item > p {
											display: flex;
											align-items: center;
											justify-content: center;
										}
										body.theme-fantasy .*css* > .item.n > span, body.theme-fantasy .*css* > .item.y > span {
											background-image: url(/static/img/button1.png);
											background-color: transparent;
											opacity: 0.5;
										}
										body.theme-fantasy .*css* > .item.y > p {
											background-image: url(/static/img/panel1.png);
											background-size: contain;
											background-repeat: no-repeat;
											background-position: center;
											height: 36px;
											width: 140px;
											padding: 0px;
										}
										
										.*css* .notifyjs-container {
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
																['div', {class: 'adrs *css*', style:()=>{/*css
																	.*css* {
																		display: none;
																		position: relative;
																		background-image: url(/static/img/panel6.png);
																		background-size: contain;
																		background-repeat: no-repeat;
																		background-position: top center;
																		margin-top: 20px;
																		height: 40px;
																	}
																	.*css*.active {
																		display: block;
																	}
																	.*css* .complex-item {
																		position: inherit;
																	}
																	.*css* > .btn-show {
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
																	.*css* > .btn-show:after {
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
																	.*css* .btn-invite {
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
																	.*css* .btn-invite:after {
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
																	.*css* > .btn-show:hover:after,
																	.*css* .btn-invite:hover:after {
																		opacity: 0.5;
																	}
																	.*css* span {
																		width: 100%;
																		text-align: center;
																		position: absolute;
																		bottom: 100%;
																	}
																	.*css* span.vacancy {
																		bottom: 0px;
																		padding: 4px 50px 10px 50px;
																		color: #333;
																		font-size: 10px;
																	}
																css*/}},[
																	['button', {class: 'btn-show'}, [
																		_.f({name: 'osm_lonlat', type: '*+'}),
																		_.f({name: 'show_adrs', type: 'action', front: {
																			onClick: function (e){try{
																				window.map.go({
																				  zoom: 9,
																				  center: JSON.parse( e.attr('f-osm_lonlat') ).value,
																				});
																			}catch(e){}},
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
																							onClick: function (e){
																								wsSendCallback({action: '', code: e.attr('code'), poll: e.closest('.poll-item').attr('code')});
																							},
																						}}),
																					]],
																					['span', {class: 'vacancy'}, [
																						_.f({name: 'title', type: 'text-'}),
																					]],
																				]],
																			]},
																		}, front: {
																			onItemLoad: function (e,d){
																				e.closest('.adrs').addClass('active');
																			},
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
exports.func = ()=>{

}

exports.script = ()=>{
	
	$(document).off('click', '#guiPoll > .poll-content > .list-block > .list-content > .item:not(.passive) > .text');
	$(document).on('click', '#guiPoll > .poll-content > .list-block > .list-content > .item:not(.passive) > .text', function(){
		var $this = $(this);
		var $item = $this.closest('.item');
		$item.toggleClass('active');
		if($item.hasClass('loaded')){
			//$item.find('> div:not(.text)').toggle();
		}else{
			reloadItem($this, {rate: true});
		}
	});
}

exports.style = ()=>{/*

*/}