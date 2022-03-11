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

