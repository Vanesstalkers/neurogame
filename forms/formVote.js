exports.id = (__, code, callback)=>{
	__.fields[code].col = 'vote';
	if(__.user.query && __.user.query.filter && __.user.query.filter.code){
		DB.redis.get(__.user.session+'__'+__.user.query.filter.code, (err, fieldData)=>{try{
			var field = JSON.parse(fieldData);
			__.queryIds[code] = [field._id];
			callback();
		}catch(e){
			__.queryIds[code] = [];
			callback();
		}});
	}else{
		if(__.user.query.filter.id && __.user.role == 'admin'){
			__.queryIds[code] = [__.user.query.filter.id];
		}else{
			__.queryIds[code] = [];
		}
		callback();
	}
}
exports.tpl = (_, d)=>{
			
	var filter = _.__.user.query && _.__.user.query.filter ? _.__.user.query.filter : {};

	_.__.global.experts = {};
	_.__.global.questions = {};
	_.__.global.questionsOrder = [];
	_.__.global.candidates = {};
	_.__.global.iamCandidate = false;
	_.__.global.iamExpert = false;
	_.__.global.voteFinished = d.finished;
	
	if(filter.tutorialVote || d.tutorial){
		_.__.global.tutorialVote = true;
		_.__.global.tutorialClones = d.tutorialClones;
		if(filter.tutorialVote) _.__.global.iamExpert = true;
		if(filter.tutorialVoteQuestion){
			_.__.global.tutorialVoteQuestion = true;
		}
		if(filter.tutorialVoteAnswer){
			_.__.global.tutorialVoteAnswer = true;
			_.__.global.iamCandidate = true;
			_.__.global.iamExpert = false;
		}
		if(filter.tutorialVoteRate){
			_.__.global.tutorialVoteRate = true;
		}
		
		if(d.__expert && d.__expert.l) d.__expert.l.forEach((r, i)=>{ if(_.__.global.tutorialClones[r+'']) d.__expert.l[i] = _.__.global.tutorialClones[r+''] });
		if(d.__candidate && d.__candidate.l) d.__candidate.l.forEach((r, i)=>{ if(_.__.global.tutorialClones[r+'']) d.__candidate.l[i] = _.__.global.tutorialClones[r+''] });
		
		if(d.finished){
			_.__.global.iamExpert = false;
			_.__.global.iamCandidate = true;
		}

	}else{
		if(d.__user_candidate && d.__user_candidate.l.map(l=>l+'').indexOf(_.__.user.key) != -1) _.__.global.iamCandidate = true;
		if(d.__user_expert && d.__user_expert.l.map(l=>l+'').indexOf(_.__.user.key) != -1) _.__.global.iamExpert = true;
	}
	
	_.editMode = (!d.type && _.__.user.role == 'admin');

return [
	['div', {id: 'formVote', class: 'f-slb f-24 *css*', style:()=>{/*css
		.*css* {
			
		}
		.*css* .tutorial-active {
			-webkit-animation: tutorial_active 1s infinite alternate;
			-moz-animation: tutorial_active 1s infinite alternate;
			-ms-animation: tutorial_active 1s infinite alternate;
			-o-animation: tutorial_active 1s infinite alternate;
			animation: tutorial_active 1s infinite alternate;
		}
	css*/}}, [
	
		_.f({name: 'type', type: '*'}),
		
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
	
		_.if(_.editMode, ()=>[
		
			['div', {class: '*css*', style:()=>{/*css
				.*css* {
					position: absolute;
					top: 0px;
					left: 0px;
					width: 100%;
					height: 100%;
					padding: 40px;
					font-size: 12px;
					color: #412c17;
				}
			css*/}}, [

				['div', {class: '*css*', style:()=>{/*css
					.*css* {
						display: flex;
					}
					.*css* > .stats {
						width: 100%;
						margin-left: 10px;
						height: 100%;
						//overflow-y: scroll;
						line-height: 10px;
					}
					.*css* > .stats > .el > input {
						display: none;
					}
					.*css* > .stats > .el > input + label {
						opacity: 0.5;
						cursor: pointer;
					}
					.*css* > .stats > .el > input:checked + label {
						opacity: 1;
					}
					.*css* > .info {
						padding: 20px;
					}
					.*css* > .info > button {
						width: 100%;
						text-align: center;
						margin-top: 10px;
						cursor: pointer;
						background: #412c17;
						color: #e0c480;
						height: 30px;
						border: none;
					}
				css*/}}, [

					['div', {class: 'info'}, [
						_.f({name: 'end_time', type: 'datetime+', label: 'Время окончания'}),
						_.f({name: 'city', type: 'input', value: '', label: CONFIG.labels.city}),
						_.f({name: 'state', type: 'input', value: '', label: CONFIG.labels.state}),
						_.f({name: 'population', type: 'input', label: CONFIG.labels.population}),
						_.f({name: 'custom.candidateNum', type: 'input', label: 'Количество кандидатов'}),
						_.f({name: 'custom.expertNum', type: 'input', label: 'Количество экспертов'}),
						['button', {text: 'Опубликовать', class: 'h'}, [
							_.f({name: 'add_custom_vote', type: 'action', front: {
								onAction: function (e){ reloadForm(e) },
							}}),
						]],
					]],
					['div', {class: 'stats'}, [
						((_, d)=>{
							var result = [];
								LST.stats.list.lst.forEach((l)=>{
									result.push( _.f({name: 'custom.stats.'+l.v, type: 'check', label: l.l}) );
								});
							return result;
						})(_, d),
					]],
				]],
			]],
		]),
		
		_.if(!_.editMode, ()=>[
			
			['div', {class: 'header *css*', style:()=>{/*css
				.*css* {
					position: absolute;
					top: 0px;
					left: 0px;
					width: 100%;
					height: 100px;
					display: flex;
					color: #018da8;
					z-index: 2;
					background-image: url(/static/img/panel6.png);
					background-size: contain;
					background-repeat: no-repeat;
					background-position: center;
				}
			css*/}}, [
				['div', {class: 'end-time *css*', style:()=>{/*css
					.*css* {
						color: white;
						margin: 5px;				
						position: absolute;
						background: transparent;
						line-height: 12px;
						font-size: 12px;
						text-align: center;
						width: 100%;
						height: auto;
						top: 80px;
					}
					.*css*:before {
						content: 'до окончания ';
					}
					.*css* > .el {
						line-height: 16px;
					}
					body.isMobile .*css* {
						display: none;
					}
				css*/}, help: 'Осталось\xa0времени до\xa0окончания\xa0выборов', helpPosition: 'bottom left'}, [
					_.f({name: 'end_time', type: '*', front: {
						onLoadElement: function (_){ window.setVoteTime(_) },
					}}),
				]],
				['div', {class: 'title *css*', style:()=>{/*css
					.*css* {
						white-space: pre-wrap;
						width: 220px;
						height: 70px;
						margin-left: auto;
						margin-right: auto;
						text-align: center;
						color: #444;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-wrap: wrap;
						padding: 0px;
						font-size: 14px;
					}
					.*css* > .position {
						width: 100%
					}
					.*css* > .title {
						display: block;
						font-size: 12px;
						margin-top: -12px;
					}
					body.isMobile .*css* {
						width: 160px;
						padding-top: 20px;
						font-size: 11px;
					}
					body.isMobile .*css* > .title {
						font-size: 10px;
					}
				css*/}}, [
					['span', {class: 'position'},[
						_.f({name: 'position', type: 'input-', front: {
							textMask: function (_){ return _.value+'\x0a' },
						}}),
					]],
					_.c({name: 'adrs', add: false, process: {
						tpl: (_, d)=>{ return [
							['span', {class: 'flex title'}, [
								_.f({name: 'city', type: 'text-', value: ''}),
								_.if(d.city && d.state, ['span', {text: ',\xa0'}]),
								_.f({name: 'state', type: 'text-', value: ''}),
							]],
						]},
					}}),
				]],
			]],
			
		]),
		
		_.f({name: 'finished', type: '*-'}),
		_.f({name: 'tutorial', type: '*-'}),
		_.if(_.__.global.tutorialVote, ()=>{ return [
			_.f({name: 'tutorialClones', type: '*-'}),
		]}),
		_.if(!_.__.global.tutorialVote, ()=>{ return [
			_.f({name: '__user_candidate', type: '*-'}),
			_.f({name: '__user_expert', type: '*-'}),
		]}),

		['div', {class: 'vote *css*', style:()=>{/*css
			.*css* {
				height: 100%;
				padding: 100px 60px 60px 60px;
				max-height: 420px;
			}
			
			.*css*.active .i {
				display: none;
			}
			
			.*css* > .btn-close {
				position: absolute;
				top: 100px;
				right: 60px;
				color: #ddd;
				z-index: 2;
				opacity: 1;
				font-weight: normal;
				padding: 10px;
				display: none;
				cursor: pointer;
				font-size: 0px;
			}
			.*css*.active > .btn-close {
				display: block;
			}
			.*css* > .btn-close:hover {
				opacity: 0.5;
			}
			.*css* > .btn-close:after {
				top: 0px;
				right: 0px;
			}
			
			.*css* > .tutorial-link {
				font-size: 64px;
				margin-left: -30px;
				left: 140px;
				top: 30px;
			}
			body.isMobile .*css* > .tutorial-link {
				left: 40px;
				top: 70px;
			}
			body.isMobile .*css* {
				padding: 80px 50px 20px 50px;
				max-height: 440px;
			}
			body.isMobile .*css* > .btn-close {
				top: 60px;
			}
		css*/}}, [
		
			['div', {class: 'btn-close', text: 'Назад'}],
			_.script(()=>{
				$(document).off('click', '#formVote > .vote.active > .btn-close');
				$(document).on('click', '#formVote > .vote.active > .btn-close', function(){
					var $formVote = $('#formVote');
					$(this).closest('.vote').removeClass('active');
					$formVote.find('.text.active').removeClass('active').removeClass('active-single');
				});
			}),
			
			_.if(d.tutorialLink, ()=>[ // при желании можно переделать на localStorage (и нужно) + добавить type: tlink
				['div', {class: 'tutorial-link hidden', text: '?', link: d.tutorialLink}, [
					_.f({name: 'tutorialLink', type: '*', front: {
						onLoadElement: function (_){try{
							var link = _.attr('link');
							var $tutorial = $('#tutorial');
							var links = JSON.parse($tutorial.attr('f-tutorial.links'));
							if(!(links && links.value && Object.keys(links.value).indexOf(link) != -1)){
								_.addClass('tutorial-link').removeClass('hidden');
							}
						}catch(e){}},
					}}),
				]],
			]),
		
			['div', {class: (d.__candidate && d.__candidate.l.length == 1?'single-candidate ':'')+'size-'+(d.__expert?(d.__expert.l.length<5?'lg':(d.__expert.l.length<8?'md':'sm')):'')+' *css*', style:()=>{/*css
				.*css* {
					display: flex;
					width: 100%;
					height: 100%;
					overflow: auto;
				}
				.*css* > * {
					position: inherit;
					width: 100%;
					height: 100%;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
				}
				.*css* > * > * {
					position: unset;
					position: inherit;
					width: 100%;
					height: auto;
				}
				.*css*.single-candidate > * > * {
					width: 20%;
				}
				.*css* .i {
					width: 60px;
					height: 60px;
				}
				.*css*.size-md .i {
					width: 42px;
					height: 42px;
				}
				.*css*.size-sm .i {
					width: 30px;
					height: 30px;
				}
				.*css*.size-md .i.iam > span.wait_for_time, .*css*.size-sm .i.iam > span.wait_for_time {
					background-image: none;
					text-align: center;
				}
				.*css* .question {
					background-size: contain;
					background-position: center;
					background-repeat: no-repeat;
					background-image: url(/static/img/button5.png);
				}
				.*css* .question .i {
					background-size: 50%;
					background-repeat: no-repeat;
					background-position: center;
					margin-top: 6px;
				}				
			css*/}}, [
				
				['div', {class: 'expert *css*', style:()=>{/*css
					order: -2;
				css*/}}, [
	//				['div', {class: 'f-18 flex-center *css*', style:()=>{/*css
	//					color: #ccc;
	//				css*/}, text: 'Вопросы\x0aэкспертов'}],
					_.c({name: 'expert', add: false, process: {
						tpl: (_, d)=>{
							d.__code = _.code;
							_.__.global.experts[d._id] = d;
							
							if(_.__.global.tutorialVote && d.__question && d.__question.l) d.__question.l.forEach((r, i)=>{ if(_.__.global.tutorialClones[r+'']) d.__question.l[i] = _.__.global.tutorialClones[r+''] });
							
							if(d.__question) _.__.global.questionsOrder.push(d.__question.l[0]+'');
						return [
							['div', {class: 'flex-center', style: "order: "+(d.__question?_.__.global.questionsOrder.indexOf(d.__question.l[0]+''):0)}, [
								_.f({name: '__user', type: '*-'}),
								_.c({name: 'question', add: false, process: {
									dataReady: (__, data, callback)=>{
										data.forEach((d)=>{
											
											if(d.__user && d.__user.l.map(l=>l+'').indexOf(__.user.key) != -1) d.iam = true;
											
											if(__.global.tutorialVote){
												if(d.iam) __.global.tutorialQuestion = d._id;
												if(__.global.tutorialVoteQuestion){
													d.tQuestion = d.iam ? ' tutorial-question ' : '';
												}else if(__.global.tutorialVoteAnswer){
													
												}else if(__.global.tutorialVoteRate){
													
												}else if(__.global.voteFinished){
													
												}else {
													d.ready = 0;
												}
											}
											
											if(d.iam && d.ready) __.global.myQuestionReady = true;
										});
										callback();
									},
									tpl: (_, d)=>{
										d.__code = _.code;
										_.__.global.questions[d._id] = d;
									return [
										['div', {class: 'flex-center question '+(d.tQuestion||'')+'*css*', style:()=>{/*css
											width: 100%;
											position: inherit;
										css*/}}, [
											_.f({name: '__answer', type: '*-'}),
											_.f({name: '__user', type: '*-'}),
											_.html('question', _, d),
										]],
									]},
								}}),
							]],
						]},
					}}),
				]],

				_.c({name: 'candidate', add: false, process: {
					tpl: (_, d)=>{
						_.__.global.candidates[d._id] = d;
						if(!_.__.global.iamExpert && d.__user && d.__user.l.map(l=>l+'').indexOf(_.__.user.key) != -1) d.iam = true;
						
						if(_.__.global.tutorialVote && d.__answer && d.__answer.l) d.__answer.l.forEach((r, i)=>{ if(_.__.global.tutorialClones[r+'']) d.__answer.l[i] = _.__.global.tutorialClones[r+''] });

					return [
						['div', {class: (d.__user&&d.__user.l[0]?'ready ':'')+(d.iam?'iam ':'')+' *css*', style:()=>{/*css
							.*css* {
								border-radius: 30px;
								border: none;
							}
							.*css*.ready {
								color: #735a91;
							}
							.*css*.iam {
								order: -1;
							}
						css*/}}, [
							_.f({name: '__user', type: '*-'}),
							_.html('candidate', _, d),
						]],
					]},
				}}),
			]],
		]],
	]],
]}

exports.func = ()=>{
	window.setVoteTime = function(_){
		if(_.parent().length){ // вообще тут нужна проверка на наличие самого элемента, но прямо сейчас он не удаляется из памяти через myEmpty, что тоже нужно исправить
			var t = ((JSON.parse(_.attr('f-end_time')).value - Date.now())/3600000).toFixed(0);
			_.text( ( (!t || t) < 1 ? 1 : t)+'ч' );
			setTimeout(function(){ window.setVoteTime(_) }, 60000);
		}
	}
}

exports.script = ()=>{
	if($('#subFormMain > div').length) $('#subFormMain').show();
}

exports.style = ()=>{/*

*/}