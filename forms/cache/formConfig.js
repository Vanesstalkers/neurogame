exports.fields = {".":{"_id":1,"__formConfig.l":1,"closeForm":1}}

exports.lst = {"addobj":"2021-02-13T09:48:31.808Z"}

exports.process = {}
exports.html = {}
exports.process['.'] = {}

exports.process['.']['loaded'] = true
exports.process['.']['id'] = (__, code, callback)=>{
	__.queryIds[code] = [true];
	callback();
}
exports.process['.']['tpl'] = (_, d)=>{ return [
	
	['div', {id: 'formConfig', class: 'f-slb f-24 _1_', style:()=>{/*css
		._1_ .tutorial-active {
			-webkit-animation: tutorial_active 1s infinite alternate;
			-moz-animation: tutorial_active 1s infinite alternate;
			-ms-animation: tutorial_active 1s infinite alternate;
			-o-animation: tutorial_active 1s infinite alternate;
			animation: tutorial_active 1s infinite alternate;
		}
	css*/}}, [
	
		['div', {class: 'header _2_', style:()=>{/*css
			._2_ {
				position: absolute;
				top: 0px;
				left: 0px;
				width: 100%;
				height: 90px;
				display: flex;
				color: #018da8;
			}
			body.isMobile ._2_ {
				height: 140px;
			}
		css*/}}, [

			['div', {class: 'btn-close'}, [
				_.f({name: 'closeForm', type: 'action', front: {
					onClick: "f_fd69a46f230ae0e727d283727d4d4145",
				}}),
			]],
			
			['div', {class: 'controls _3_', style:()=>{/*css
				width: 100%;
				color: #018da8;
				display: flex;
			css*/}}, [
				['label', {text: 'Платформа запущена в режиме Beta-тестирования.', class: '_4_', style:()=>{/*css
					._4_ {
						width: 50%;
						margin: auto;
						text-align: center;
						padding-top: 100px;
						font-size: 18px;
						color: #412c17;
					}
					._4_ > div {
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

		['div', {class: '_5_', style:()=>{/*css
			._5_ {
				height: 100%;
				padding: 90px 10px 10px 10px;
				display: flex;
				flex-wrap: wrap;
				color: #018da8;
			}
			body.isMobile ._5_ {
				padding: 140px 0px 0px 0px;
			}
			._5_:after {
				content: '';
				width: 100%;
				height: 100%;
			}
		css*/}}, [
		
			['div', {class: 'form-login main _6_', style:()=>{/*css
				._6_ {
					width: 100%;
				}
				._6_ > .field {
					display: flex;
					margin-bottom: 10px;
				}
				._6_ > .field > input {
					text-align: center;
					background: transparent;
					border: 2px solid #018da8;
				}
				._6_ > .field > label {
					width: 150px;
					margin-right: 20px;
					text-align: right;
					font-weight: normal;
				}
				._6_ > .field > button {
					background-color: #018da8;
					border: none;
					border-radius: 5px;
					padding: 5px 40px;
					margin-top: 10px;
					color: #333;
				}
				body.theme-fantasy ._6_ {
					color: #412c17;
					font-size: 12px;
				}
				body.theme-fantasy ._6_ > .field > input {
					border: 1px solid #412c17;
				}
				body.theme-fantasy ._6_ > .field > button {
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

