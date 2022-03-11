

window.f_fb55d5dccc3ea584ed286e9821d97a44 = function (){
					var $subFormMain = $('#subFormMain');
					myEmpty( $subFormMain );
					$subFormMain.hide();
					window.location.hash = '{"form":"formMain"}';
				}

window.f_235e9afe878b77a6b03da3b4ce98cb15 = function (e, data){ if(data.status != 'err') reloadForm(e) }

window.f_1add0c3f183941c3652a306ec3e29235 = function (e){try{
									if(e.hasClass('ready')){
										var type = JSON.parse(e.attr('f-type')).value;
										var $header = $('#formStory .header');
										$header.find('> .title > .position').text('Персонаж пока еще не трудоустроен');
										if(type) $header.addClass(type);
									}
								}catch(e){}}

window.f_97f7e92ac9bf759924b940f4ad615039 = function (e){try{
														var title = JSON.parse(e.attr('f-title')).value;
														$('#formStory .header > .title > .position').text(title);
													}catch(e){}}

window.f_d4a400819810ae29167b67693a308a1e = function (e){try{
																	var title = JSON.parse(e.attr('f-title')).value;
																	$('#formStory .header > .title > .adrs').text(title);
																}catch(e){}}

window.f_b9fd39379162e2aba544ff940eedabf6 = function (_){
									var text = _.val();
									if(text.length > 500){
										_.val(text.substring(0, 500));
										_.trigger('change');
									}else{
										_.closest('.complex-item').find('> .count > span').html(500-text.length);
									}
								}

