var t = 10;

var lst = [/*{
	v: 'game', l: 'game', 
	hide: '#guiConfig, #guiProfile, #guiRates, #guiStats, #guiPoll, #guiNews, #guiEvents, #subFormMain',
	text: [{
		t:'Выбери сферу, в которой ты хочешь построить свою виртуальную карьеру.',
		d:0*t,
		controlsClass: 'big',
		controls: {
			'Гос.служба': function(){ window.setTutorialComplete() },
			'Банки (в разработке)': false,
			'IT (в разработке)': false,
		}
	}],
	position: 'topRight',
},*/{
	v: 'hello', l: 'hello', 
	hide: '#guiConfig, #guiProfile, #guiRates, #guiStats, #guiPoll, #guiNews, #guiEvents, #subFormMain',
	text: [{
		t:'Гражданин, приветствую тебя на площадке электронных выборов виртуального правительства! Мы проводим выборы в различные органы виртуальной власти. На данной платформе ты можешь построить свою государственную карьеру, создать самую популярную виртуальную партию и стать самым влиятельным политиком, выйграв главные выборы страны.',
		d:0*t,
		controls: {
			'Я хочу пройти обучение': function(){ window.setTutorialComplete() },
			/*'Все понятно, я разберусь сам': function(){
				$('.tutorial-link').hide();
				window.setTutorialComplete({endTutorial: true});
			},*/
		}
	}],
	position: 'topRight',
},{
	v: 'tutorial_link', l: 'tutorial_link', 
	hide: '#guiConfig, #guiProfile, #guiRates, #guiStats, #guiPoll, #guiNews, #guiEvents, #subFormMain',
	action: function(callback){
		var $links = $('.tutorial-link');
		$links.addClass('tutorial-active');
		$links.parent().removeClass('tutorial-hide');
		callback();
	},
	text: [{
		i: '/static/img/hello1.png',
		t:'Отлично, я познакомлю тебя с основными элементами платформы. Нажимай на значки с моим изображением, чтобы получить подробную инструкцию по каждому разделу.',
		d:0*t,
		controls: {
			'Продолжить': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'topRight',
},{
	v: 'help', l: 'help', 
	action: function(callback){
		var $links = $('.tutorial-link');
		$links.removeClass('tutorial-active');
		callback();
	},
	text: [{
		i: '/static/img/hello2.png',
		t:'Обрати внимание, что если при наведении на элемент интерфейса появляется значек с вопросом, то нажимая правую кнопку мыши можно получить быструю подсказку.',
		d:0*t,
		controls: {
			'Продолжить': function(){ window.setTutorialComplete() },
		},
	}],
	position: 'topRight',
}];
if(typeof exports != 'undefined') exports.lst = lst;
if(typeof window != 'undefined') window.LST.tutorial_hello = lst;