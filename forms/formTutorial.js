exports.id = (__, code, callback)=>{
	__.fields[code].col = 'user';
	__.queryIds[code] = [__.user.key];
	callback();
}
exports.tpl = (_, d)=>{
	
	var currentTutorial = d.tutorial ? d.tutorial.active : '';
	var currentStep = d.tutorial ? d.tutorial.activeStep : '';
	if(!currentStep && currentTutorial && LST['tutorial_'+currentTutorial]) currentStep = LST['tutorial_'+currentTutorial].list.lst[0].v;
	
return [
	
	['div', {id: 'tutorial', currentTutorial: currentTutorial, currentStep: currentStep, class: '*css*', style:()=>{/*css
		.*css* {
			position: relative;
			width: 100%;
			font-size: 14px;
			display: none;
		}
		.*css*.active[currentTutorial] {
			display: flex;
		}
		
		.*css* > .controls {
			position: absolute;
			bottom: 6px;
			left: 0px;
			width: 100%;
			display: flex;
			justify-content: center;
		}
		.*css* > .controls.big {
			top: 100%;
			flex-wrap: wrap;
			margin-top: -40px;
		}
		.*css* > .controls > button {
			color: #888;
			border: 2px solid #888;
			background-image: url(/XAOC/images/clear-black-back.png);
			padding: 10px 20px;
		}
		.*css* > .controls.big > button {
			width: 60%;
		}
		.*css* > .controls > button.active {
			border-color: #d5ad51;
			color: #d5ad51;
		}
		.*css* > .controls > button.active:hover {
			color: white;
		}
	css*/}}, [
		
		_.f({name: 'tutorial.links', type: '*'}),
		
		((_, d)=>_.__.pre ? [
			_.f({name: 'tutorial.active', type: '*-'}),
			_.f({name: 'tutorial.activeStep', type: '*-'}),
		] : [
			_.f({name: 'tutorial.active', type: '*-', lst: 'tutorial_'+d.tutorial.active}),
		])(_, d),
	
		['img', {class: 'guru *css*', style:()=>{/*css
			.*css* {
				position: absolute;
				border-radius: 50%;
				border: 3px solid #d5ad51;
				right: 10px;
				top: 10px;
				width: 64px;
			}
			body.isMobileSmall .*css* {
				right: 10px;
				top: 10px;
				width: 64px;
			}
		css*/}}],
		['div', {class: 'content *css*', style:()=>{/*css
			.*css* {
				width: 100%;
				margin: 30px;
				min-height: 100px;
				border: 2px solid #d5ad51;
				background-image: url(/XAOC/images/clear-black-back.png);
				padding: 20px;
				padding-right: 60px;
				white-space: pre-wrap;
				color: #d5ad51;
				overflow: hidden;
				display: flex;
			}
			body.isMobile .*css* {
				min-height: 0px;
			}
			#tutorial.has-controls .*css* {
				padding-bottom: 30px;
			}
			body.isMobileSmall .*css* {
				font-size: 12px;
				padding-right: 40px;
			}
			.*css* > .typed-cursor {
				display: none!important;
			}
			.*css* > .text {
				width: 100%;
			}
			.*css* > .img {
				width: 60px;
				background-size: contain;
				flex-shrink: 0;
				background-repeat: no-repeat;
				background-position: center;
				margin-right: 20px;
				display: none;				
			}
			body.isMobileSmall .*css* > .img {
				width: 40px;
			}
			.*css* > .img.active {
				display: block;
			}
		css*/}}, [
			['div', {class: 'img'}],
			['div', {class: 'text'}],
		]],
		
		_.if(currentTutorial == 'vote', ()=>[
			_.c({name: 'vote_tutorial', add: false, process: {
				id: (__, code, callback)=>{
					__.fields[code].col = 'vote';
					if(__.data[__.fields[code].parent].__vote_tutorial == undefined){
						ROUTER.route(__, {action: 'add_tutorial_vote'}, (vote)=>{
							__.queryIds[code] = [];
							if(vote._id) __.queryIds[code].push(vote._id);
							callback();
						}, true);
					}else{
						__.queryIds[code] = [ __.data[__.fields[code].parent].__vote_tutorial.l.pop() ];
						callback();
					}
				},
				tpl: (_, d)=>{ return [
					['div', {id: 'tutorial_vote'}, [
						['div', {class: 'adrs'}, [
							_.c({name: 'adrs', add: false, process: {
								tpl: (_, d)=>{ return [
									['div', {}, [
										_.f({name: 'state', type: '*'}),
										_.f({name: 'city', type: '*'}),
										_.f({name: 'osm_lonlat', type: '*'}),
									]],
								]},
							}}),
						]],
					]],
				]},
			}}),
		]),
	]],
	
]}

exports.func = ()=>{
	
	window.setTutorial = function(data, after, noaction){
			
		if(noaction !== true){
			
			if(data.hide) $(data.hide).addClass('tutorial-hide');
			if(typeof data.action != 'function') data.action = function(cb){ cb() };
			data.action(function(next){
				$(data.active).addClass('tutorial-active');
				if(next !== false) window.setTutorial(data, after, true);
			});
		}else{
		
			var $t = $('#tutorial');
			$t.addClass('active');
				
			if(data.position) $('#subFormTutorial').attr('tutorialPosition', data.position);

			data.src = '/static/img/guru.jpg';
			if(data.src) $t.find('> .guru').attr('src', data.src);
			
			if(data.t){
				
				var p = {strings: [ data.t+'^'+data.d ]};

				p.onComplete = after.length > 0 ? function(){
					var nextStep = after.shift();
					window.setTutorial(nextStep, after);
				} : function(){
					if(data.controls){
						var $controls = $('<div />', {class: 'controls '+(data.controlsClass||'')});
						for(var c in data.controls){
							var $btn = $('<button />', {text: c});
							if(data.controls[c] && data.controls[c] !== false){
								$btn.addClass('active');
								$btn.on('click', data.controls[c]);
							}
							$controls.append( $btn );
						}
						$('#tutorial').append( $controls ).addClass('has-controls');
					}
					if(typeof data.onComplete == 'function') data.onComplete();
				}
				
				if(window.tutorialTyped) window.tutorialTyped.destroy();
				window.tutorialTyped = new Typed('#tutorial > .content > .text', p);
				
				if(data.d > 0){
					setTimeout(function(){
						if(data.hide) $(data.hide).removeClass('tutorial-hide');
						if(data.active) $(data.active).removeClass('tutorial-active');
					}, data.d);
				}
				
				var $img = $('#tutorial > .content > .img');
				if(data.i){
					$img.css('background-image', 'url('+data.i+')');
					$img.addClass('active');
				}else{
					$img.removeClass('active');
				}

			}else{
				var nextStep = after.shift();
				window.setTutorial(nextStep, after);
			}
		}
	}
	
	window.setTutorialComplete = function(data, callback){
		
		var $t = $('#tutorial');
		var currentTutorial = $t.attr('currentTutorial');
		var currentStep = $t.attr('currentStep');
		var lst = window.oLST['tutorial_'+currentTutorial][currentStep];

		wsSendCallback( {action: 'tutorial_status', tutorial: currentTutorial, step: currentStep, data: data}, function(completeData){
			if(completeData.endTutorial){
				$('.tutorial-hide, .tutorial-active, .tutorial-disabled')
					.removeClass('tutorial-hide')
					.removeClass('tutorial-active')
					.removeClass('tutorial-disabled');
			}
			$t.remove();
			if(typeof callback == 'function'){
				callback();
			}else{
				locationQuery({form: 'formTutorial', container: 'subFormTutorial', history: false});
			}
		});
	}
	
	window.setTutorialOnLoad = function(){

		function checkCurrentTutorial(){
			
			var $t = $('#tutorial');			
			var currentTutorial = $t.attr('currentTutorial');
			var currentStep = $t.attr('currentStep');
			
			var links = JSON.parse($t.attr('f-tutorial.links')).value;
			for(var l in links){
				if(links[l]){
					var $e = $(links[l]);
					if($e && $e.find('> .tutorial-link').length == 0) $e.append($('<div >', {class: 'tutorial-link', text: '?', link: l}));
				}
			}
			
			if(currentTutorial && currentStep){
				var lst = window.oLST['tutorial_'+currentTutorial];
				if(lst){
					window.setTutorial(lst[currentStep], lst[currentStep].text.concat());
				}else{
					formResAfterLoad['/static/lst/tutorial_'+currentTutorial+'.js'] = [function(){ checkCurrentTutorial() }];
				}
			}
		}

		if($('#tutorial').length){
			checkCurrentTutorial()
		}else{
			waitForLoadElementByCode[$('#subFormTutorial').attr('code')] = function(){
				delete waitForLoadElementByCode[$('#subFormTutorial').attr('code')];
				checkCurrentTutorial();
			}
		}
	}
	
	window.afterAllLoaded.push(function(){
		window.setTutorialOnLoad();
	});
}

exports.style = ()=>{/*
	#subFormTutorial {
		position: fixed;
		z-index: 100;
	}
	body.isMobile #subFormTutorial {
		max-width: 100%;
	}
	#subFormTutorial > #tutorial {
		width: 600px;
	}
	body.isMobile #subFormTutorial > #tutorial {
		max-width: 100%;
	}
	#subFormTutorial[tutorialPosition=topLeft] {
		top: 0px;
		left: 0px;
	}
	#subFormTutorial[tutorialPosition=bottomLeft] {
		bottom: 0px;
		left: 0px;
	}
	#subFormTutorial[tutorialPosition=bottomRight] {
		bottom: 0px;
		right: 0px;
	}
	#subFormTutorial[tutorialPosition=topRight] {
		top: 0px;
		right: 0px;
	}
	#subFormTutorial[tutorialPosition=topLeft] > #tutorial > .guru {
		left: 10px;
		right: initial;
	}
	#subFormTutorial[tutorialPosition=bottomLeft] > #tutorial > .guru {
		left: 10px;
		right: initial;
	}
	#subFormTutorial[tutorialPosition=topLeft] > #tutorial > .content {
		padding-left: 60px;
		padding-right: 10px;
	}
	#subFormTutorial[tutorialPosition=bottomLeft] > #tutorial > .content {
		padding-left: 60px;
		padding-right: 10px;
	}
	body.isMobile #subFormTutorial[tutorialPosition=bottomLeft] > #tutorial > .content {
		padding-left: 40px;
	}
*/}