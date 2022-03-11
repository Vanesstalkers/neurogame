

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

