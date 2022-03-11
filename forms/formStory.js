exports.id = (__, code, callback)=>{
	__.fields[code].col = 'user';
	__.queryIds[code] = [__.user.key];
	callback();
}
exports.tpl = (_, d)=>{

	var storyType = '', newStory = true;
	if(_.__.user && _.__.user.query && _.__.user.query.filter){
		if(_.__.user.query.filter.type) storyType = _.__.user.query.filter.type;
		if(_.__.user.query.filter.id && d.__stories && d.__stories.l.filter(s=>s+''==_.__.user.query.filter.id).length){
			d.__story = {l: [_.__.user.query.filter.id]};
			newStory = false;
		}
	}
	
return [
	
	['div', {id: 'formStory', class: 'f-slb f-24 *css*', style:()=>{/*css
		.*css* .tutorial-active {
			-webkit-animation: tutorial_active 1s infinite alternate;
			-moz-animation: tutorial_active 1s infinite alternate;
			-ms-animation: tutorial_active 1s infinite alternate;
			-o-animation: tutorial_active 1s infinite alternate;
			animation: tutorial_active 1s infinite alternate;
		}
		
		.*css* > .tutorial-link {
			left: 340px;
			top: 20px;
			z-index: 10;
		}
		body.isMobile .*css* > .tutorial-link {
			left: 230px;
		}
	css*/}}, [
	
		_.f({name: 'tutorial', type: '*-'}),
		_.if(d.tutorial && d.tutorial.links[storyType] != undefined, ()=>[
			['div', {class: 'tutorial-link', text: '?', link: storyType}],
		]),
		
		['div', {class: 'btn-close'}, [
			_.f({name: 'close', type: 'action', front: {
				onClick: function (){
					var $subFormMain = $('#subFormMain');
					myEmpty( $subFormMain );
					$subFormMain.hide();
					window.location.hash = '{"form":"formMain"}';
				},
			}})
		]],

			
		['div', {class: storyType+' header *css*', style:()=>{/*css
			.*css* {
				position: absolute;
				height: 100px;
				width: 310px;
				left: 60px;
				top: 30px;
				display: flex;
				color: #018da8;
				z-index: 1;
				background-image: url(/static/img/panel7a.png);
				background-size: contain;
				background-repeat: no-repeat;
				background-position: left;
			}
			body.isMobile .*css* {
				left: 20px;
			}
			.*css*:before {
				content: '';
				position: absolute;
				left: 20px;
				top: 32px;
				height: 32px;
				width: 32px;
				background-size: 32px;
				background-repeat: no-repeat;
				background-position: center;
			}
			.*css*.story:before {
				background-image: url(/static/img/story.png);
			}
			.*css*.idea:before {
				background-image: url(/static/img/idea.png);
			}
		css*/}}, [

			['div', {class: 'title *css*', style:()=>{/*css
				.*css* {
					white-space: pre-wrap;
					margin: 0px;
					padding-left: 70px;
					width: 290px;
					height: 70px;
					padding-top: 28px;
					text-align: center;
					color: white;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-wrap: wrap;
					font-size: 11px;
					line-height: 14px;
				}
				.*css* > div {
					width: 100%;
				}
			css*/}}, [
				['div', {class: 'position', text: CONFIG.labels.story[storyType+'Member']}],
				['div', {class: 'adrs'}],
			]],

			_.if(newStory, ()=>[
				['div', {class: '*css*', style:()=>{/*css
					.*css* {
						position: absolute;
						right: -140px;
						top: 24px;
						width: 100px;
						height: 50px;
					}
					.*css* > button {
						background: transparent;
						border: none;
						background-image: url(/static/img/button22.png);
						width: 100%;
						height: 100%;
						background-repeat: no-repeat;
						background-size: cover;
						font-size: 12px;
						color: white;
						padding: 0px;
						position: relative;
					}
					.*css* > button:hover {
						opacity: 0.5;
					}
					body.isMobile .*css* {
						top: -30px;
						right: 100px;
					}
				css*/}}, [
					['button', {text: 'Сохранить\x0aперсонажа'}, [
						_.f({name: 'add_story', sfx: storyType, type: 'action', front: {
							onAction: function (e, data){ if(data.status != 'err') reloadForm(e) },
						}}),
					]],
				]],
			]),
		]],

		['div', {class: 'story *css*', style:()=>{/*css
			.*css* {
				height: 100%;
				padding: 110px 60px 70px 60px;
				max-height: 420px;
			}
			.*css* > .btn-close {
				position: absolute;
				color: #ddd;
				width: auto;
				height: auto;
				opacity: 1;
				font-weight: normal;
				padding: 10px;
				display: none;
				cursor: pointer;
				top: 100px;
				right: 60px;
				z-index: 2;
				font-size: 0px;
			}
			.*css* > .btn-close:after {
				top: 0px;
				right: 0px;
			}
			.*css* > .btn-close.active {
				display: block;
			}
			.*css* > .btn-close:hover {
				opacity: 0.5;
			}
			.*css* > .tutorial-link {
				left: 50%;
				top: -40px;
				font-size: 64px;
				margin-left: -30px;
			}
		css*/}}, [
		
			['div', {class: '*css*', style:()=>{/*css
				.*css* {
					display: flex;
					width: 100%;
					height: 150px;
					overflow: auto;
					padding-top: 20px;
				}
				body.isMobile .*css* {
					height: 100%;
				}
			css*/}}, [

				_.c({name: 'story', process: {
					tpl: (_, d)=>{ return [
						
						['div', {class: (d.type?'ready':'')+' *css*', style:()=>{/*css
							.*css* {
								font-size: 14px;
								width: 100%;
								background: rgba(213, 173, 81, 1);
								border-radius: 5px;
							}
							.*css* > .el {
								height: 100%!important;
								overflow: hidden;
							}
							.*css* > .el > textarea, .*css* > .el > div[type=talabel] {
								height: 100%!important;
								border: none;
								background: transparent;
								color: white;
								padding: 10px;
								outline: none!important;
							}
						css*/}}, [
							
							_.f({name: 'type', type: '*', front: {
								onLoadElement: function (e){try{
									if(e.hasClass('ready')){
										var type = JSON.parse(e.attr('f-type')).value;
										var $header = $('#formStory .header');
										$header.find('> .title > .position').text('Персонаж пока еще не трудоустроен');
										if(type) $header.addClass(type);
									}
								}catch(e){}}
							}}),
							
							_.if(d.type, ()=>[
								['div', {}, [
									_.c({name: 'vacancy', add: false, process: {
										tpl: (_, d)=>{ return [
											['div', {}, [
												_.f({name: 'title', type: '*', front: {
													onLoadElement: function (e){try{
														var title = JSON.parse(e.attr('f-title')).value;
														$('#formStory .header > .title > .position').text(title);
													}catch(e){}}
												}}),
												_.c({name: 'adrs', add: false, process: {
													tpl: (_, d)=>{ return [
														['div', {}, [
															_.f({name: 'title', type: '*', front: {
																onLoadElement: function (e){try{
																	var title = JSON.parse(e.attr('f-title')).value;
																	$('#formStory .header > .title > .adrs').text(title);
																}catch(e){}}
															}}),
														]],
													]},
												}}),
											]],
										]},
									}}),
								]],
							]),
							
							_.f({name: 'text', type: (d.type?'talabel':'textarea'), value: '', front: {
								onKeyUp: function (_){
									var text = _.val();
									if(text.length > 500){
										_.val(text.substring(0, 500));
										_.trigger('change');
									}else{
										_.closest('.complex-item').find('> .count > span').html(500-text.length);
									}
								},
							}}),
							
							_.if(!d.type, ()=>[
								['div', {class: 'count *css*', style:()=>{/*css
									.*css* {
										position: absolute;
										left: 0px;
										font-size: 12px;
										width: 100%;
										height: 20px;
										top: -20px;
										padding: 0px;
										text-align: right;
										color: white;
										padding-right: 15px;
									}
									body.isMobile .*css* {
										width: 100%;
										text-align: center;
										padding: 0px;
										max-height: 30px;
									}
									.*css* > p {
										margin: 0px;
										color: #018da8;
									}
								css*/}, text: 'Осталось символов: '},[
									['span', {text: (500-(d.text?d.text.length:0))}],
								]],
							]),
						]],
					]},
				}}),
			]],
			
			['div', {class: '*css*', style:()=>{/*css
				.*css* {
					width: 100%;
					margin-top: 10px;
					height: 90px;
					padding: 10px 70px;
					background-image: url(/static/img/panel1.png);
					background-size: contain;
					background-repeat: no-repeat;
					background-position: bottom center;
					display: flex;
					flex-wrap: wrap;
				}
				body.isMobile .*css* {
					background-image: url(/static/img/panel5.png);
					margin-left: -58px;
					width: 360px;
				}
			css*/}}, [
				_.c({name: 'stories', col: 'story', add: false, link: '__stories', process: {
					tpl: (_, d)=>{ return [
						_.f({name: '__vacancy.c', type: '*-'}),
						['a', {class: (d.__vacancy?'v':'')+' *css*', style:()=>{/*css
							.*css* {
								width: 30px;
								height: 30px;
								background-image: url(/static/img/button5.png);
								background-size: contain;
								background-repeat: no-repeat;
								background-position: center;
							}
							.*css*.v {
								background-image: url(/static/img/button55.png);
							}
						css*/}, query: '{"form":"formStory", "container": "subFormMain", "filter": {"id": "'+d._id+'"}}'}],
					]},
				}}),
			]],
		]],
	]],
]}

exports.func = ()=>{

}

exports.script = ()=>{
	if($('#subFormMain > div').length) $('#subFormMain').show();
}

exports.style = ()=>{/*

*/}