require('./extend.js');
var fs = require('fs');
var session = new (require('./session.js').Session)();

exports.start = function(email, pass, callback) {
	session.client.log = true;
	session.email = email;

	session.login(pass, callback);

	/*
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
	*/
};

