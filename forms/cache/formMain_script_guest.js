window.afterAllLoaded.push(function(){  initMap() });

$(document).off('click', '#guiNews > .news-details > div > .btn-close');
				$(document).on('click', '#guiNews > .news-details > div > .btn-close', function(){
					var $details = $('#guiNews > .news-details');
					$details.removeClass('active');
					$details.find('.details-content').html('');
				});

window.initMap = function(){try{
		
		var closer = document.getElementById('mapPopupClose');
		var content = document.getElementById('mapPopupContent');
		
		var overlay = new ol.Overlay(({
			element: document.getElementById('mapPopup'),
			autoPan: true,
			autoPanAnimation: { duration: 250 }
		}));
		
		closer.onclick = function() {
			overlay.setPosition(undefined);
			closer.blur();
			return false;
		};

		content.onclick = function(e) {
			
			var $target = $(e.target);
			
			if($target.attr('query')){
				overlay.setPosition(undefined);
				locationQuery( JSON.parse($target.attr('query')) );
			}else{
				
				if($('#tutorial_vote').length){
					
					var $event = $('#guiEvents > .events-list > .tutorial-active');
					if($event.length){
						$event.trigger('click');
						overlay.setPosition(undefined);
					}else{
						location.href = '';
					}
				}else{
				
					var $newVote = $target.closest('#mapPopupNewVote');
					if($newVote.length){
						wsSendCallback({action: 'new_vote', code: $newVote.closest('.vote').closest('.complex-item').attr('code')}, function(data){
							overlay.setPosition(undefined);
						}, function(data){ $('#mapPopup').notify(data.errMsg, {position: 'top right', className: 'warn'}) });
					}
					var $addCandidate = $target.closest('#mapPopupAddCandidate');
					if($addCandidate.length){
						wsSendCallback({action: 'new_vote', code: $addCandidate.closest('.complex-item').attr('code'), type: 'candidate'}, function(data){
							overlay.setPosition(undefined);
						}, function(data){ $('#mapPopup').notify(data.errMsg, {position: 'top right', className: 'warn'}) });
					}
					var $addExpert = $target.closest('#mapPopupAddExpert');
					if($addExpert.length){
						wsSendCallback({action: 'new_vote', code: $addExpert.closest('.complex-item').attr('code'), type: 'expert'}, function(data){
							overlay.setPosition(undefined);
						}, function(data){ $('#mapPopup').notify(data.errMsg, {position: 'top right', className: 'warn'}) });
					}
					
					if($target.hasClass('custom-vote')){
						wsSendCallback({action: 'add_custom_vote', code: $target.closest('.complex-item').attr('code'), lonlat: overlay.getPosition()}, function(data){
							overlay.setPosition(undefined);
							locationQuery({form:"formVote", container: "subFormMain", filter:{id: data.id}});
						}, function(data){ $('#mapPopup').notify(data.errMsg, {position: 'top right', className: 'warn'}) });
					}
				}
			}
			
			return false;
		};
	  
		var voteIcons = new ol.source.Vector({ features: [] });
		var myAdrsIcons = new ol.source.Vector({ features: [] });

		var voteClusters = new ol.layer.Vector({
			source: new ol.source.Cluster({
				distance: 50,
				source: voteIcons,
			}),
			style: function(feature) {
				var size = feature.get('features').length;
				var el = feature.get('features')[0];
				var style = new ol.style.Style({
					image: new ol.style.Icon(({
						scale: 0.3,
						//src: '/static/img/'+(el.voteType&&el.voteType=='super'?'vote3.png':'vote2.png'),
						src: '/static/img/'+(el.voteType&&el.voteType=='super'?'button6.png':'button6.png'),
					})),
					text: /*size > 1 ? new ol.style.Text({
						text: size.toString(),
						scale: 2,
						offsetX: 2,
						offsetY: 4,
						fill: new ol.style.Fill({color: '#fff'}),
					}) : */false,
				});
				return style;
			}
		});
		
		var myAdrsClusters = new ol.layer.Vector({
			source: new ol.source.Cluster({
				distance: 20,
				source: myAdrsIcons,
			}),
			style: function(feature) {
				var size = feature.get('features').length;
				var el = feature.get('features')[0];
				var style = new ol.style.Style({
					image: new ol.style.Icon(({
						scale: 0.4,
						//src: '/static/img/adrs4.png',
						src: '/static/img/button7.png',
					})),
					text: /*size > 1 ? new ol.style.Text({
						text: size.toString(),
						scale: 2,
						offsetX: 2,
						offsetY: 16,
						fill: new ol.style.Fill({color: '#fff'}),
					}) : */false,
				});
				return style;
			}
		});
		
		var view = new ol.View({
			center: ol.proj.fromLonLat([37.62044906616211, 55.75416306738857]),
			//center: ol.proj.fromLonLat([95, 60]),
			zoom: 6,
		});
		
		window.map = new ol.Map({
			target: 'map',
			layers: [
				//new ol.layer.Tile({ source: new ol.source.OSM() }),
				new ol.layer.Tile({
					source: new ol.source.Stamen({
						layer: 'watercolor',
						url: location.protocol+'//stamen-tiles-{a-c}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png',
					}),
				}),
				new ol.layer.Tile({
					source: new ol.source.XYZ({
						//url: location.protocol+'//{a-c}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=d04fd532917d4f6f9fb39655bada1cf2'
						//url: location.protocol+'//{a-c}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=d04fd532917d4f6f9fb39655bada1cf2' // !!!лютый
						//url: location.protocol+'//a-mydrive.api-system.tomtom.com/map/1/tile/hybrid/main/{z}/{x}/{y}.png?key=AeNCJqAKlnvBNVjYfm1czzRnxw95NS0p',
						//url: location.protocol+'//{a-c}.api.tomtom.com/map/1/tile/hybrid/main/{z}/{x}/{y}.png?key=AeNCJqAKlnvBNVjYfm1czzRnxw95NS0p',
						url: location.protocol+'//{a-c}.api.tomtom.com/map/1/tile/labels/main/{z}/{x}/{y}.png?key=AeNCJqAKlnvBNVjYfm1czzRnxw95NS0p',
						//url: location.protocol+'//{a-d}.tile.stamen.com/toner-hybrid/{z}/{x}/{y}.png',
						// https://vec01.maps.yandex.net/tiles?l=skl&x=4&y=8&z=4 ??? - пишут, что нельзя
					})
				}),
				voteClusters, myAdrsClusters,
			],
			overlays: [overlay],
			controls: ol.control.defaults({ attributionOptions: ({ collapsible: false }) }),
			view: view,
		});
		
		window.map.addIcon = function($e){
			$e.addClass('ready');
			var lonlat = JSON.parse($e.attr('f-osm_lonlat'));
			var icon = new ol.Feature({ geometry: new ol.geom.Point( lonlat.value ) });
			icon.setId(lonlat.value.join());
			$e.attr('mapIconId', lonlat.value.join());
			icon.el = $e;
			return icon;
		}
		
		window.map.addVote = function($list){
			
			if(!$list || $list.length == 0) $list = $('#mapVoteList > .complex-block > .complex-block > .complex-item:not(.ready)');
			
			var add = [];
			$list.each(function(){
				var $this = $(this);
				var icon = window.map.addIcon( $this );
				icon.voteType = $this.closest('[votetype]').attr('votetype');
				add.push( icon );
			});
			voteIcons.addFeatures(add);
		}
		window.map.addVote();
		
		window.map.removeVote = function(id){
			voteIcons.removeFeature(voteIcons.getFeatureById(id));
		}
		
		window.map.addMyAdrs = function($list){

			if(!$list || $list.length == 0) $list = $('#mapMyAdrsList > .complex-block > .complex-item:not(.ready)');

			var add = [];
			$list.each(function(){
				var $this = $(this);
				var icon = window.map.addIcon( $this );
				add.push( icon );
			});
			myAdrsIcons.addFeatures(add);
		}
		window.map.addMyAdrs();
		
		window.map.removeMyAdrs = function(id){
			myAdrsIcons.removeFeature(myAdrsIcons.getFeatureById(id));
		}

		window.map.go = function(data){
			view.animate(data);
		}
	  
		window.map.on('singleclick', function(e){
			
			var feature = window.map.forEachFeatureAtPixel(e.pixel, function(feature) { return feature });

			if(feature){
				
				$('#map').addClass('clicked');
				
				if(feature.get('features').length > 1){
					$('#map').removeClass('clicked');
					if(feature.get('features')[0].voteType == 'super'){
						window.map.go({
						  zoom: 13,
						  center: feature.get('features')[0].get('geometry').A,
						});
					}else{
						window.map.go({
						  zoom: view.getZoom() + 2,
						  center: e.coordinate,
						});
					}
				}else{
					if(feature.get('features')[0].el){
						var $content = $('#mapPopup > .map-popup-content');
						reloadComplex($content, { code: feature.get('features')[0].el.attr('code') }, function(){
							var lonlat = JSON.parse( feature.get('features')[0].el.attr('f-osm_lonlat') );
							overlay.setPosition( lonlat.value );
							$('#map').removeClass('clicked');
						});
					}
				}
			}else{
				
				var now = Date.now();
				if(window.map.lastClick + 2000 > now){
					$.notify('Идет обработка предыдущего запроса,\x0aпопробуйте снова через 2 секунды');
					return;
				}
				window.map.lastClick = now;

				$('#map').addClass('clicked');
				
				var lonlat = ol.proj.toLonLat(e.coordinate);
				var xhr = new XMLHttpRequest();
				xhr.onload = xhr.onerror = function(){try{
					if(this.status == 200){
						var address = JSON.parse(this.response).address;
						var $content = $('#mapPopup > .map-popup-content');
						console.log("address", address);
						reloadComplex($content, {
							//state: address.region || address.state || false, 
							state: address.state || address.region || false, 
							city: address.village || address.town || address.city || address.county || false,
							lonlat: lonlat,
							osm_lonlat: e.coordinate,
						}, function(){
							overlay.setPosition(e.coordinate);
							$('#map').removeClass('clicked');
						});
					}
				}catch(e){}};
				xhr.open("GET", location.protocol+"//nominatim.openstreetmap.org/reverse?format=json&lat="+lonlat[1]+"&lon="+lonlat[0]+"&zoom=18&addressdetails=1&accept-language=ru");
				xhr.send();
			}
		});
		
		map.on('pointermove', function(e) {
			if(e.dragging) return;
			$('#map div').css('cursor', map.hasFeatureAtPixel(e.pixel) ? 'pointer' : '');
		});
	}catch(e){console.error(e)}}









$(document).off('click', '#guiNews > .news-block > .news-list > .news');
	$(document).on('click', '#guiNews > .news-block > .news-list > .news', function(e){
		wsSendCallback({action: 'news_details', code: $(e.currentTarget).attr('code')}, function(data){
			
			var $details = $('#guiNews > .news-details');
			var $content = $details.find('.details-content');
			
			$content.html('');
			
			if(data.news){

				switch(data.news.source){
					
					case 'rate_answer':
						
						var $val = $('<div />', {class: 'val '+data.news.spec});
						for(var s in data.news.stats){
							if(window.oLST.stats[s] && data.news.stats[s]){
								var plus = data.news.stats[s] > 0 ? '+' : '';
								$val.append($('<div />', {
									class: plus ? '' : 'minus',
									text: window.oLST.stats[s].l
								}).append( $('<span />', {text: plus+data.news.stats[s]}) ) );
							}
						}
						var $source = $('<div />', {class: 'source'});
						$source.append($('<div />', {class: 'alias', text: data.news.title}));
						$source.append($('<div />', {class: 'text', text: data.news.text}));
						$source.append($('<div />', {class: 'icon rate rate-'+data.news.rate.rate, rate: data.news.rate.rate}));
						$content.append( $val );
						$content.append( $source );
						
						break;
						
					case 'rate_question':
					
						var $val = $('<div />', {class: 'val '+data.news.spec});
						for(var s in data.news.stats){
							if(window.oLST.stats[s] && data.news.stats[s]){
								var plus = data.news.stats[s] > 0 ? '+' : '';
								$val.append($('<div />', {
									class: plus ? '' : 'minus',
									text: window.oLST.stats[s].l
								}).append( $('<span />', {text: plus+data.news.stats[s]}) ) );
							}
						}
						var $source = $('<div />', {class: 'source'});
						$source.append($('<div />', {class: 'title', text: data.news.title}));
						$source.append($('<div />', {class: 'text', text: data.news.text}));
						$source.append($('<div />', {class: 'icon rate rate-'+data.news.rate.rate, rate: data.news.rate.rate}));
						$content.append( $val );
						$content.append( $source );
						
						break;
						
					case 'award':
					case 'vote_candidate':
						
						var $val = $('<div />', {class: 'val'});
						var $source = $('<div />', {class: 'source'});
						
						if(data.news.type == 'alias' || data.news.type == 'title'){
							$source.append($('<div />', {class: 'title', text: data.news.title}));
							$source.append($('<div />', {class: 'icon candidate'}));
							$source.append($('<div />', {class: 'text', text: data.news.text}));
						}else{
							$val.append($('<div />', {text: data.news.type == 'exp' ? 'Опыт' : 'Влияние'}).append( $('<span />', {text: data.news.val}) ) );
							$source.append($('<div />', {class: 'title', text: data.news.title}));
							$source.append($('<div />', {class: 'icon candidate'}));
							$source.append($('<div />', {class: 'text', text: data.news.text}));
						}
						
						$content.append( $val );
						$content.append( $source );
					
						break;

					case 'vote_expert':
					
						var $val = $('<div />', {class: 'val'});
						$val.append($('<div />', {text: data.news.type == 'exp' ? 'Опыт' : 'Влияние'}).append( $('<span />', {text: data.news.val}) ) );
						var $source = $('<div />', {class: 'source'});
						$source.append($('<div />', {class: 'title', text: data.news.title}));
						$source.append($('<div />', {class: 'icon expert'}));
						$source.append($('<div />', {class: 'text', text: data.news.text}));
						$content.append( $val );
						$content.append( $source );
					
						break;
						
					default:
					
						var $val = $('<div />', {class: 'val'});
						$val.append($('<div />', {text: data.news.type == 'exp' ? 'Опыт' : 'Влияние'}).append( $('<span />', {text: data.news.val}) ) );
						var $source = $('<div />', {class: 'source'});
						$source.append($('<div />', {class: 'title', text: data.news.title}));
						$source.append($('<div />', {class: 'icon'}));
						$source.append($('<div />', {class: 'text', text: data.news.text}));
						$content.append( $val );
						$content.append( $source );
					
						break;
				}

				$details.addClass('active');
			}else{
				$details.removeClass('active');
				$(e.currentTarget).closest('#guiNews').notify('Ошибка отображения данных', {position: 'bottom left', className: 'warn'})
			}
		}, function(data){ $(e.currentTarget).closest('#guiNews').notify(data.errMsg, {position: 'bottom left', className: 'warn'}) });
	});

$(document).off('click', '#guiEvents > .events-list > a.updated');
	$(document).on('click', '#guiEvents > .events-list > a.updated', function(e){try{

		localStorage.setItem('xaoc_cur_enter', Date.now());
		
		var $this = $(e.currentTarget);
		var $info = $this.find('> div > .update-info')
		var info = JSON.parse($info.attr('f-subVal') || $info.attr('f-update_time'));

		if(info.value) $('#guiEvents').notify((moment(new Date(info.value.t)).fromNow()+':\xa0'+info.value.i).replace(/ /g, '\xa0'), {position: 'top center', className: 'info', style: 'help', autoHideDelay: 4000});
		
		$this.removeClass('updated');
		$this.removeAttr('onclick');
	}catch(e){ }});



$(document).off('click', '#guiPoll > .poll-content > .list-block > .list-content > .item:not(.passive) > .text');
	$(document).on('click', '#guiPoll > .poll-content > .list-block > .list-content > .item:not(.passive) > .text', function(){
		var $this = $(this);
		var $item = $this.closest('.item');
		$item.toggleClass('active');
		if($item.hasClass('loaded')){
			//$item.find('> div:not(.text)').toggle();
		}else{
			reloadItem($this, {rate: true});
		}
	});

$(document).off('click', '#guiPoll .pollStats > .item > span');
											$(document).on('click', '#guiPoll .pollStats > .item  > span', function(){
												
												var $this = $(this);
												
												var $item = $this.closest('.item');
												var $stats = $item.closest('.pollStats');
												
												$item.removeClass('y').removeClass('n').addClass('ready');
												$item.addClass($this.hasClass('y') ? 'y' : 'n');
												$item.find('> span').show();
												$this.hide();

											});

$(document).off('click', '.choiceRatesBlock > .rate');
	$(document).on('click', '.choiceRatesBlock > .rate', function(){
		var $rate = $(this);
		var $choiceRatesBlock = $rate.closest('.choiceRatesBlock');
		if(!$choiceRatesBlock.hasClass('passive')){
			$rate.addClass('active');
			$choiceRatesBlock.addClass('choice');
		}
	});
	
	$(document).off('click', '.choiceRatesBlock.choice > .close-btn');
	$(document).on('click', '.choiceRatesBlock.choice > .close-btn', function(){
		var $btn = $(this);
		var $rates = $btn.closest('.choiceRatesBlock');
		$rates.removeClass('choice');
		$rates.find('.rate').removeClass('active');
	});

