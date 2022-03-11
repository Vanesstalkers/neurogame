exports.id = (__, code, callback)=>{
	__.fields[code].col = 'user';
	__.queryIds[code] = [__.user.key];
	callback();
}
exports.tpl = (_, d)=>{ return [
	
	['div', {id: 'formProfile', class: 'f-slb f-24 *css*', style:()=>{/*css
		.*css* .tutorial-active {
			-webkit-animation: tutorial_active 1s infinite alternate;
			-moz-animation: tutorial_active 1s infinite alternate;
			-ms-animation: tutorial_active 1s infinite alternate;
			-o-animation: tutorial_active 1s infinite alternate;
			animation: tutorial_active 1s infinite alternate;
		}
	css*/}}, [
	
		['div', {class: 'header *css*', style:()=>{/*css
			.*css* {
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
					onClick: function (){
						var $subFormMain = $('#subFormMain');
						myEmpty( $subFormMain );
						$subFormMain.hide();
						window.location.hash = '{"form":"formMain"}';
					},
				}})
			]],
			
			['div', {class: 'controls *css*', style:()=>{/*css
				width: 100%;
				color: #018da8;
				display: flex;
			css*/}}, [
				
				['div', {class: '*css*', style:()=>{/*css
					.*css* {
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
					body.isMobile .*css* {
						left: 20px;
						top: 40px;
					}
					.*css* > .el {
						width: 100%;
						height: 100%;
					}
					.*css* > .el > input {
						display: none;
					}
					.*css* > .el > input[type="checkbox"] + label {
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
					.*css* > .el > input[type="checkbox"]:hover + label {
						opacity: 0.5;
					}
					.*css* > .el > input[type="checkbox"]:checked + label {
						background-image: url(/static/img/female-icon-b.png);
					}
				css*/}}, [
					_.f({name:'female', type:'check', front: {
						onChange: function (_){
							if(_.prop('checked')){
								$('#formProfile .title-list').addClass('female');
							}else{
								$('#formProfile .title-list').removeClass('female');
							}
						},
					}}),
				]],
				
				['div', {class: '*css*', style:()=>{/*css
					.*css* {
						padding: 0px;
						position: absolute;
						width: 100%;
						color: white;
						font-size: 14px;
					}
					.*css* > .currentTitle {
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
					body.isMobile .*css* > .currentTitle {
						width: 160px;
					}
				css*/}}, [
					['div', {class: 'currentTitle'}, [
						_.f({name: 'title', type: 'text-'}),
					]],
				]],

				['div', {class: '*css*', style:()=>{/*css
					.*css* {
						position: absolute;
						width: 60px;
						right: 120px;
						top: 25px;
						z-index: 1;
					}
					body.isMobile .*css* {
						right: 20px;
						top: 40px;
					}
					.*css* > button {
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
					.*css* > button:before {
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
					.*css* > button:hover:before {
						opacity: 0.5;
					}
				css*/}}, [
					['button', {text: 'Получить\xa0новый\xa0титул'}, [
						_.f({name: 'generate_title', type: 'action', front: {
							onAction: function (e, data){
								reloadForm(e);
								if(data.title) $('#guiProfile .title').text(data.title);
								//if(data.title) $('#formProfile .currentTitle').text(data.title);
							},
						}}),
					]],
				]],
			]],
		]],

		['div', {class: 'profile-list *css*', style:()=>{/*css
			.*css* {
				height: 100%;
				padding: 90px 60px 10px 60px;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				color: #018da8;
			}
			body.isMobile .*css* {
				position: relative;
				padding: 75px 50px 0px 50px;
				height: 100%;
			}
			.*css*:after {
				content: '';
				width: 100%;
				height: 100%;
			}
			.*css* > .profile-item {
				height: 80px;
				display: flex;
				border: 2px solid #018da8;
				margin: 4px 0px;
				position: relative;
			}
			.*css* > .profile-item:not(.position) {
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
			.*css* > .profile-item > .icon {
				background-position: center;
				background-repeat: no-repeat;
				flex-shrink: 0;
				width: 40px;
				height: 40px;
				background-size: 30px;
				margin-left: 6px;
			}
			.*css* > .profile-item > label {
				width: 100%;
				font-size: 13px;
				line-height: 13px;
				padding-left: 10px;
			}		
			body.isMobile .*css* > .profile-item > label {
				color: #412c17;
			}
			.*css* > .profile-item > span {
				width: 80px;
				margin-left: 10px;
				text-align: center;
				font-size: 16px;
				line-height: 40px;
			}
		css*/}}, [
			
			['div', {class: 'profile-item position *css*', style:()=>{/*css
				.*css* {
					width: 100%;
					height: calc(100% - 90px)!important;
					flex-shrink: 0;
					position: relative;
					border: none!important;
				}
				body.isMobile .*css* {
					height: auto!important;
				}
			css*/}}, [

				['div', {class: '*css*', style:()=>{/*css
					.*css* {
						height: 100%;
						width: 100%;
						display: flex;
					}
					body.isMobile .*css* {
						flex-wrap: wrap;
						height: auto;
					}
					.*css* > .list {
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
					body.isMobile .*css* > .list {
						width: 100%;
					}
					.*css* > .list:after {
						content: '';
						height: 100%;
						width: 100%;
					}
					body.isMobile .*css* > .list:after {
						display: none;
					}
					.*css* > .list > label {
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
					.*css* > .list > .item {
						font-size: 12px;
						padding: 0px 4px;
						margin: 2px 4px;
						border: none;
						background-color: transparent;
						color: white;
					}
				css*/}}, [
				
					['div', {class: (d.female?'female':'')+' list title-list *css*', style:()=>{/*css
						.*css* {
							width: 180px;
						}
						.*css* > .item.female, .*css*.female > .item:not(.female) {
							display: none;
						}
						.*css*.female > .item.female {
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
				
					['div', {class: 'list *css*', style:()=>{/*css
						.*css* {
							width: 100%;
							justify-content: flex-end;
							overflow: hidden;
						}
						.*css* > label {
							text-align: right;
							width: 100%;
						}
						.*css* > .item > span {
							border-radius: 50%;
							background-color: white;
							color: #d5ad51;
							margin-left: 4px;
							padding: 0px 6px;
						}
						.*css* > .item > span.own {
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

			['div', {class: 'profile-item exp *css*', style:()=>{/*css
				.*css* > .icon {
					background-image: url(/static/img/exp-icon.png);
				}
				body.isMobile .*css* {
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
			['div', {class: 'profile-item power *css*', style:()=>{/*css
				.*css* > .icon {
					background-image: url(/static/img/power-icon.png);
				}
				body.isMobile .*css* {
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
			['div', {class: 'profile-item money *css*', style:()=>{/*css
				.*css* > .icon {
					background-image: url(/static/img/money-icon.png);
				}
				body.isMobile .*css* {
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

exports.func = ()=>{

}

exports.script = ()=>{
	if($('#subFormMain > div').length) $('#subFormMain').show();
}

exports.style = ()=>{/*

*/}