exports.tpl = (_, d)=>{ return [

	['div', {class: 'mcb f-20 profile-content *css*', style:()=>{/*css
		.*css* {
			border-right: 0px;
			text-align: right;
			white-space: pre-wrap;
			font-size: 12px;			
			padding: 0px;
			text-align: right;
			background-image: url(/static/img/panel2b.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center right;
			top: auto;
			bottom: 0px;
			height: 80px;
			width: 180px;
		}
		.*css* > .title {
			text-align: center;
			color: white;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20px 60px 20px 15px;
			font-size: 14px;
			line-height: 12px;
		}
		.*css* > .title > span {
			color: white;
		}
	css*/}}, [
		['div', {class: 'title h'}, [
			_.f({name:'title', type:'text', value:'Гражданин', front: {
				textMask: function (_, d){ return _.value.replace(' ', '\x0a') }
			}}),
		]],
	]],
]}

exports.script = ()=>{

}

exports.style = ()=>{/*

*/}