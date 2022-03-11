var t = 10;

var lst = [{
	v: 'story_about', l: 'story_about',
	text: [{
		t:'Это раздел, в котором каждый участник может рассказать свою историю из жизни.',
		d:400*t,
	}, {
		t:'История может быть совершенно любая. Главное, чтобы она заинтересовала других участников, и они выставили ей высокие оценки.',
		d:600*t,
	}, {
		t:'Внутри платформы все истории становятся виртуальными персонажами, которые начинают жить собственной жизнью. Их можно будет "брать на работу", и они начнут строить свою виртуальную карьеру.',
		d:0*t,
		controls: {
			'Повторить': function(){ window.setTutorialOnLoad() },
			'Все понятно': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'bottomLeft',
}];
if(typeof exports != 'undefined') exports.lst = lst;
if(typeof window != 'undefined') window.LST.tutorial_story = lst;