var t = 10;

var lst = [{
	v: 'fq_about', l: 'fq_about',
	text: [{
		t:'Это мини-игра для действующих и будущих руководителей, которая позволяет развить навыки формулирования вопросов. Задача участника состоит в том, чтобы задать грамотный вопрос, который максимально близко связан с предложенными темами.',
		d:0*t,
		controls: {
			'Продолжить': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'bottomLeft',
},{
	v: 'fq_themes', l: 'fq_themes',
	action: function(callback){
		$('#formQuestion .questionBaseStats > .label').addClass('tutorial-active');
		callback();
	},
	text: [{
		t:'Минимальное количество тем указано на счетчике. Однако для получения максимального бонуса лучше использовать все предложенные темы. Не забудь, что если тема не будет соответствовать вопрос, то это понизит твои характеристики.',
		d:0*t,
		controls: {
			'Продолжить': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'bottomLeft',
},{
	v: 'fq_award', l: 'fq_award',
	action: function(callback){
		$('#formQuestion .tutorial-active').removeClass('tutorial-active');
		$('#formQuestion .award').addClass('tutorial-active');
		callback();
	},
	text: [{
		t:'В этой мини-игре предусмотрены ежедневные награды. Задавай каждый день по три вопроса и получай по три случайных бонуса. Количество звезд показывает, сколько вопросов за сегодня успешно прошло модерацию. Как только все три зведы будут активны, после нажатия на них, ты моментально получишь свою награду.',
		d:0*t,
		controls: {
			'Продолжить': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'bottomLeft',
},{
	v: 'fq_result', l: 'fq_result',
	action: function(callback){
		$('#formQuestion .tutorial-active').removeClass('tutorial-active');
		callback();
	},
	text: [{
		t:'Каждый придуманный вопрос может быть в последствии задан кандидатам на выборах, поэтому его стоит формулировать так, как будто бы он задается претенденту на дожность, чьи обязанности будут связанны с отраженными в темах сферами жизни.',
		d:0*t,
		controls: {
			'Завершить обучение': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'bottomLeft',
}];
if(typeof exports != 'undefined') exports.lst = lst;
if(typeof window != 'undefined') window.LST.tutorial_free_question = lst;