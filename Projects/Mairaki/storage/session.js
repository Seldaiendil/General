var fs = require('fs');
var async = require('async');
var Client = require('../client.js').Client;
var State = require('./state.js').State;


exports.Session = Session;
function Session(lang) {
	this.client = new Client();
	this.state = new State();

	this.lang = lang;
	this.world = "";
	this.user = "";
}

Session.prototype = {
	login: function(pass, callback) {
		var self = this;
		getWorld(this.lang, this.client, this.world, function(err, server) {
			self.client.server = server;
			var response = self.client.get('/index.php?action=loginAvatar&function=login', {
				name: self.user,
				password: pass,
				kid: ''
			});

			response.on('data', function(data, stop) {
				if (self.hasSession()) {
					saveSession(self.client, self.world, self.user);
					stop();
					callback(null);
				}
			});
		});	
	},

	isLogged: function(callback) {
		var self = this;
		async.parallel([
			function(sync) {
				if (self.hasSession()) {
					sync(null);
				} else {
					loadSession(self.client, self.world, self.user, function(err, success) {
						if (success)
							sync(null);
						else
							callback(null, false);
					});
				}
			},
			function(sync) {
				if (self.client.server)
					sync(null, self.client.server);
				else
					getWorld(self.lang, self.client, self.world, sync);
			}
			
		],
		function(err, results) {
			self.client.server = results[1];
			self.client.query('/index.php', function(err, $, window) {
				switch (window.document.body.id) {
					case 'worldmap_iso': // Logged
						callback(null, true);
						break;
					case 'errorLoggedOut': // Wrong session
						callback(null, false);
						break;
					case '': // Session caducated
						callback(null, false);
						break;
					default:
						throw new Error('Unexpected body ID: --[' + $(window.document.body).id + ']--');
				}
			});
		});
	},

	hasSession: function() {
		return !!this.client.getCookie('PHPSESSID');
	}
};

var sessionsFile = 'storage/sessions.json';

function saveSession(client, world, user) {
	var session = {
		php: client.getCookie('PHPSESSID'),
		ikariam: client.getCookie('ikariam')
	};

	fs.readFile(sessionsFile, 'utf8', function(err, data) {
		var sessions = data ? JSON.parse(data) : {};

		if (!sessions[world])
			sessions[world] = {};

		sessions[world][user] = session;
		fs.writeFile(sessionsFile, JSON.stringify(sessions), 'utf8');
	});
}

function loadSession(client, world, user, callback) {
	fs.readFile(sessionsFile, 'utf8', function(err, data) {
		if (!data) {
			callback(null, false);
			return;
		}

		var storage = JSON.parse(data)[world];
		if (!storage) {
			callback(null, false);
			return;
		}

		var session = storage[user];
		if (!session) {
			callback(null, false);
			return;
		}

		client.setCookie('PHPSESSID', session.php);
		client.setCookie('ikariam', session.ikariam);
		callback(null, true);
	});
}


var worldsFile = 'storage/worlds.json';

function getWorld(lang, client, target, callback) {
	var worlds = null;

	function save(w) {
		fs.writeFile(worldsFile, JSON.stringify(w), 'utf8');
		worlds = w;
		getWorld = search;
		search(null, null, target, callback);
	}

	function search(lang, client, target, callback) {
		if (!worlds[target])
			throw new Error('World --[' + target + ']-- not found.')
		callback(null, worlds[target])
	};

	fs.readFile(worldsFile, 'utf8', function(err, data) {
		if (data)
			save(JSON.parse(data));
		else 
			retrieveWorlds(lang, client, save);
	});
}

function retrieveWorlds(lang, client, callback) {
	client.server = lang + '.ikariam.com';
	client.getNoCookiesQuery('/', function(err, $, window) {
		var worlds = {};
		$('#oiServer option').each(function(index, element) {
			element = $(element);
			worlds[element.html().trim()] = element.val().trim();
		});
		callback(worlds);
	});
}
