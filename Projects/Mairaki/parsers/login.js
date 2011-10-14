var fs = require('fs');
var client = require('../client.js');

var sessionsFile = 'sessions.json';
function saveSession(name) {
	var session = {
		php: client.getCookie('PHPSESSID'),
		ikariam: client.getCookie('ikariam')
	};

	fs.readFile(sessionsFile, 'utf8', function(err, data) {
		var sessions = data ? JSON.parse(data) : {};
		sessions[name] = session;
		var text = JSON.stringify(sessions);
		fs.writeFile(sessionsFile, text, 'utf8');
	});
}
function loadSession(name, callback) {
	fs.readFile(sessionsFile, 'utf8', function(err, data) {
		if (!data) {
			callback(false);
			return;
		}

		var session = JSON.parse(data)[name];
		client.setCookie('PHPSESSID', session.php);
		client.setCookie('ikariam', session.ikariam);
		callback(true);
	});
}
function hasSession() {
	return !!client.getCookie('PHPSESSID')
}

function getWorlds(callback) {
	var select = null;
	var worlds = null;

	client.simpleGet('es.ikariam.com', '/', function(data, stop) {
		if (!select) {
			var start = data.indexOf(' id="oiServer"');
			if (start !== -1) {
				select = data.substr(start);
			}
		} else {
			select += data;
			var end = select.indexOf('</select>');
			if (end !== -1) {
				select = select.substring(0, end);
				
				stop();
				worlds = parseWorlds(select);
				callback(worlds);
			}
		}
	});

	getWorlds = function(callback) {
		callback(worlds)
	};
}

function parseWorlds(select) {
	select = select.replace(/\s+/g, '');

	var match = select.match(/<option.*?value="(.*?)\.ikariam\.com".*?>(\w+)<\/option>/g);
	var test, result = {};

	for (var i = 0; i < match.length; i++) {
		test = match[i].match(/<option.*?value="(.*?)\.ikariam\.com".*?>(\w+)<\/option>/);

		result[test[1] + '.ikariam.com'] = test[2];
	}

	return result;
}

function login(world, user, password, callback) {
	getWorlds(function(worlds) {
		var server;

		for (var i in worlds) {
			if (worlds[i] === world) {
				server = i;
				break;
			}
		}

		client.get(server, '/index.php?action=loginAvatar&function=login', {
			name: user,
			password: password,
			kid: ''
		}, function(data, stop) {
			var session = client.getCookie('PHPSESSID');

			if (session) {
				stop();
				saveSession(user);
				callback();
			}
		});
	});
}

function isLogged(world, user, callback) {
	var server = null;
	var cookie = false;

	function update() {
		if (server === null || !cookie)
			return;
		
		var html = "";
		client.get(server, '/index.php', {}, function(data, stop) {
			html += data;

			// Logged
			if (html.indexOf('<body id="worldmap_iso"') !== -1)
				callback(true);
			
			// Wrong session
			else if (html.indexOf('<body id="errorLoggedOut"') !== -1)
				callback(false);
			
			// Session caducated
			else if (html.indexOf('<body>') !== -1)
				callback(false);
			
			// If no one, we must not stop
			else return;
			stop();
		});
	}

	if (hasSession()) {
		cookie = true;
	} else {
		loadSession(user, function(success) {
			if (!success) {
				callback(false);
				return;
			}

			cookie = true;
			update();
		});
	}

	getWorlds(function(worlds) {
		for (var i in worlds) {
			if (worlds[i] === world) {
				server = i;
				update();
				return
			}
		}
	});
}

exports.getWorlds = getWorlds;
exports.login = login;
exports.isLogged = isLogged;