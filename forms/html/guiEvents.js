exports.tpl = (_, d)=>{ return [

	['div', {class: 'mcb events-list f-slb *css*', style:()=>{/*css
		
		.*css* {
			display: flex;
			justify-content: center;
			border-bottom: none;
			height: 120px;
			background-image: url(/static/img/panel1.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: bottom center;
		}
		
		.*css* > .link {
			height: 50px;
			width: 54px;
			align-self: flex-end;
			margin-bottom: 10px;
		}
		
		.*css* > .link > div {
			color: #00a95b;
			display: inline-block;
			position: relative;		
			background-image: url(/static/img/button2.png);
			background-size: contain;
			height: 100%;
			width: 100%;
			background-position: center;
			background-repeat: no-repeat;
			margin: 0px;
			border-radius: 0px;
		}
		
		.*css* > .link > div > span {
			position: absolute;
			top: -2px;
			left: 0px;
			height: 100%;
			width: 100%;
			background-size: 32px;
			background-repeat: no-repeat;
			background-position: center;
		}
		
		.*css* > .link > div.expert > span {
			background-image: url(/static/img/expert-icon.png);
		}
		.*css* > .link > div.candidate > span {
			background-image: url(/static/img/candidate-icon.png);
		}

		.*css*.tutorial-active, .*css* .tutorial-active {
			-webkit-animation: tutorial_active 1s infinite alternate;
			-moz-animation: tutorial_active 1s infinite alternate;
			-ms-animation: tutorial_active 1s infinite alternate;
			-o-animation: tutorial_active 1s infinite alternate;
			animation: tutorial_active 1s infinite alternate;
		}
		.*css* > a.updated {
			-webkit-animation: scale 1s infinite alternate;
			-moz-animation: scale 1s infinite alternate;
			-ms-animation: scale 1s infinite alternate;
			-o-animation: scale 1s infinite alternate;
			animation: scale 1s infinite alternate;		
		}
		.*css* > .complex-controls {
			display: none;
		}
	css*/}}, [
		
		['div', {id: 'searchVoteBtn', userExpertLimit: CONFIG.userExpertLimit, userCandidateLimit: CONFIG.userCandidateLimit,  class: 'link *css*', notifyPosition: 'bottom right', style: {/*css
			.*css* {
				display: none;
			}
			.*css*.active {
				display: block;
			}
			body.theme-fantasy .*css* {
				position: absolute;
				background-image: url(/static/img/button22.png);
				background-size: contain;
				width: 90px!important;
				height: 50px;
				top: 12px;
				right: 24px;
				background-position: center;
				background-repeat: no-repeat;
				cursor: pointer;
			}
			body.theme-fantasy .*css*.tutorial-active {
				background-size: 80px;
			}
			body.theme-fantasy .*css* > div {
				display: none;
			}
			body.theme-fantasy .*css*:after {
				content: '';
				font-size: 12px;
				color: white;
				position: absolute;
				width: 100%;
				height: 28px;
				text-align: center;
				line-height: 14px;
				top: 10px;
				white-space: pre-wrap;
				background-image: url(/static/img/find.png);
				background-size: 24px;
				background-position: center;
				background-repeat: no-repeat;
			}
			body.theme-fantasy .*css*:hover:after {
				opacity: 0.5;
			}
		css*/}}, [
			['div', {class: 'new h'}, [
				['span', {}],
			]],
			_.f({name: 'search_vote', type: 'action'}),
		]],
		_.func(()=>{
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
		}),
		
		['a', {class: '*css*', style: {/*css
			body.theme-fantasy .*css* {
				position: absolute;
				background-image: url(/static/img/button2.png);
				background-size: contain;
				width: 45px!important;
				height: 45px;
				top: 15px;
				left: 22px;
				background-position: center;
				background-repeat: no-repeat;
				cursor: pointer;
			}
			body.theme-fantasy .*css*:after {
				content: '';
				background-image: url(/static/img/story.png);
				background-size: contain;
				width: 100%;
				height: 100%;
				background-size: 24px;
				background-position: center;
				background-repeat: no-repeat;
				position: absolute;
			}
			body.theme-fantasy .*css*:hover:after {
				opacity: 0.5;
			}
		css*/}, query: '{"form":"formStory", "container": "subFormMain", "filter": {"type": "story"}}'}],
		
		['a', {class: '*css*', style: {/*css
			body.theme-fantasy .*css* {
				position: absolute;
				background-image: url(/static/img/button2.png);
				background-size: contain;
				width: 45px!important;
				height: 45px;
				top: 15px;
				left: 70px;
				background-position: center;
				background-repeat: no-repeat;
				cursor: pointer;
			}
			body.theme-fantasy .*css*:after {
				content: '';
				background-image: url(/static/img/idea.png);
				background-size: 24px;
				background-position: center;
				background-repeat: no-repeat;
				position: absolute;
				width: 100%;
				height: 100%;
			}
			body.theme-fantasy .*css*:hover:after {
				opacity: 0.5;
			}
		css*/}, query: '{"form":"formStory", "container": "subFormMain", "filter": {"type": "idea"}}'}],

		['a', {class: '*css*', style: {/*css
			body.theme-fantasy .*css* {
				position: absolute;
				background-image: url(/static/img/button2.png);
				background-size: contain;
				width: 60px!important;
				height: 60px;
				top: 2px;
				left: 120px;
				background-position: center;
				background-repeat: no-repeat;
				cursor: pointer;
			}
			body.theme-fantasy .*css*:after {
				content: '';
				background-image: url(/static/img/question.png);
				background-size: 36px;
				background-position: center;
				background-repeat: no-repeat;
				position: absolute;
				width: 100%;
				height: 100%;
			}
			body.theme-fantasy .*css*:hover:after {
				opacity: 0.5;
			}
		css*/}, query: '{"form":"formQuestion", "container": "subFormMain"}'}],
		
		_.c({name: 'vote', link: ['__vote_candidate', '__vote_expert'], add: true, sub: true, process: {
			tpl: (_, d)=>{
				var role = d && d.__user_candidate && d.__user_candidate.l.map(l=>l+'').indexOf(_.__.user.key) != -1 ? 'candidate' : d.__user_expert && d.__user_expert.l.map(l=>l+'').indexOf(_.__.user.key) != -1 ? 'expert' : 'new';
			return [
				['a', {class: 'link', query: '{"form":"formVote", "container": "subFormMain", "filter":{"code": "'+_.code+'"}}'},[
					['div', {class: role+' h'}, [
						_.f({name: '__user_candidate', type: '*-'}),
						_.f({name: '__user_expert', type: '*-'}),
						['span', {}],
						['div', {class: 'update-info'}, [
							((_, d)=>{ var result = [];
								
								var front = {
									onLoadElement: function (e){try{
										var info = JSON.parse(e.attr('f-update_time'));
										if(info.value.t && info.value.i && info.value.t > localStorage.xaoc_last_enter*1){
											e.closest('a').addClass('updated');
											e.closest('a').attr('onclick', true);
										}
									}catch(e){}},
									onSub: function (_, d){
										_.closest('a').addClass('updated');
									},
								}
								
								if(_.__.pre){
									result = _.f({name: 'update_time', type: '*-', front: front});
								}else{
									result = _.f({name: 'update_time.'+_.__.user.key, label: 'update_time', type: '*+', sub: true, front: front});
								}

							return result; })(_, d),
						]],
					]],
				]],
			]},
		}, front: {
			onLoad: function (){ window.toggleVoteSearchBtn() },
			onLastItem: function (){ window.toggleVoteSearchBtn() },
			onSubAdd: function (){ setTimeout(function(){ window.toggleVoteSearchBtn() }, 1000) },
			onSubDelete: function (){ setTimeout(function(){ window.toggleVoteSearchBtn() }, 1000) },
		}}),
	]],
]}

exports.script = ()=>{
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
}

exports.style = ()=>{/*

*/}