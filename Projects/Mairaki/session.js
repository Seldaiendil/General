var fs = require('fs');
var async = require('async');
var Client = require('./client.js').Client;


exports.Session = Session;
function Session(lang) {
	this.lang = lang;
	this.client = null;
	this.world = "";
	this.user = "";
}

Session.prototype = {
	login: function(pass, callback) {
		var self = this;
		if (!this.client)
			this.client = new Client();

		getWorld(this.lang, this.client, this.world, function(err, server) {
			self.client.server = server;
			var response = self.client.post('/index.php?action=loginAvatar&function=login', {
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
		if (!this.client)
			this.client = new Client();

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
			self.client.postParse('/index.php', {}, function(err, $, window, html) {
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

var sessionsFile = 'sessions.json';

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

		var text = JSON.stringify(sessions);
		fs.writeFile(sessionsFile, text, 'utf8');
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

function getWorld(lang, client, target, callback) {
	client.server = lang + '.ikariam.com';
	client.getParse('/', function(err, $, window) {
		var worlds = {};
		$('#oiServer option').each(function(index, element) {
			element = $(element);
			worlds[element.html().trim()] = element.val().trim();
		});

		getWorlds = function(target, callback) {
			if (!worlds[target])
				throw new Error('World --[' + target + ']-- not found.')
			callback(null, worlds[target])
		};
		getWorlds(target, callback);
	});
}
