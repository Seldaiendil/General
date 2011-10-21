var EventEmitter = require('events').EventEmitter;
var jsdom = require('jsdom');
var http = require('http');

exports.Client = Client;
function Client() {
	this.cookies = new Cookies();
	this.server = '';
	this.log = true;
	this.calls = 0;
}
Client.prototype = EventEmitter.prototype.extend({
	constructor: Client,

	getCookie: function(key) {
		return this.cookies.get(key);
	},

	setCookie: function(key, value) {
		return this.cookies.set(key, value);
	},

	get: function(url, post, callback) {
		if (typeof post === 'function') {
			callback = post;
			post = null;
		} else if (!callback) {
			callback = function() { };
		}
		this.calls++;
		var cookies = this.cookies.toString()
		var method = post ? 'POST' : 'GET';
		var resp = new Response();
		var config = {
			host: this.server,
			port: 80,
			path: url,
			method: method,
			headers: {
				//'Host': this.server,
				//'Connection': "keep-alive",
				//'Cache-Control': "max-age=0",
				//'Origin': "http://es.ikariam.com",
				//'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.186 Safari/535.1",
				//'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
				//'Referer': "http://es.ikariam.com/index.php",
				//'Accept-Lanuage': "es,ru;q=0.8",
				//'Accept-Charset': "utf-8;q=0.7,*;q=0.3",
				'Content-Type': "application/x-www-form-urlencoded",
				'Cookie': cookies
			}
		};

		if (this.log)
			console.info("Calling: " + method + " http://" + this.server + url + '\n\tCOOKIES: ' + cookies);

		if (post) {

			data = 'uni_url=' + this.server + '&' + createPost(post);
			config.headers['ContentLength'] = data.length
			if (this.log)
				console.info('\tPOST: ' + data);

			var request = http.request(config, handleResponse(this, resp, callback));
			request.write(data);
			request.end();

		} else {
			http.get(config, handleResponse(this, resp, callback));
		}
		return resp;
	},

	getNoCookies: function(url, callback) {
		this.calls++;
		var resp = new Response();
		http.get({ host: this.server, port: 80, path: url}, handleResponse(this, resp, callback));
		if (this.log)
			console.info("Calling: GET http://" + this.server + url);
		return resp;
	},

	query: function(url, post, callback) {
		if (arguments.length === 2) {
			callback = post;
			post = null;
		}
		this.get(url, post, handleJsdom(callback));
	},

	getNoCookiesQuery: function(url, callback) {
		this.getNoCookies(url, handleJsdom(callback));
	}
});


function handleJsdom(callback) {
	return function(html) {
		jsdom.env({
			html: html,
			scripts: [ 'lib/jquery-1.6.4.min.js' ]
		}, function (err, window) {
			callback(err, window.jQuery, window, html);
		});
	};
}

function handleResponse(self, resp, callback) {
	if (typeof callback !== 'function')
		throw new Error();
	return function(response) {
		self.cookies.parseNewCookies(response);
		var html = "";

		function parseData(buffer) {
			var block = buffer.toString('utf8', 0, buffer.length);
			html += block;
			resp.emit('data', block, stop);
		}
		function stop() {
			response.removeListener('data', parseData);
		}
		response.on('data', parseData);
		response.on('end', function() {
			var end = html.indexOf('</html>');
			if (end !== -1)
				html = html.substr(0, end + 7)

			resp.emit('end', html);
			callback(html);
		});
	}
}

function createPost(post) {
	var result = [];
	for (var i in post)
		if (post.hasOwnProperty(i))
			result.push(escape(i) + '=' + escape(post[i]));
	return result.join('&');
}



function Cookies() {
	this.cookies = {};
}
Cookies.prototype = {
	get: function(key) {
		return this.cookies[key];
	},
	set: function(key, value) {
		this.cookies[key] = value;
	},

	parseNewCookies: function(response) {
		var newCookies = response.headers['set-cookie'];
		var end, cookie;
		if (!newCookies)
			return;
		
		for (var i = 0; i < newCookies.length; i++) {
			end = newCookies[i].indexOf(';');
			if (end === -1)
				cookie = newCookies[i];
			else
				cookie = newCookies[i].substr(0, end);
			cookie = cookie.split('=');
			this.set(unescape(cookie[0]), unescape(cookie[1]));
		}
	},

	toString: function() {
		var result = [];
		for (var i in this.cookies)
			if (this.cookies.hasOwnProperty(i))
				result.push(escape(i) + '=' + escape(this.cookies[i]));
		return result.join(';');
	}
};

function Response() {
	EventEmitter.call(this);
}
Response.prototype = Object.create(EventEmitter.prototype, {});
