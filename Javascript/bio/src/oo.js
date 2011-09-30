var oo = (function(ns) {

	// Multibrowser
	if ( typeof Object.getPrototypeOf !== "function" ) {
		if ( typeof "test".__proto__ === "object" ) {
			Object.getPrototypeOf = function(object){
				return object.__proto__;
			};
		} else {
			Object.getPrototypeOf = function(object){
				// May break if the constructor has been tampered with
				return object.constructor.prototype;
			};
		}
	}
	if ( typeof Object.keys !== "function" ) {
		Object.keys = function(obj) {
			var result = [];
			for (var i in obj)
				if (obj.hasOwnProperty(i))
					result[result.length] = i;
		};
	}


	// Class constructor
	function Class(fullname, base, config) {
		if (arguments.length === 1) {
			config = fullname
			fullname = null;
			base = Base;
		}
		if (arguments.length === 2) {
			config = base;
			base = Base;
		}

		var clazz;
		if (config.hasOwnProperty('constructor'))
			clazz = config.constructor;
		else
			clazz = function() { arguments.callee.base.call(this); };
		
		delete config.constructor;
		clazz.__proto__ = BaseClass;
		clazz.base = base;

		function middle() { };
		middle.prototype = base.prototype;
		var proto = clazz.prototype = new middle();
		proto.constructor = clazz;
		var baseInstance = new middle();


		if (config.hasOwnProperty('properties')) {
			var properties = config.properties;
			var prop, upper;

			for (var i = properties.length; i--; ) {
				prop = properties[i];
				upper = prop.charAt(0).toUpperCase() + prop.substr(1);

				proto['get' + upper] = Class.createGetter(prop);
				proto['set' + upper] = Class.createSetter(prop);
			}
		}


		var keys = Object.keys(config);
		var key, method;
		for (var i = keys.length; i--; ) {
			key = keys[i];
			method = clazz.prototype[key] = config[key];

			if (typeof baseInstance[key] === 'function') {
				method.base = baseInstance[key];
			}
		}

		if (fullname) {
			var current = window;
			var path = fullname.split('.');
			var name = path.pop();
			var pack;
			for (var i = 0, len = path.length; i < len; i++) {
				pack = path[i];
				if (!current[pack])
					current[pack] = {};
				current = current[pack];
			}

			current[name] = clazz;
			clazz.className = name;
			clazz.fullname = fullname;
			clazz.namespace = current;
		}

		return clazz;
	}

	Class.cacheG = {};
	Class.createGetter = function(name) {
		if (!this.cacheG[name]) {
			this.cacheG[name] = function() {
				return this[name];
			};
		}
		return this.cacheG[name];
	};
	Class.cacheS = {};
	Class.createSetter = function(name) {
		if (!this.cacheS[name]) {
			this.cacheS[name] = function(value) {
				this[name] = value;
			};
		}
		return this.cacheS[name];
	};

	function BaseClass() { }
	Class.extend = BaseClass.extend = function(fullname, config) {
		return Class(fullname, this, config);
	};



	// Base Object
	var uniqueID = 0;
	function Base() {
		this.__listeners__ = {};
		this.__id__ = uniqueID++;
	}
	var slice = Array.prototype.slice;
	Base.prototype = {

		constructor: Base,

		getId: function() {
			if (typeof this.__id__ !== 'number') {
				console.warn("Base constructor was not called on " + this);
			}

			return this.__id__;
		},
	
		fireEvent: function(name /*, var_args... */) {
			if (!this.__listeners__) {
				console.warn("Base constructor was not called on " + this);
			}

			var listeners = this.__listeners__[name];
			if (!listeners)
				return;
			
			var prevented = false;
			var args = slice.call(arguments, 1);

			for (var i = 0, len = listeners.length; i < len; i++)
				if (listeners[i].handler.apply(listeners[i].scope, args) === false)
					prevented = true;
			
			return prevented;
		},

		addListener: function(name, handler, scope) {
			if (!this.__listeners__) {
				console.warn("Base constructor was not called on " + this);
			}

			var listeners = this.__listeners__[name];
			if (!listeners)
				listeners = this.__listeners__[name] = [];
			listeners.push({ handler: handler, scope: scope || this });
		},

		removeListener: function(name, handler, scope) {
			if (!this.__listeners__)
				return false;

			var listeners = this.__listeners__[name];
			if (!listeners)
				return false;
			
			var list;
			for (var i = listeners.length; i--; ) {
				list = listeners[i];
				if (list.handler === handler && list.scope === scope) {
					listeners.slice(i, 1);
					return true;
				}
			}
			return false;
		},

		toString: function() {
			return '[' + this.constructor.className + ' ' + this.__id__ + ']';
		}
	};


	window.Class = Class;
	ns.Class = Class;
	ns.Object = Base;
	return ns;
})({});
