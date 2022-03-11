exports.tpl = (_, d)=>{
	
	if(_.__.global.tutorialVote && d.__rate && d.__rate.l) d.__rate.l.forEach((r, i)=>{ if(_.__.global.tutorialClones[r+'']) d.__rate.l[i] = _.__.global.tutorialClones[r+''] });
	
	var question = d.__question && _.__.global.questions[d.__question.l[0]] ? _.__.global.questions[d.__question.l[0]] : 
				   _.__.global.tutorialQuestion ? _.__.global.questions[_.__.global.tutorialQuestion] : {};
	if(question == undefined) question = {};
	
return [
	['div', {class: (!_.__.global.iamExpert&&_.__.global.iamCandidate?'iamCandidate ':'')+(!_.__.global.iamExpert&&d.iam?'myAnswer ':'')+(d.ready || (!_.__.global.iamExpert&&d.iam)?'ready ':'')+' answer-block *css*', style:()=>{/*css
		.*css* {
			white-space: pre-wrap;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			font-size: 12px;
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
			background-image: url(/static/img/button5.png);
		}
		.*css*.ready:hover {
			opacity: 0.5;
			cursor: pointer;
		}
		.*css*.ready:hover * {
			cursor: pointer;
		}
		.*css* > .i {
			background-position: center;
			background-repeat: no-repeat;
			background-size: 50%;
			margin-top: 6px;
		}
		.*css* > .i.no-question {
			background-image: url(/static/img/wait-for-question.png);
		}
		.*css* > .i.no-answer {
			background-image: url(/static/img/no-answer.png);
		}
		.*css*.iamCandidate.myAnswer > .i.no-answer {
			background-image: url(/static/img/no-answer-my.png);
		}
		.*css* > .i.has-answer {
			background-image: url(/static/img/has-answer.png);
		}
		.*css*.has-rate > .i.has-answer, .*css*.iamCandidate > .i.has-answer {
			background-image: url(/static/img/has-answer-my.png);
		}
		.*css*.has-rate > div {
			color: #735a91;
		}
		.*css*.iamCandidate > .rates > .rate, .*css*.iamCandidate > .rates > .rate:after {
			height: 28px;
			width: 28px;
		}
		.*css* > .rates {
			display: none;
		}
	css*/}, question: question.__code}, [
		
		_.f({name: 'ready', type: '*-'}),
		_.f({name: '__question', type: '*-'}),
		_.f({name: '__user', type: '*-'}),
		
		_.if(!question.ready, ()=>{ return [
			['div', {class: 'i no-question'}],
		]}),
		_.if(question.ready && !d.ready, ()=>{ return [
			['div', {class: 'i no-answer'}],
		]}),
		_.if(question.ready && d.ready, ()=>{ return [
			
			['div', {class: 'i has-answer'}],
			
			_.if(!_.__.global.iamExpert || _.__.global.myQuestionReady, ()=>[
				_.html('rate', _, d),
			]),
		]}),
	]],
	
	['div', {class: 'f-24 text *css*', style:()=>{/*css
		.*css* {
			display: none;
			position: absolute;
			z-index: 1;
			text-align: left;
			color: #888;			
			top: 220px;
			width: 480px;
			left: 60px;
			height: 140px;
			border-radius: 5px;
			font-size: 13px;
		}
		body.isMobile .*css* {
			width: 100%;
			padding: 0px 50px;
			left: 0px;
		}
		
		.*css*.active {
			display: block;
		}
		.*css*.active-single {
			top: 100px;
			height: 240px;
		}
		.*css* > .el {
			color: white;			
			padding: 0px 20px;
			max-height: 80px;
			min-height: 80px;
			height: 100%!important;
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
			border: none;
			padding: 20px;
			background: #444;		
			height: 100%;
			margin: 0px;
			background: #412c17;
			border-radius: 5px;
			font-size: 14px;
		}
		.*css* > .el > textarea:focus {
			outline: none;
		}
		.*css* > .el > div[type=talabel] {
			color: white;
			word-break: break-all;
			padding-top: 40px;
		}
		.*css* > .el > textarea {
			padding: 10px 20px;
		}
		
		body.isMobile .*css* > .el {
			max-height: 140px;
			min-height: 140px;
			padding: 0px;
		}
		body.isMobile .*css* > .el > textarea {
			margin-top: 0px;
			min-height: 100%;
			max-height: 100%;
			padding: 10px;
		}
		body.isMobile .*css* > .el > div[type=talabel] {
			width: 80%;
			margin: auto;
			text-align: center;
		}
		
		.*css* > .choiceRatesBlock {
			width: 320px;
			right: 20px;
			top: 4px;
			font-size: 20px;
		}
		
		body.isMobile .*css* > .choiceRatesBlock {
			position: relative;
			right: 0px;
			width: 180px;
			flex-wrap: wrap;
			margin: auto;
			align-items: center;
			justify-content: center;
			top: -20px;
		}
		body.isMobile .*css* > .choiceRatesBlock > .rate {
			width: 20%;
		}
		body.isMobile .*css* > .choiceRatesBlock > .el {
			width: 30%;
		}
		.*css* > .save {
			padding: 0px 20px;
			font-size: 14px;
		}
	css*/}}, [
		_.if(!_.__.global.iamCandidate || d.iam || _.__.global.voteFinished, ()=>{ return [
			_.if(!(d.iam && !d.ready), ()=>{ return [
				['label', {text: CONFIG.labels.answer}],
				_.if(_.__.global.iamExpert && !d.iam && !_.__.global.myQuestionReady, ()=>{ return [
					['div', {class: 'el'}, [
						['div', {type: 'talabel', text: CONFIG.labels.answer_view}],
					]]
				]}),
				_.if(!(_.__.global.iamExpert && !d.iam && !_.__.global.myQuestionReady), ()=>{ return [
					
					_.f({name: 'text', type: 'talabel', value: CONFIG.labels.question_empty}),

				]}),
			]}),
			_.if(!_.__.global.iamExpert && question.ready && d.iam && !d.ready, ()=>{ return [
				_.f({name: 'text', type: 'textarea', value: '', front: {
					onKeyUp: function (_){
						var text = _.val();
						if(text.length > 140){
							_.val(text.substring(0, 140));
							_.trigger('change');
						}else{
							_.closest('.text').find('.count > span').html(140-text.length);
						}
					},
				}}),
				['div', {class: 'count *css*', style:()=>{/*css
					.*css* {
						position: absolute;
						bottom: 0px;
						left: 0px;
						padding-bottom: 40px;
						font-size: 12px;
						padding-left: 20px;
						color: white;
					}
					body.isMobile .*css* {
						position: relative;
						padding: 0px;
						margin: auto;
						text-align: center;
					}
				css*/}, text: 'Осталось символов: '},[
					['span', {text: (140-(d.text?d.text.length:0))}],
				]],
				['div', {class: 'save *css*', style:()=>{/*css
					.*css* {
						position: absolute;
						bottom: 0px;
						right: 0px;
						padding: 20px;
					}
					.*css* > .el > button {
						border: none;
						min-width: 160px;
						background-size: contain;
						background-position: center;
						background-repeat: no-repeat;
						background-image: url(/static/img/button22.png);
						height: 50px;
						background-color: transparent;
						color: white;
						width: 100px;
						white-space: pre-wrap;
						font-size: 13px;
						margin-bottom: 6px;
						padding-bottom: 4px;
					}
					.*css* > .el > button:hover {
						opacity: 0.5;
					}
					body.isMobile .*css* {
						position: relative;					
					}
					body.isMobile .*css* > .el {
						width: 160px;
						margin: auto;
					}
				css*/}}, [
					['div', {class: 'el'}, [
						['button', {text: 'Сохранить'}, [
							_.f({name: 'save_answer', type: 'action', front: {
								onAction: function (e, data){
									
									if(data.skey) localStorage['poll_'+data.skey] = data.dateto;
									
									if($('#tutorial').attr('tutorialAnswers')){
										window.setTutorialComplete();
									}else{
										locationQuery(history.state.subform);
									}
								},
							}}),
						]],
					]],
				]],
			]}),
		]}),
	]],
]}

exports.script = ()=>{
	$(document).off('click', '#formVote .answer .ready');
	$(document).on('click', '#formVote .answer .ready', function(){
		var $answer = $(this).closest('[question]');
		var $formVote = $('#formVote');
		var $question = $formVote.find('.question[code='+$answer.attr('question')+'] > .text');
		$answer.closest('.answer').find('> .text').addClass('active');
		$question.addClass('active');
		$formVote.find('> .vote').addClass('active');
	});
}

exports.style = ()=>{/*

*/}