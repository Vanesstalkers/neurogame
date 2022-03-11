exports.id = (__, code, callback)=>{
	__.fields[code].col = 'user';
	__.queryIds[code] = [__.user.key];
	callback();
}
exports.tpl = (_, d)=>{ return [
	
	['div', {class: '*css*', style:()=>{/*css

	css*/}}, [

		['div', {class: '*css*', style:()=>{/*css
			.*css* {
				position: fixed;
				top: 0px;
				left: 0px;
				width: 100%;
				height: 100%;
				background-image: url(/XAOC/images/clear-black-back.png);
				z-index: 999;
				color: white;
				display: none;
			}
			body.isLandscape .*css* {
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
			}
		css*/}}, [
			['span', {text: 'Для продолжения работы необходимо повернуть экран вертикально'}],
		]],	
		
		['div', {class: '*css*', style:()=>{/*css
			position: fixed;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
			z-index: 0;
		css*/}}, [
			_.html('map', _, Object.assign(d, {mapFilter: {zoom: 7}})),
		]],

		['div', {class: '*css*', style:()=>{/*css
			.*css* > .notifyjs-wrapper {
				z-index: 100;
			}
		css*/}}, [
			_.html('gui', _, d),
		]],

		['div', {id: 'subFormMain', class: 'mcb *css*', style:()=>{/*css
			.*css* {
				display: none;
				z-index: 3;
				position: fixed;
				width: 600px;
				padding-bottom: 100px;
				bottom: 0px;
				left: calc(50% - 300px);
				font-size: 32px;
				border-bottom: none;
				height: 560px;
				max-height: 100%;
			}
			.*css* > div {
				background-image: url(/static/img/panel4.png);
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
				margin: auto;
				height: 100%;
				z-index: -1;
			}			
			.*css*.loading {
				display: block;
			}
			body.isMobile .*css* {
				width: 100%;
				height: 100%;
				max-height: 480px;
				top: auto;
				bottom: 80px;
				border-radius: 0px;
				left: 0px;
				padding: 6px;
			}
			body.isMobile.lowHeight .*css* {
				bottom: 0px;
			}
			body.isMobile .*css* > div {
				max-width: 360px;
				background-image: url(/static/img/panel3.png);
			}
			.*css*.tutorial-hide {
				display: none!important;
			}
		css*/}}, [
			_.form({name: _.__.user.query.subform ? _.__.user.query.subform.form : '__blank' })
		]],

		['div', {id: 'subFormTutorial'}, [
			_.form({name: 'formTutorial', history: false }),
		]],
	]],
	
]}

exports.func = ()=>{
	
	window.map = undefined;
	
}

exports.script = ()=>{

	window.afterAllLoaded.push(function(){  initMap() });

}

exports.style = ()=>{/*

*/}