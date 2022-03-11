exports.id = (__, code, callback)=>{
	__.queryIds[code] = [true];
	callback();
}
exports.tpl = (_, d)=>{ return [
	
	['div', {id: 'formConfig', class: 'f-slb f-24 *css*', style:()=>{/*css
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
			}
			body.isMobile .*css* {
				height: 140px;
			}
		css*/}}, [

			['div', {class: 'btn-close'}, [
				_.f({name: 'closeForm', type: 'action', front: {
					onClick: function (e){
						var $subFormMain = $('#subFormMain');
						myEmpty( $subFormMain );
						$subFormMain.hide();
						window.location.hash = '{"form":"formMain"}';
					},
				}}),
			]],
			
			['div', {class: 'controls *css*', style:()=>{/*css
				width: 100%;
				color: #018da8;
				display: flex;
			css*/}}, [
				['label', {text: 'Платформа запущена в режиме Beta-тестирования.', class: '*css*', style:()=>{/*css
					.*css* {
						width: 50%;
						margin: auto;
						text-align: center;
						padding-top: 100px;
						font-size: 18px;
						color: #412c17;
					}
					.*css* > div {
						font-size: 14px;
						font-style: italic;
						padding-top: 40px;
					}
				css*/}}, [
					['div', {}, [
						['span', {text: 'Если Вы нашли ошибку, или у Вас есть замечания или предложений по работе платформы, то прошу писать мне на почту: '}],
						['a', {href: 'mailto:ivan.mironov@bk.ru', text: 'ivan.mironov@bk.ru'}],
						['span', {text: ' Спасибо!'}],
					]],
				]],
			]],
		]],

		['div', {class: '*css*', style:()=>{/*css
			.*css* {
				height: 100%;
				padding: 90px 10px 10px 10px;
				display: flex;
				flex-wrap: wrap;
				color: #018da8;
			}
			body.isMobile .*css* {
				padding: 140px 0px 0px 0px;
			}
			.*css*:after {
				content: '';
				width: 100%;
				height: 100%;
			}
		css*/}}, [
		
			['div', {class: 'form-login main *css*', style:()=>{/*css
				.*css* {
					width: 100%;
				}
				.*css* > .field {
					display: flex;
					margin-bottom: 10px;
				}
				.*css* > .field > input {
					text-align: center;
					background: transparent;
					border: 2px solid #018da8;
				}
				.*css* > .field > label {
					width: 150px;
					margin-right: 20px;
					text-align: right;
					font-weight: normal;
				}
				.*css* > .field > button {
					background-color: #018da8;
					border: none;
					border-radius: 5px;
					padding: 5px 40px;
					margin-top: 10px;
					color: #333;
				}
				body.theme-fantasy .*css* {
					color: #412c17;
					font-size: 12px;
				}
				body.theme-fantasy .*css* > .field > input {
					border: 1px solid #412c17;
				}
				body.theme-fantasy .*css* > .field > button {
					background-color: #412c17;
					color: #e8d5a2;
				}
			css*/}}, [
			
				/*
				_.if(_.__.user.auth && _.__.user.role != 'guest', [
					['div', {class: 'field'}, [
						['label', {text: ''}],
						['button', {text: 'Выйти из системы'}, [
							_.f({name: 'mainLogin', type: 'action', front: {
								onClick: function (e){ wsSend({action: 'logout'}) },
							}}),
						]],
					]],
				]),
				_.if(!(_.__.user.auth && _.__.user.role != 'guest'), [
					['div', {class: 'field'}, [
						['label', {text: 'Логин'}],
						['input', {class: 'login'}],
					]],
					['div', {class: 'field'}, [
						['label', {text: 'Пароль'}],
						['input', {class: 'pswd', type: 'password'}],
					]],
					['div', {class: 'field'}, [
						['label', {text: ''}],
						['button', {text: 'Вход в систему'}, [
							_.f({name: 'mainLogin', type: 'action', front: {
								onClick: function (e){
									var data = {
										login: $('.form-login.main .field > input.login').val(),
										pswd: $('.form-login.main .field > input.pswd').val(),
									};
									doLogin(data);
								},
							}}),
						]],
					]],
				]),
				*/
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