/* project local js-script */

window.defautImage = '/static/img/default.png';
window.defautFileLink = '/static/img/docs.png';

$.notify.defaults( {style: 'help', position:"left top", autoHide: true} );
$( document ).ready(function() {
	if(window.isMobile) $.notify.defaults( {style: 'help', position:"bottom right"} );
});
$.notify.addStyle('help', {
	html: "<div><span data-notify-text/></div>",
	classes: {
		base: {
			"color": "white",
			"padding": "10px",
			"border": "2px solid #af753b",
			"background-color": "#412c17",
			"border-radius": "5px",
			"cursor": "pointer",
			"text-align": "left",
			"z-index": "9999",
			"font-size": "12px",
		},
	}
});

$(document).on('contextmenu', 'body', function(e){
	e.preventDefault();
});

$(document).on('contextmenu', '[help]', function(e){
	e.preventDefault();
	var help = $(this).attr('help');
	if(help[0] == '['){
		help = JSON.parse(help);
		if(help[0] == 'lst' && window.LST[help[1]]){
			help = window.LST[help[1]].filter(function(h){ return h.v == help[2]})[0].help;
		}
	}
	$(this).notify(help,  { position: $(this).attr('helpPosition') || "top", style: "help" });
});

$(document).on('click', '.tutorial-link', function(e){
	var $link = $(this);
	var link = $link.attr('link');
	if(link){
		if($('#tutorial').attr('currentTutorial')){
			/*if($link.hasClass('tutorial-active')){ // это tutorial_hello
				window.setTutorialComplete({}, function(){
					$link.removeClass('tutorial-active');
					$link.trigger('click');
				});
			}else{*/
				$.notify('Необходимо закончить текущее обучение');
			//}
		}else{
			wsSendCallback( {action: 'tutorial_status', link: link}, function(completeData){
				$link.remove();
				locationQuery({form: 'formTutorial', container: 'subFormTutorial', history: false});
			});
		}
	}
});