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

		var clazz = config.constructor || function() { this.base(arguments); };
		delete config.constructor;
		clazz.__proto__ = BaseClass;
		clazz.base = base;


		function middle() { };
		middle.prototype = base.prototype;
		clazz.prototype = new middle();
		var baseInstance = new middle();


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
			clazz.name = name;
			clazz.fullname = fullname;
			clazz.namespace = current;
		}

		return clazz;
	}

	var BaseClass = { };
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

		base: function(args /*, var_args... */) {
			if (!args.callee.base) {
				throw new Error(this + '.' + args.callee.name + ' Has no base method');
			}
			args.callee.base.apply(this, slice.call(arguments, 0, 1));
		},

		getId: function() {
			if (!this.__id__) {
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
			
			for (var i = 0, len = listeners.length; i < len; i++)
				listeners[i].handler.apply(listeners[i].scope, slice.call(arguments, 0, 1))
		},

		addListener: function(name, handler, scope) {
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
			return '[' + this.constructor.name + ' ' + this.__id__ + ']';
		}
	};


	ns.Class = Class;
	ns.Object = Base;
	return ns;
})({});