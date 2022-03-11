exports.fields = {".":{"_id":1,"__formQuestion.l":1,"tutorial":1,"close":1,"award":1,"__question_free.l":1},".__question":{"ready":1,"waitForModeration":1,"moderationCount":1,"wait_for_time":1,"text":1,"stats":1,"minStatsCount":1,"save_question":1}}

exports.lst = {"addobj":"2021-02-13T09:48:31.830Z"}

exports.process = {}
exports.html = {}
exports.process['.'] = {}
exports.process['.__question'] = {}

exports.process['.']['loaded'] = true
exports.process['.']['id'] = (__, code, callback)=>{
	__.fields[code].col = 'user';
	__.queryIds[code] = [__.user.key];
	callback();
}
exports.process['.']['dataReady'] = (__, data, callback)=>{
	if(data[0] && data[0]._id){
		var d = data[0];
		var today = moment().format('DDMMYY');
		if(!(d.award && d.award.date == today)){
			d.award = {list: [{},{},{}], date: moment().format('DDMMYY')};
			var $set = {award: d.award};
			__.db.collection('user').update({_id: d._id}, {$set: $set}, ()=>{
				callback();
			});
		}else{
			callback();
		}
	}else{
		callback();
	}
}
exports.process['.']['tpl'] = (_, d)=>{ return [
	
	['div', {id: 'formQuestion', class: 'f-slb f-24 _76_', style:()=>{/*css
		._76_ .tutorial-active {
			-webkit-animation: tutorial_active 1s infinite alternate;
			-moz-animation: tutorial_active 1s infinite alternate;
			-ms-animation: tutorial_active 1s infinite alternate;
			-o-animation: tutorial_active 1s infinite alternate;
			animation: tutorial_active 1s infinite alternate;
		}
		
		._76_ > .tutorial-link {
			left: 260px;
			top: 40px;
			z-index: 10;
		}
	css*/}}, [
		
		_.f({name: 'tutorial', type: '*-'}),
		_.if(d.tutorial && d.tutorial.links.free_question != undefined, ()=>[
			['div', {class: 'tutorial-link', text: '?', link: 'free_question'}],
		]),
		
		['div', {class: 'btn-close'}, [
			_.f({name: 'close', type: 'action', front: {
				onClick: "f_fb55d5dccc3ea584ed286e9821d97a44",
			}})
		]],
		
		['div', {class: 'award _77_', style:()=>{/*css
			._77_ {
				position: absolute;
				right: 70px;
				top: 60px;
				display: flex;
				flex-wrap: nowrap;
				z-index: 2;
			}
			._77_ > .item {
				height: 60px;
				width: 60px;
				background-size: 60px;
				background-position: center;
				background-repeat: no-repeat;
				background-image: url(/static/img/button5.png);
				cursor: pointer;
			}
			._77_ > .item.ready {
				background-image: url(/static/img/button55.png);
			}
			._77_ > .item.ready.used {
				opacity: 0.2;
				cursor: default;
			}
			
			body.isMobile ._77_ {
				top: 1px;
				top: 0px;
				width: 50%;
				right: 25%;
				justify-content: center;
			}
			body.isMobile ._77_ > .item {
				height: 40px;
				width: 40px;
				background-size: 40px;
			}
		css*/}}, [
			
			_.f({name: 'award', type: '*-'}),
			
			((_, d)=>{ return _.__.pre || !(d.award && d.award.list && d.award.list.length) ? [] : [
				d.award.list.map(a=>['div', {class: 'item'+(a.ready?' ready':'')+(a.used?' used':'')}]),
			]})(_, d),
			
			_.script(()=>{
				$(document).off('click', '#formQuestion > .award > .item');
				$(document).on('click', '#formQuestion > .award > .item', function(){
					var $this = $(this);
					if(!$this.hasClass('ready')){
						$.notify('Задай вопрос, чтобы активировать звезду');
					}else{
						if(!$this.hasClass('used')){
							$this.addClass('used');
							wsSendCallback({action: 'get_award'}, function(data){

							}, function(err){
								$this.removeClass('used');
								if(err.errMsg) $.notify(err.errMsg);
							});
						}
					}
				});
			}),
			/*_.c({name: 'award', process: {
				id: (__, code, callback)=>{
					var field = __.fields[code];
					__.queryIds[code] = [__.user.config.game];
					__.queryFields[field.linecode]['best.'+moment().add(-1, 'days').format('DDMMYY')] = 1;
					callback();
				},
				tpl: (_, d)=>{ return [
				]},
			}}),*/
		]],
		
		['div', {class: 'question _78_', style:()=>{/*css
			._78_ {
				height: 100%;
				padding: 110px 60px 70px 60px;
				max-height: 420px;
			}
			._78_ > .btn-close {
				position: absolute;
				top: 100px;
				right: 60px;
				color: #ddd;
				z-index: 2;
				width: auto;
				height: auto;
				opacity: 1;
				font-weight: normal;
				padding: 10px;
				display: none;
				cursor: pointer;
				font-size: 0px;
			}
			._78_ > .btn-close:after {
				top: 0px;
				right: 0px;
			}
			._78_ > .btn-close.active {
				display: block;
			}
			._78_ > .btn-close:hover {
				opacity: 0.5;
			}
			._78_ > .tutorial-link {
				left: 50%;
				top: -40px;
				font-size: 64px;
				margin-left: -30px;
			}
		css*/}}, [
		
			['div', {class: '_79_', style:()=>{/*css
				._79_ {
					display: flex;
					width: 100%;
					height: 150px;
					overflow: auto;
					padding-top: 20px;
				}		
			css*/}}, [

				_.c({name: 'question', link: '__question_free', process: {
					add: (__, field, parent, data, callback)=>{
						if(data._id){
							
							var stats = Object.keys(LST.stats.lst), baseStats = {};
									
							for(var s = 0; s < CONFIG.questionFreeStatsNum; s++) baseStats[stats.splice( Math.floor(Math.random()*stats.length), 1)[0]] = {};
							
							__.db.collection('question').update({_id: data._id}, {$set:{
								free: true,
								moderationCount: CONFIG.moderationVoteQuestionCount,
								minStatsCount: CONFIG.questionFreeMinStatsCount,
								stats: baseStats,
							}}, (err, data)=>{ callback() });
							
						}else{ callback() }
					},
					tpl: (_, d)=>{
					
						_.__.global.freeQuestion = true;
						_.__.global.iamExpert = true;
						d.iam = true;
					
					return [
						
						_.html('question', _, d),
						
					]},
				}}),
			]],
		]],
	]],
]}

exports.process['.__question']['loaded'] = true
exports.process['.__question']['add'] = (__, field, parent, data, callback)=>{
						if(data._id){
							
							var stats = Object.keys(LST.stats.lst), baseStats = {};
									
							for(var s = 0; s < CONFIG.questionFreeStatsNum; s++) baseStats[stats.splice( Math.floor(Math.random()*stats.length), 1)[0]] = {};
							
							__.db.collection('question').update({_id: data._id}, {$set:{
								free: true,
								moderationCount: CONFIG.moderationVoteQuestionCount,
								minStatsCount: CONFIG.questionFreeMinStatsCount,
								stats: baseStats,
							}}, (err, data)=>{ callback() });
							
						}else{ callback() }
					}
exports.process['.__question']['tpl'] = (_, d)=>{
					
						_.__.global.freeQuestion = true;
						_.__.global.iamExpert = true;
						d.iam = true;
					
					return [
						
						_.html('question', _, d),
						
					]}
exports.html['.__question'] = {}
exports.html['.__question']['question'] = {}
exports.html['.__question']['question']['tpl'] = (_, d)=>{ return [
	['div', {class: '_80_', style:()=>{/*css
		._80_ > .i {
			background-size: contain;
			background-image: url(/static/img/no-question.png);
			cursor: pointer;
			font-size: 18px;
			color: white;
			position: relative;
		}		
		._80_ > .i.iam > span {
			display: none;
		}
		._80_ > .i.iam > span.wait_for_time {
			display: block;
			position: absolute;
			width: 100%;
			left: 0px;
			bottom: 0px;
			background-image: none;
			text-align: center;
			font-size: 12px;
		}
		._80_ > .i.iam {
			background-image: url(/static/img/no-question-my.png);
		}
		._80_ > .i.ready-true {
			background-image: url(/static/img/has-question.png);
		}
		._80_ > .i.waitForModeration {
			background-image: url(/static/img/check-question.png);
		}
	css*/}}, [
		_.f({name: 'ready', type: '*+'}),
		_.f({name: 'waitForModeration', type: '*-'}),
		_.f({name: 'moderationCount', type: '*-'}),
		['div', {class: 'i ready-'+d.ready+(d.iam?' iam':'')+(d.waitForModeration?' waitForModeration':'')},[
			['span', {class: (d.wait_for_time?' wait_for_time':'')}, [
				_.f({name: 'wait_for_time', type: '*', front: {
					onLoadElement: "f_493e5503e4d2a2a84879afd319164dd4",
				}}),
			]],
		]],
	]],
	['div', {class: (_.__.global.freeQuestion?'free':'')+' f-24 text _81_', style:()=>{/*css
		._81_ {
			display: none;
			position: absolute;
			top: 100px;
			width: 480px;
			left: 60px;
			height: 110px;
			z-index: 1;
			text-align: left;
			border-radius: 5px;
			color: white;
			font-size: 13px;
		}
		._81_.active {
			display: flex;
		}
		._81_.active-single {
			height: 240px;
		}
		._81_ > .el {
			min-height: 100%;
			max-height: 100%;
			padding: 20px;
			padding-top: 40px;
			background-color: rgba(213, 173, 81, 1);
			border-radius: 10px;
		}
		._81_ > label {
			position: absolute;
			margin: auto;
			top: 0px;
			color: #412c17;
			height: 40px;
			background-image: url(/static/img/panel6.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
			display: flex;
			align-items: center;
			justify-content: center;
			white-space: pre-wrap;
			text-align: center;
			line-height: 10px;
			padding-bottom: 8px;
			width: 40%;
			left: -20px;
		}
		body.isMobile ._81_ > label {
			width: 100%;
			left: 0px;			
		}
		
		._81_ > .el > textarea {
			min-height: 100%;
			max-height: 100%;
			background: transparent;
			border: none;
			padding: 20px;
			background: #412c17;
			border-radius: 5px;
			color: white;		
			height: 100%;
			margin: 0px;
			font-size: 14px;
		}
		._81_ > .el > textarea:focus {
			outline: none;
		}
		._81_ > p {
			text-align: center;
			background-image: url(/static/img/panel5.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: top;
			width: 180px;
			margin-top: 40px;
			color: white;
		}
		._81_.free {
			display: flex;
			top: 60px;
			height: 280px;
		}
		
		body.isMobile ._81_ {
			top: 80px;
			left: 0px;
			width: 100%;
			padding: 0px 50px;
			flex-wrap: wrap;
		}
		body.isMobile ._81_.free {
			top: 20px;
			background-color: transparent;
		}
		body.isMobile ._81_.free > .el {
			background-color: transparent;
		}
		body.isMobile ._81_ > .el {
			min-height: 220px;
			max-height: 220px;
			padding: 0px;
			padding-top: 60px;
			width: 100%;
			margin: auto;
		}
		body.isMobile ._81_.active-single > .el {
			width: 100%;
			min-height: 160px;
			max-height: 160px;
		}
		body.isMobile ._81_.active-single > .el > textarea {
			padding: 4px 10px;
		}
		body.isMobile ._81_ > .el > div[type=talabel] {
			padding: 10px;
			    text-align: center;
		}
		body.isMobile ._81_.free > label {
			display: none;
		}
		body.isMobile ._81_.active-single > .save, 
		body.isMobile ._81_.free > .save {
			position: relative;
			top: 0px;
			left: 0px;
			order: 3;
			margin-top: -30px;
			margin-left: 10%;
		}
	css*/}}, [
		['label', {text: d.waitForModeration ? CONFIG.labels.question_on_modetaion : CONFIG.labels.question}],
		_.if(_.__.global.iamExpert && !d.iam && !_.__.global.myQuestionReady && !_.__.global.tutorialVote , ()=>{ return [
			['div', {class: 'el', text: CONFIG.labels.question_view}]
		]}),
		_.if((_.__.global.iamExpert && _.__.global.myQuestionReady) || (_.__.global.iamCandidate && d.ready) || (d.ready && _.__.global.tutorialVote), ()=>{ return [
			_.f({name: 'text', type: 'talabel', value: CONFIG.labels.question_empty}),
		]}),
		_.if(_.__.global.iamExpert && d.iam && !d.ready && d.waitForModeration, ()=>[
			_.f({name: 'text', type: 'talabel', value: CONFIG.labels.question_on_modetaion}),
		]),
		_.if(_.__.global.iamExpert && d.iam && !d.ready && !d.waitForModeration, ()=>{ return [
			_.f({name: 'text', type: 'textarea', value: '', front: {
				onKeyUp: "f_ed0555dea7bd138950787d1cdc809d79",
			}}),
			['div', {class: 'f-18 questionBaseStats _82_', style:()=>{/*css
				._82_ {
					margin: 60px 10px;
					white-space: nowrap;
					align-self: flex-end;
					font-size: 14px;
					order: 2;
					min-width: 180px;
				}
				._82_ > .label {
					display: flex;
					justify-content: flex-end;
				}
				._82_ > .label > .count{
					font-size: 24px;
					color: #412c17!important;
				}
				._82_ > .label > .count:not(.ready) {
					color: #999;
				}
				._82_ > .label > .count.ready.super {
					color: #00a95b;
				}
				._82_ > .item {
					border: 2px solid #412c17;
					text-align: center;
					margin: 5px;			
					border-radius: 5px;
					color: #412c17;
				}
				._82_ > .item.sm {
					font-size: 11px;
					line-height: 18px;
				}
				._82_ > .item.active {
					color: white;
					background-color: #412c17;
				}			
				body.isMobile ._82_ {
					margin: auto;
					width: 80%;
					border-radius: 5px;
					padding: 0px;
				}
				body.isMobile ._82_ > .label {
					padding: 0px;
				}
				._82_ .notifyjs-container {
					min-width: 180px;
					max-width: 180px;
					white-space: normal;
				}
			css*/}},[				
				_.script(()=>{
					$(document).off('click','#formVote .questionBaseStats > .item, #formQuestion .questionBaseStats > .item');
					$(document).on('click', '#formVote .questionBaseStats > .item, #formQuestion .questionBaseStats > .item', function(){
						
						var $this = $(this);
						$this.toggleClass('active');
						
						var $stats = $this.closest('.questionBaseStats');
						var has = $stats.find('> .item.active').length;
						var need = $stats.find('> .label > .count > .need').text()*1;
						
						$stats.find('> .label > .count').removeClass('ready').removeClass('super');
						if(has > need) $stats.find('> .label > .count').addClass('super');
						if(has >= need){
							$stats.find('> .label > .count').addClass('ready');
							if(has > need) $stats.find('> .label > .count').addClass('super');
						}

						$stats.find('> .label > .count > .has').text(has);
					});
				}),
				
				_.f({name: 'stats', type: '*-'}),
				((_, d)=>{
					var result = [];
					if(d.stats){
						for(var s in d.stats){try{
							var l = LST.stats.lst[s];
							result.push( ['div', {help: '["lst","stats","'+l.v+'"]', helpPosition: 'bottom right', class: 'h item '+(l.l.length>18?'sm':''), stat: s, text: l.l}] );
						}catch(e){console.log(s,e)}};
					}
					return result;
				})(_, d),
				
				['div', {class: 'label'},[
					//['div', {text: 'Выбранные темы:'}],
					['div', {class: 'count'}, [
						['span', {class: 'has', text: '0'}],
						['span', {text: '/'}],
						['span', {class: 'need'}, [
							_.f({name: 'minStatsCount', type: 'text-', value: CONFIG.questionMinStatsCount}),
						]],
					]],
				]],
			]],
			['div', {class: 'count _83_', style:()=>{/*css
				._83_ {
					position: absolute;
					bottom: 4px;
					left: 0px;
					padding-left: 20px;
					padding-bottom: 0px;
					font-size: 12px;
				}
				._83_ > p {
					margin: 0px;
					color: white;
					margin-bottom: -16px;
				}
				body.isMobile ._83_ {
					left: 0px;
					top: 40px;
					bottom: auto;
					width: 100%;
					text-align: center;
					padding: 0px;
				}
			css*/}, text: 'Осталось символов: '},[
				['span', {text: (140-(d.text?d.text.length:0))}],
				//_.if(_.__.global.iamExpert && d.moderationCount && !_.__.global.freeQuestion, ()=>[
				//	['p', {text: CONFIG.labels.question_bad_modetaion}],
				//]),
			]],
			['div', {class: 'save _84_', style:()=>{/*css
				._84_ {
					position: absolute;
					bottom: 0px;
					right: 0px;
					padding: 0px;
					width: 40%;
				}
				._84_ > .el {
					position: relative;
				}
				._84_ > .el > button {
					border: none;				
					background-size: contain;
					background-position: center;
					background-repeat: no-repeat;
					background-image: url(/static/img/button22.png);
					height: 50px;
					background-color: transparent;
					color: white;
					width: 100%;
					white-space: pre-wrap;
					font-size: 13px;
					margin-bottom: 6px;
					padding-bottom: 4px;
				}
				._84_ > .el > button:hover {
					opacity: 0.5;
				}
				body.isMobile ._84_ {
					top: -20px;
					width: 40%;
					right: 30%;
					bottom: auto;
				}
			css*/}}, [
				['div', {class: 'el'}, [
					['button', {text: 'Сохранить'}, [
						_.f({name: 'save_question', type: 'action', front: {
							onClick: "f_e711565f20276986b9b6059b704ab1dd",
						}}),						
						
					]],
				]],
			]],
		]}),
	]],
]}

