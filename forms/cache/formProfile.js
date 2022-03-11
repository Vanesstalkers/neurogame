exports.fields = {".":{"_id":1,"__formProfile.l":1,"close":1,"female":1,"title":1,"generate_title":1,"alias":1,"exp":1,"power":1,"money":1}}

exports.lst = {"addobj":"2021-02-13T09:48:31.828Z"}

exports.process = {}
exports.html = {}
exports.process['.'] = {}

exports.process['.']['loaded'] = true
exports.process['.']['id'] = (__, code, callback)=>{
	__.fields[code].col = 'user';
	__.queryIds[code] = [__.user.key];
	callback();
}
exports.process['.']['tpl'] = (_, d)=>{ return [
	
	['div', {id: 'formProfile', class: 'f-slb f-24 _1_', style:()=>{/*css
		._1_ .tutorial-active {
			-webkit-animation: tutorial_active 1s infinite alternate;
			-moz-animation: tutorial_active 1s infinite alternate;
			-ms-animation: tutorial_active 1s infinite alternate;
			-o-animation: tutorial_active 1s infinite alternate;
			animation: tutorial_active 1s infinite alternate;
		}
	css*/}}, [
	
		['div', {class: 'header _64_', style:()=>{/*css
			._64_ {
				position: absolute;
				top: 0px;
				left: 0px;
				width: 100%;
				height: 90px;
				display: flex;
				color: #018da8;
				background-image: url(/static/img/panel6.png);
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
			}
		css*/}}, [

			['div', {class: 'btn-close'}, [
				_.f({name: 'close', type: 'action', front: {
					onClick: "f_ab5a4fb978dbd53490df7ec8633a824d",
				}})
			]],
			
			['div', {class: 'controls _3_', style:()=>{/*css
				width: 100%;
				color: #018da8;
				display: flex;
			css*/}}, [
				
				['div', {class: '_65_', style:()=>{/*css
					._65_ {
						background-position: center;
						flex-shrink: 0;					
						background-image: url(/static/img/button1.png);
						width: 60px;
						height: 60px;
						background-size: 60px!important;
						position: absolute;
						left: 120px;
						top: 25px;
						z-index: 1;
					}
					body.isMobile ._65_ {
						left: 20px;
						top: 40px;
					}
					._65_ > .el {
						width: 100%;
						height: 100%;
					}
					._65_ > .el > input {
						display: none;
					}
					._65_ > .el > input[type="checkbox"] + label {
						position: absolute;						
						left: 0px;
						top: -2px;
						width: 100%;
						height: 100%;
						background-color: transparent;
						background-position: center;
						background-repeat: no-repeat;
						background-size: 34px;
						background-image: url(/static/img/male-icon-b.png);
						cursor: pointer;
					}
					._65_ > .el > input[type="checkbox"]:hover + label {
						opacity: 0.5;
					}
					._65_ > .el > input[type="checkbox"]:checked + label {
						background-image: url(/static/img/female-icon-b.png);
					}
				css*/}}, [
					_.f({name:'female', type:'check', front: {
						onChange: "f_240b14907379546d011b51f808c27f35",
					}}),
				]],
				
				['div', {class: '_66_', style:()=>{/*css
					._66_ {
						padding: 0px;
						position: absolute;
						width: 100%;
						color: white;
						font-size: 14px;
					}
					._66_ > .currentTitle {
						width: 200px;
						height: 70px;
						margin-left: auto;
						margin-right: auto;
						text-align: center;
						color: #444;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					body.isMobile ._66_ > .currentTitle {
						width: 160px;
					}
				css*/}}, [
					['div', {class: 'currentTitle'}, [
						_.f({name: 'title', type: 'text-'}),
					]],
				]],

				['div', {class: '_67_', style:()=>{/*css
					._67_ {
						position: absolute;
						width: 60px;
						right: 120px;
						top: 25px;
						z-index: 1;
					}
					body.isMobile ._67_ {
						right: 20px;
						top: 40px;
					}
					._67_ > button {
						border: none;
						background-image: url(/static/img/button1.png);
						width: 60px;
						height: 60px;
						background-size: 60px!important;
						font-size: 0px;
						padding: 0px;
						position: relative;
						background-color: transparent;
					}
					._67_ > button:before {
						content: '';
						background-repeat: no-repeat;
						background-image: url(/static/img/random-icon-b.png);
						background-size: 34px;
						background-position: center;
						width: 100%;
						height: 100%;
						position: absolute;
						top: -4px;
						left: 0px;
					}
					._67_ > button:hover:before {
						opacity: 0.5;
					}
				css*/}}, [
					['button', {text: 'Получить\xa0новый\xa0титул'}, [
						_.f({name: 'generate_title', type: 'action', front: {
							onAction: "f_927257ccd5e8a17285f7997f6524d09a",
						}}),
					]],
				]],
			]],
		]],

		['div', {class: 'profile-list _68_', style:()=>{/*css
			._68_ {
				height: 100%;
				padding: 90px 60px 10px 60px;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				color: #018da8;
			}
			body.isMobile ._68_ {
				position: relative;
				padding: 75px 50px 0px 50px;
				height: 100%;
			}
			._68_:after {
				content: '';
				width: 100%;
				height: 100%;
			}
			._68_ > .profile-item {
				height: 80px;
				display: flex;
				border: 2px solid #018da8;
				margin: 4px 0px;
				position: relative;
			}
			._68_ > .profile-item:not(.position) {
				background-image: url(/static/img/panel2b.png);
				background-size: contain;
				background-repeat: no-repeat;
				height: 64px;
				background-position: center bottom;
				margin: 0px;
				color: white;
				border: none;
				width: 140px;
				font-size: 14px;
				flex-wrap: wrap;
			}
			._68_ > .profile-item > .icon {
				background-position: center;
				background-repeat: no-repeat;
				flex-shrink: 0;
				width: 40px;
				height: 40px;
				background-size: 30px;
				margin-left: 6px;
			}
			._68_ > .profile-item > label {
				width: 100%;
				font-size: 13px;
				line-height: 13px;
				padding-left: 10px;
			}		
			body.isMobile ._68_ > .profile-item > label {
				color: #412c17;
			}
			._68_ > .profile-item > span {
				width: 80px;
				margin-left: 10px;
				text-align: center;
				font-size: 16px;
				line-height: 40px;
			}
		css*/}}, [
			
			['div', {class: 'profile-item position _69_', style:()=>{/*css
				._69_ {
					width: 100%;
					height: calc(100% - 90px)!important;
					flex-shrink: 0;
					position: relative;
					border: none!important;
				}
				body.isMobile ._69_ {
					height: auto!important;
				}
			css*/}}, [

				['div', {class: '_70_', style:()=>{/*css
					._70_ {
						height: 100%;
						width: 100%;
						display: flex;
					}
					body.isMobile ._70_ {
						flex-wrap: wrap;
						height: auto;
					}
					._70_ > .list {
						display: flex;
						flex-wrap: wrap;
						font-size: 16px;
						position: relative;						
						margin: 5px;
						background-color: #d5ad51;
						border-radius: 5px;
						padding-top: 40px;
						padding-bottom: 10px;
						max-height: 240px;
					}
					body.isMobile ._70_ > .list {
						width: 100%;
					}
					._70_ > .list:after {
						content: '';
						height: 100%;
						width: 100%;
					}
					body.isMobile ._70_ > .list:after {
						display: none;
					}
					._70_ > .list > label {
						position: absolute;
						left: 0px;
						width: 100%;
						padding: 4px;						
						background-image: url(/static/img/panel5.png);
						background-size: contain;
						background-repeat: no-repeat;
						background-position: center;
						text-align: center;
						color: white;
						top: 4px;
					}
					._70_ > .list > .item {
						font-size: 12px;
						padding: 0px 4px;
						margin: 2px 4px;
						border: none;
						background-color: transparent;
						color: white;
					}
				css*/}}, [
				
					['div', {class: (d.female?'female':'')+' list title-list _71_', style:()=>{/*css
						._71_ {
							width: 180px;
						}
						._71_ > .item.female, ._71_.female > .item:not(.female) {
							display: none;
						}
						._71_.female > .item.female {
							display: block;
						}
					css*/}}, [
						['label', {text: CONFIG.labels.titles}],
						((_, d)=>{
							var result = [];
								LST.titles.list.lst.forEach((l)=>{
									result.push( ['div', {class: 'item '+(l.female?'female':''), text: l.l}] );
								});
							return result;
						})(_, d),
					]],
				
					['div', {class: 'list _72_', style:()=>{/*css
						._72_ {
							width: 100%;
							justify-content: flex-end;
							overflow: hidden;
						}
						._72_ > label {
							text-align: right;
							width: 100%;
						}
						._72_ > .item > span {
							border-radius: 50%;
							background-color: white;
							color: #d5ad51;
							margin-left: 4px;
							padding: 0px 6px;
						}
						._72_ > .item > span.own {
							padding: 0px 8px;
							background-size: contain;
							background-repeat: no-repeat;
							background-color: transparent;
							background-image: url(/static/img/button66.png);
						}
					css*/}}, [
						['label', {text: CONFIG.labels.alias}],
						_.f({name: 'alias', type: '*-'}),
						((_, d)=>{
							var result = [], alias = d.alias ? Object.keys(d.alias) : [];
							if(alias.length){
								alias.forEach((t)=>{
									var item = ['div', {class: 'item', text: t}, []];
									item[2].push(['span', d.alias[t] > 0 ? {text: d.alias[t]} : {class: 'own'}]);
									result.push( item );
								});
							}
							return result;
						})(_, d),
					]],
				]],
			]],

			['div', {class: 'profile-item exp _73_', style:()=>{/*css
				._73_ > .icon {
					background-image: url(/static/img/exp-icon.png);
				}
				body.isMobile ._73_ {
					position: absolute;
					bottom: 10%;
					left: 0px;
				}
			css*/}}, [
				['label', {text: CONFIG.labels.exp}],
				['span', {},[
					_.f({name: 'exp', type: 'text-', value: 0}),
				]],
				['div', {class: 'icon'}],
			]],
			['div', {class: 'profile-item power _74_', style:()=>{/*css
				._74_ > .icon {
					background-image: url(/static/img/power-icon.png);
				}
				body.isMobile ._74_ {
					position: absolute;
					bottom: 10%;
					right: 0px;
				}
			css*/}}, [
				['label', {text: CONFIG.labels.power}],
				['span', {},[
					_.f({name: 'power', type: 'text-', value: 0}),
				]],
				['div', {class: 'icon'}],
			]],
			['div', {class: 'profile-item money _75_', style:()=>{/*css
				._75_ > .icon {
					background-image: url(/static/img/money-icon.png);
				}
				body.isMobile ._75_ {
					order: -3;
					margin: auto!important;
				}
			css*/}}, [
				['label', {text: CONFIG.labels.money}],
				['span', {},[
					_.f({name: 'money', type: 'text-', value: 0}),
				]],
				['div', {class: 'icon'}],
			]],
		]],		
		
	]],
]}

