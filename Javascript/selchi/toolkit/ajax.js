var Ajax = (function() {
	var isIE = Selchi.isIE();

	function AjaxResponse(request) {
		this.request_ = request;
	}
	AjaxResponse.prototype.getText = function() {
		return this.request_.responseText;
	};
	AjaxResponse.prototype.getXml = function() {
		return this.request_.responseXML;
	};
	AjaxResponse.prototype.getJson = function() {
		try {
			return eval('(' + this.request_.responseText + ')');
		} catch (err) {
			throw new Error("Malformed JSON recived by AJAX:\n" + this.request_.responseText);
		}
	};

	function Ajax(url, postData, usePost, async) {
		var self = this;
		this.url_ = url;
		this.basePost_ = postData || {};
		this.method_ = usePost !== undefined ? usePost : Ajax.Method.POST;
		this.async_ = typeof async === 'boolean' ? async : true;
		this.request_ = getRequestObject();
		this.onSuccess = new Event(function(response) { });
		this.onError = new Event(function(response) { });

		function onReadyStateChange() {
			if (!self.async_ || self.request_.readyState != 4)
				return
			this.busy_ = false;
			(self.request_.status==200 ? self.onSuccess : self.onError).fire(new AjaxResponse(self.request_));
		}
		if (isIE)
			this.request_.onReadystatechange = onReadyStateChange;
		else
			Event.add(this.request_, 'readystatechange', onReadyStateChange);
		}
	Ajax.property('url_');
	Ajax.property('basePost_');
	Ajax.property('method_');
	Ajax.property('async_');
	Ajax.Method = new Enum('GET', 'POST')

	Ajax.prototype.isBusy = function() {
		return this.busy_;
	};
	Ajax.prototype.call = function(postData) {
		if (this.busy_)
			return;
		this.busy_ = true;
		var post = parsePost(this.basePost_, postData);
		var url = this.url_;
		if (this.method_ = Ajax.Method.GET) {
			url += (url.indexOf('?') == -1 ? '?' : '&') + post;
			post = null;
			this.request_.open('GET', url, this.async_);
		} else {
			this.request_.open('POST', url, this.async_);
			this.request_.setRequestHeader("Method", "POST " + url + " HTTP/1.5");
			this.request_.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
		this.request_.send(post);
		if (!this.async_) {
			this.busy_ = false;
			return new AjaxResponse(this.request_);
		}
	};

	function parsePost(base, post) {
		var result = [],
			data = {};
		for (var i in base)
			data[i] = base[i];
		for (i in post)
			data[i] = post[i];
		for (i in data)
			result.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
		return result.join("");
	}

	var getRequestObject =
		isIE ?
		function() {
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					return new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e2) {
					throw new Error("Ajax not supported");
				}
			}
		} :
		function() {
			return new XMLHttpRequest();
		};

	return Ajax;
})();
