var front = typeof window != 'undefined';
var t = 10;

var lst = [{
	v: 'vote_about', l: 'vote_about',
	hide: '#guiConfig, #guiProfile, #guiRates, #guiStats, #guiPoll, #guiNews, #subFormMain',
	text: [{
		t:'Основная цель задача платформы - выявление наиболее достойный кандидатов, способных занять руководящие позиции в стране, начиная от глав администраций небольших городов, и зачанчивая должностью Президента Российской\xa0Федерации.',
		d:0*t,
		controls: {
			'Продолжить': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'topRight',
},{
	v: 'vote_events', l: 'vote_events',
	hide: '#guiConfig, #guiProfile, #guiRates, #guiStats, #guiPoll, #guiNews, #subFormMain',
	action: function(callback){
		$('#guiEvents > .events-list').addClass('tutorial-active');
		callback();
	},
	text: [{
		t:'Главным механизмом отбора являются электронные выборы. Все проводимые в настоящий момент выборы отображены на главной карте соответствующими значками. Твои текущие и новые рекомендованные для участия мероприятия находятся на панели событий.',
		d:0*t,
		controls: {
			'Продолжить': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'topRight',
},{
	v: 'vote_new', l: 'vote_new',
	hide: '#guiConfig, #guiProfile, #guiRates, #guiStats, #guiPoll, #guiNews, #subFormMain',
	action: function(callback){
		
		$('#guiEvents > .events-list').removeClass('tutorial-active');

		if(window.map && window.map.addVote){

			$('#searchVoteBtn').addClass('tutorial-active');
			
			$('#searchVoteBtn.tutorial-active').one('click', function(){
				locationQuery({form: 'formVote', container: 'subFormMain', filter: {code: $('#tutorial_vote').attr('code')} })
			});
			
			waitForLoadElementByCode[$('#subFormMain').attr('code')] = function(){
				delete waitForLoadElementByCode[$('#subFormMain').attr('code')];
				window.setTutorialComplete();
			};
			callback();
		}else{
			callback(false);
			window.setTutorialComplete();
		}
	},
	text: [{
		t:'Ты можешь присоединиться к уже запущенным выборам, нажав на значек поиска в панели событий или на карте. Также ты можешь самостоятельно начать новые выборы, выбирая на карте города.',
		d:0*t,
		controls: {
			'Активируй поиск выборов': false,
		},
	}],
	position: 'topRight',
},{
	v: 'vote_form', l: 'vote_form',
	hide: '#guiConfig, #guiProfile, #guiRates, #guiStats, #guiPoll, #guiNews',
	action: function(callback){
		
		$('#subFormMain').removeClass('tutorial-hide');
		$('#searchVoteBtn').removeClass('tutorial-active');
		$('#guiEvents > .events-list > a.tutorial-active').remove();
		window.toggleVoteSearchBtn();
		
		waitForLoadElementByCode[$('#subFormMain').attr('code')] = function(){
			delete waitForLoadElementByCode[$('#subFormMain').attr('code')];
			window.afterAllLoaded.push(callback);
		}
		locationQuery({form: 'formVote', container: 'subFormMain', filter:{
			code: $('#tutorial_vote').attr('code'),
			tutorialVote: true,
		}});
	},
	text: [{
		t:'В заголовке блока выборов отображается должность, за которую борются кандидаты и оставшееся время до завершения.', 
		d:400*t, 
		active: '#formVote > .header',
	},{
		t:'Приглашенные эксперты задают по одному вопросу.',
		d:400*t,
		active: '#formVote > .vote > div > div.expert',
	},{
		t:'Кандидаты должны ответить на все вопросы, а их ответы оцениваются каждым экспертом по десятибальной шкале.',
		d:400*t,
		active: '#formVote > .vote > div > div:not(.expert)',
		controls: {
			'Повторить': function(){ window.setTutorialOnLoad() },
			'Продолжить': function(){ window.setTutorialComplete() },
		},
	}],
	position: (front && window.isMobile) ? 'bottomRight' : 'bottomLeft',
},{
	v: 'vote_question', l: 'vote_question', 
	hide: '#guiConfig, #guiProfile, #guiRates, #guiStats, #guiPoll, #guiNews',
	action: function(callback){

		waitForLoadElementByCode[$('#subFormMain').attr('code')] = function(){
			
			delete waitForLoadElementByCode[$('#subFormMain').attr('code')];
			
			window.afterAllLoaded.push(function(){
			
				var $tutorialQuestions = $('#formVote .tutorial-question .save > .el > button');
				if($tutorialQuestions.length){
					$('#tutorial').attr('tutorialQuestions', $tutorialQuestions.length);
					callback();
				}else{
					callback(false);
					window.setTutorialComplete();
				}
			})
		}
		locationQuery({form: 'formVote', container: 'subFormMain', filter:{
			code: $('#tutorial_vote').attr('code'),
			tutorialVote: true,
			tutorialVoteQuestion: true,
		}});
	},
	text: [{
		t: 'Один из экспертов до сих пор не задал свой вопрос.', 
		d: 400*t, 
		active: '#formVote .tutorial-question',
	},{
		t:'Текст вопроса не должен превышать 140 символов.',
		action: function(callback){
			var $question = $('#formVote .tutorial-question');
			if(!$question.find('> .text').hasClass('active')) $question.find('> div > .i').trigger('click');
			callback();
		},
		d: 400*t,
		active: '#formVote .tutorial-question, #formVote .tutorial-question textarea',
	},{
		t:'Вопрос должен соответствовать предложенным темам.',
		d: 400*t,
		active: '#formVote .tutorial-question, #formVote .tutorial-question .questionBaseStats',
	},{
		t: 'Задача эксперта состоит в том, чтобы задать профессиональный и социально полезный вопрос, который получит высокий рейтинг оценки. При этом он должен соответствовать максимальному количеству предложенных тем, чтобы получить бонус к характеристикам эксперта.',
		d:0*t,
		controls: {
			'Повторить': function(){ window.setTutorialOnLoad() },
			'Продолжить': function(){ window.setTutorialComplete() },
		}
	}],
	position: (front && window.isMobile) ? 'topLeft' : 'bottomLeft',
},{
	v: 'vote_question_save', l: 'vote_question_save', 
	hide: '#guiConfig, #guiProfile, #guiRates, #guiStats, #guiPoll, #guiNews',
	action: function(callback){
		
		waitForLoadElementByCode[$('#subFormMain').attr('code')] = function(){
			
			delete waitForLoadElementByCode[$('#subFormMain').attr('code')];
			
			window.afterAllLoaded.push(function(){
			
				var $question = $('#formVote .tutorial-question');
				if(!$question.find('> .text').hasClass('active')) $question.find('> div > .i').trigger('click');
				
				var $tutorialQuestions = $question.find('.save > .el > button');

				if($tutorialQuestions.length){
					$('#tutorial').attr('tutorialQuestions', $tutorialQuestions.length);
					callback();
				}else{
					callback(false);
					window.setTutorialComplete();
				}
			})
		}
		locationQuery({form: 'formVote', container: 'subFormMain', filter:{
			code: $('#tutorial_vote').attr('code'),
			tutorialVote: true,
			tutorialVoteQuestion: true,
		}});
	},
	text: [{
		t: 'Выбери темы и задай вопрос эксперта.',
		d:0*t,
		active: '#formVote .tutorial-question .save',
		controls: {
			'Задай вопрос': false,
		}
	}],
	position: (front && window.isMobile) ? 'topLeft' : 'bottomLeft',
},{
	v: 'vote_answer', l: 'vote_answer', 
	hide: '#guiConfig, #guiProfile, #guiRates, #guiStats, #guiPoll, #guiNews',
	action: function(callback){

		waitForLoadElementByCode[$('#subFormMain').attr('code')] = function(){
			
			delete waitForLoadElementByCode[$('#subFormMain').attr('code')];
			
			window.afterAllLoaded.push(function(){
				
				var $tutorialAnswers = $('#formVote .tutorial-answer .save > .el > button');
				if($tutorialAnswers.length){
					$('#tutorial').attr('tutorialAnswers', $tutorialAnswers.length);
					callback();
				}else{
					callback(false);
					window.setTutorialComplete();
				}
			})
		}
		locationQuery({form: 'formVote', container: 'subFormMain', filter:{
			code: $('#tutorial_vote').attr('code'),
			tutorialVote: true,
			tutorialVoteAnswer: true,
		}});
	},
	text: [{
		t:'Отлично. Все эксперты задали свои вопросы, и кандидаты начали отвечать.',
		d:400*t,
	},{
		t:'Остался всего один ответ, чтобы можно было подвести итоги выборов.',
		d:0*t,
		controls: {
			'Помоги ответить на вопрос': false,
		},
	}],
	position: (front && window.isMobile) ? 'topLeft' : 'bottomLeft',
	active: '#formVote .tutorial-answer, #formVote .tutorial-answer .save',
},{
	v: 'vote_rate', l: 'vote_rate', 
	hide: '#guiConfig, #guiProfile, #guiRates, #guiStats, #guiPoll, #guiNews',
	action: function(callback){

		waitForLoadElementByCode[$('#subFormMain').attr('code')] = function(){
			
			delete waitForLoadElementByCode[$('#subFormMain').attr('code')];
			
			window.afterAllLoaded.push(function(){
				var $tutorialRates = $('#formVote .tutorial-answer .tutorial-rates > .el > button');
				if($tutorialRates.length){
					$('#tutorial').attr('tutorialRates', $tutorialRates.length);
					callback();
				}else{
					callback(false);
					window.setTutorialComplete();
				}
			})
		}
		locationQuery({form: 'formVote', container: 'subFormMain', filter:{
			code: $('#tutorial_vote').attr('code'),
			tutorialVote: true,
			tutorialVoteRate: true,
		}});
	},
	text: [{
		t:'Каждый ответ каждого кандидата должен получить оценку эксперта.',
		d:0*t,
		controls: {
			'Добавь недостающие оценки': false,
		},
	}],
	position: (front && window.isMobile) ? 'topLeft' : 'bottomLeft',
	active: '#formVote .tutorial-answer, #formVote .tutorial-rates',
},{
	v: 'vote_finish', l: 'vote_finish', 
	hide: '#guiConfig, #guiProfile, #guiRates, #guiStats, #guiPoll, #guiNews',
	action: function(callback){

		waitForLoadElementByCode[$('#subFormMain').attr('code')] = function(){
			delete waitForLoadElementByCode[$('#subFormMain').attr('code')];
			window.afterAllLoaded.push(function(){ callback() });
		}
		locationQuery({form: 'formVote', container: 'subFormMain', filter:{
			code: $('#tutorial_vote').attr('code'),
		}});
	},
	text: [{
		t:'Поздравляю, твои первые выборы закончены! В итоговой таблице ты можешь ознакомиться с ответом каждого кандидата и увидеть выставленные экспертами оценки.',
		d:0*t,
		controls: {
			'Продолжить': function(){ window.setTutorialComplete() },
		},
	}],
	active: '#formVote > .vote > div > div:not(.expert)',
	position: 'bottomLeft',
},{
	v: 'vote_finish_news', l: 'vote_finish_news',
	hide: '#guiConfig, #guiProfile, #guiRates, #guiStats, #guiPoll, #subFormMain',
	action: function(callback){
		$('#guiNews').removeClass('tutorial-hide');
		callback();
	},
	text: [{
		t:'Все участники выборов вне зависимости от результата получают бонусы, которые отображаются в верхней панели. Нажав на каждую иконку, можно получить детальную информацию об источнике вознаграждения.', 
		d:0*t, 
		action: function(callback){
			var $newsList = $('#guiNews > .news-block > .news-list');
			$newsList.addClass('tutorial-active');
			var $news = $newsList.find('> .news:first-child');
			if($news) $news.trigger('click');
			callback();
		},
		controls: {
			'Закончить обучение': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'bottomLeft',
}];
if(typeof exports != 'undefined') exports.lst = lst;
if(front) window.LST.tutorial_vote = lst;