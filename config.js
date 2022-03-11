
XAOC_CONFIG = require('./../../config.js');

exports.mongo = {url: XAOC_CONFIG.mongo.url+'dgame'};

exports.mysql = Object.assign(JSON.parse(JSON.stringify(XAOC_CONFIG.mysql)), {database : 'dgame'});

exports.redis = XAOC_CONFIG.redis;

exports.DEBUG = false;
exports.needlogin = true;
exports.guest = {auto: true, roles: [], access: []};
exports.indexHTML = 'index.html';

exports.server_url = 'http://localhost:3100';
exports.server_port = 3100;
exports.socket_port = 8100;

exports.gcmAPIKey = 'AIzaSyA7NXHfrQNZuDqFfLQrjuY3xlGG1WaCd1k';
exports.vapidDetails = {
	subject: 'mailto:example@yourdomain.org',
	publicKey: 'BNdd-adbv9MDaOY6LZG1xl-VjGnzk1kmlh4g0c9RTGhn8iPWKYjQ1sxJdKGF_T1IEru_xtFKjX9A2mvmBtCYdO8',
	privateKey: 'TVYIa0GPVfhWB7vrbpXgNLurJrnazpKXHju-4WBgV9k',
}