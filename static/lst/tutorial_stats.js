var t = 10;

var lst = [{
	v: 'stats_about', l: 'stats_about',
	hide: '#guiConfig, #guiProfile, #guiRates, #guiPoll, #guiNews, #guiEvents, #subFormMain',
	action: function(callback){
		var $guiStats = $('#guiStats');
		if(!$guiStats.hasClass('active')) $guiStats.find('> .stats-toggle').trigger('click');
		callback();
	},
	text: [{
		t:'Это список твоих навыков. Платформа автоматически увеличивает их по мере твоего участия в выборах и опросах.',
		d:0*t,
		controls: {
			'Продолжить': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'bottomLeft',
}, {
	v: 'stats_invite', l: 'stats_invite',
	hide: '#guiConfig, #guiProfile, #guiRates, #guiPoll, #guiNews, #guiEvents, #subFormMain',
	action: function(callback){
		var $guiStats = $('#guiStats');
		if(!$guiStats.hasClass('active')) $guiStats.find('> .stats-toggle').trigger('click');
		callback();
	},
	text: [{
		t: 'Если твои навыки достаточно высоки, то ты можешь расчитывать на получение приглашения о вступлении в проектные команды, которые ищут специалистов из соответствующих твомим навыкам областей.',
		d:0*t,
		controls: {
			'Завершить обучение': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'bottomLeft',
}];
if(typeof exports != 'undefined') exports.lst = lst;
if(typeof window != 'undefined') window.LST.tutorial_stats = lst;