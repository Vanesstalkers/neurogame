"use strict";

function initWS(wsPath, callback){
	if(self.ws){
		if(typeof callback == 'function'){
			if(self.ws.readyState == 1){
				callback();
			}else{
				self.ws.afterOpen.push(callback);
				if(self.ws.readyState == 3) initWS(wsPath);
			}
		}
	}else{
		self.ws = new WebSocket( wsPath );
		self.ws.afterOpen = [];
		if(typeof callback == 'function') self.ws.afterOpen.push(callback);
		
		self.ws.onmessage = function (msg) {try{
			var data = JSON.parse(msg.data);
			if(data && data.type == 'notify') self.registration.showNotification(data.notify.title, data.notify);
		}catch(e){}}
		self.ws.onopen = function () {
			self.ws.afterOpen.forEach(function(f){ f() });
		}
		self.ws.onerror = function (error) { console.error('error', error) };
		self.ws.onclose = function (msg) {
			console.log('onclose', msg)
			setTimeout(function () {
				self.ws = false;
				initWS();
			}, 3000);
		}
	}
}

self.addEventListener('message', function(event) {
	if(event.data){
		if(event.data.xaoc_user){
			initWS(event.data.wsPath, function(){
				//console.log(self.ws);
				self.ws.send(JSON.stringify({
					action: 'worker',
					xaoc_user: event.data.xaoc_user || false,
					xaoc_auth: event.data.xaoc_auth || false,
					xaoc_session: event.data.xaoc_session || false,
					mobile: event.data.mobile || false,
					agent: event.data.agent || '',
					subscription: event.data.subscription || false,
				}));
			});
		}
	}
});

self.addEventListener('install', function(event) {
	//console.log("install", event);
	event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
	//console.log("activate", event);
	event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function(event) {try{
	if(event.data){
		var data =  JSON.parse(event.data.text());
		self.registration.showNotification(data.title, data);
	}
}catch(e){}});

self.addEventListener('notificationclick', function(event) {

	event.notification.close();

	event.waitUntil(clients.matchAll({
		type: "window"
	}).then(function(clientList) {
		if(clientList[0]){
			//clientList[0].postMessage({message: 'message3'});
			clientList[0].focus();
		}
	}));

});

/*
var db, DBOpenRequest = self.indexedDB.open("sw1", 6);
DBOpenRequest.onsuccess = function(event) {
	console.log("onsuccess");
	db = DBOpenRequest.result;
	var objectStore = db.transaction('sw1').objectStore('sw1');
    objectStore.openCursor().onsuccess = function(event) {
		var cursor = event.target.result;
		console.log("cursor", cursor, event);
	}
};
*/