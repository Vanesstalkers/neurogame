var t = 10;

var lst = [{
	v: 'poll_about', l: 'poll_about',
	hide: "#guiConfig, #guiProfile, #guiRates, #guiStats, #guiEvents, #subFormMain",
	action: function(callback){
		$('#findPoll').addClass('tutorial-disabled');
		var $guiPoll = $('#guiPoll');
		$guiPoll.find('.tutorial-poll').hide();
		if(!$guiPoll.hasClass('active')) $guiPoll.find('> .poll-toggle').trigger('click');
		callback();
	},
	text: [{
		t:'Важнейшей ролью общества является социальный контроль представителей власти. Раздел опросов дает возможность активного участия всех пользователей в избирательном процессе через выставления оценок всем вопросам экспертов и ответам кандидатов прошедших выборов.',
		d:0*t,
		controls: {
			'Продолжить': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'bottomRight',
},{
	v: 'poll_find_btn', l: 'poll_find_btn',
	hide: "#guiConfig, #guiProfile, #guiRates, #guiStats, #guiEvents, #subFormMain",
	action: function(callback){
		
		var $guiPoll = $('#guiPoll');
		if(!$guiPoll.hasClass('active')) $guiPoll.find('> .poll-toggle').trigger('click');
		var $toggleBestPoll = $('#toggleBestPoll');
		if($toggleBestPoll.hasClass('passive')) $toggleBestPoll.trigger('click');
		
		$guiPoll.find('.tutorial-poll').hide();
		$('#findPoll').addClass('tutorial-disabled').addClass('tutorial-active').removeClass('passive');
		
		$('#findPoll.tutorial-active').one('click', function(){
			window.setTutorialComplete();
		});
		
		callback();
	},
	text: [{
		t:'Новые опросы можно получить через поиск. Существует несколько типов опросов, которы предлагают оценить вопросы экспертов и ответы кандидатов на выборах, а также истории и идеи граждан.',
		d:0*t,
		controls: {
			'Нажми на кнопку поиска': false,
		},
	}],
	position: 'bottomRight',
},{
	v: 'poll_answer', l: 'poll_answer',
	hide: "#guiConfig, #guiProfile, #guiRates, #guiStats, #guiEvents, #subFormMain",
	action: function(callback){

		reloadComplex( $('#singlePoll > .complex-block'), {}, function(){

			var $guiPoll = $('#guiPoll');
			if(!$guiPoll.hasClass('active')) $guiPoll.find('> .poll-toggle').trigger('click');
			var $toggleBestPoll = $('#toggleBestPoll');
			if($toggleBestPoll.hasClass('passive')) $toggleBestPoll.trigger('click');
			
			$guiPoll.find('.tutorial-poll').hide();
			$('#findPoll').addClass('tutorial-disabled').removeClass('tutorial-active').addClass('passive'); 
		
			var $tutorialAnswer = $guiPoll.find('.tutorial-poll.tutorial-answer');
			if($tutorialAnswer.length){
				$tutorialAnswer.show();
				$tutorialAnswer.addClass('active');
				$tutorialAnswer.addClass('tutorial-active');
				$tutorialAnswer.find('.choiceRatesBlock').addClass('passive');
			}
			$guiPoll.find('.tutorial-poll.tutorial-question ').hide();
		});
		
		callback();
	},
	text: [{
		t:'Чтобы оценить ответ (в контексте заданного вопроса), достаточно выбрать оценку от 1 до 10.',
		d:0*t,
		controls: {
			'Продолжить': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'bottomRight',
},{
	v: 'poll_answer_rate', l: 'poll_answer_rate',
	hide: "#guiConfig, #guiProfile, #guiRates, #guiStats, #guiEvents, #subFormMain",
	action: function(callback){

		var $guiPoll = $('#guiPoll');
		if(!$guiPoll.hasClass('active')) $guiPoll.find('> .poll-toggle').trigger('click');
		var $toggleBestPoll = $('#toggleBestPoll');
		if($toggleBestPoll.hasClass('passive')) $toggleBestPoll.trigger('click');
		
		$guiPoll.find('.tutorial-poll').hide();
		$('#findPoll').addClass('tutorial-disabled').addClass('passive');
		
		var $tutorialAnswer = $guiPoll.find('.tutorial-poll.tutorial-answer');
		if($tutorialAnswer.length && !$tutorialAnswer.hasClass('passive')){
			$tutorialAnswer.show();
			$tutorialAnswer.addClass('active');
			$tutorialAnswer.removeClass('tutorial-active');
			$tutorialAnswer.find('.choiceRatesBlock').addClass('tutorial-active').removeClass('passive');
			$('#tutorial').attr('tutorialRates', 1);
			callback();
		}else{
			callback(false);
			window.setTutorialComplete();
		}
	},
	text: [{
		t:'Бонусы за участие в опросе зависят от совпадения выставленной оценки со средней оценкой, среди всех опрошенных.',
		d:0*t,
		controls: {
			'Поставь оценку в опросе': false,
		},
	}],
	position: 'bottomRight',
},{
	v: 'poll_question_stats', l: 'poll_question_stats',
	hide: "#guiConfig, #guiProfile, #guiRates, #guiStats, #guiEvents, #subFormMain",
	action: function(callback){

		reloadComplex( $('#singlePoll > .complex-block'), {}, function(){
		
			var $guiPoll = $('#guiPoll');
			if(!$guiPoll.hasClass('active')) $guiPoll.find('> .poll-toggle').trigger('click');
			
			$guiPoll.find('.tutorial-poll').hide();
			$('#findPoll').addClass('tutorial-disabled').addClass('passive');
			
			var $tutorialQuestion = $guiPoll.find('.tutorial-poll.tutorial-question');
			
			if($tutorialQuestion.length && !$tutorialQuestion.hasClass('passive')){
				
				$tutorialQuestion.show();
				$tutorialQuestion.addClass('active');
				$tutorialQuestion.find('.choiceRatesBlock').addClass('passive');

				var $pollStats = $tutorialQuestion.find('.pollStats');
			
				if($pollStats.length){
					$pollStats.addClass('tutorial-active');
				}else{
					window.setTutorialComplete();
				}
			}else{
				window.setTutorialComplete();
			}
		});
		
		callback();
	},
	text: [{
		t:'Оценка вопроса сложнее тем, что помимо оценки участник голосования должен правильно определить, соответствуют ли  указанные темы сути вопроса.',
		d:0*t,
		controls: {
			'Продолжить': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'bottomRight',
},{
	v: 'poll_question_rate', l: 'poll_question_rate',
	hide: "#guiConfig, #guiProfile, #guiRates, #guiStats, #guiEvents, #subFormMain",
	action: function(callback){

		var $guiPoll = $('#guiPoll');
		if(!$guiPoll.hasClass('active')) $guiPoll.find('> .poll-toggle').trigger('click');
		
		$guiPoll.find('.tutorial-poll').hide();
		$('#findPoll').addClass('tutorial-disabled').addClass('passive');
		
		var $tutorialQuestion = $guiPoll.find('.tutorial-poll.tutorial-question');
		
		if($tutorialQuestion.length && !$tutorialQuestion.hasClass('passive')){

			$tutorialQuestion.show();
			$tutorialQuestion.addClass('active');
			$tutorialQuestion.find('.pollStats').removeClass('tutorial-active');
			
			var $tutorialRates = $tutorialQuestion.find('.choiceRatesBlock');
		
			if($tutorialRates.length){
				$('#tutorial').attr('tutorialRates', 1);
				$tutorialQuestion.removeClass('tutorial-active');
				$tutorialRates.addClass('tutorial-active').removeClass('passive');
				callback();
			}else{
				callback(false);
				window.setTutorialComplete();
			}
		}else{
			callback(false);
			window.setTutorialComplete();
		}
	},
	text: [{
		t:'"ДА" означает, что вопрос имеет отношение к данной теме, а "НЕТ" - не имеет.',
		d:0*t,
		controls: {
			'Оцени ответ': false,
		},
	}],
	position: 'bottomRight',
},{
	v: 'poll_question_news', l: 'poll_question_news', 
	hide: "#guiConfig, #guiProfile, #guiRates, #guiStats, #guiEvents, #subFormMain",
	action: function(callback){

		var $guiPoll = $('#guiPoll');
		$guiPoll.find('.tutorial-poll').hide();
		if($guiPoll.hasClass('active')) $guiPoll.find('> .poll-toggle').trigger('click');
		$('#findPoll').addClass('tutorial-disabled').addClass('passive');
				
		$('#guiNews > .news-block > .news-list > .news.tutorial').hide();

		var $news = $('#guiNews > .news-block > .news-list > .news.tutorial.tmpStats');

		if($news.length){
			$news.show();
			$news.trigger('click');
			$('#guiNews > .news-details').addClass('tutorial-active');			
		}
		
		callback();
	},
	text: [{
		t:'По итогам участия в голосовании начисляются бонусы, величина которых зависит от правильности оценки и указанных тематик. Первый расчет бонусов является предварительным, учитывающим только текущие результаты голосования.',
		d:0*t,
		controls: {
			'Продолжить': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'bottomRight',
},{
	v: 'poll_question_news_modify', l: 'poll_question_news_modify', 
	hide: "#guiConfig, #guiProfile, #guiRates, #guiStats, #guiEvents, #subFormMain",
	action: function(callback){

		var $news = $('#guiNews > .news-block > .news-list > .news.tutorial:not(.tmpStats)');

		if($news.length){
			$news.show();
			$news.trigger('click');
			$('#guiNews > .news-details').addClass('tutorial-active');
		}
		
		callback();
	},
	text: [{
		t:'Сразу после окончания голосования (обычно через сутки) рейтинги уточняются и бонусы пересчитываются.',
		d:0*t,
		controls: {
			'Завершить голосование': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'bottomRight',
}];
if(typeof exports != 'undefined') exports.lst = lst;
if(typeof window != 'undefined') window.LST.tutorial_poll = lst;