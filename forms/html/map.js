exports.tpl = (_, d)=>{ return [

	['script', {src:'static/libs/ol/ol.js'}],
	['style', {src:'static/libs/ol/ol.css'}],

	['div', {id: 'mapBlock', class: '*css*', style:()=>{/*css
		.*css* {
			position: relative;
			height: 100%;
			width: 100%;
		}
		.*css* > #map {
			height: 100%;
			width: 100%;
		}
		.*css* > #map.clicked div {
			cursor: wait;
		}
		.*css* .ol-zoom.ol-control {
			display: none;
		}
		.*css* .ol-attribution {
			width: 100%;
			text-align: center;
			padding: 0px;
			margin: 0px 0px -6px;
			opacity: 0.3;
			background: transparent!important;
		}
		.*css* .ol-attribution:hover {
			opacity: 1;
		}
	css*/}}, [
		['div', {id: 'map'}],
		((_, d)=>{ return !(d.mapFilter.zoom) ? [] :
			_.f({name: 'map.zoom', type: '*', value: d.mapFilter.zoom});
		})(_, d),
	]],
		
	_.html('mapPopup', _ , d),
	
	['div', {id: 'mapVoteList', class: '*css*', style:()=>{/*css
		display: none;
	css*/}}, [
		_.c({name: 'game_map', col: '__game', add: false, filter: {l: 1}, process: {
			parentDataNotRequired: true,
			id: (__, code, callback)=>{ __.queryIds[code] = [__.user.config.game]; callback() },
			tpl: (_, d)=>{ return [
				['div', {votetype: 'super'}, [
					_.c({name: 'vote_super', col: 'vote', link: '__vote_super', add: true, sub: true, process: {
						tpl: (_, d)=>{ return [
							['div', {}, [
								_.c({name: 'adrs', add: false, process: {
									tpl: (_, d)=>{ return [
										['div', {}, [
											_.f({name: 'state', type: '*'}),
											_.f({name: 'city', type: '*'}),
											_.f({name: 'osm_lonlat', type: '*', front: {
												onLoadElement: function (e){
													if(window.map && window.map.addVote) window.map.addVote();
												},
											}}),
										]],
									]},
								}}),
							]],
						]},
					}}),
				]],
				['div', {votetype: 'base'}, [
					_.c({name: 'vote', add: true, sub: true, process: {
						tpl: (_, d)=>{ return [
							['div', {}, [
								_.c({name: 'adrs', add: false, process: {
									tpl: (_, d)=>{ return [
										['div', {}, [
											_.f({name: 'state', type: '*'}),
											_.f({name: 'city', type: '*'}),
											_.f({name: 'osm_lonlat', type: '*', front: {
												onLoadElement: function (e){
													if(window.map && window.map.addVote) window.map.addVote();
												},
											}}),
										]],
									]},
								}}),
							]],
						]},
					}, front: {
						onSubDelete: function (_){
							var $item = _.closest('.complex-item').find('[mapIconId]');
							if($item.length && window.map && window.map.removeVote) window.map.removeVote($item.attr('mapIconId'));
						},
					}}),
				]],
			]},
		}}),
	]],
	
	['div', {id: 'mapMyAdrsList', class: '*css*', style:()=>{/*css
		display: none;
	css*/}}, [
		['div', {}, [
			_.c({name: 'myAdrs', col: 'adrs', link: ['__win_adrs', '__custom_adrs'], add: true, sub: true, process: {
				tpl: (_, d)=>{ return [
					['div', {}, [
						_.f({name: 'state', type: '*'}),
						_.f({name: 'city', type: '*'}),
						_.f({name: 'osm_lonlat', type: '*', front: {
							onLoadElement: function (e){
								if(window.map && window.map.addMyAdrs) window.map.addMyAdrs();
							},
						}}),
					]],
				]},
			}, front: {
				onSubDelete: function (_){
					var $item = _.closest('.complex-item[mapIconId]');
					if($item.length && window.map && window.map.removeMyAdrs){
						window.map.removeMyAdrs($item.attr('mapIconId'));
					}
				},
			}}),
		]],
	]],
]}

exports.script = ()=>{
	
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

}

exports.style = ()=>{/*

*/}