require('./extend.js');
var fs = require('fs');
var Parser = require('./parsers/parser.js').Parser;
var session = new (require('./storage/session.js').Session)();

exports.start = function(lang, world, user, pass, callback) {
	session.client.log = false;
	session.lang = lang;
	session.world = world;
	session.user = user;

	console.log("INFO: Is logged?");
	session.isLogged(function(err, value, $) {
		console.log("INFO:\t" + value);

		if (!value) {
			console.log("INFO: Trying to login...");

			session.login(pass, function(err) {
				console.log("INFO: Done. Now is logged?")

				session.isLogged(function(err, value, $) {
					console.log("INFO:\t" + value);
					if (!value)
						throw new Error("Login failed!");
					callback(session, new Parser(session, $));
				});
			});
		} else {
			callback(session, new Parser(session, $));
		}
	});
};

