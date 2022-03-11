exports.tpl = (_, d)=>{ return [

	['div', {id: 'guiProfile', class: '*css*', style:()=>{/*css
		.*css* {
			z-index: 2;
			position: fixed;
			top: 20px;
			right: 0px;
			width: auto;
		}
		body.isMobile .*css* {
			top: 0px;
		}
		.*css* > a {
			text-decoration: none;
		}
	css*/}}, [
		['a', {query: '{"form":"formProfile", "container": "subFormMain"}'},[
			_.html('guiProfile', _, d),
		]],
	]],
	
	['div', {id: 'guiRates', class: '*css*', style:()=>{/*css
		.*css* {
			z-index: 2;
			position: fixed;
			top: 80px;
			left: 0px;
			width: 260px;
		}
		.*css* > label {
			position: absolute;
			top: 0px;
			left: 0px;
			border-left: 0px;			
			padding: 0px;
			padding-left: 8px;
			text-align: left;
			line-height: 50px;
			background-image: url(/static/img/panel2a.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center left;
			cursor: pointer;
			width: 140px;
			font-size: 16px;
		}
		.*css* > label > a {
			text-decoration: none;
			color: white;
		}
		.*css* > label > a > div {
			width: 100%;
			height: 100%;
			background-image: url(/static/img/toprates-icon-white.png);
			background-size: 32px;
			background-repeat: no-repeat;
			background-position: left center;
			padding-left: 40px;
			padding-right: 16px;
			text-align: center;
		}
		
		body.isMobile .*css* {
			top: 20px;
		}		
		body.isMobile .*css* > label {
			top: -5px; 
			left: 70px;
			width: 50px;
			font-size: 0px;
			background-image: url(/static/img/button2.png);
		}
		body.isMobile .*css* > label > a > div {
			padding: 0px;
		}
	css*/}}, [
		['label', {class: 'mcb'}, [
			['a', {query: '{"form":"formTopRates", "container": "subFormMain"}'},[
				['div', {class: 'mct h', text: 'Рейтинги'}],
			]],
		]],
	]],
	
	['div', {id: 'guiConfig', class: '*css*', style:()=>{/*css
		.*css* {
			z-index: 2;
			position: fixed;
			top: 20px;
			left: 0px;
			width: 260px;
		}
		.*css* > label {
			position: absolute;
			top: 0px;
			left: 0px;
			border-left: 0px;			
			padding: 0px;
			padding-left: 8px;
			text-align: left;
			line-height: 50px;
			background-image: url(/static/img/panel2a.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center left;
			cursor: pointer;
			width: 140px;
			font-size: 16px;
		}
		.*css* > label > a {
			text-decoration: none;
			color: white;
		}
		.*css* > label > a > div {
			width: 100%;
			height: 100%;
			background-image: url(/static/img/config-icon-white.png);
			background-size: 32px;
			background-repeat: no-repeat;
			background-position: left center;
			padding-left: 40px;
			padding-right: 16px;
			text-align: center;
		}
		
		body.isMobile .*css* > label {
			top: -5px; 
			left: 10px;
			width: 50px;
			font-size: 0px;
			background-image: url(/static/img/button2.png);
		}
		body.isMobile .*css* > label > a > div {
			padding: 0px;
		}
	css*/}}, [
		['label', {class: 'mcb'}, [
			['a', {query: '{"form":"formConfig", "container": "subFormMain"}'},[
				['div', {class: 'mct h', text: 'Настройки'}],
			]],
		]],
	]],
	
	['div', {id: 'guiStats', class: '*css*', style:()=>{/*css
		.*css* {
			z-index: 2;
			position: fixed;
			bottom: 0px;
			right: 0px;
			min-width: 150px;
			width: 150px;
			height: 50px;
		}
		.*css*.active {
			height: 480px;
			max-height: 100%;
			width: 300px;
		}
		.*css*:not(.active) > .tutorial-link {
			top: -40px;
		}
		body.isMobile .*css* {
			bottom: 80px;
		}
		body.isMobile .*css*:not(.active) {
			width: 50px;
			min-width: 50px;
			height: 50px;
		}
		body.isMobile .*css*.active {
			width: 100%;
		}
		body.isMobile .*css* > label {
			padding: 0px;
			font-size: 0px;
			background-image: url(/static/img/button2.png);
		}
		body.isMobile .*css*.active > label {
			background-image: url(/static/img/button1.png);
		}
		body.isMobile .*css* > label > a > div {
			padding: 0px;
		}
	css*/}}, [
		_.html('guiStats', _, d),
	]],
	
	['div', {id: 'guiNews', class: '*css*', style:()=>{/*css
		.*css* {
			position: fixed;
			top: 0px;
			font-size: 32px;
			color: #888;
			z-index: 2;
			width: 600px;
			left: calc(50% - 300px);
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
		}
		body.isMobile .*css* {
			width: 100%;
			left: 0px;
			top: 70px;
			z-index: 1;
		}
	css*/}}, [
		_.html('guiNews', _, d),
	]],
	
	['div', {id: 'guiEvents', class: '*css*', style:()=>{/*css
		.*css* {
			position: fixed;
			max-height: 120px;
			padding-bottom: 10px;
			bottom: 10px;
			left: calc(50% - 150px);
			width: 300px;
			font-size: 32px;
			color: #888;
			overflow: hidden;
			z-index: 4;
		}
		body.lowHeight .*css* {
			z-index: 1;
			//display: none;
		}
		.*css* > .tutorial-link {
			top: 20px;
		}
	css*/}}, [
		_.html('guiEvents', _, d),
	]],
	
	['div', {id: 'guiPoll', class: '*css*', style:()=>{/*css
		.*css* {
			z-index: 2;
			position: fixed;
			bottom: 0px;
			left: 0px;
			min-width: 150px;
			width: 150px;
			height: 50px;
		}
		.*css*.active {
			height: 480px;
			max-height: 100%;
			width: 300px;
		}
		.*css*:not(.active) > .tutorial-link {
			left: 0px;
			top: -40px;
		}
		
		body.isMobile .*css* {
			bottom: 80px;
		}
		body.isMobile .*css*:not(.active) {
			width: 50px;
			min-width: 50px;
			height: 50px;
		}
		body.isMobile .*css*.active {
			width: 100%;
		}
		body.isMobile .*css* > label {
			padding: 0px;
			font-size: 0px;
			background-image: url(/static/img/button2.png);
		}
		body.isMobile .*css*.active > label {
			background-image: url(/static/img/button1.png);
		}
		body.isMobile .*css* > label > a > div {
			padding: 0px;
		}
	css*/}}, [
		_.html('guiPoll', _, d),
	]],
	
]}

exports.script = ()=>{

}

exports.style = ()=>{/*

*/}