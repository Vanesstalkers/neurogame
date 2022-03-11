
exports.f = function(conn, data, msg, callback){try{
	
	function titleSfx(str, female){
		
		var sfxOld, sfxNew = false, s;
		
		if(str.indexOf(' ') != -1){
			s = str.split(' ');
			sfxOld = s[0].substr(-3);
			switch(sfxOld){
				case 'вая':
				case 'вое':
				case 'вый':
					sfxNew = 'во';
					break;
				case 'кие':
				case 'кий':
					sfxNew = 'ко';
					break;
				case 'чий':
				case 'ний':
				case 'няя':
				case 'нее':
					sfxNew = sfxOld[0]+'е';
					break;
				case 'ные':
					sfxNew = 'но';
					break;
			}
			str = (sfxNew ? (s[0]+'!').replace(sfxOld+'!', sfxNew) : s[0]) + s[1];
		}
		if(str.indexOf('-') != -1){
			s = str.split('-');
			str = s[0] + '-' + s[1].charAt(0).toUpperCase() + s[1].substr(1);
		}
		
		sfxOld = str.substr(-3);
		sfxNew = false;
		switch(sfxOld){
			case 'кий':
			case 'кая':
			case 'кое': 
				sfxNew = female ? 'кая' : 'кий';
				break;
			case 'ква':
				sfxNew = female ? 'ковская' : 'ковский';
				break;
			case 'ная':
			case 'ный':
			case 'ное':
				sfxNew = female ? 'ная' : 'ный';
				break;
			case 'тая':
			case 'тый':
			case 'тое':
				sfxNew = female ? 'тая' : 'тый';
				break;
			default:
				sfxOld = str.substr(-2);
				switch(sfxOld){
					case 'га':
						sfxNew = female ? 'жская' : 'жский';
						break;
					case 'ки':
						sfxNew = female ? 'кская' : 'кский';
						break;
					case 'ок':
						sfxNew = female ? 'окская' : 'окский';
						break;
					case 'ла':
						sfxNew = female ? 'линская' : 'линский';
						break;
					case 'рь':
					case 'мь':
					case 'нь':
						sfxNew = sfxOld[0]+(female ? 'ская' : 'ской');
						break;
					default:
						sfxOld = str.substr(-1);
						switch(sfxOld){
							case 'к':
								sfxNew = female ? 'кая' : 'кий';
								break;
							case 'о':
								sfxNew = female ? 'ская' : 'ский';
								break;
							case 'ы':
								sfxNew = female ? 'инская' : 'инский';
								break;
							case 'а':
							case 'е':
							case 'ё':
							case 'и':
							case 'у':
							case 'ю':
							case 'я':
								sfxNew = sfxOld + 'н' + (female ? 'ская' : 'ский');
								break;
							default:
								sfxNew = sfxOld + (female ? 'ская' : 'ский');
								break;
						}
						break;
				}
				break;
		}
		if(sfxNew) str = (str+'!').replace(sfxOld+'!', sfxNew);
		return str;
	}
	
	conn.db.collection('user').findOne({_id: ObjectId(conn.user.key)}, {fields: {female: 1, alias: 1}}, (err, user)=>{try{

		var a1, a2, t, sfxOld, sfxNew;
		var alias = user.alias ? Object.keys(user.alias) : [];
		var titles = LST.titles.list.lst.filter(l=>(user.female?l.female:!l.female));
		var title = titles.splice(Math.floor(Math.random()*titles.length), 1)[0].l;
		
		if(alias.length) a1 = alias.splice(Math.floor(Math.random()*alias.length), 1)[0];
		if(alias.length) a2 = alias.splice(Math.floor(Math.random()*alias.length), 1)[0];
		
		if(a1){
			if(user.alias[a1] && user.alias[a1] > 0){
				if(user.alias[a1] == 1){
					delete user.alias[a1];
				}else{
					user.alias[a1]--;
				}
			} 
			a1 = a1.toLowerCase();
			a1 = titleSfx(a1, user.female);
			title += ' ' + a1.charAt(0).toUpperCase() + a1.substr(1);
		}
		if(a2){
			if(user.alias[a2] && user.alias[a2] > 0){
				if(user.alias[a2] == 1){
					delete user.alias[a2];
				}else{
					user.alias[a2]--;
				}
			} 
			a2 = a2.toLowerCase();
			a2 = titleSfx(a2, user.female);
			title += '-' + a2.charAt(0).toUpperCase() + a2.substr(1);
		}
		
		conn.db.collection('user').update({_id: ObjectId(conn.user.key)}, {$set: {title: title, alias: user.alias}}, (err, user)=>{try{
			
			callback({status: 'ok', title: title});
		
		}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка (3)'}) }});

	}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка (2)'}) }});
	
}catch(e){ console.log(e); callback({status: 'err', errMsg: 'Ошибка (1)'}); }}