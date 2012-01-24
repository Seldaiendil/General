var jsdom = require('jsdom');
var http = require('http');
var fs = require('fs');

var logger = {
	log: function() {
		console.log.apply(console, arguments);
	},
	info: function() {
		console.info.apply(console, arguments);
	},
	error: function(err) {
		console.error('\n\n============================================================');
		console.error(err.stack);
		console.error('============================================================\n\n');

		console.error.apply(console, arguments);
	},
}


/**
 * Component to ask for pages and parse them by jQuery
 */
exports.Client = Client;
function Client(server) {
	this.cookies = new Cookies();
	this.server = server || '';
	this.log = true;
	this.calls = 0;
}
Client.prototype = {
	constructor: Client,

	get: function(url, post) {
		this.calls++;

		var cookies = this.cookies.toString();
		var method = post ? 'POST' : 'GET';
		var promise = new Promise();
		var config = {
			host: this.server,
			port: 80,
			path: url,
			method: method,
			headers: {
				'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7",
				'Cookie': cookies
			}
		};

		if (this.log)
			logger.info("Calling: " + method + " http://" + this.server + url);
		
		if (!post) {
			http.get(config, ClientPrivate.handleResponse(this, promise));
			return promise;
		}
		
		data = 'uni_url=' + this.server + '&' + ClientPrivate.createPost(post);
		config.headers['Content-Type'] = "application/x-www-form-urlencoded";
		config.headers['ContentLength'] = data.length;

		if (this.log)
			logger.info('\tPOST: ' + data);

		var request = http.request(config, ClientPrivate.handleResponse(this, resp, promise));
		request.write(data);
		request.end();

		return promise;
	},

	getNoCookies: function(url) {
		this.calls++;
		var promise = new Promise();
		http.get({ host: this.server, port: 80, path: url}, ClientPrivate.handleResponse(this, promise));

		if (this.log)
			logger.info("Calling: GET http://" + this.server + url);
		
		return promise;
	},

	query: function(url, post) {
		var promise = new Promise();
		this.get(url, post).then(ClientPrivate.handleJsDom(promise));
		return promise;
	},

	queryNoCookies: function(url) {
		var promise = new Promise();
		this.getNoCookies(url).then(ClientPrivate.handleJsDom(promise));
		return promise;
	}
};
var ClientPrivate = {
	createPost: function(post) {
		var result = [];
		for (var i in post)
			if (post.hasOwnProperty(i))
				result.push(escape(i) + '=' + escape(post[i]));
		return result.join('&');
	},

	handleResponse: function(self, promise) {
		return function(response) {
			self.cookies.parseNewCookies(response);
			var html = "";

			function stop() {
				response.removeListener('data', parseData);
			}

			response.on('data', function(buffer) {
				var block = buffer.toString('utf8', 0, buffer.length);
				html += block;
				promise.progress(block, stop);
			});

			response.on('end', function() {
				var end = html.indexOf('</html>');
				if (end !== -1)
					html = html.substr(0, end + 7)

				try {
					promise.complete(html);
				} catch (err) {
					logger.error(err);
					throw err;
				}
			});
		}
	},
	
	handleJsDom: function(promise) {
		return function(html) {
			jsdom.env({
				html: html,
				scripts: [ 'lib/jquery-1.6.4.min.js' ]
			}, function (error, window) {
				try {
					if (error)
						promise.fail(error);
					else
						promise.complete(window.jQuery, html);
				} catch (err) {
					logger.error(err);
					throw err;
				}
			});
		};
	}		
};

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


/**
 * Component to make fs storage easy
 */
exports.Storage = Storage;
function Storage(filename) {
	if (!filename)
		throw new Error('Storage needs a filename to save and load data');

	this.file = filename;
}
Storage.prototype = {
	constructor: Storage,

	save: function(json) {
		var prom = new Promise();
		fs.writeFile(this.file, JSON.stringify(json), 'utf8', function(error) {
			try {
				if (error)
					prom.fail(error);
				else
					prom.complete();
			} catch (err) {
				logger.error(err);
				throw err;
			}
		});
		return prom;
	},

	load: function() {
		var prom = new Promise();

		fs.readFile(this.file, 'utf8', function(error, data) {
			try {
				if (error || !data)
					prom.complete({});
				else
					prom.complete(JSON.parse(data));
			} catch (err) {
				logger.error(err);
				throw err;
			}
		});
		return prom;
	}
};


/**
 * Handles asyncronous petitions
 */
exports.Promise = Promise;
function Promise() {
	this._callbacks = [];
	this._errorHandlers = [];
	this._progressHandlers = [];

	this._args = null;
	this.error = null;

	//this._cancelled = false;
	this.state = 'unfulfilled';
}
Promise.completed = function() {
	var prom = new Promise();
	prom.complete.apply(prom, arguments);
	return prom;
};
Promise.failed = function() {
	var prom = new Promise();
	prom.fail.apply(prom, arguments);
	return prom;
};
Promise.binded = function() {
	var prom = new Promise();

	promise.then(function() {
		prom.complete.apply(prom, arguments);
	}, function() {
		prom.fail.apply(prom, arguments);
	}, function() {
		prom.progress.apply(prom, arguments);
	});

	return prom;
};
Promise.all = function() {
	var prom = new Promise();
	var all = arguments;
	var completed = [];
	var results = [];

	if (Object.prototype.toString.call(all[0]) === '[object Array]')
		all = all[0];

	var len = completed.length = all.length;
	for (var i = 0; i < len; i++)
		PromisePrivate.queueResults(prom, all[i], i, completed, results);

	return prom;
};
Promise.prototype = {
	constructor: Promise,

	/** Returns true if the promise was completed. */
	isCompleted: function() {
		return this.state === 'fulfilled';
	},

	/** Returns true if the promise failed. */
	isFailed: function() {
		return this.state === 'failed';
	},


	/**
	 * Notify the promise was completed and passes the promised value.
	 * It calls the callbacks passing the same arguments than complete recived.
	 */
	complete: function(/* varargs */) {
		this._checkValid();
		this.state = 'fulfilled';
		this._args = [];

		for (var i = 0, len = arguments.length; i < len; i++)
			this._args[i] = arguments[i];
		
		PromisePrivate.call(this._callbacks, this._args);
	},

	/**
	 * Notify there was an error retriving asyncronous value.
	 * It will call error handlers passing the error object.
	 *
	 * @param error {Error} Error thrown
	 */
	fail: function(error) {
		this._checkValid();
		this.state = 'failed';
		this.error = error;
		PromisePrivate.call(this._errorHandlers, [ error ]);
	},

	/**
	 * Notify the progress of the promise.
	 * It will call progress handlers with the same arguments than progress method recived.
	 */
	progress: function() {
		this._checkValid();
		var args = [];
		for (var i = 0, len = arguments.length; i < len; i++)
			args[i] = arguments[i];
		
		PromisePrivate.call(this._progressHandlers, args);
	},


	/**
	 * Adds completed, error and progress handlers at once.
	 *
	 * @param completed {Function} Handler to be fired when the promise is completed.
	 * @param error {Function} Handler to be fired when the promise fails.
	 * @param progress {Function} Handler to be fired when promise has a progress update.
	 */
	then: function(completed, error, progress) {
		this.onCompleted(completed);
		if (error) this.onError(error);
		if (progress) this.onProgress(progress);
	},


	onCompleted: function(handler, scope) {
		if (this.state === 'fulfilled') {
			handler.apply(scope, this._args);
		} else {
			this._callbacks.push({
				handler: handler,
				scope: scope
			});
		}
	},

	onError: function(handler, scope) {
		if (this.state === 'failed') {
			handler.call(scope, this._error);
		} else {
			this._errorHandlers.push({
				handler: handler,
				scope: scope
			});
		}
	},

	onProgress: function(handler, scope) {
		this._progressHandlers.push({
			handler: handler,
			scope: scope
		});
	},


	_checkValid: function() {
		if (this.state !== 'unfulfilled')
			throw new Error('Promise already fulfilled');
		
		if (this._cancelled)
			throw new Error('Promise cancelled');
	}
};
var PromisePrivate = {
	queueResults: function(prom, promise, index, completed, results) {
		promise.then(function() {
			var i, len;
			var args = [];

			for (i = 0, len = arguments.length; i < len; i++)
				args[i] = arguments[i];
			
			completed[index] = true;
			results[index] = args;

			for (i = 0, len = completed.length; i < len; i++)
				if (!completed[i])
					return;
			
			prom.complete(results);
		}, function(error) {
			prom.fail(error);
		});
	},

	call: function(callbacks, args) {
		var error = null;
		var json;
		for (i = 0, len = callbacks.length; i < len; i++) {
			json = callbacks[i];
			json.handler.apply(json.scope, args);
		}
	}
};