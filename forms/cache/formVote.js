exports.fields = {".":{"_id":1,"__formVote.l":1,"type":1,"close":1,"end_time":1,"city":1,"state":1,"population":1,"custom.candidateNum":1,"custom.expertNum":1,"add_custom_vote":1,"custom.stats.ceo":1,"custom.stats.chro":1,"custom.stats.cio":1,"custom.stats.cto":1,"custom.stats.cmo":1,"custom.stats.clo":1,"custom.stats.cpa":1,"custom.stats.niokr":1,"custom.stats.crmo":1,"custom.stats.time":1,"custom.stats.cso":1,"custom.stats.cspo":1,"custom.stats.business":1,"custom.stats.charity":1,"custom.stats.logistics":1,"custom.stats.politica":1,"custom.stats.sociology":1,"custom.stats.economy":1,"custom.stats.macro_economy":1,"custom.stats.psychology":1,"custom.stats.education":1,"custom.stats.sport":1,"custom.stats.medicine":1,"custom.stats.tourism":1,"custom.stats.zkh":1,"custom.stats.culture":1,"custom.stats.transport":1,"custom.stats.smi":1,"custom.stats.sh":1,"custom.stats.energy":1,"custom.stats.ecology":1,"custom.stats.religion":1,"custom.stats.philosophy":1,"custom.stats.history":1,"position":1,"__adrs.l":1,"finished":1,"tutorial":1,"tutorialClones":1,"__user_candidate":1,"__user_expert":1,"tutorialLink":1,"__expert.l":1,"__candidate.l":1},".__adrs":{"city":1,"state":1},".__expert":{"__user":1,"_id":1,"__question.l":1},".__expert__question":{"__answer":1,"__user":1,"ready":1,"waitForModeration":1,"moderationCount":1,"wait_for_time":1,"text":1,"stats":1,"minStatsCount":1,"save_question":1},".__candidate":{"__user":1,"_id":1,"__answer.l":1},".__candidate__answer":{"ready":1,"__question":1,"__user":1,"_id":1,"__rate.l":1,"text":1,"save_answer":1},".__candidate__answer__rate":{"__user":1,"rate":1,"save_rate":1,"_id":1,"__poll.l":1,"tutorial":1,"tutorialReady":1},".__candidate__answer__rate__poll":{"dateto":1}}

exports.lst = {"addobj":"2021-02-13T09:48:31.838Z"}

exports.process = {}
exports.html = {}
exports.process['.'] = {}
exports.process['.__adrs'] = {}
exports.process['.__expert'] = {}
exports.process['.__expert__question'] = {}
exports.process['.__candidate'] = {}
exports.process['.__candidate__answer'] = {}
exports.process['.__candidate__answer__rate'] = {}
exports.process['.__candidate__answer__rate__poll'] = {}

exports.process['.']['loaded'] = true
exports.process['.']['id'] = (__, code, callback)=>{
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
exports.process['.']['tpl'] = (_, d)=>{
			
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
	['div', {id: 'formVote', class: 'f-slb f-24 _105_', style:()=>{/*css
		._105_ {
			
		}
		._105_ .tutorial-active {
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
				onClick: "f_fb55d5dccc3ea584ed286e9821d97a44",
			}})
		]],
	
		_.if(_.editMode, ()=>[
		
			['div', {class: '_106_', style:()=>{/*css
				._106_ {
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

				['div', {class: '_107_', style:()=>{/*css
					._107_ {
						display: flex;
					}
					._107_ > .stats {
						width: 100%;
						margin-left: 10px;
						height: 100%;
						//overflow-y: scroll;
						line-height: 10px;
					}
					._107_ > .stats > .el > input {
						display: none;
					}
					._107_ > .stats > .el > input + label {
						opacity: 0.5;
						cursor: pointer;
					}
					._107_ > .stats > .el > input:checked + label {
						opacity: 1;
					}
					._107_ > .info {
						padding: 20px;
					}
					._107_ > .info > button {
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
								onAction: "f_8a06fb7a0317c497b2f911c0b30c02aa",
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
			
			['div', {class: 'header _108_', style:()=>{/*css
				._108_ {
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
				['div', {class: 'end-time _109_', style:()=>{/*css
					._109_ {
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
					._109_:before {
						content: 'до окончания ';
					}
					._109_ > .el {
						line-height: 16px;
					}
					body.isMobile ._109_ {
						display: none;
					}
				css*/}, help: 'Осталось\xa0времени до\xa0окончания\xa0выборов', helpPosition: 'bottom left'}, [
					_.f({name: 'end_time', type: '*', front: {
						onLoadElement: "f_37d6d56bfeec333f04d1ff53392dc731",
					}}),
				]],
				['div', {class: 'title _110_', style:()=>{/*css
					._110_ {
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
					._110_ > .position {
						width: 100%
					}
					._110_ > .title {
						display: block;
						font-size: 12px;
						margin-top: -12px;
					}
					body.isMobile ._110_ {
						width: 160px;
						padding-top: 20px;
						font-size: 11px;
					}
					body.isMobile ._110_ > .title {
						font-size: 10px;
					}
				css*/}}, [
					['span', {class: 'position'},[
						_.f({name: 'position', type: 'input-', front: {
							textMask: "f_b0c2efcbcb6c70306c71e245c9e302bf",
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

		['div', {class: 'vote _111_', style:()=>{/*css
			._111_ {
				height: 100%;
				padding: 100px 60px 60px 60px;
				max-height: 420px;
			}
			
			._111_.active .i {
				display: none;
			}
			
			._111_ > .btn-close {
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
			._111_.active > .btn-close {
				display: block;
			}
			._111_ > .btn-close:hover {
				opacity: 0.5;
			}
			._111_ > .btn-close:after {
				top: 0px;
				right: 0px;
			}
			
			._111_ > .tutorial-link {
				font-size: 64px;
				margin-left: -30px;
				left: 140px;
				top: 30px;
			}
			body.isMobile ._111_ > .tutorial-link {
				left: 40px;
				top: 70px;
			}
			body.isMobile ._111_ {
				padding: 80px 50px 20px 50px;
				max-height: 440px;
			}
			body.isMobile ._111_ > .btn-close {
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
						onLoadElement: "f_f6f0520d20bfc32f5256dcd0e2f9ad48",
					}}),
				]],
			]),
		
			['div', {class: (d.__candidate && d.__candidate.l.length == 1?'single-candidate ':'')+'size-'+(d.__expert?(d.__expert.l.length<5?'lg':(d.__expert.l.length<8?'md':'sm')):'')+' _112_', style:()=>{/*css
				._112_ {
					display: flex;
					width: 100%;
					height: 100%;
					overflow: auto;
				}
				._112_ > * {
					position: inherit;
					width: 100%;
					height: 100%;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
				}
				._112_ > * > * {
					position: unset;
					position: inherit;
					width: 100%;
					height: auto;
				}
				._112_.single-candidate > * > * {
					width: 20%;
				}
				._112_ .i {
					width: 60px;
					height: 60px;
				}
				._112_.size-md .i {
					width: 42px;
					height: 42px;
				}
				._112_.size-sm .i {
					width: 30px;
					height: 30px;
				}
				._112_.size-md .i.iam > span.wait_for_time, ._112_.size-sm .i.iam > span.wait_for_time {
					background-image: none;
					text-align: center;
				}
				._112_ .question {
					background-size: contain;
					background-position: center;
					background-repeat: no-repeat;
					background-image: url(/static/img/button5.png);
				}
				._112_ .question .i {
					background-size: 50%;
					background-repeat: no-repeat;
					background-position: center;
					margin-top: 6px;
				}				
			css*/}}, [
				
				['div', {class: 'expert _113_', style:()=>{/*css
					order: -2;
				css*/}}, [
	//				['div', {class: 'f-18 flex-center _114_', style:()=>{/*css
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
										['div', {class: 'flex-center question '+(d.tQuestion||'')+'_115_', style:()=>{/*css
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
						['div', {class: (d.__user&&d.__user.l[0]?'ready ':'')+(d.iam?'iam ':'')+' _116_', style:()=>{/*css
							._116_ {
								border-radius: 30px;
								border: none;
							}
							._116_.ready {
								color: #735a91;
							}
							._116_.iam {
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

exports.process['.__adrs']['loaded'] = true
exports.process['.__adrs']['tpl'] = (_, d)=>{ return [
							['span', {class: 'flex title'}, [
								_.f({name: 'city', type: 'text-', value: ''}),
								_.if(d.city && d.state, ['span', {text: ',\xa0'}]),
								_.f({name: 'state', type: 'text-', value: ''}),
							]],
						]}

exports.process['.__expert']['loaded'] = true
exports.process['.__expert']['tpl'] = (_, d)=>{
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
										['div', {class: 'flex-center question '+(d.tQuestion||'')+'_115_', style:()=>{/*css
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
						]}

exports.process['.__expert__question']['loaded'] = true
exports.process['.__expert__question']['dataReady'] = (__, data, callback)=>{
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
									}
exports.process['.__expert__question']['tpl'] = (_, d)=>{
										d.__code = _.code;
										_.__.global.questions[d._id] = d;
									return [
										['div', {class: 'flex-center question '+(d.tQuestion||'')+'_115_', style:()=>{/*css
											width: 100%;
											position: inherit;
										css*/}}, [
											_.f({name: '__answer', type: '*-'}),
											_.f({name: '__user', type: '*-'}),
											_.html('question', _, d),
										]],
									]}
exports.html['.__expert__question'] = {}
exports.html['.__expert__question']['question'] = {}
exports.html['.__expert__question']['question']['tpl'] = (_, d)=>{ return [
	['div', {class: '_80_', style:()=>{/*css
		._80_ > .i {
			background-size: contain;
			background-image: url(/static/img/no-question.png);
			cursor: pointer;
			font-size: 18px;
			color: white;
			position: relative;
		}		
		._80_ > .i.iam > span {
			display: none;
		}
		._80_ > .i.iam > span.wait_for_time {
			display: block;
			position: absolute;
			width: 100%;
			left: 0px;
			bottom: 0px;
			background-image: none;
			text-align: center;
			font-size: 12px;
		}
		._80_ > .i.iam {
			background-image: url(/static/img/no-question-my.png);
		}
		._80_ > .i.ready-true {
			background-image: url(/static/img/has-question.png);
		}
		._80_ > .i.waitForModeration {
			background-image: url(/static/img/check-question.png);
		}
	css*/}}, [
		_.f({name: 'ready', type: '*+'}),
		_.f({name: 'waitForModeration', type: '*-'}),
		_.f({name: 'moderationCount', type: '*-'}),
		['div', {class: 'i ready-'+d.ready+(d.iam?' iam':'')+(d.waitForModeration?' waitForModeration':'')},[
			['span', {class: (d.wait_for_time?' wait_for_time':'')}, [
				_.f({name: 'wait_for_time', type: '*', front: {
					onLoadElement: "f_493e5503e4d2a2a84879afd319164dd4",
				}}),
			]],
		]],
	]],
	['div', {class: (_.__.global.freeQuestion?'free':'')+' f-24 text _81_', style:()=>{/*css
		._81_ {
			display: none;
			position: absolute;
			top: 100px;
			width: 480px;
			left: 60px;
			height: 110px;
			z-index: 1;
			text-align: left;
			border-radius: 5px;
			color: white;
			font-size: 13px;
		}
		._81_.active {
			display: flex;
		}
		._81_.active-single {
			height: 240px;
		}
		._81_ > .el {
			min-height: 100%;
			max-height: 100%;
			padding: 20px;
			padding-top: 40px;
			background-color: rgba(213, 173, 81, 1);
			border-radius: 10px;
		}
		._81_ > label {
			position: absolute;
			margin: auto;
			top: 0px;
			color: #412c17;
			height: 40px;
			background-image: url(/static/img/panel6.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
			display: flex;
			align-items: center;
			justify-content: center;
			white-space: pre-wrap;
			text-align: center;
			line-height: 10px;
			padding-bottom: 8px;
			width: 40%;
			left: -20px;
		}
		body.isMobile ._81_ > label {
			width: 100%;
			left: 0px;			
		}
		
		._81_ > .el > textarea {
			min-height: 100%;
			max-height: 100%;
			background: transparent;
			border: none;
			padding: 20px;
			background: #412c17;
			border-radius: 5px;
			color: white;		
			height: 100%;
			margin: 0px;
			font-size: 14px;
		}
		._81_ > .el > textarea:focus {
			outline: none;
		}
		._81_ > p {
			text-align: center;
			background-image: url(/static/img/panel5.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: top;
			width: 180px;
			margin-top: 40px;
			color: white;
		}
		._81_.free {
			display: flex;
			top: 60px;
			height: 280px;
		}
		
		body.isMobile ._81_ {
			top: 80px;
			left: 0px;
			width: 100%;
			padding: 0px 50px;
			flex-wrap: wrap;
		}
		body.isMobile ._81_.free {
			top: 20px;
			background-color: transparent;
		}
		body.isMobile ._81_.free > .el {
			background-color: transparent;
		}
		body.isMobile ._81_ > .el {
			min-height: 220px;
			max-height: 220px;
			padding: 0px;
			padding-top: 60px;
			width: 100%;
			margin: auto;
		}
		body.isMobile ._81_.active-single > .el {
			width: 100%;
			min-height: 160px;
			max-height: 160px;
		}
		body.isMobile ._81_.active-single > .el > textarea {
			padding: 4px 10px;
		}
		body.isMobile ._81_ > .el > div[type=talabel] {
			padding: 10px;
			    text-align: center;
		}
		body.isMobile ._81_.free > label {
			display: none;
		}
		body.isMobile ._81_.active-single > .save, 
		body.isMobile ._81_.free > .save {
			position: relative;
			top: 0px;
			left: 0px;
			order: 3;
			margin-top: -30px;
			margin-left: 10%;
		}
	css*/}}, [
		['label', {text: d.waitForModeration ? CONFIG.labels.question_on_modetaion : CONFIG.labels.question}],
		_.if(_.__.global.iamExpert && !d.iam && !_.__.global.myQuestionReady && !_.__.global.tutorialVote , ()=>{ return [
			['div', {class: 'el', text: CONFIG.labels.question_view}]
		]}),
		_.if((_.__.global.iamExpert && _.__.global.myQuestionReady) || (_.__.global.iamCandidate && d.ready) || (d.ready && _.__.global.tutorialVote), ()=>{ return [
			_.f({name: 'text', type: 'talabel', value: CONFIG.labels.question_empty}),
		]}),
		_.if(_.__.global.iamExpert && d.iam && !d.ready && d.waitForModeration, ()=>[
			_.f({name: 'text', type: 'talabel', value: CONFIG.labels.question_on_modetaion}),
		]),
		_.if(_.__.global.iamExpert && d.iam && !d.ready && !d.waitForModeration, ()=>{ return [
			_.f({name: 'text', type: 'textarea', value: '', front: {
				onKeyUp: "f_ed0555dea7bd138950787d1cdc809d79",
			}}),
			['div', {class: 'f-18 questionBaseStats _82_', style:()=>{/*css
				._82_ {
					margin: 60px 10px;
					white-space: nowrap;
					align-self: flex-end;
					font-size: 14px;
					order: 2;
					min-width: 180px;
				}
				._82_ > .label {
					display: flex;
					justify-content: flex-end;
				}
				._82_ > .label > .count{
					font-size: 24px;
					color: #412c17!important;
				}
				._82_ > .label > .count:not(.ready) {
					color: #999;
				}
				._82_ > .label > .count.ready.super {
					color: #00a95b;
				}
				._82_ > .item {
					border: 2px solid #412c17;
					text-align: center;
					margin: 5px;			
					border-radius: 5px;
					color: #412c17;
				}
				._82_ > .item.sm {
					font-size: 11px;
					line-height: 18px;
				}
				._82_ > .item.active {
					color: white;
					background-color: #412c17;
				}			
				body.isMobile ._82_ {
					margin: auto;
					width: 80%;
					border-radius: 5px;
					padding: 0px;
				}
				body.isMobile ._82_ > .label {
					padding: 0px;
				}
				._82_ .notifyjs-container {
					min-width: 180px;
					max-width: 180px;
					white-space: normal;
				}
			css*/}},[				
				_.script(()=>{
					$(document).off('click','#formVote .questionBaseStats > .item, #formQuestion .questionBaseStats > .item');
					$(document).on('click', '#formVote .questionBaseStats > .item, #formQuestion .questionBaseStats > .item', function(){
						
						var $this = $(this);
						$this.toggleClass('active');
						
						var $stats = $this.closest('.questionBaseStats');
						var has = $stats.find('> .item.active').length;
						var need = $stats.find('> .label > .count > .need').text()*1;
						
						$stats.find('> .label > .count').removeClass('ready').removeClass('super');
						if(has > need) $stats.find('> .label > .count').addClass('super');
						if(has >= need){
							$stats.find('> .label > .count').addClass('ready');
							if(has > need) $stats.find('> .label > .count').addClass('super');
						}

						$stats.find('> .label > .count > .has').text(has);
					});
				}),
				
				_.f({name: 'stats', type: '*-'}),
				((_, d)=>{
					var result = [];
					if(d.stats){
						for(var s in d.stats){try{
							var l = LST.stats.lst[s];
							result.push( ['div', {help: '["lst","stats","'+l.v+'"]', helpPosition: 'bottom right', class: 'h item '+(l.l.length>18?'sm':''), stat: s, text: l.l}] );
						}catch(e){console.log(s,e)}};
					}
					return result;
				})(_, d),
				
				['div', {class: 'label'},[
					//['div', {text: 'Выбранные темы:'}],
					['div', {class: 'count'}, [
						['span', {class: 'has', text: '0'}],
						['span', {text: '/'}],
						['span', {class: 'need'}, [
							_.f({name: 'minStatsCount', type: 'text-', value: CONFIG.questionMinStatsCount}),
						]],
					]],
				]],
			]],
			['div', {class: 'count _83_', style:()=>{/*css
				._83_ {
					position: absolute;
					bottom: 4px;
					left: 0px;
					padding-left: 20px;
					padding-bottom: 0px;
					font-size: 12px;
				}
				._83_ > p {
					margin: 0px;
					color: white;
					margin-bottom: -16px;
				}
				body.isMobile ._83_ {
					left: 0px;
					top: 40px;
					bottom: auto;
					width: 100%;
					text-align: center;
					padding: 0px;
				}
			css*/}, text: 'Осталось символов: '},[
				['span', {text: (140-(d.text?d.text.length:0))}],
				//_.if(_.__.global.iamExpert && d.moderationCount && !_.__.global.freeQuestion, ()=>[
				//	['p', {text: CONFIG.labels.question_bad_modetaion}],
				//]),
			]],
			['div', {class: 'save _84_', style:()=>{/*css
				._84_ {
					position: absolute;
					bottom: 0px;
					right: 0px;
					padding: 0px;
					width: 40%;
				}
				._84_ > .el {
					position: relative;
				}
				._84_ > .el > button {
					border: none;				
					background-size: contain;
					background-position: center;
					background-repeat: no-repeat;
					background-image: url(/static/img/button22.png);
					height: 50px;
					background-color: transparent;
					color: white;
					width: 100%;
					white-space: pre-wrap;
					font-size: 13px;
					margin-bottom: 6px;
					padding-bottom: 4px;
				}
				._84_ > .el > button:hover {
					opacity: 0.5;
				}
				body.isMobile ._84_ {
					top: -20px;
					width: 40%;
					right: 30%;
					bottom: auto;
				}
			css*/}}, [
				['div', {class: 'el'}, [
					['button', {text: 'Сохранить'}, [
						_.f({name: 'save_question', type: 'action', front: {
							onClick: "f_e711565f20276986b9b6059b704ab1dd",
						}}),						
						
					]],
				]],
			]],
		]}),
	]],
]}

exports.process['.__candidate']['loaded'] = true
exports.process['.__candidate']['tpl'] = (_, d)=>{
						_.__.global.candidates[d._id] = d;
						if(!_.__.global.iamExpert && d.__user && d.__user.l.map(l=>l+'').indexOf(_.__.user.key) != -1) d.iam = true;
						
						if(_.__.global.tutorialVote && d.__answer && d.__answer.l) d.__answer.l.forEach((r, i)=>{ if(_.__.global.tutorialClones[r+'']) d.__answer.l[i] = _.__.global.tutorialClones[r+''] });

					return [
						['div', {class: (d.__user&&d.__user.l[0]?'ready ':'')+(d.iam?'iam ':'')+' _116_', style:()=>{/*css
							._116_ {
								border-radius: 30px;
								border: none;
							}
							._116_.ready {
								color: #735a91;
							}
							._116_.iam {
								order: -1;
							}
						css*/}}, [
							_.f({name: '__user', type: '*-'}),
							_.html('candidate', _, d),
						]],
					]}
exports.html['.__candidate'] = {}
exports.html['.__candidate']['candidate'] = {}
exports.html['.__candidate']['candidate']['tpl'] = (_, d)=>{ return [
						
//	['div', {class: 'candidate flex-center _117_', style:()=>{/*css
//		order: -100;
//	css*/}, text: 'Кандидат'}],

	_.c({name: 'answer', add: false, process: {
		dataReady: (__, data, callback)=>{
			data.forEach((d)=>{
				if(d.__user && d.__user.l.map(l=>l+'').indexOf(__.user.key) != -1) d.iam = true;
				if(__.global.tutorialVote){
					if(__.global.tutorialVoteQuestion){
						d.ready = 0;
					}else if(__.global.tutorialVoteAnswer){
						d.tAnswer = d.iam && !d.ready ? ' tutorial-answer ' : '';
					}else if(__.global.tutorialVoteRate){
						d.tAnswer = ' tutorial-answer ';
					}else if(__.global.voteFinished){
						
					}else{
						d.ready = 0;
					}
				}
			});
			callback();
		},
		tpl: (_, d)=>{ return [
		
			// questionsOrder отсутствует для showItem
		
			['div', {class: 'flex-center answer '+(d.tAnswer||''), style: "order:"+(d.__question&&_.__.global.questionsOrder?_.__.global.questionsOrder.indexOf(d.__question.l[0]+''):0)}, [
				_.html('answer', _, d),
			]],
		]},
	}}),

]}

exports.process['.__candidate__answer']['loaded'] = true
exports.process['.__candidate__answer']['dataReady'] = (__, data, callback)=>{
			data.forEach((d)=>{
				if(d.__user && d.__user.l.map(l=>l+'').indexOf(__.user.key) != -1) d.iam = true;
				if(__.global.tutorialVote){
					if(__.global.tutorialVoteQuestion){
						d.ready = 0;
					}else if(__.global.tutorialVoteAnswer){
						d.tAnswer = d.iam && !d.ready ? ' tutorial-answer ' : '';
					}else if(__.global.tutorialVoteRate){
						d.tAnswer = ' tutorial-answer ';
					}else if(__.global.voteFinished){
						
					}else{
						d.ready = 0;
					}
				}
			});
			callback();
		}
exports.process['.__candidate__answer']['tpl'] = (_, d)=>{ return [
		
			// questionsOrder отсутствует для showItem
		
			['div', {class: 'flex-center answer '+(d.tAnswer||''), style: "order:"+(d.__question&&_.__.global.questionsOrder?_.__.global.questionsOrder.indexOf(d.__question.l[0]+''):0)}, [
				_.html('answer', _, d),
			]],
		]}
exports.html['.__candidate__answer'] = {}
exports.html['.__candidate__answer']['answer'] = {}
exports.html['.__candidate__answer']['answer']['tpl'] = (_, d)=>{
	
	if(_.__.global.tutorialVote && d.__rate && d.__rate.l) d.__rate.l.forEach((r, i)=>{ if(_.__.global.tutorialClones[r+'']) d.__rate.l[i] = _.__.global.tutorialClones[r+''] });
	
	var question = d.__question && _.__.global.questions[d.__question.l[0]] ? _.__.global.questions[d.__question.l[0]] : 
				   _.__.global.tutorialQuestion ? _.__.global.questions[_.__.global.tutorialQuestion] : {};
	if(question == undefined) question = {};
	
return [
	['div', {class: (!_.__.global.iamExpert&&_.__.global.iamCandidate?'iamCandidate ':'')+(!_.__.global.iamExpert&&d.iam?'myAnswer ':'')+(d.ready || (!_.__.global.iamExpert&&d.iam)?'ready ':'')+' answer-block _118_', style:()=>{/*css
		._118_ {
			white-space: pre-wrap;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			font-size: 12px;
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
			background-image: url(/static/img/button5.png);
		}
		._118_.ready:hover {
			opacity: 0.5;
			cursor: pointer;
		}
		._118_.ready:hover * {
			cursor: pointer;
		}
		._118_ > .i {
			background-position: center;
			background-repeat: no-repeat;
			background-size: 50%;
			margin-top: 6px;
		}
		._118_ > .i.no-question {
			background-image: url(/static/img/wait-for-question.png);
		}
		._118_ > .i.no-answer {
			background-image: url(/static/img/no-answer.png);
		}
		._118_.iamCandidate.myAnswer > .i.no-answer {
			background-image: url(/static/img/no-answer-my.png);
		}
		._118_ > .i.has-answer {
			background-image: url(/static/img/has-answer.png);
		}
		._118_.has-rate > .i.has-answer, ._118_.iamCandidate > .i.has-answer {
			background-image: url(/static/img/has-answer-my.png);
		}
		._118_.has-rate > div {
			color: #735a91;
		}
		._118_.iamCandidate > .rates > .rate, ._118_.iamCandidate > .rates > .rate:after {
			height: 28px;
			width: 28px;
		}
		._118_ > .rates {
			display: none;
		}
	css*/}, question: question.__code}, [
		
		_.f({name: 'ready', type: '*-'}),
		_.f({name: '__question', type: '*-'}),
		_.f({name: '__user', type: '*-'}),
		
		_.if(!question.ready, ()=>{ return [
			['div', {class: 'i no-question'}],
		]}),
		_.if(question.ready && !d.ready, ()=>{ return [
			['div', {class: 'i no-answer'}],
		]}),
		_.if(question.ready && d.ready, ()=>{ return [
			
			['div', {class: 'i has-answer'}],
			
			_.if(!_.__.global.iamExpert || _.__.global.myQuestionReady, ()=>[
				_.html('rate', _, d),
			]),
		]}),
	]],
	
	['div', {class: 'f-24 text _119_', style:()=>{/*css
		._119_ {
			display: none;
			position: absolute;
			z-index: 1;
			text-align: left;
			color: #888;			
			top: 220px;
			width: 480px;
			left: 60px;
			height: 140px;
			border-radius: 5px;
			font-size: 13px;
		}
		body.isMobile ._119_ {
			width: 100%;
			padding: 0px 50px;
			left: 0px;
		}
		
		._119_.active {
			display: block;
		}
		._119_.active-single {
			top: 100px;
			height: 240px;
		}
		._119_ > .el {
			color: white;			
			padding: 0px 20px;
			max-height: 80px;
			min-height: 80px;
			height: 100%!important;
			background-color: rgba(213, 173, 81, 1);
			border-radius: 10px;
		}
		._119_ > label {
			position: absolute;
			margin: auto;
			top: 0px;
			color: #412c17;
			height: 40px;
			background-image: url(/static/img/panel6.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
			display: flex;
			align-items: center;
			justify-content: center;
			white-space: pre-wrap;
			text-align: center;
			line-height: 10px;
			padding-bottom: 8px;
			width: 40%;
			left: -20px;
		}
		body.isMobile ._119_ > label {
			width: 100%;
			left: 0px;			
		}
		
		._119_ > .el > textarea {
			min-height: 100%;
			max-height: 100%;
			border: none;
			padding: 20px;
			background: #444;		
			height: 100%;
			margin: 0px;
			background: #412c17;
			border-radius: 5px;
			font-size: 14px;
		}
		._119_ > .el > textarea:focus {
			outline: none;
		}
		._119_ > .el > div[type=talabel] {
			color: white;
			word-break: break-all;
			padding-top: 40px;
		}
		._119_ > .el > textarea {
			padding: 10px 20px;
		}
		
		body.isMobile ._119_ > .el {
			max-height: 140px;
			min-height: 140px;
			padding: 0px;
		}
		body.isMobile ._119_ > .el > textarea {
			margin-top: 0px;
			min-height: 100%;
			max-height: 100%;
			padding: 10px;
		}
		body.isMobile ._119_ > .el > div[type=talabel] {
			width: 80%;
			margin: auto;
			text-align: center;
		}
		
		._119_ > .choiceRatesBlock {
			width: 320px;
			right: 20px;
			top: 4px;
			font-size: 20px;
		}
		
		body.isMobile ._119_ > .choiceRatesBlock {
			position: relative;
			right: 0px;
			width: 180px;
			flex-wrap: wrap;
			margin: auto;
			align-items: center;
			justify-content: center;
			top: -20px;
		}
		body.isMobile ._119_ > .choiceRatesBlock > .rate {
			width: 20%;
		}
		body.isMobile ._119_ > .choiceRatesBlock > .el {
			width: 30%;
		}
		._119_ > .save {
			padding: 0px 20px;
			font-size: 14px;
		}
	css*/}}, [
		_.if(!_.__.global.iamCandidate || d.iam || _.__.global.voteFinished, ()=>{ return [
			_.if(!(d.iam && !d.ready), ()=>{ return [
				['label', {text: CONFIG.labels.answer}],
				_.if(_.__.global.iamExpert && !d.iam && !_.__.global.myQuestionReady, ()=>{ return [
					['div', {class: 'el'}, [
						['div', {type: 'talabel', text: CONFIG.labels.answer_view}],
					]]
				]}),
				_.if(!(_.__.global.iamExpert && !d.iam && !_.__.global.myQuestionReady), ()=>{ return [
					
					_.f({name: 'text', type: 'talabel', value: CONFIG.labels.question_empty}),

				]}),
			]}),
			_.if(!_.__.global.iamExpert && question.ready && d.iam && !d.ready, ()=>{ return [
				_.f({name: 'text', type: 'textarea', value: '', front: {
					onKeyUp: "f_e20790c6febb26873b321b91f825c8e4",
				}}),
				['div', {class: 'count _120_', style:()=>{/*css
					._120_ {
						position: absolute;
						bottom: 0px;
						left: 0px;
						padding-bottom: 40px;
						font-size: 12px;
						padding-left: 20px;
						color: white;
					}
					body.isMobile ._120_ {
						position: relative;
						padding: 0px;
						margin: auto;
						text-align: center;
					}
				css*/}, text: 'Осталось символов: '},[
					['span', {text: (140-(d.text?d.text.length:0))}],
				]],
				['div', {class: 'save _121_', style:()=>{/*css
					._121_ {
						position: absolute;
						bottom: 0px;
						right: 0px;
						padding: 20px;
					}
					._121_ > .el > button {
						border: none;
						min-width: 160px;
						background-size: contain;
						background-position: center;
						background-repeat: no-repeat;
						background-image: url(/static/img/button22.png);
						height: 50px;
						background-color: transparent;
						color: white;
						width: 100px;
						white-space: pre-wrap;
						font-size: 13px;
						margin-bottom: 6px;
						padding-bottom: 4px;
					}
					._121_ > .el > button:hover {
						opacity: 0.5;
					}
					body.isMobile ._121_ {
						position: relative;					
					}
					body.isMobile ._121_ > .el {
						width: 160px;
						margin: auto;
					}
				css*/}}, [
					['div', {class: 'el'}, [
						['button', {text: 'Сохранить'}, [
							_.f({name: 'save_answer', type: 'action', front: {
								onAction: "f_1010c20c2c672e85516237d175465ec5",
							}}),
						]],
					]],
				]],
			]}),
		]}),
	]],
]}
exports.html['.__candidate__answer']['rate'] = {}
exports.html['.__candidate__answer']['rate']['tpl'] = (_, d)=>{ return [

	['div', {class: 'rates _122_', style:()=>{/*css
		._122_ {
			display: flex;
			align-items: self-end;
			flex-direction: column;
		}
		._122_ > .rate[rate] {
			margin-left: 10px;
			height: 32px;
			width: 32px;
		}
		body.theme-fantasy ._122_ > .rate[rate] {
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
												onLoadElement: "f_835a61b627c21a02b5cfa887bce57204",
											}}),
										]],
									]},
								}}),
							]]
						]}),
						
						_.f({name: 'tutorial', type: '*-'}),
						_.f({name: 'tutorialReady', type: '*-'}),
						_.f({name: 'rate', type: '*-', value: '0', front: {
							onLoadElement: "f_3841da5a66ee80d7ba27a6e03296105b",
						}}),
					]],
				]}),
			]},
		}}),
	
	]],

]}

exports.process['.__candidate__answer__rate']['loaded'] = true
exports.process['.__candidate__answer__rate']['dataReady'] = (__, data, callback)=>{
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
			}
exports.process['.__candidate__answer__rate']['tpl'] = (_, d)=>{
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
												onLoadElement: "f_835a61b627c21a02b5cfa887bce57204",
											}}),
										]],
									]},
								}}),
							]]
						]}),
						
						_.f({name: 'tutorial', type: '*-'}),
						_.f({name: 'tutorialReady', type: '*-'}),
						_.f({name: 'rate', type: '*-', value: '0', front: {
							onLoadElement: "f_3841da5a66ee80d7ba27a6e03296105b",
						}}),
					]],
				]}),
			]}
exports.html['.__candidate__answer__rate'] = {}
exports.html['.__candidate__answer__rate']['choiceRates'] = {}
exports.html['.__candidate__answer__rate']['choiceRates']['tpl'] = (_, d)=>{ return [

	['div', {class: 'choiceRatesBlock _63_', style:()=>{/*css
		._63_ {
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
		._63_ > .rate {
			width: 32px;
			height: 32px;
			position: relative;
			cursor: pointer;
			flex-shrink: 0;
		}
		._63_ > .rate:hover {
			opacity: 0.5;
		}
		._63_ > .el {
			display: none;
			width: 160px;
			color: white;
			cursor: pointer;
			padding: 0px;
			text-align: center;
		}
		._63_.choice > .el:hover {
			opacity: 0.5;
		}
		._63_ > .el > button {
			padding: 0px;
			border: none;
			color: #00a95b;
			background: transparent;
		}
		._63_.choice > .el {
			display: block
		}
		._63_.choice > .rate:not(.active) {
			display: none;
		}
		._63_.choice > .rate.active {
			flex-shrink: 2;
			width: 100%;
			margin-right: 10px;
		}
		._63_.choice > .rate.active:after {
			width: 100%;
		}
		body.theme-fantasy ._63_ {
			font-size: 14px;
		}
		body.theme-fantasy ._63_ > .rate {
			height: 32px;
			width: 32px;
		}		
		body.theme-fantasy ._63_ > .el > button, body.theme-fantasy ._63_ > .el.close-btn {
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
		body.theme-fantasy ._63_ > .el.close-btn {
			background-image: url(/static/img/button11.png);
			color: #333;
		}
	css*/}}, [ 
		
		(()=>{ return [1,2,3,4,5,6,7,8,9,10].map(i=>['div', {rate: i, class: 'rate rate-'+i}]) })(_, d),

		['div', {class: 'el close-btn', text: 'Изменить'}],
		
		['div', {class: 'el'}, [
			['button', {text: 'Сохранить'}, [
				_.f({name: 'save_rate', type: 'action', front: {
					onClick: "f_3124ce035387bc4d8ad8b9a73d9d47be",
				}}),
			]],
		]],
	]],

]}

exports.process['.__candidate__answer__rate__poll']['loaded'] = true
exports.process['.__candidate__answer__rate__poll']['tpl'] = (_, d)=>{ return [
										['div', {skey: md5(d._id+d.dateto), dateto: d.dateto}, [
											_.f({name: 'dateto', type: '*-', front: {
												onLoadElement: "f_835a61b627c21a02b5cfa887bce57204",
											}}),
										]],
									]}

