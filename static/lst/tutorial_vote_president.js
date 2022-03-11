var t = 10;

var lst = [{
	v: 'vote_president_about', l: 'vote_president_about',
	text: [{
		t:'Это выборы Президента Российской Федерации. В них участвуют 10 кандидатов, каждому из которых необходимо ответить на 10 вопросов экспертов.',
		d:0*t,
		controls: {
			'Повторить': function(){ window.setTutorialOnLoad() },
			'Все понятно': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'bottomLeft',
}];
if(typeof exports != 'undefined') exports.lst = lst;
if(typeof window != 'undefined') window.LST.tutorial_vote_president = lst;