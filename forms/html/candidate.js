exports.tpl = (_, d)=>{ return [
						
//	['div', {class: 'candidate flex-center *css*', style:()=>{/*css
//		order: -100;
//	css*/}, text: 'Кандидат'}],

	_.c({name: 'answer', add: false, process: {
		dataReady: (__, data, callback)=>{
			data.forEach((d)=>{
				if(d.__user && d.__user.l.map(l=>l+'').indexOf(__.user.key) != -1) d.iam = true;
				if(__.global.tutorialVote){
					if(__.global.tutorialVoteQuestion){
						d.ready = 0;
					}else if(__.global.tutorialVoteAnswer){
						d.tAnswer = d.iam && !d.ready ? ' tutorial-answer ' : '';
					}else if(__.global.tutorialVoteRate){
						d.tAnswer = ' tutorial-answer ';
					}else if(__.global.voteFinished){
						
					}else{
						d.ready = 0;
					}
				}
			});
			callback();
		},
		tpl: (_, d)=>{ return [
		
			// questionsOrder отсутствует для showItem
		
			['div', {class: 'flex-center answer '+(d.tAnswer||''), style: "order:"+(d.__question&&_.__.global.questionsOrder?_.__.global.questionsOrder.indexOf(d.__question.l[0]+''):0)}, [
				_.html('answer', _, d),
			]],
		]},
	}}),

]}

exports.script = ()=>{

}

exports.style = ()=>{/*

*/}