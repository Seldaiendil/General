var fs = require('fs');
var http = require('http');
var login = require('./parsers/login.js');

login.login('Sigma', 'Seldaiendil', '04134462', function() {
	/*
	login.isLogged('Sigma', 'Seldaiendil', function(value) {
		console.info('Logged: --[' + (value ? 'true' : 'false') + ']--');
	});
	*/

	
});
