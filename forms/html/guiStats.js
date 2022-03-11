exports.tpl = (_, d)=>{ return [
		
	['label', {class: 'mct stats-toggle *css*', style:()=>{/*css
		.*css* {
			position: absolute;
			right: 0px;
			width: 100%;
			z-index: 1;
			font-size: 20px;
			color: white;			
			padding: 0px;
			padding-right: 60px;
			text-align: right;
			line-height: 50px;
			background-image: url(/static/img/panel2b.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center right;
			top: auto;
			bottom: 20px;
		}
		.*css*:after {
			content: ' ';
			position: absolute;
			height: 36px;
			width: 36px;
			background-size: 36px;
			background-position: center;
			background-repeat: no-repeat;
			display: block;
			top: 8px;
			right: 6px;
			left: auto;
			background-image: url(/static/img/stats-icon-white.png);
		}
		.*css*.active:after {
			//background-image: url(/static/img/close-white.png);
			background-image: url(/static/img/close1.png);
		}
		.*css*.active {
			font-size: 0px;
			cursor: pointer;
			background-image: url(/static/img/button1.png);
		}
		body.isMobile .*css*.active:after {
			background-image: url(/static/img/close1.png);
		}
	css*/}}, [
		['span', {class: 'h', text: 'Навыки'}],
		_.f({name: 'togglePoll', type: 'action', front: {
			onClick: function (e, data){
				var $guiStats = $('#guiStats');
				$guiStats.toggleClass('active');
				$guiStats.find('> .stats-content').toggleClass('active');
				$guiStats.find('> .stats-toggle').toggleClass('active');
			},
		}}),	
	]],

	['div', {class: 'mcb stats-content f-slb *css*', style:()=>{/*css
		.*css* {
			padding: 10px 30px;
			border-right: 0px;
			height: 100%;
			padding-top: 40px;
			position: relative;
			overflow: hidden;
			text-align: right;
			font-size: 13px;
			display: none;
		}
		.*css*.active {
			display: flex;
			background-image: url(/static/img/panel3.png);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: top right;
			padding-top: 80px;
			padding-left: 50px;
			padding-right: 40px;
			padding-bottom: 130px;
		}
		.*css*.active > .count {
			display: flex;
		}
		.*css*.active > .list {
			display: flex;
		}
		
		body.isMobile .*css*.active {
			max-width: 300px;
			margin: auto;
		}
		body.isMobile .*css*.active > .list {
			margin-right: 0px;
			padding-right: 0px;
		}
	css*/}},[
	
		['div', {class: 'count i-contain *css*', style:()=>{/*css
			.*css* {
				display: none;
				position: absolute;
				height: 80px;
				width: 180px;
				top: 0px;
				left: 60px;
				background-image: url(/static/img/panel2b.png);
				color: white;
				align-items: center;
				justify-content: space-between;
				text-align: center;
			}
			.*css* > div {
				flex-shrink: 0;
				width: 62px;
			}
			.*css* > span {
				width: 100%;
				padding-left: 20px;
				white-space: pre-wrap;
			}
		css*/}},[
			['span', {text: 'Сумма\x0aнавыков'}],
			['div', {}, [
				_.f({name: 'statscount', type: 'label', value: '0', sub: true}),
			]],
		]],
	
		['div', {class: '*css*', style:()=>{/*css
			body.theme-fantasy #guiStats.active .*css* {
				position: absolute;
				width: 226px;
				height: 284px;
				background: rgba(213, 173, 81, 1);
				border-radius: 5px;
				left: 38px;
				top: 74px;
				z-index: 0;
			}
		css*/}}],
		
		['div', {class: 'scroller *css*', style:()=>{/*css
		css*/}}, [
			['div', {class: 'handle'}]
		]],
		
		['div', {onscroll: 'window.scrollMe(this)', class: 'scroll-content list *css*', style:()=>{/*css
			.*css* {
				display: none;
				flex-wrap: wrap;
				position: relative;
			}
			.*css* > .stat {
				justify-content: space-between;
				padding: 4px 0px;
				color: white;
				display: none;
				width: 100%;
				display: flex;
			}
			.*css* > .stat > span {
				width: 100%;
			}
			.*css* > .stat > .count {
				text-align: center;
				flex-shrink: 0;
				width: 40px;
				//z-index: 0;
			}
			.*css* > .stat > .title {
				line-height: 16px;
				width: 100%;
				text-align: left;
				align-items: flex-end;
				display: flex;
				position: relative;
				white-space: nowrap;
			}
			.*css* > .stat > .title.sm {
				font-size: 11px;
			}
			.*css* > .stat > .title > span {
				position: absolute;
				top: 0px;
				left: 0px;
			}
			.*css* > .stat > .title > div {
				background-color: #412c17;
				height: 4px;
				margin-top: 4px;
			}
			.*css* > .stat > .title > div.tmp {
				background-color: #ffd406;
			}
			.*css* > .stat > .title > div.tmp.m {
				background-color: #ffd406;
			}
			.*css* .notifyjs-container {
				min-width: 180px;
				max-width: 180px;
				white-space: normal;
			}
		css*/}},[
		
			['div', {}, [
				_.f({name:'stats', type:'*-', sub: true, lst:'stats', front: {
					onSub: function (_, d){
						if(d.val){
							for(var key in d.val){
								var k = key.split('.');
								if(k[0] == 'stats'){
									var $s = _.closest('.list').find('> .stat-'+k[1]);
									var v = ($s.attr('v') || 0)*1 + d.val[key]*1;
									var vt = ($s.attr('vt') || 0)*1;
									if(vt < 0) v -= vt;
									$s.attr('v', v);
									$s.find('> .count').text(v);
									$s.find('> .title > div.real').css('width', v+'%');
									$s.css('order', -1*v);
								}
							}
						}
					},
				}}),
			]],
			['div', {}, [
				_.f({name:'tmpStats', type:'*-', sub: true, lst:'stats', front: {
					onSub: function (_, d){
						if(d.val){
							for(var key in d.val){
								var k = key.split('.');
								if(k[0] == 'tmpStats'){
									var $s = _.closest('.list').find('> .stat-'+k[1]);
									var v = ($s.attr('v') || 0)*1;
									var vt = ($s.attr('vt') || 0)*1 + d.val[key]*1;
									if(vt < 0) v -= vt;
									$s.attr('vt', vt);
									$s.find('> .count').text(v);
									$s.find('> .title > div.tmp').css('width', Math.abs(vt)+'%');
									$s.css('order', -1*v);
								}
							}
						}
					},
				}}),
			]],
			((_, d)=>{
				var result = [];
					LST.stats.list.lst.forEach((l)=>{
						var v = d.stats && d.stats[l.v] ? d.stats[l.v] : 0;
						var vt = d.tmpStats && d.tmpStats[l.v] ? d.tmpStats[l.v] : 0;
						result.push( ['div', {class: 'stat stat-'+l.v, style: 'order: '+v*-1, v: v, vt: vt}, [
							['div', {class: 'title '+(l.l.length>18?'sm':'')}, [
								['span', {help: '["lst","stats","'+l.v+'"]', helpPosition: 'bottom left', text: l.l+' '}],
								['div', {class: 'real', width:  v+(vt<0?vt:0)+'%'}],
								['div', {class: 'tmp '+(vt<0?"m":""), width: Math.abs(vt)+'%'}],
							]],
							['div', {class: 'scb count', text: v}],
						]] );
					});
				return result;
			})(_, d),
		]],
	]],
]}

exports.script = ()=>{

}

exports.style = ()=>{/*

*/}