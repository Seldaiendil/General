require('./extend.js');
var fs = require('fs');
var Parser = require('./parsers/parser.js').Parser;
var session = new (require('./storage/session.js').Session)();

var pass = process.argv[4];

session.lang = 'es';
session.world = process.argv[2];
session.user = process.argv[3];

console.log("INFO: Is logged?");
session.isLogged(function(err, value) {
	console.log("INFO:\t" + value);

	if (!value) {
		console.log("INFO: Trying to login...");

		session.login(pass, function(err) {
			console.log("INFO: Done. Now is logged?")

			session.isLogged(function(err, value) {
				console.log("INFO:\t" + value);
				if (!value)
					throw new Error("Login failed!");
				start();
			});
		});
	} else {
		start();
	}
});

function start() {
	var parser = new Parser(session, function() {
		fs.writeFile('result.json', JSON.stringify(session.state, null, '\t'), 'utf8');
	});
}