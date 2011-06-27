var Logger = (function() {
	function Logger() {
		this.tabulator;
		this.callStack;
		this.logData;
		this.errors;
		this.reset();
		this.template = templateHtml;
		this.cache = "";
		this.cache.logLength = 0;
	}
	Logger.Template = new Enum('TEXT', 'HTML');
	Logger.prototype.setTemplate = function(val) {
		this.template = val = Logger.Template.HTML ? templateHtml : templateText;
	};
	Logger.prototype.reset = function() {
		this.tabulator = 0;
		this.callStack = [];
		this.logData = [];
		this.errors = [];
	};
	Logger.prototype.log = function(message) {
		this.logData.push(tab.call(this) + message);
	};
	function tab() {
		var indent = [];
		for (var i=this.tabulator; i--; )
			indent.push(this.template.tab);
		return indent.join("");
	};
	Logger.prototype.logClass = function(target) {
		var target = target.prototype
		for (var i in target)
			if (typeof target[i] === 'function' && i !== 'toString' && i !== 'getId')
				this.logMethod(target, i);
	};
	Logger.prototype.logMethod = function(object, method) {
		var self = this;
		var original = object[method];
		object[method] = function() {
			var scope = this;
			var args = [];
			for (var i=arguments.length; i--; )
				args[i] = arguments[i];
			return intermediate.call(self, scope, args, original, method);
		};
		object[method].logged = true;
	};
	Logger.prototype.logIf = function(object, method, conditional) {
		var self = this;
		var original = object[method];
		object[method] = function() {
			if (!conditional.apply(this, arguments))
				return original.apply(this, arguments);
			var scope = this;
			var args = [];
			for (var i=arguments.length; i--; )
				args[i] = arguments[i];
			return intermediate.call(self, scope, args, original, method);
		};
		object[method].logged = true;
	};
	
	function intermediate(scope, args, original, method) {
		var signature = this.template.signature(scope, method, args);
		this.log(this.template.call.replace(/==SIGNATURE==/, signature));
		this.tabulator++;
		this.callStack.push(method);
		try {
			var result = original.apply(scope, args);
		} catch (err) {
			this.log(this.template.error.replace(/==ERROR_TYPE==/, err).replace(/==ERROR_MESSAGE==/, err.message));
			this.errors.push("Call --[" + signature + "]-- throws error --[" + err + "]-- with message --[" + err.message + "]--");
			endCall.call(this, method);
			throw err;
		}
		endCall.call(this, method, result);
		return result;
	}
	function endCall(method, result) {
		if (typeof result !== 'undefined')
			this.log(this.template.returns.replace(/==RETURN_VALUE==/, this.template.object(result)));
		this.tabulator--;
		this.callStack.shift();
		this.log(this.template.endCall.replace(/==METHOD==/, method));
	}
	function copyArray(target) {
		var result = [];
		for (var i=target.length; i--; )
			result[i] = target[i];
		return result;
	}
	Logger.prototype.getArrayLog = function(separator) {
		return copyArray(this.logData);
	};
	Logger.prototype.getLog = function() {
		if (this.cache.logLength === this.logData.length)
			return this.cache;
		this.cache = this.logData.join(this.template.newLine);
		this.cache.logLength = this.logData.length;
		return this.cache;
	};
	Logger.prototype.getErrors = function() {
		return copyArray(this.errors);
	};
	Logger.prototype.getCallStack = function() {
		return copyArray(this.callStack);
	};
	Logger.prototype.configureDiv = function() {
		this.div = Dom.create('div');
		this.cssShow = "Logger-div Logger-visible";
		this.cssHidden = "Logger-div Logger-hidden";
		this.divShown = false;
		this.div.className = this.cssHidden;
		document.body.appendChild(this.div);

		var self = this;
		Event.add(document, 'dblclick', function() {
			if (self.divShown) {
				self.div.className = self.cssHidden;
			} else {
				self.div.innerHTML = self.getLog();
				self.div.scrollTop = self.div.scrollHeigth;
				self.div.className = self.cssShow;
			}
			self.divShown = !self.divShown;
		});
	};

	var templateText = {
		object: function(object) {
			return object;
		},
		signature: function(object, funct, args) {
			return object + "." + funct + "(" + args.join(", ") + ")"
		},
		keys: function(code) {
			return this.openKey + '==' + code + '==' + this.closeKey;
		},
		openKey: '--[',
		closeKey: ']--',
		newLine: '\n',
		tab: '\t'
	};
	templateText.call = 'Call ' + templateText.keys("SIGNATURE");
	templateText.endCall = 'EndCall ' + templateText.keys("METHOD");
	templateText.error = 'Throws error ' + templateText.keys("ERROR_TYPE") +
		' with message ' + templateText.keys("ERROR_MESSAGE");
	templateText.returns = 'Returns ' + templateText.keys("RETURN_VALUE");

	var templateHtml = {
		object: function(object) {
			var type = object === null ? 'null' : typeof object;
			switch (type) {
				case 'string':
					return '<span class="Logger-object-string">"' + object + '"</span>';
					break;
				case 'boolean':
				case 'number':
					return '<span class="Logger-object-number">' + object + '</span>';
					break;
				case 'undefined':
				case 'null':
					return '<span class="Logger-object-' + type + '">' + object + '</span>';
					break;
				default:
					return '<span class="Logger-object">' + object + '</span>';
			}
		},
		signature: function(object, funct, args) {
			args = copyArray(args);
			var result = [
				'<span class="Logger-signature">', object.toString(),
				'.<span class="Logger-method">', funct, '</span><span class="Logger-globe">(</span>',
			];
			for (var i=0, len=args.length; i<len; i++)
				args[i] = templateHtml.object(args[i]);
			result.push(args.join(", "));
			result.push('<span class="Logger-globe">)</span></span>');
			return result.join("");
		},
		keys: function(className, code) {
			return this.openKey + '<span class="' + className + '">==' + code + '==</span>' + this.closeKey;
		},
		openKey: '<span class="Logger Logger-key">--[</span>',
		closeKey: '<span class="Logger Logger-key">]--</span>',
		newLine: '<br>',
		tab: '&nbsp;&nbsp;&nbsp;&nbsp;'
	};
	templateHtml.call = '<span class="Logger Logger-instruction">Call</span> ' +
		templateHtml.keys('Logger Logger-signature', "SIGNATURE"),
	templateHtml.endCall = '<span class="Logger Logger-instruction">EndCall</span> ' +
		templateHtml.keys('Logger Logger-method', "METHOD"),
	templateHtml.error = '<span class="Logger Logger-error"><span class="Logger Logger-instruction">Throws error </span> ' +
		templateHtml.keys('Logger Logger-error-type', "ERROR_TYPE") + ' with message ' +
		templateHtml.keys('Logger Logger-error-message', "ERROR_MESSAGE") + '</span>',
	templateHtml.returns = '<span class="Logger Logger-instruction">Returns </span>' +
		templateHtml.keys('Logger Logger-return', "RETURN_VALUE");
	
	return new Logger();
})();