var t = 10;

var lst = [{
	v: 'idea_about', l: 'idea_about',
	text: [{
		t:'Это раздел, в котором каждый участник может поделиться своей идеей.',
		d:400*t,
	}, {
		t:'Идея может быть совершенно любая. Главное, чтобы она заинтересовала других участников, и они выставили ей высокие оценки.',
		d:600*t,
	}, {
		t:'Внутри платформы все идеи становятся виртуальными персонажами, которые начинают жить собственной жизнью. Их можно будет "брать на работу", и они начнут строить свою виртуальную карьеру.',
		d:0*t,
		controls: {
			'Повторить': function(){ window.setTutorialOnLoad() },
			'Все понятно': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'bottomLeft',
}];
if(typeof exports != 'undefined') exports.lst = lst;
if(typeof window != 'undefined') window.LST.tutorial_idea = lst;