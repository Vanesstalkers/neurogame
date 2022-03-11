exports.tpl = (_, d)=>{ return [

	['div', {class: 'choiceRatesBlock *css*', style:()=>{/*css
		.*css* {
			display: none;
			position: absolute;
			top: 0px;
			right: 0px;
			display: flex;
			height: 32px;
			width: 100%;
			justify-content: space-between;
			align-items: center;
		}
		.*css* > .rate {
			width: 32px;
			height: 32px;
			position: relative;
			cursor: pointer;
			flex-shrink: 0;
		}
		.*css* > .rate:hover {
			opacity: 0.5;
		}
		.*css* > .el {
			display: none;
			width: 160px;
			color: white;
			cursor: pointer;
			padding: 0px;
			text-align: center;
		}
		.*css*.choice > .el:hover {
			opacity: 0.5;
		}
		.*css* > .el > button {
			padding: 0px;
			border: none;
			color: #00a95b;
			background: transparent;
		}
		.*css*.choice > .el {
			display: block
		}
		.*css*.choice > .rate:not(.active) {
			display: none;
		}
		.*css*.choice > .rate.active {
			flex-shrink: 2;
			width: 100%;
			margin-right: 10px;
		}
		.*css*.choice > .rate.active:after {
			width: 100%;
		}
		body.theme-fantasy .*css* {
			font-size: 14px;
		}
		body.theme-fantasy .*css* > .rate {
			height: 32px;
			width: 32px;
		}		
		body.theme-fantasy .*css* > .el > button, body.theme-fantasy .*css* > .el.close-btn {
			background-image: url(/static/img/button22.png);
			background-size: contain;
			background-repeat: no-repeat;
			height: 35px;
			line-height: 34px;
			font-size: 11px;
			min-width: 70px;
			text-align: center;
			background-position: center;
			color: white;
			padding-bottom: 4px;
		}
		body.theme-fantasy .*css* > .el.close-btn {
			background-image: url(/static/img/button11.png);
			color: #333;
		}
	css*/}}, [ 
		
		(()=>{ return [1,2,3,4,5,6,7,8,9,10].map(i=>['div', {rate: i, class: 'rate rate-'+i}]) })(_, d),

		['div', {class: 'el close-btn', text: 'Изменить'}],
		
		['div', {class: 'el'}, [
			['button', {text: 'Сохранить'}, [
				_.f({name: 'save_rate', type: 'action', front: {
					onClick: function (e){
						
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
					},
				}}),
			]],
		]],
	]],

]}

exports.script = ()=>{
	
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
}

exports.style = ()=>{/*

*/}