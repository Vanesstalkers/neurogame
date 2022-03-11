var t = 10;

var lst = [{
	v: 'vote_senator_about', l: 'vote_senator_about',
	text: [{
		t:'Это выборы в Совет Федераций. В них может участвовать неограниченное количество кандидатов, но каждому необходимо ответить на 20 вопросов экспертов. Итоговые результаты и победители выборов определяются через публиные голосования.',
		d:0*t,
		controls: {
			'Повторить': function(){ window.setTutorialOnLoad() },
			'Все понятно': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'bottomLeft',
}];
if(typeof exports != 'undefined') exports.lst = lst;
if(typeof window != 'undefined') window.LST.tutorial_vote_senator = lst;