var http = require('http');

var cookies = {
	cookies: {},

	getCookie: function(key) {
		return this.cookies[key];
	},
	addCookie: function(key, value) {
		this.cookies[key] = value;
	},

	toString: function() {
		var result = [];
		for (var i in this.cookies)
			if (this.cookies.hasOwnProperty(i))
				result.push(escape(i) + '=' + escape(this.cookies[i]));
		return result.join(';');
	}
};

function simpleGet(server, url, callback) {
	http.get({ host: server, port: 80, path: url}, function(response) {
		parseHeaders(response);
		function parseData(buffer) {
			callback(null, buffer.toString('utf8', 0, buffer.length), stop);
		}

		function stop() {
			response.removeListener('data', parseData);
		}

		response.on('data', parseData);
	});//.on('error', downloadError);
}

function get(server, url, post, callback) {
	var data = 'uni_url=' + server + '&' + parsePost(post);

	var request = http.request({
		host: server,
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
			'Cookie': cookies.toString()
		}
	}, function(response) {
		parseHeaders(response);

		function parseData(buffer) {
			callback(null, buffer.toString('utf8', 0, buffer.length), stop);
		}

		function stop() {
			response.removeListener('data', parseData);
		}

		response.on('data', parseData);
	});

	console.info("Calling: " + server + url + "\n\tPOST: " + parsePost(post));// + '\n\tCOOKIES: ' + cookies.toString());

	request.write(data);
	request.end();
}

function parseHeaders(response) {
	var newCookies = response.headers['set-cookie'];
	var end, cookie;
	if (newCookies) {
		for (var i = 0; i < newCookies.length; i++) {
			end = newCookies[i].indexOf(';');
			if (end === -1)
				cookie = newCookies[i];
			else
				cookie = newCookies[i].substr(0, end);
			//console.info('Found New Cookie: --[' + cookie + ']--');
			cookie = cookie.split('=');
			cookies.addCookie(unescape(cookie[0]), unescape(cookie[1]));
		}
	}
}

function parsePost(post) {
	var result = [];
	for (var i in post)
		if (post.hasOwnProperty(i))
			result.push(escape(i) + '=' + escape(post[i]));
	return result.join('&');
}

function getCookie(name) {
	return cookies.getCookie(name);
}

function setCookie(name, value) {
	cookies.addCookie(name, value);
}

exports.get = get;
exports.simpleGet = simpleGet;
exports.getCookie = getCookie;
exports.setCookie = setCookie;