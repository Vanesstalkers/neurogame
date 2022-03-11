exports.fields = {".":{"_id":1,"__formTutorial.l":1,"tutorial.links":1,"tutorial.active":1,"tutorial.activeStep":1,"__vote_tutorial.l":1},".__vote_tutorial":{"_id":1,"__adrs.l":1},".__vote_tutorial__adrs":{"state":1,"city":1,"osm_lonlat":1}}

exports.lst = {"addobj":"2021-02-13T09:48:31.837Z"}

exports.process = {}
exports.html = {}
exports.process['.'] = {}
exports.process['.__vote_tutorial'] = {}
exports.process['.__vote_tutorial__adrs'] = {}

exports.process['.']['loaded'] = true
exports.process['.']['id'] = (__, code, callback)=>{
	__.fields[code].col = 'user';
	__.queryIds[code] = [__.user.key];
	callback();
}
exports.process['.']['tpl'] = (_, d)=>{
	
	var currentTutorial = d.tutorial ? d.tutorial.active : '';
	var currentStep = d.tutorial ? d.tutorial.activeStep : '';
	if(!currentStep && currentTutorial && LST['tutorial_'+currentTutorial]) currentStep = LST['tutorial_'+currentTutorial].list.lst[0].v;
	
return [
	
	['div', {id: 'tutorial', currentTutorial: currentTutorial, currentStep: currentStep, class: '_102_', style:()=>{/*css
		._102_ {
			position: relative;
			width: 100%;
			font-size: 14px;
			display: none;
		}
		._102_.active[currentTutorial] {
			display: flex;
		}
		
		._102_ > .controls {
			position: absolute;
			bottom: 6px;
			left: 0px;
			width: 100%;
			display: flex;
			justify-content: center;
		}
		._102_ > .controls.big {
			top: 100%;
			flex-wrap: wrap;
			margin-top: -40px;
		}
		._102_ > .controls > button {
			color: #888;
			border: 2px solid #888;
			background-image: url(/XAOC/images/clear-black-back.png);
			padding: 10px 20px;
		}
		._102_ > .controls.big > button {
			width: 60%;
		}
		._102_ > .controls > button.active {
			border-color: #d5ad51;
			color: #d5ad51;
		}
		._102_ > .controls > button.active:hover {
			color: white;
		}
	css*/}}, [
		
		_.f({name: 'tutorial.links', type: '*'}),
		
		((_, d)=>_.__.pre ? [
			_.f({name: 'tutorial.active', type: '*-'}),
			_.f({name: 'tutorial.activeStep', type: '*-'}),
		] : [
			_.f({name: 'tutorial.active', type: '*-', lst: 'tutorial_'+d.tutorial.active}),
		])(_, d),
	
		['img', {class: 'guru _103_', style:()=>{/*css
			._103_ {
				position: absolute;
				border-radius: 50%;
				border: 3px solid #d5ad51;
				right: 10px;
				top: 10px;
				width: 64px;
			}
			body.isMobileSmall ._103_ {
				right: 10px;
				top: 10px;
				width: 64px;
			}
		css*/}}],
		['div', {class: 'content _104_', style:()=>{/*css
			._104_ {
				width: 100%;
				margin: 30px;
				min-height: 100px;
				border: 2px solid #d5ad51;
				background-image: url(/XAOC/images/clear-black-back.png);
				padding: 20px;
				padding-right: 60px;
				white-space: pre-wrap;
				color: #d5ad51;
				overflow: hidden;
				display: flex;
			}
			body.isMobile ._104_ {
				min-height: 0px;
			}
			#tutorial.has-controls ._104_ {
				padding-bottom: 30px;
			}
			body.isMobileSmall ._104_ {
				font-size: 12px;
				padding-right: 40px;
			}
			._104_ > .typed-cursor {
				display: none!important;
			}
			._104_ > .text {
				width: 100%;
			}
			._104_ > .img {
				width: 60px;
				background-size: contain;
				flex-shrink: 0;
				background-repeat: no-repeat;
				background-position: center;
				margin-right: 20px;
				display: none;				
			}
			body.isMobileSmall ._104_ > .img {
				width: 40px;
			}
			._104_ > .img.active {
				display: block;
			}
		css*/}}, [
			['div', {class: 'img'}],
			['div', {class: 'text'}],
		]],
		
		_.if(currentTutorial == 'vote', ()=>[
			_.c({name: 'vote_tutorial', add: false, process: {
				id: (__, code, callback)=>{
					__.fields[code].col = 'vote';
					if(__.data[__.fields[code].parent].__vote_tutorial == undefined){
						ROUTER.route(__, {action: 'add_tutorial_vote'}, (vote)=>{
							__.queryIds[code] = [];
							if(vote._id) __.queryIds[code].push(vote._id);
							callback();
						}, true);
					}else{
						__.queryIds[code] = [ __.data[__.fields[code].parent].__vote_tutorial.l.pop() ];
						callback();
					}
				},
				tpl: (_, d)=>{ return [
					['div', {id: 'tutorial_vote'}, [
						['div', {class: 'adrs'}, [
							_.c({name: 'adrs', add: false, process: {
								tpl: (_, d)=>{ return [
									['div', {}, [
										_.f({name: 'state', type: '*'}),
										_.f({name: 'city', type: '*'}),
										_.f({name: 'osm_lonlat', type: '*'}),
									]],
								]},
							}}),
						]],
					]],
				]},
			}}),
		]),
	]],
	
]}

exports.process['.__vote_tutorial']['loaded'] = true
exports.process['.__vote_tutorial']['id'] = (__, code, callback)=>{
					__.fields[code].col = 'vote';
					if(__.data[__.fields[code].parent].__vote_tutorial == undefined){
						ROUTER.route(__, {action: 'add_tutorial_vote'}, (vote)=>{
							__.queryIds[code] = [];
							if(vote._id) __.queryIds[code].push(vote._id);
							callback();
						}, true);
					}else{
						__.queryIds[code] = [ __.data[__.fields[code].parent].__vote_tutorial.l.pop() ];
						callback();
					}
				}
exports.process['.__vote_tutorial']['tpl'] = (_, d)=>{ return [
					['div', {id: 'tutorial_vote'}, [
						['div', {class: 'adrs'}, [
							_.c({name: 'adrs', add: false, process: {
								tpl: (_, d)=>{ return [
									['div', {}, [
										_.f({name: 'state', type: '*'}),
										_.f({name: 'city', type: '*'}),
										_.f({name: 'osm_lonlat', type: '*'}),
									]],
								]},
							}}),
						]],
					]],
				]}

exports.process['.__vote_tutorial__adrs']['loaded'] = true
exports.process['.__vote_tutorial__adrs']['tpl'] = (_, d)=>{ return [
									['div', {}, [
										_.f({name: 'state', type: '*'}),
										_.f({name: 'city', type: '*'}),
										_.f({name: 'osm_lonlat', type: '*'}),
									]],
								]}

