(function() {

	var Class = Object.extend = function(config) {
		config = config || {};
		var clazz = config.constructor;
		if (!config.hasOwnProperty('constructor'))
			clazz = function() { };
		
		var members = config.members || {};
		members.constructor = clazz;

		var privName, upperName;
		for (var i in config.properties) {
			privName = '__' + i;
			upperName = i.charAt(0).toUpperCase() + i.substring(1);

			if (!members.hasOwnProperty('get' + upperName))
				members['get' + upperName] = function() { return this[privName]; };
			if (!members.hasOwnProperty('set' + upperName))
				members['set' + upperName] = function(value) { this[privName] = value; };
		}

		clazz.prototype = members;
		clazz.extend = extend;
		return clazz;
	};

	function extend(config) {
		config = config || {};
		if (!config.hasOwnProperty('constructor'))
			config.constructor = function() { this.constructor.base.call(this); };

		var clazz = Class(config);
		clazz.base = this;
		var submembers = clazz.prototype;

		function intermediate() {}
		intermediate.prototype = this.prototype;
		var proto = clazz.prototype = new intermediate();

		var sub, parent;
		for (var i in submembers) {
			if (!submembers.hasOwnProperty(i))
				continue;

			sub = submembers[i];
			parent = proto[i];

			if (parent)
				sub.base = parent;

			proto[i] = sub;
		}
		
		return clazz;
	}

})();
