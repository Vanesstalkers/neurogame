exports.id = (__, code, callback)=>{
	__.fields[code].col = 'user';
	__.queryIds[code] = [__.user.key];
	callback();
}
exports.dataReady = (__, data, callback)=>{
	if(data[0] && data[0]._id){
		var d = data[0];
		var today = moment().format('DDMMYY');
		if(!(d.award && d.award.date == today)){
			d.award = {list: [{},{},{}], date: moment().format('DDMMYY')};
			var $set = {award: d.award};
			__.db.collection('user').update({_id: d._id}, {$set: $set}, ()=>{
				callback();
			});
		}else{
			callback();
		}
	}else{
		callback();
	}
}
exports.tpl = (_, d)=>{ return [
	
	['div', {id: 'formQuestion', class: 'f-slb f-24 *css*', style:()=>{/*css
		.*css* .tutorial-active {
			-webkit-animation: tutorial_active 1s infinite alternate;
			-moz-animation: tutorial_active 1s infinite alternate;
			-ms-animation: tutorial_active 1s infinite alternate;
			-o-animation: tutorial_active 1s infinite alternate;
			animation: tutorial_active 1s infinite alternate;
		}
		
		.*css* > .tutorial-link {
			left: 260px;
			top: 40px;
			z-index: 10;
		}
	css*/}}, [
		
		_.f({name: 'tutorial', type: '*-'}),
		_.if(d.tutorial && d.tutorial.links.free_question != undefined, ()=>[
			['div', {class: 'tutorial-link', text: '?', link: 'free_question'}],
		]),
		
		['div', {class: 'btn-close'}, [
			_.f({name: 'close', type: 'action', front: {
				onClick: function (){
					var $subFormMain = $('#subFormMain');
					myEmpty( $subFormMain );
					$subFormMain.hide();
					window.location.hash = '{"form":"formMain"}';
				},
			}})
		]],
		
		['div', {class: 'award *css*', style:()=>{/*css
			.*css* {
				position: absolute;
				right: 70px;
				top: 60px;
				display: flex;
				flex-wrap: nowrap;
				z-index: 2;
			}
			.*css* > .item {
				height: 60px;
				width: 60px;
				background-size: 60px;
				background-position: center;
				background-repeat: no-repeat;
				background-image: url(/static/img/button5.png);
				cursor: pointer;
			}
			.*css* > .item.ready {
				background-image: url(/static/img/button55.png);
			}
			.*css* > .item.ready.used {
				opacity: 0.2;
				cursor: default;
			}
			
			body.isMobile .*css* {
				top: 1px;
				top: 0px;
				width: 50%;
				right: 25%;
				justify-content: center;
			}
			body.isMobile .*css* > .item {
				height: 40px;
				width: 40px;
				background-size: 40px;
			}
		css*/}}, [
			
			_.f({name: 'award', type: '*-'}),
			
			((_, d)=>{ return _.__.pre || !(d.award && d.award.list && d.award.list.length) ? [] : [
				d.award.list.map(a=>['div', {class: 'item'+(a.ready?' ready':'')+(a.used?' used':'')}]),
			]})(_, d),
			
			_.script(()=>{
				$(document).off('click', '#formQuestion > .award > .item');
				$(document).on('click', '#formQuestion > .award > .item', function(){
					var $this = $(this);
					if(!$this.hasClass('ready')){
						$.notify('Задай вопрос, чтобы активировать звезду');
					}else{
						if(!$this.hasClass('used')){
							$this.addClass('used');
							wsSendCallback({action: 'get_award'}, function(data){

							}, function(err){
								$this.removeClass('used');
								if(err.errMsg) $.notify(err.errMsg);
							});
						}
					}
				});
			}),
			/*_.c({name: 'award', process: {
				id: (__, code, callback)=>{
					var field = __.fields[code];
					__.queryIds[code] = [__.user.config.game];
					__.queryFields[field.linecode]['best.'+moment().add(-1, 'days').format('DDMMYY')] = 1;
					callback();
				},
				tpl: (_, d)=>{ return [
				]},
			}}),*/
		]],
		
		['div', {class: 'question *css*', style:()=>{/*css
			.*css* {
				height: 100%;
				padding: 110px 60px 70px 60px;
				max-height: 420px;
			}
			.*css* > .btn-close {
				position: absolute;
				top: 100px;
				right: 60px;
				color: #ddd;
				z-index: 2;
				width: auto;
				height: auto;
				opacity: 1;
				font-weight: normal;
				padding: 10px;
				display: none;
				cursor: pointer;
				font-size: 0px;
			}
			.*css* > .btn-close:after {
				top: 0px;
				right: 0px;
			}
			.*css* > .btn-close.active {
				display: block;
			}
			.*css* > .btn-close:hover {
				opacity: 0.5;
			}
			.*css* > .tutorial-link {
				left: 50%;
				top: -40px;
				font-size: 64px;
				margin-left: -30px;
			}
		css*/}}, [
		
			['div', {class: '*css*', style:()=>{/*css
				.*css* {
					display: flex;
					width: 100%;
					height: 150px;
					overflow: auto;
					padding-top: 20px;
				}		
			css*/}}, [

				_.c({name: 'question', link: '__question_free', process: {
					add: (__, field, parent, data, callback)=>{
						if(data._id){
							
							var stats = Object.keys(LST.stats.lst), baseStats = {};
									
							for(var s = 0; s < CONFIG.questionFreeStatsNum; s++) baseStats[stats.splice( Math.floor(Math.random()*stats.length), 1)[0]] = {};
							
							__.db.collection('question').update({_id: data._id}, {$set:{
								free: true,
								moderationCount: CONFIG.moderationVoteQuestionCount,
								minStatsCount: CONFIG.questionFreeMinStatsCount,
								stats: baseStats,
							}}, (err, data)=>{ callback() });
							
						}else{ callback() }
					},
					tpl: (_, d)=>{
					
						_.__.global.freeQuestion = true;
						_.__.global.iamExpert = true;
						d.iam = true;
					
					return [
						
						_.html('question', _, d),
						
					]},
				}}),
			]],
		]],
	]],
]}

exports.func = ()=>{

}

exports.script = ()=>{
	if($('#subFormMain > div').length) $('#subFormMain').show();
}

exports.style = ()=>{/*

*/}