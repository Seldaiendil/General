var EventEmitter = require('events').EventEmitter;
var jsdom = require('jsdom');
var http = require('http');

exports.Client = Client;
function Client() {
	this.cookies = new Cookies();
	this.server = '';
}
Client.prototype = EventEmitter.prototype.extend({
	constructor: Client,

	getCookie: function(key) {
		return this.cookies.get(key);
	},

	setCookie: function(key, value) {
		return this.cookies.set(key, value);
	},

	post: function(url, post, callback) {
		var data = 'uni_url=' + this.server + '&' + createPost(post);
		var resp = new Response();

		var request = http.request({
			host: this.server,
			port: 80,
			path: url,
			method: 'POST',
			headers: {
				//'Host': server,
				//'Connection': "keep-alive",
				//'ContentLength': data.length,
				//'Cache-Control': "max-age=0",
				//'Origin': "http://es.ikariam.com",
				//'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.186 Safari/535.1",
				'Content-Type': "application/x-www-form-urlencoded",
				//'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
				//'Referer': "http://es.ikariam.com/index.php",
				//'Accept-Lanuage': "es,ru;q=0.8",
				//'Accept-Charset': "utf-8;q=0.7,*;q=0.3",
				'Cookie': this.cookies.toString()
			}
		}, handleResponse(this, resp, callback));

		console.info("Calling: POST http://" + this.server + url + "\n\tPOST: " + createPost(post) + '\n\tCOOKIES: ' + this.cookies.toString());

		request.write(data);
		request.end();
		return resp;
	},

	postParse: function(url, post, callback) {
		this.post(url, post, function(html) {
			jsdom.env({
				html: html,
				scripts: [ 'lib/jquery-1.5.min.js' ]
			}, function (err, window) {
				callback(err, window.jQuery, window, html);
			});
		});
	},

	get: function(url, callback) {
		var resp = new Response();
		http.get({ host: this.server, port: 80, path: url}, handleResponse(this, resp, callback));
		console.info("Calling: GET http://" + this.server + url + '\n\tCOOKIES: ' + this.cookies.toString());
		return resp;
	},

	getParse: function(url, callback) {
		this.get(url, function(html) {
			jsdom.env({
				html: html,
				scripts: [ 'lib/jquery-1.5.min.js' ]
			}, function (err, window) {
				callback(err, window.jQuery, window, html);
			});
		});
	}
});

function handleResponse(self, resp, callback) {
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
			resp.emit('end', html);

			if (callback)
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
			//console.info('Found New Cookie: --[' + cookie + ']--');
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
