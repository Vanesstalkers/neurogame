exports.fields = {".":{"_id":1,"__formStory.l":1,"tutorial":1,"close":1,"add_story":1,"__story.l":1,"__stories.l":1},".__story":{"type":1,"_id":1,"__vacancy.l":1,"text":1},".__story__vacancy":{"title":1,"_id":1,"__adrs.l":1},".__story__vacancy__adrs":{"title":1},".__stories":{"__vacancy.c":1}}

exports.lst = {"addobj":"2021-02-13T09:48:31.833Z"}

exports.process = {}
exports.html = {}
exports.process['.'] = {}
exports.process['.__story'] = {}
exports.process['.__story__vacancy'] = {}
exports.process['.__story__vacancy__adrs'] = {}
exports.process['.__stories'] = {}

exports.process['.']['loaded'] = true
exports.process['.']['id'] = (__, code, callback)=>{
	__.fields[code].col = 'user';
	__.queryIds[code] = [__.user.key];
	callback();
}
exports.process['.']['tpl'] = (_, d)=>{

	var storyType = '', newStory = true;
	if(_.__.user && _.__.user.query && _.__.user.query.filter){
		if(_.__.user.query.filter.type) storyType = _.__.user.query.filter.type;
		if(_.__.user.query.filter.id && d.__stories && d.__stories.l.filter(s=>s+''==_.__.user.query.filter.id).length){
			d.__story = {l: [_.__.user.query.filter.id]};
			newStory = false;
		}
	}
	
return [
	
	['div', {id: 'formStory', class: 'f-slb f-24 _85_', style:()=>{/*css
		._85_ .tutorial-active {
			-webkit-animation: tutorial_active 1s infinite alternate;
			-moz-animation: tutorial_active 1s infinite alternate;
			-ms-animation: tutorial_active 1s infinite alternate;
			-o-animation: tutorial_active 1s infinite alternate;
			animation: tutorial_active 1s infinite alternate;
		}
		
		._85_ > .tutorial-link {
			left: 340px;
			top: 20px;
			z-index: 10;
		}
		body.isMobile ._85_ > .tutorial-link {
			left: 230px;
		}
	css*/}}, [
	
		_.f({name: 'tutorial', type: '*-'}),
		_.if(d.tutorial && d.tutorial.links[storyType] != undefined, ()=>[
			['div', {class: 'tutorial-link', text: '?', link: storyType}],
		]),
		
		['div', {class: 'btn-close'}, [
			_.f({name: 'close', type: 'action', front: {
				onClick: "f_fb55d5dccc3ea584ed286e9821d97a44",
			}})
		]],

			
		['div', {class: storyType+' header _86_', style:()=>{/*css
			._86_ {
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
			body.isMobile ._86_ {
				left: 20px;
			}
			._86_:before {
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
			._86_.story:before {
				background-image: url(/static/img/story.png);
			}
			._86_.idea:before {
				background-image: url(/static/img/idea.png);
			}
		css*/}}, [

			['div', {class: 'title _87_', style:()=>{/*css
				._87_ {
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
				._87_ > div {
					width: 100%;
				}
			css*/}}, [
				['div', {class: 'position', text: CONFIG.labels.story[storyType+'Member']}],
				['div', {class: 'adrs'}],
			]],

			_.if(newStory, ()=>[
				['div', {class: '_88_', style:()=>{/*css
					._88_ {
						position: absolute;
						right: -140px;
						top: 24px;
						width: 100px;
						height: 50px;
					}
					._88_ > button {
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
					._88_ > button:hover {
						opacity: 0.5;
					}
					body.isMobile ._88_ {
						top: -30px;
						right: 100px;
					}
				css*/}}, [
					['button', {text: 'Сохранить\x0aперсонажа'}, [
						_.f({name: 'add_story', sfx: storyType, type: 'action', front: {
							onAction: "f_235e9afe878b77a6b03da3b4ce98cb15",
						}}),
					]],
				]],
			]),
		]],

		['div', {class: 'story _89_', style:()=>{/*css
			._89_ {
				height: 100%;
				padding: 110px 60px 70px 60px;
				max-height: 420px;
			}
			._89_ > .btn-close {
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
			._89_ > .btn-close:after {
				top: 0px;
				right: 0px;
			}
			._89_ > .btn-close.active {
				display: block;
			}
			._89_ > .btn-close:hover {
				opacity: 0.5;
			}
			._89_ > .tutorial-link {
				left: 50%;
				top: -40px;
				font-size: 64px;
				margin-left: -30px;
			}
		css*/}}, [
		
			['div', {class: '_90_', style:()=>{/*css
				._90_ {
					display: flex;
					width: 100%;
					height: 150px;
					overflow: auto;
					padding-top: 20px;
				}
				body.isMobile ._90_ {
					height: 100%;
				}
			css*/}}, [

				_.c({name: 'story', process: {
					tpl: (_, d)=>{ return [
						
						['div', {class: (d.type?'ready':'')+' _91_', style:()=>{/*css
							._91_ {
								font-size: 14px;
								width: 100%;
								background: rgba(213, 173, 81, 1);
								border-radius: 5px;
							}
							._91_ > .el {
								height: 100%!important;
								overflow: hidden;
							}
							._91_ > .el > textarea, ._91_ > .el > div[type=talabel] {
								height: 100%!important;
								border: none;
								background: transparent;
								color: white;
								padding: 10px;
								outline: none!important;
							}
						css*/}}, [
							
							_.f({name: 'type', type: '*', front: {
								onLoadElement: "f_1add0c3f183941c3652a306ec3e29235"
							}}),
							
							_.if(d.type, ()=>[
								['div', {}, [
									_.c({name: 'vacancy', add: false, process: {
										tpl: (_, d)=>{ return [
											['div', {}, [
												_.f({name: 'title', type: '*', front: {
													onLoadElement: "f_97f7e92ac9bf759924b940f4ad615039"
												}}),
												_.c({name: 'adrs', add: false, process: {
													tpl: (_, d)=>{ return [
														['div', {}, [
															_.f({name: 'title', type: '*', front: {
																onLoadElement: "f_d4a400819810ae29167b67693a308a1e"
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
								onKeyUp: "f_b9fd39379162e2aba544ff940eedabf6",
							}}),
							
							_.if(!d.type, ()=>[
								['div', {class: 'count _92_', style:()=>{/*css
									._92_ {
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
									body.isMobile ._92_ {
										width: 100%;
										text-align: center;
										padding: 0px;
										max-height: 30px;
									}
									._92_ > p {
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
			
			['div', {class: '_93_', style:()=>{/*css
				._93_ {
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
				body.isMobile ._93_ {
					background-image: url(/static/img/panel5.png);
					margin-left: -58px;
					width: 360px;
				}
			css*/}}, [
				_.c({name: 'stories', col: 'story', add: false, link: '__stories', process: {
					tpl: (_, d)=>{ return [
						_.f({name: '__vacancy.c', type: '*-'}),
						['a', {class: (d.__vacancy?'v':'')+' _94_', style:()=>{/*css
							._94_ {
								width: 30px;
								height: 30px;
								background-image: url(/static/img/button5.png);
								background-size: contain;
								background-repeat: no-repeat;
								background-position: center;
							}
							._94_.v {
								background-image: url(/static/img/button55.png);
							}
						css*/}, query: '{"form":"formStory", "container": "subFormMain", "filter": {"id": "'+d._id+'"}}'}],
					]},
				}}),
			]],
		]],
	]],
]}

exports.process['.__story']['loaded'] = true
exports.process['.__story']['tpl'] = (_, d)=>{ return [
						
						['div', {class: (d.type?'ready':'')+' _91_', style:()=>{/*css
							._91_ {
								font-size: 14px;
								width: 100%;
								background: rgba(213, 173, 81, 1);
								border-radius: 5px;
							}
							._91_ > .el {
								height: 100%!important;
								overflow: hidden;
							}
							._91_ > .el > textarea, ._91_ > .el > div[type=talabel] {
								height: 100%!important;
								border: none;
								background: transparent;
								color: white;
								padding: 10px;
								outline: none!important;
							}
						css*/}}, [
							
							_.f({name: 'type', type: '*', front: {
								onLoadElement: "f_1add0c3f183941c3652a306ec3e29235"
							}}),
							
							_.if(d.type, ()=>[
								['div', {}, [
									_.c({name: 'vacancy', add: false, process: {
										tpl: (_, d)=>{ return [
											['div', {}, [
												_.f({name: 'title', type: '*', front: {
													onLoadElement: "f_97f7e92ac9bf759924b940f4ad615039"
												}}),
												_.c({name: 'adrs', add: false, process: {
													tpl: (_, d)=>{ return [
														['div', {}, [
															_.f({name: 'title', type: '*', front: {
																onLoadElement: "f_d4a400819810ae29167b67693a308a1e"
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
								onKeyUp: "f_b9fd39379162e2aba544ff940eedabf6",
							}}),
							
							_.if(!d.type, ()=>[
								['div', {class: 'count _92_', style:()=>{/*css
									._92_ {
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
									body.isMobile ._92_ {
										width: 100%;
										text-align: center;
										padding: 0px;
										max-height: 30px;
									}
									._92_ > p {
										margin: 0px;
										color: #018da8;
									}
								css*/}, text: 'Осталось символов: '},[
									['span', {text: (500-(d.text?d.text.length:0))}],
								]],
							]),
						]],
					]}

exports.process['.__story__vacancy']['loaded'] = true
exports.process['.__story__vacancy']['tpl'] = (_, d)=>{ return [
											['div', {}, [
												_.f({name: 'title', type: '*', front: {
													onLoadElement: "f_97f7e92ac9bf759924b940f4ad615039"
												}}),
												_.c({name: 'adrs', add: false, process: {
													tpl: (_, d)=>{ return [
														['div', {}, [
															_.f({name: 'title', type: '*', front: {
																onLoadElement: "f_d4a400819810ae29167b67693a308a1e"
															}}),
														]],
													]},
												}}),
											]],
										]}

exports.process['.__story__vacancy__adrs']['loaded'] = true
exports.process['.__story__vacancy__adrs']['tpl'] = (_, d)=>{ return [
														['div', {}, [
															_.f({name: 'title', type: '*', front: {
																onLoadElement: "f_d4a400819810ae29167b67693a308a1e"
															}}),
														]],
													]}

exports.process['.__stories']['loaded'] = true
exports.process['.__stories']['tpl'] = (_, d)=>{ return [
						_.f({name: '__vacancy.c', type: '*-'}),
						['a', {class: (d.__vacancy?'v':'')+' _94_', style:()=>{/*css
							._94_ {
								width: 30px;
								height: 30px;
								background-image: url(/static/img/button5.png);
								background-size: contain;
								background-repeat: no-repeat;
								background-position: center;
							}
							._94_.v {
								background-image: url(/static/img/button55.png);
							}
						css*/}, query: '{"form":"formStory", "container": "subFormMain", "filter": {"id": "'+d._id+'"}}'}],
					]}

