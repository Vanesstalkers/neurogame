var lst = [
	{v: '', l: '\xa0'},
	{v: 'guest', l: 'Гостевой доступ', hide: true},
	{v: 'admin', l: 'Администратор', access: []},
];
if(typeof exports != 'undefined') exports.lst = lst;
if(typeof window != 'undefined') window.LST.userrole = lst;