exports.tpl = (_, d)=>{ return [

	['div', {class: 'news-block f-slb *css*', style:()=>{/*css
		.*css* {
			width: 100%;
			max-height: 160px;
			overflow: hidden;
			border-top: none;
		}
	css*/}}, [

		['div', {class: 'mcb news-list f-slb *css*', style:()=>{/*css
			.*css* {
				min-height: 80px;
				justify-content: center;
				display: flex;
				flex-wrap: wrap;
				min-height: auto;
			}
			.*css*.tutorial-active {
				background-image: url(/XAOC/images/clear-grey-back.png);
			}
			.*css*.tutorial-active {
				-webkit-animation: tutorial_active 1s infinite alternate;
				-moz-animation: tutorial_active 1s infinite alternate;
				-ms-animation: tutorial_active 1s infinite alternate;
				-o-animation: tutorial_active 1s infinite alternate;
				animation: tutorial_active 1s infinite alternate;
			}
			.*css* > .complex-controls {
				display: none;
			}
			.*css* > .news {
				color: #00a95b;
				display: inline-block;
				position: relative;
				height: 36px;
				width: 36px;
				background-size: 36px;
				background-position: center;
				background-repeat: no-repeat;
				background-image: url(/static/img/button55.png);
				margin: 2px;
			}
			.*css* > .news.minus {
				color: #888;
			}
			.*css* > .news.alias {
				background-image: url(/static/img/button66.png);
				background-size: 32px;
			}
			.*css* > .news > span {
				position: absolute;
				text-align: center;
				padding-top: 4px;			
				border: none;
				font-size: 12px;
				left: 0px;
				top: 0px;
				width: 100%;
				height: 100%;
				line-height: 28px;
			}
			.*css* > .news.tmpStats  > span {
				color: #888;
			}
			
			.*css* > .news.alias > span, .*css* > .news.title > span {
				display: none;
			}

		css*/}}, [
		
			_.c({name: 'news', add: true, sub: true, filter:{l: -9}, process: {
				tpl: (_, d)=>{ return [
					['div', {class: d.type+' '+d.spec+' '+(d.val <= 0 ?'minus':'')+' news h'}, [
						_.f({name: 'type', type: '*-'}),
						_.f({name: 'spec', type: '*-'}),
						
						['span', {},[
							_.f({name: 'val', type: 'text-', front: {
								textMask: function (_){
									var val = parseInt(_.value);
									if(val >= 1000000){
										val = (val / 1000000).toFixed(0)+'kk'
									}else if(val >= 1000){
										val = (val / 1000).toFixed(0)+'k';
									}
									return val;
								},
							}}),
						]],
					]],
				]},
			}, front: {
				onItemLoad: function (){
					if($('#guiNews > .news-block > .news-list > .news').length > 18){
						reloadComplex($('#guiNews > .news-block > .news-list'), {force: true});
					}
				},
			}}),
		]],
	]],
	
	['div', {class: 'mcb news-details f-slb *css*', style:()=>{/*css
		.*css* {
			display: none;
			max-width: 100%;
			margin-top: 10px;
			padding: 10px;
			overflow: hidden;			
			position: relative;
		    background-color: #d5ad51;
			border: 2px solid #af753b;
			border-radius: 5px;
			font-size: 13px;
		}
		.*css*.active {
			display: block;
		}
		.*css*.tutorial-active {
			background-image: url(/XAOC/images/clear-grey-back.png);
		}
		.*css*.tutorial-active {
			-webkit-animation: tutorial_active 1s infinite alternate;
			-moz-animation: tutorial_active 1s infinite alternate;
			-ms-animation: tutorial_active 1s infinite alternate;
			-o-animation: tutorial_active 1s infinite alternate;
			animation: tutorial_active 1s infinite alternate;
		}
		
		body.isMobile .*css* {
			width: 100%;
			left: 0px;
			margin: 10px;
		}
	css*/}}, [
		['div', {class: '*css*', style:()=>{/*css
			.*css* {
				position: relative;
				padding-left: 60px;
			}
			.*css* > .btn-close {
				left: 4px;
			}
		css*/}}, [
			['div', {class: 'btn-close h'}],
			_.script(()=>{
				$(document).off('click', '#guiNews > .news-details > div > .btn-close');
				$(document).on('click', '#guiNews > .news-details > div > .btn-close', function(){
					var $details = $('#guiNews > .news-details');
					$details.removeClass('active');
					$details.find('.details-content').html('');
				});
			}),
			['div', {class: 'details-content *css*', style:()=>{/*css
				.*css* {
					display: flex;
					color: white;
				}			
				.*css* > .val {
					margin-right: 20px;
					margin-top: -8px;
					color: white;
					white-space: nowrap;
				}
				.*css* > .val > div {
					background-image: url(/static/img/panel7b.png);
					background-size: contain;
					height: 50px;
					width: 170px;
					background-repeat: no-repeat;
					background-position: center;
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
					padding-right: 36px;
					padding-left: 12px;
					text-align: center;
					white-space: pre-wrap;
					line-height: 12px;
					margin: 0px;
				}
				.*css* > .val > div > span {
					position: absolute;
					top: 0px;
					right: 0px;
					margin: 0px;
					border-radius: 50%;
					width: 36px;
					padding: 0px;
					text-align: center;
					font-size: 12px;
					padding-right: 4px;
					border: none;
					line-height: 52px;					
					color: white;
				}
				.*css* > .val > div.minus > span {
					color: #888;
				}
				.*css* > .val.tmpStats > div > span {
					color: #888;
					border-radius: 4px;
					padding: 0px 4px;
					opacity: 0.3;
				}
				.*css* > .source {
					position: relative;
					text-align: right;
					padding-right: 60px;
				}
				.*css* > .source > .alias, .*css* > .source > .title {
					color: #412c17;
					font-size: 10px;
				}
				.*css* > .source > .text {
					font-size: 12px;
				}
				.*css* > .source > .icon {
					position: absolute;
					top: 0px;
					right: 40px;
				}
				.*css* > .source > .icon:after {
					position: absolute;
					top: 0px;
					left: 0px;
					width: 36px;
					height: 36px;
					background-size: contain;
					font-size: 16px;
					line-height: 34px;
					border-radius: 0px;
				}
				.*css* > .source > .icon.expert:after {
					background-color: #00a95b;
					background-image: url(/static/img/expert-icon.png);
				}
				.*css* > .source > .icon.candidate:after {
					background-color: #735a91;
					background-image: url(/static/img/candidate-icon.png);
				}
				
				body.isMobile .*css* {
				    flex-wrap: wrap;
				}	
				body.isMobile .*css* > .source {
					order: -1;
					padding-bottom: 10px;
					width: 100%;
				}
			css*/}}, [
			]],
		]],
	]],
]}

exports.script = ()=>{
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
}

exports.style = ()=>{/*

*/}