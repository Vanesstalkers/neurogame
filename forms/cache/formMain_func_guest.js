window.map = undefined;

window.toggleVoteSearchBtn = function(){
				var $searchVoteBtn = $('#searchVoteBtn');
				var userCandidateLimit = $searchVoteBtn.attr('userCandidateLimit');
				var userExpertLimit = $searchVoteBtn.attr('userExpertLimit');
				var userCandidateCount = $('#guiEvents > .events-list > a.link:not(.just-deleted) > div.candidate').length;
				var userExpertCount = $('#guiEvents > .events-list > a.link:not(.just-deleted) > div.expert').length;
				if(userCandidateLimit > userCandidateCount || userExpertLimit > userExpertCount){
					$searchVoteBtn.addClass('active');
				}else{
					$searchVoteBtn.removeClass('active');
				}
			}





window.f_e372068a305235e538b4ba6e121abb8b = function (e){
													if(window.map && window.map.addVote) window.map.addVote();
												}

window.f_f682e9368656cfad113e849019234592 = function (_){
							var $item = _.closest('.complex-item').find('[mapIconId]');
							if($item.length && window.map && window.map.removeVote) window.map.removeVote($item.attr('mapIconId'));
						}

window.f_8c45eea44aa60f6fab82fbfe37c0cc33 = function (_){
					var $item = _.closest('.complex-item[mapIconId]');
					if($item.length && window.map && window.map.removeMyAdrs){
						window.map.removeMyAdrs($item.attr('mapIconId'));
					}
				}

window.f_b64d27d6595bb98d73ca4e8a20a94b21 = function (e){
								if(window.map && window.map.addMyAdrs) window.map.addMyAdrs();
							}

window.f_f6d24abc137214d2de02fc0840c17657 = function (_, d){ return _.value.replace(' ', '\x0a') }

window.f_2644899e27364b7b78b54a5f6dfcaf33 = function (e, data){
				var $guiStats = $('#guiStats');
				$guiStats.toggleClass('active');
				$guiStats.find('> .stats-content').toggleClass('active');
				$guiStats.find('> .stats-toggle').toggleClass('active');
			}

window.f_a8092c52a410475a847e4b709b9ecd04 = function (_, d){
						if(d.val){
							for(var key in d.val){
								var k = key.split('.');
								if(k[0] == 'stats'){
									var $s = _.closest('.list').find('> .stat-'+k[1]);
									var v = ($s.attr('v') || 0)*1 + d.val[key]*1;
									var vt = ($s.attr('vt') || 0)*1;
									if(vt < 0) v -= vt;
									$s.attr('v', v);
									$s.find('> .count').text(v);
									$s.find('> .title > div.real').css('width', v+'%');
									$s.css('order', -1*v);
								}
							}
						}
					}

window.f_67bf0a6ff5170d967cfc85d87e88571b = function (_, d){
						if(d.val){
							for(var key in d.val){
								var k = key.split('.');
								if(k[0] == 'tmpStats'){
									var $s = _.closest('.list').find('> .stat-'+k[1]);
									var v = ($s.attr('v') || 0)*1;
									var vt = ($s.attr('vt') || 0)*1 + d.val[key]*1;
									if(vt < 0) v -= vt;
									$s.attr('vt', vt);
									$s.find('> .count').text(v);
									$s.find('> .title > div.tmp').css('width', Math.abs(vt)+'%');
									$s.css('order', -1*v);
								}
							}
						}
					}

window.f_6553c86ff58ffa11048fbbc48a46b3c1 = function (){
					if($('#guiNews > .news-block > .news-list > .news').length > 18){
						reloadComplex($('#guiNews > .news-block > .news-list'), {force: true});
					}
				}

window.f_4e2632c661f489b20b54e25c4623d3be = function (_){
									var val = parseInt(_.value);
									if(val >= 1000000){
										val = (val / 1000000).toFixed(0)+'kk'
									}else if(val >= 1000){
										val = (val / 1000).toFixed(0)+'k';
									}
									return val;
								}

window.f_2bacb8a9a8a978fbb3297d29b0cc987e = function (){ window.toggleVoteSearchBtn() }

window.f_e136a478f329219bf4477ab54131df83 = function (){ setTimeout(function(){ window.toggleVoteSearchBtn() }, 1000) }

window.f_1bca4409f8407bc4d9a88213f698fa5a = function (e){try{
										var info = JSON.parse(e.attr('f-update_time'));
										if(info.value.t && info.value.i && info.value.t > localStorage.xaoc_last_enter*1){
											e.closest('a').addClass('updated');
											e.closest('a').attr('onclick', true);
										}
									}catch(e){}}

window.f_c73f41573594603345641081dec7aac4 = function (_, d){
										_.closest('a').addClass('updated');
									}

window.f_207a0dcb4a91d61cff95d71ac474b2f0 = function (e, data){
				var $guiPoll = $('#guiPoll');
				$guiPoll.toggleClass('active');
				$guiPoll.find('> .poll-content').toggleClass('active');
				$guiPoll.find('> .poll-toggle').toggleClass('active');
				if($guiPoll.hasClass('active')) window.scrollCheck( $guiPoll.find('.list-block') );
			}

window.f_4f31e7871d74f08f771f0b824d8f9cb3 = function (e, data){
							if(!e.hasClass('tutorial-disabled')){
								wsSendCallback({action: '', code: e.attr('code'), passive: e.hasClass('passive')}, 
									function(data){ reloadComplex( $('#singlePoll > .complex-block') ) }, 
									function(data){ reloadComplex( $('#singlePoll > .complex-block') ) }
								);
							}
						}

window.f_3bb86bee0b1a7beb6d926f4b2b1a1b9a = function (e, data){
						if(e.hasClass('passive')){
							e.removeClass('passive');
							$('#singlePoll').addClass('active');
							$('#bestPoll').removeClass('active');
						}else{
							e.addClass('passive');
							$('#bestPoll').addClass('active');
							$('#singlePoll').removeClass('active');
						}
					}

window.f_0fd757e1bd4278b332e2b03796ad7f14 = function (e, d){
						$('#findPoll').addClass('passive');
						$('#bestPoll').removeClass('active');
						$('#toggleBestPoll').removeClass('passive');
						$('#singlePoll').addClass('active');
					}

window.f_4f897b4779dd2729e65ac02ab8cc7fa1 = function (e){
				var skey = e.attr('skey');
				if(skey && localStorage['poll_'+skey]){
					e.addClass('passive');
					e.find('> label > div.check').removeClass('check');
				}
			}

window.f_82d3e76c674fa395242c610c1974c6f7 = function (e){
								e.closest('.item').addClass('loaded');
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

window.f_736db6527f71171e23cee7ee612d0fae = function (e){try{
																				window.map.go({
																				  zoom: 9,
																				  center: JSON.parse( e.attr('f-osm_lonlat') ).value,
																				});
																			}catch(e){}}

window.f_80619424f93febfaa4ae9200515cc850 = function (e,d){
																				e.closest('.adrs').addClass('active');
																			}

window.f_d1b901398cd453b0c9a18158c6320ea1 = function (e){
																								wsSendCallback({action: '', code: e.attr('code'), poll: e.closest('.poll-item').attr('code')});
																							}

