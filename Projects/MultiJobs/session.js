var fs = require('fs');
var Client = require('./client.js').Client;


exports.Session = Session;
function Session(email) {
	this.client = new Client();
	this.email = email;
}

Session.prototype = {
	login: function(pass, callback) {
		this.client.server('infojobs.net')

		this.client.server = "accounts.infojobs.net";
		var response = this.client.secure('/security/accounts/login/run', {
			email: this.email,
			password: pass,
			j_clientId: 'empleo_ij',
			submit: 'Iniciar sesión'
		}, function(data) {
			callback(null, data);
		});
	},
};
