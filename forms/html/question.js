exports.tpl = (_, d)=>{ return [
	['div', {class: '*css*', style:()=>{/*css
		.*css* > .i {
			background-size: contain;
			background-image: url(/static/img/no-question.png);
			cursor: pointer;
			font-size: 18px;
			color: white;
			position: relative;
		}		
		.*css* > .i.iam > span {
			display: none;
		}
		.*css* > .i.iam > span.wait_for_time {
			display: block;
			position: absolute;
			width: 100%;
			left: 0px;
			bottom: 0px;
			background-image: none;
			text-align: center;
			font-size: 12px;
		}
		.*css* > .i.iam {
			background-image: url(/static/img/no-question-my.png);
		}
		.*css* > .i.ready-true {
			background-image: url(/static/img/has-question.png);
		}
		.*css* > .i.waitForModeration {
			background-image: url(/static/img/check-question.png);
		}
	css*/}}, [
		_.f({name: 'ready', type: '*+'}),
		_.f({name: 'waitForModeration', type: '*-'}),
		_.f({name: 'moderationCount', type: '*-'}),
		['div', {class: 'i ready-'+d.ready+(d.iam?' iam':'')+(d.waitForModeration?' waitForModeration':'')},[
			['span', {class: (d.wait_for_time?' wait_for_time':'')}, [
				_.f({name: 'wait_for_time', type: '*', front: {
					onLoadElement: function (_, d){
						if(_.parent().hasClass('iam')) window.setQuestionTime(_);
					},
				}}),
			]],
		]],
	]],
	['div', {class: (_.__.global.freeQuestion?'free':'')+' f-24 text *css*', style:()=>{/*css
		.*css* {
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
		.*css*.active {
			display: flex;
		}
		.*css*.active-single {
			height: 240px;
		}
		.*css* > .el {
			min-height: 100%;
			max-height: 100%;
			padding: 20px;
			padding-top: 40px;
			background-color: rgba(213, 173, 81, 1);
			border-radius: 10px;
		}
		.*css* > label {
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
		body.isMobile .*css* > label {
			width: 100%;
			left: 0px;			
		}
		
		.*css* > .el > textarea {
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
		.*css* > .el > textarea:focus {
			outline: none;
		}
		.*css* > p {
			text-align: center;
			background-image: url(/static/img/panel5.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: top;
			width: 180px;
			margin-top: 40px;
			color: white;
		}
		.*css*.free {
			display: flex;
			top: 60px;
			height: 280px;
		}
		
		body.isMobile .*css* {
			top: 80px;
			left: 0px;
			width: 100%;
			padding: 0px 50px;
			flex-wrap: wrap;
		}
		body.isMobile .*css*.free {
			top: 20px;
			background-color: transparent;
		}
		body.isMobile .*css*.free > .el {
			background-color: transparent;
		}
		body.isMobile .*css* > .el {
			min-height: 220px;
			max-height: 220px;
			padding: 0px;
			padding-top: 60px;
			width: 100%;
			margin: auto;
		}
		body.isMobile .*css*.active-single > .el {
			width: 100%;
			min-height: 160px;
			max-height: 160px;
		}
		body.isMobile .*css*.active-single > .el > textarea {
			padding: 4px 10px;
		}
		body.isMobile .*css* > .el > div[type=talabel] {
			padding: 10px;
			    text-align: center;
		}
		body.isMobile .*css*.free > label {
			display: none;
		}
		body.isMobile .*css*.active-single > .save, 
		body.isMobile .*css*.free > .save {
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
				onKeyUp: function (_){
					var text = _.val();
					if(text.length > 140){
						_.val(text.substring(0, 140));
						_.trigger('change');
					}else{
						_.closest('.text').find('> .count > span').html(140-text.length);
					}
				},
			}}),
			['div', {class: 'f-18 questionBaseStats *css*', style:()=>{/*css
				.*css* {
					margin: 60px 10px;
					white-space: nowrap;
					align-self: flex-end;
					font-size: 14px;
					order: 2;
					min-width: 180px;
				}
				.*css* > .label {
					display: flex;
					justify-content: flex-end;
				}
				.*css* > .label > .count{
					font-size: 24px;
					color: #412c17!important;
				}
				.*css* > .label > .count:not(.ready) {
					color: #999;
				}
				.*css* > .label > .count.ready.super {
					color: #00a95b;
				}
				.*css* > .item {
					border: 2px solid #412c17;
					text-align: center;
					margin: 5px;			
					border-radius: 5px;
					color: #412c17;
				}
				.*css* > .item.sm {
					font-size: 11px;
					line-height: 18px;
				}
				.*css* > .item.active {
					color: white;
					background-color: #412c17;
				}			
				body.isMobile .*css* {
					margin: auto;
					width: 80%;
					border-radius: 5px;
					padding: 0px;
				}
				body.isMobile .*css* > .label {
					padding: 0px;
				}
				.*css* .notifyjs-container {
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
			['div', {class: 'count *css*', style:()=>{/*css
				.*css* {
					position: absolute;
					bottom: 4px;
					left: 0px;
					padding-left: 20px;
					padding-bottom: 0px;
					font-size: 12px;
				}
				.*css* > p {
					margin: 0px;
					color: white;
					margin-bottom: -16px;
				}
				body.isMobile .*css* {
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
			['div', {class: 'save *css*', style:()=>{/*css
				.*css* {
					position: absolute;
					bottom: 0px;
					right: 0px;
					padding: 0px;
					width: 40%;
				}
				.*css* > .el {
					position: relative;
				}
				.*css* > .el > button {
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
				.*css* > .el > button:hover {
					opacity: 0.5;
				}
				body.isMobile .*css* {
					top: -20px;
					width: 40%;
					right: 30%;
					bottom: auto;
				}
			css*/}}, [
				['div', {class: 'el'}, [
					['button', {text: 'Сохранить'}, [
						_.f({name: 'save_question', type: 'action', front: {
							onClick: function (e){
								
								var $stats = e.closest('.text').find('.questionBaseStats');
								var $has = $stats.find('> .item.active');
								var need = $stats.find('> .label > .count > .need').text()*1;
								
								if($has.length < need){
									e.notify('Нe\xa0указано\xa0необходимое\x0aколичество\xa0обязательных\xa0тем', {position: window.isMobile ? 'bottom' : 'left', className: 'warn'})
								}else{
									
									var stats = [];
									$has.each(function(){ stats.push($(this).attr('stat')) });
									
									wsSendCallback({action: '', code: e.attr('code'), stats: stats}, function(data){
										
										if(data.skey) localStorage['poll_'+data.skey] = data.dateto;

										if($('#tutorial').attr('tutorialQuestions')){
											window.setTutorialComplete();
										}else{
											locationQuery(history.state.subform);
										}
									}, function(data){ e.notify(data.errMsg, {position: 'bottom right', className: 'warn'}) });
								}
							},
						}}),						
						
					]],
				]],
			]],
		]}),
	]],
]}

exports.func = ()=>{
	window.setQuestionTime = function(_){
		if(_.parent().length){ // вообще тут нужна проверка на наличие самого элемента, но прямо сейчас он не удаляется из памяти через myEmpty, что тоже нужно исправить
			var t = ((JSON.parse(_.attr('f-wait_for_time')).value - Date.now())/60000).toFixed(0);
			_.text( ( (!t || t) < 1 ? 1 : t)+'м' );
			setTimeout(function(){ window.setQuestionTime(_) }, 30000);
		}
	}
}

exports.script = ()=>{
	$(document).off('click', '#formVote .question .i');
	$(document).on('click', '#formVote .question .i', function(){
		var $formVote = $('#formVote');
		$formVote.find('> .vote').addClass('active');
		var $text = $(this).closest('.question').find('> .text');
		$text.addClass('active').addClass('active-single');
	});
}

exports.style = ()=>{/*

*/}