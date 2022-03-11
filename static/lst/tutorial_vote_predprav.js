var t = 10;

var lst = [{
	v: 'vote_predprav_about', l: 'vote_predprav_about',
	text: [{
		t:'Это выборы Председателя Правительства. В них участвуют 10 кандидатов, каждому из которых необходимо ответить на 10 вопросов экспертов.',
		d:0*t,
		controls: {
			'Повторить': function(){ window.setTutorialOnLoad() },
			'Все понятно': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'bottomLeft',
}];
if(typeof exports != 'undefined') exports.lst = lst;
if(typeof window != 'undefined') window.LST.tutorial_vote_predprav = lst;