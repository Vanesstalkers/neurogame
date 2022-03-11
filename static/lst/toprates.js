
// при желании можно вызовы базы обернуть в теги и вырезать при отправке на клиент (внутри function send в server.js)

var lst = [
	{v: 'exp', l: 'Рейтинг игроков с максимальным опытом', table: 'top__user_exp', iam: function(__, cb){ __.db.collection('user').findOne(ObjectId(__.user.key), {exp:1}, function(err, user){ cb(user.exp) } ) }},
	{v: 'power', l: 'Рейтинг игроков с максимальным влиянием', table: 'top__user_power', iam: function(__, cb){ __.db.collection('user').findOne(ObjectId(__.user.key), {power:1}, function(err, user){ cb(user.power) } ) }},
	{v: 'money', l: 'Рейтинг игроков с максимальной популярностью', table: 'top__user_money', iam: function(__, cb){ __.db.collection('user').findOne(ObjectId(__.user.key), {money:1}, function(err, user){ cb(user.money) } ) }},
	{v: 'statscount', l: 'Рейтинг игроков с максимальными навыками', table: 'top__user_statscount', iam: function(__, cb){ __.db.collection('user').findOne(ObjectId(__.user.key), {statscount:1}, function(err, user){ cb(user.statscount) } ) }},
];
if(typeof exports != 'undefined') exports.lst = lst;
if(typeof window != 'undefined') window.LST.toprates = lst;