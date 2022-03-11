

window.f_ab5a4fb978dbd53490df7ec8633a824d = function (){
						var $subFormMain = $('#subFormMain');
						myEmpty( $subFormMain );
						$subFormMain.hide();
						window.location.hash = '{"form":"formMain"}';
					}

window.f_240b14907379546d011b51f808c27f35 = function (_){
							if(_.prop('checked')){
								$('#formProfile .title-list').addClass('female');
							}else{
								$('#formProfile .title-list').removeClass('female');
							}
						}

window.f_927257ccd5e8a17285f7997f6524d09a = function (e, data){
								reloadForm(e);
								if(data.title) $('#guiProfile .title').text(data.title);
								//if(data.title) $('#formProfile .currentTitle').text(data.title);
							}

