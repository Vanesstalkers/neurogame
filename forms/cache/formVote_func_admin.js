window.setVoteTime = function(_){
		if(_.parent().length){ // вообще тут нужна проверка на наличие самого элемента, но прямо сейчас он не удаляется из памяти через myEmpty, что тоже нужно исправить
			var t = ((JSON.parse(_.attr('f-end_time')).value - Date.now())/3600000).toFixed(0);
			_.text( ( (!t || t) < 1 ? 1 : t)+'ч' );
			setTimeout(function(){ window.setVoteTime(_) }, 60000);
		}
	}

window.setQuestionTime = function(_){
		if(_.parent().length){ // вообще тут нужна проверка на наличие самого элемента, но прямо сейчас он не удаляется из памяти через myEmpty, что тоже нужно исправить
			var t = ((JSON.parse(_.attr('f-wait_for_time')).value - Date.now())/60000).toFixed(0);
			_.text( ( (!t || t) < 1 ? 1 : t)+'м' );
			setTimeout(function(){ window.setQuestionTime(_) }, 30000);
		}
	}

window.f_fb55d5dccc3ea584ed286e9821d97a44 = function (){
					var $subFormMain = $('#subFormMain');
					myEmpty( $subFormMain );
					$subFormMain.hide();
					window.location.hash = '{"form":"formMain"}';
				}

window.f_8a06fb7a0317c497b2f911c0b30c02aa = function (e){ reloadForm(e) }

window.f_37d6d56bfeec333f04d1ff53392dc731 = function (_){ window.setVoteTime(_) }

window.f_b0c2efcbcb6c70306c71e245c9e302bf = function (_){ return _.value+'\x0a' }

window.f_f6f0520d20bfc32f5256dcd0e2f9ad48 = function (_){try{
							var link = _.attr('link');
							var $tutorial = $('#tutorial');
							var links = JSON.parse($tutorial.attr('f-tutorial.links'));
							if(!(links && links.value && Object.keys(links.value).indexOf(link) != -1)){
								_.addClass('tutorial-link').removeClass('hidden');
							}
						}catch(e){}}

window.f_493e5503e4d2a2a84879afd319164dd4 = function (_, d){
						if(_.parent().hasClass('iam')) window.setQuestionTime(_);
					}

window.f_ed0555dea7bd138950787d1cdc809d79 = function (_){
					var text = _.val();
					if(text.length > 140){
						_.val(text.substring(0, 140));
						_.trigger('change');
					}else{
						_.closest('.text').find('> .count > span').html(140-text.length);
					}
				}

window.f_e711565f20276986b9b6059b704ab1dd = function (e){
								
								var $stats = e.closest('.text').find('.questionBaseStats');
								var $has = $stats.find('> .item.active');
								var need = $stats.find('> .label > .count > .need').text()*1;
								
								if($has.length < need){
									e.notify('Нe\xa0указано\xa0необходимое\x0aколичество\xa0обязательных\xa0тем', {position: window.isMobile ? 'bottom' : 'left', className: 'warn'})
								}else{
									
									var stats = [];
									$has.each(function(){ stats.push($(this).attr('stat')) });
									
									wsSendCallback({action: '', code: e.attr('code'), stats: stats}, function(data){
										
										if(data.skey) localStorage['poll_'+data.skey] = data.dateto;

										if($('#tutorial').attr('tutorialQuestions')){
											window.setTutorialComplete();
										}else{
											locationQuery(history.state.subform);
										}
									}, function(data){ e.notify(data.errMsg, {position: 'bottom right', className: 'warn'}) });
								}
							}

window.f_3124ce035387bc4d8ad8b9a73d9d47be = function (e){
						
						var $choiceRatesBlock = e.closest('.choiceRatesBlock');
						
						var rate = $choiceRatesBlock.find('.rate.active').attr('rate');
						//var $select = $choiceRatesBlock.parent().find('> select');
						//var stats = $select ? $select.val() : undefined;
						
						var $pollRateBlock = $choiceRatesBlock.closest('.complex-item.rate-block');
						var $items = $pollRateBlock.find('> .pollStats > .item');
						var $ready = $pollRateBlock.find('> .pollStats > .item.ready');
						
						if($pollRateBlock.length && $ready.length != $items.length){
							e.notify('Необходимо\xa0по\xa0всем\xa0темам указать\xa0соответствие заданному\xa0вопросу', {position: 'top right', className: 'warn'})
						}else{
							
							var stats = {};
							$ready.each(function(){ 
								var	$this = $(this);
								var s = $(this).attr('stat');
								if($this.hasClass('y')) stats[s] = 1;
								if($this.hasClass('n')) stats[s] = 0;
							});
							
							wsSendCallback({action: '', code: e.attr('code'), rate: rate, stats: stats}, function(data){
								
								var tutorialRates = $('#tutorial').attr('tutorialRates');
								if(tutorialRates != undefined){
									if(tutorialRates - 1 > 0){
										window.setTutorialOnLoad();
									}else{
										var $poll = $choiceRatesBlock.closest('.tutorial-poll');
										if($poll.length) $poll.hide();
										window.setTutorialComplete();
									}
								}else{
									
									var $poll = e.closest('.poll-skey');
									localStorage['poll_'+$poll.attr('skey')] = $poll.attr('dateto');

									$('.poll-skey[skey="'+$poll.attr('skey')+'"]').each(function(i, e){
										var $item = $(e);
										if($item.hasClass('answer')){ // formVote
											if(history.state.subform) locationQuery( history.state.subform );
										}else{
											var $singlePoll = $item.closest('#singlePoll');
											if($singlePoll.length){
												reloadComplex( $singlePoll.find('> .complex-block') );
											}else{
												$item.removeClass('active').addClass('passive');
											}
										}									
									});
								}
							}, function(data){ e.notify(data.errMsg, {position: 'top right', className: 'warn'}) });
						}
					}

window.f_835a61b627c21a02b5cfa887bce57204 = function (e){
													var $answer = e.closest('.answer');
													$answer.addClass('poll-skey');
													$answer.attr('skey', e.attr('skey'));
													$answer.attr('dateto', e.attr('dateto'));
												}

window.f_3841da5a66ee80d7ba27a6e03296105b = function (e){
								var rate = e.attr('rate');
								var $answer = e.closest('.answer');
								if(rate){
									e.closest('.answer-block').addClass('has-rate');
									if($answer.hasClass('tutorial-answer')){
										$answer.removeClass('tutorial-answer').removeClass('tutorial-active');
									}
								}else{
									var $choiceRatesBlock = $answer.find('.choiceRatesBlock');
									var $text = $choiceRatesBlock.closest('.answer').find('.text');
									if($text.length) $text.append( $choiceRatesBlock );
									if($answer.hasClass('tutorial-answer')) $choiceRatesBlock.addClass('tutorial-rates');
								}
							}

window.f_e20790c6febb26873b321b91f825c8e4 = function (_){
						var text = _.val();
						if(text.length > 140){
							_.val(text.substring(0, 140));
							_.trigger('change');
						}else{
							_.closest('.text').find('.count > span').html(140-text.length);
						}
					}

window.f_1010c20c2c672e85516237d175465ec5 = function (e, data){
									
									if(data.skey) localStorage['poll_'+data.skey] = data.dateto;
									
									if($('#tutorial').attr('tutorialAnswers')){
										window.setTutorialComplete();
									}else{
										locationQuery(history.state.subform);
									}
								}

