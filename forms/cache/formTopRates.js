exports.fields = {".":{"_id":1,"__formTopRates.l":1,"nextTopUpdate":1,"close":1},".__user":{"title":1,"val":1}}

exports.lst = {"addobj":"2021-02-13T09:48:31.835Z"}

exports.process = {}
exports.html = {}
exports.process['.'] = {}
exports.process['.__user'] = {}

exports.process['.']['loaded'] = true
exports.process['.']['id'] = (__, code, callback)=>{
	__.fields[code].col = '__game';
	__.queryIds[code] = [__.user.config.game]; 
	
	__.global.top = 'exp';
	if(__.user.query.filter && __.user.query.filter.top) __.global.top = __.user.query.filter.top;
	
	__.global.table = LST.toprates.lst[__.global.top].table;
	__.global.title = LST.toprates.lst[__.global.top].l;

	callback();
}
exports.process['.']['tpl'] = (_, d)=>{ return [
	
	['div', {id: 'formTopRates', class: 'f-slb _1_', style:()=>{/*css
		._1_ .tutorial-active {
			-webkit-animation: tutorial_active 1s infinite alternate;
			-moz-animation: tutorial_active 1s infinite alternate;
			-ms-animation: tutorial_active 1s infinite alternate;
			-o-animation: tutorial_active 1s infinite alternate;
			animation: tutorial_active 1s infinite alternate;
		}
	css*/}}, [
	
		['div', {class: 'header _95_', style:()=>{/*css
			._95_ {
				position: absolute;
				top: 0px;
				left: 0px;
				width: 100%;
				height: 70px;
				display: flex;
				align-items: center;
				font-size: 20px;
				background-image: url(/static/img/panel6.png);
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
				padding: 0px;
				color: white;
			}
			._95_ > .btn-close {
				top: auto;
				bottom: 0px;
			}
		css*/}}, [
		
			['div', {class: '_96_', style:()=>{/*css
				._96_ {
					width: 100%;
				}
				._96_ > .title {
					width: 140px;
					height: 70px;
					margin-left: auto;
					margin-right: auto;
					text-align: center;
					color: #444;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 14px;
					line-height: 12px;
					padding-bottom: 14px
				}
				._96_ > .time {
					width: 100%;
					font-size: 10px;
					margin-top: -10px;
					text-align: center;
				}
			css*/}}, [
				['div', {class: 'title', text: _.__.global.title}],
				['div', {class: 'time'}, [
					_.f({name: 'nextTopUpdate', type: 'text-', front: {
						textMask: "f_f503540cec798198ca2be9de455fd681"
					}}),
				]],
			]],

			['div', {class: 'btn-close'}, [
				_.f({name: 'close', type: 'action', front: {
					onClick: "f_ab5a4fb978dbd53490df7ec8633a824d",
				}})
			]],
		]],

		['div', {class: 'toprates _97_', style:()=>{/*css
			._97_ {
				height: 100%;
				padding: 80px;
				display: flex;
				color: #018da8;
				font-size: 13px;
			}
			body.isMobile ._97_ {
				padding: 90px 50px 90px 50px;
				font-size: 11px;
			}		
		css*/}}, [
		
			['div', {class: 'toprates-nav _98_', style:()=>{/*css
				._98_ {
					width: 80px;
					flex-shrink: 0;
				}
				._98_ > .nav-link {
					position: relative;
					width: 100%;
				}
				._98_ > .nav-link > .icon {
					background-position: center;
					background-repeat: no-repeat;
					cursor: pointer;
					width: 60px;
					height: 56px;
					background-size: 24px;
				}
				._98_ > .nav-link.active > .icon {
					cursor: default;
				}
				._98_ > .nav-link:before {
					content: '';
					position: absolute;
					top: 0px;
					left: 0px;
					width: 60px;
					height: 60px;
					background-size: 50px;
					background-position: center;
					background-repeat: no-repeat;
					background-image: url(/static/img/button2.png);
					z-index: -1;
				}
				._98_ > .nav-link.active:before {
					background-image: url(/static/img/button4.png);
				}
			css*/}}, [
				((_, d)=>{
					var result = [];
						LST.toprates.list.lst.forEach((l)=>{
							result.push( ['a', {query: '{"form":"formTopRates","container":"subFormMain","filter":{"top":"'+l.v+'"}}', class: 'nav-link '+(_.__.global.top == l.v?'active':'')}, [
								['div', {class: 'icon', style: 'background-image: url(/static/img/'+l.v+'-top-icon.png)'}],
							]]);
						});
					return result;
				})(_, d),
			]],
			
			['div', {class: 'toprates-body _99_', style:()=>{/*css
				._99_ {
					display: flex;
					height: 100%;
					width: 100%;
					overflow: hidden;
					border: none;
					border-radius: 5px;
					background-color: rgba(213, 173, 81, 1);
					color: white;
				}
			css*/}}, [
			
				['div', {class: 'scroller _100_', style:()=>{/*css
				css*/}}, [
					['div', {class: 'handle'}]
				]],
				
				['div', {onscroll: 'window.scrollMe(this)', class: 'scroll-content _101_', style:()=>{/*css
					._101_ {
						display: flex;
						flex-wrap: wrap;
						counter-reset: ranking;
						max-height: 260px;
						padding: 10px;
					}
					body.isMobile ._101_ {
						max-height: 320px;
					}
					._101_ > .item {
						width: 100%;
						display: flex;
						justify-content: space-around;
						padding-right: 10px;
					}
					._101_ > .item.iam {
						color: #412c17;
					}
					._101_ > .item:before {
						counter-increment: ranking;
						content: counter(ranking);
					}
					._101_ > .item.iam:not(.iamtop):before {
						content: '-';
					}
					._101_ > .item > .title {
						width: 100%;
						padding: 0px 20px;
					}
					._101_ > .item > .val {
						text-align: right;
					}
				css*/}}, [
					_.c({name: 'user', process: {
						id: (__, code, callback)=>{
							var sql = "SELECT id, _id, val FROM ?? LIMIT 0, 20";
							DB.select(__, code, ()=>{
								var iamtop = false;
								//__.queryIds[code] = __.queryIds[code].concat(__.queryIds[code]).concat(__.queryIds[code]).concat(__.queryIds[code]).concat(__.queryIds[code]);
								__.queryIds[code].forEach((i)=>{if(i._id == __.user.key){
									i.iam = true;
									i.iamtop = true;
									iamtop = true;
								}});
								if(iamtop){
									callback();
								}else{
									LST.toprates.lst[__.global.top].iam(__, (val)=>{
										__.queryIds[code].push({_id: __.user.key, val: val, iam: true});
										callback();
									});
								}
							}, sql, [__.global.table]);
						},
						parentDataNotRequired: true,
						tpl: function(_, d){ return [
							['div', {class: 'item '+(d.iam?'iam'+(d.iamtop?' iamtop':''):'')}, [
								['div', {class: 'title'}, [
									_.f({name: 'title', type: 'text-', value: 'Гражданин'}),
								]],
								['div', {class: 'val'}, [
									_.f({name: 'val', type: 'text-', value: '-'}),
								]],
							]],
						]},
					}}),
				
				]],
			]],
		
		]],
	]],
]}

exports.process['.__user']['loaded'] = true
exports.process['.__user']['id'] = (__, code, callback)=>{
							var sql = "SELECT id, _id, val FROM ?? LIMIT 0, 20";
							DB.select(__, code, ()=>{
								var iamtop = false;
								//__.queryIds[code] = __.queryIds[code].concat(__.queryIds[code]).concat(__.queryIds[code]).concat(__.queryIds[code]).concat(__.queryIds[code]);
								__.queryIds[code].forEach((i)=>{if(i._id == __.user.key){
									i.iam = true;
									i.iamtop = true;
									iamtop = true;
								}});
								if(iamtop){
									callback();
								}else{
									LST.toprates.lst[__.global.top].iam(__, (val)=>{
										__.queryIds[code].push({_id: __.user.key, val: val, iam: true});
										callback();
									});
								}
							}, sql, [__.global.table]);
						}
exports.process['.__user']['parentDataNotRequired'] = true
exports.process['.__user']['tpl'] = function(_, d){ return [
							['div', {class: 'item '+(d.iam?'iam'+(d.iamtop?' iamtop':''):'')}, [
								['div', {class: 'title'}, [
									_.f({name: 'title', type: 'text-', value: 'Гражданин'}),
								]],
								['div', {class: 'val'}, [
									_.f({name: 'val', type: 'text-', value: '-'}),
								]],
							]],
						]}

