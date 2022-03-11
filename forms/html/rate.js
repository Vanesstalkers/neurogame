exports.tpl = (_, d)=>{ return [

	['div', {class: 'rates *css*', style:()=>{/*css
		.*css* {
			display: flex;
			align-items: self-end;
			flex-direction: column;
		}
		.*css* > .rate[rate] {
			margin-left: 10px;
			height: 32px;
			width: 32px;
		}
		body.theme-fantasy .*css* > .rate[rate] {
			height: 24px;
			width: 24px;
			margin-left: 4px;
		}
	css*/}}, [
	
		_.c({name: 'rate', add: false, process: {
			dataReady: (__, data, callback)=>{
				data.forEach((d)=>{
					if(__.global.tutorialVote){
						if(__.global.tutorialVoteQuestion){
							delete d.rate;
						}else if(__.global.tutorialVoteAnswer){
							delete d.rate;
						}else if(__.global.tutorialVoteRate){
							
						}
					}
				});
				callback();
			},
			tpl: (_, d)=>{
				var myRate = d.__user && d.__user.l.map(l=>l+'').indexOf(_.__.user.key) !== -1;
			return [
				_.if(!_.__.global.iamExpert, ()=>{ return [
					['div', {class: 'rate', rate: d.rate||''}, [
						_.f({name: '__user', type: '*-'}),
						_.f({name: 'rate', type: '*-', value: '0'}),
					]],
				]}),
				_.if(_.__.global.iamExpert && (myRate || d.tutorialReady), ()=>{ return [
					['div', {class: 'rate', rate: d.rate}, [
						
						_.if(!d.rate, ()=>{ return [
							_.html('choiceRates', _, d),
							['div', {}, [
								_.c({name: 'poll', add: false, process: {
									tpl: (_, d)=>{ return [
										['div', {skey: md5(d._id+d.dateto), dateto: d.dateto}, [
											_.f({name: 'dateto', type: '*-', front: {
												onLoadElement: function (e){
													var $answer = e.closest('.answer');
													$answer.addClass('poll-skey');
													$answer.attr('skey', e.attr('skey'));
													$answer.attr('dateto', e.attr('dateto'));
												},
											}}),
										]],
									]},
								}}),
							]]
						]}),
						
						_.f({name: 'tutorial', type: '*-'}),
						_.f({name: 'tutorialReady', type: '*-'}),
						_.f({name: 'rate', type: '*-', value: '0', front: {
							onLoadElement: function (e){
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
							},
						}}),
					]],
				]}),
			]},
		}}),
	
	]],

]}

exports.script = ()=>{

}

exports.style = ()=>{/*

*/}