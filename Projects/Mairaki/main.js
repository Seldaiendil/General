require('./extend.js');
var session = new (require('./session.js').Session)();

var pass = process.argv[4];

session.lang = 'es';
session.world = process.argv[2];
session.user = process.argv[3];

session.isLogged(function(err, value) {
	if (!value)
		session.login(pass, function(err) { });
});
