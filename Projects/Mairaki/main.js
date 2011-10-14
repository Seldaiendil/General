var fs = require('fs');
var http = require('http');
var session = require('./parsers/session.js');

var user = process.argv[2];
var pass = process.argv[3];
var world = process.argv[4];

session.login(world, user, pass, function() {
	session.isLogged(world, user, function(value) {
		console.info('Logged: --[' + (value ? 'true' : 'false') + ']--');
	});
});
