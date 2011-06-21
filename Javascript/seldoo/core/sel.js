var sel = new (function sel() {
	function Namespace(name, parent) {
		this.name = name;
		this.parent = parent;
	
		parent[name] = this;
	}
	Namespace.global = new Namespace("GLOBAL", null);	
	Namespace.prototype.getName = function() {
		return this.name;
	};
	Namespace.prototype.getParent = function() {
		return this.parent;
	};
	Namespace.prototype.hasChild = function(childName) {
		return this.hasOwnProperty(childName);
	};
	Namespace.prototype.hasNamespace = function(namespace) {
		return this[namespace] instanceof Namespace;
	};
	Namespace.prototype.hasClass = function(clazz) {
		return this[clazz] instanceof Function;
	};
	Namespace.prototype.hasInterface = function(iface) {
		return this[iface] instanceof Interface;
	};
	Namespace.prototype.hasMixin = function(mixin) {
		return this[mixin] instanceof Mixin;
	};
		
	this.getNamespace = function(path) {
		var current = Namespace.global;
		
		for (var i=0, len=path.length; i<len; i++) {
			this.
			if (!current.hasNamespace(path[i])
				new Namespace(path[i], current);
			current = current[path[i]];
		}
		return current;
	};

})();



function Class(fullName, config) {
	config = config || {};
	interfaces = config.interfaces || [];
	mixins = config.mixins || [];
	
	var classHandler = new ClassHandler(fullName);
	classHandler.setBaseClass
	
	var clazz = function() {
		if (typeof config.inherits === 'function')
			config.inherits.call(this);
		if (typeof config.constructor === 'function')
			config.constructor.apply(this, arguments);
		
	};
	for (var i=mixins.length; i--; )
		mixins[i].apply(clazz);
	for (var i=interfaces.length; i--; )
		interfaces[i].check(clazz);
		
		sel.Array.forEach(config.properties || {}, function(item, object, count) {
			
		});
};

function ClassHandler(fullPath) {
	var path = fullPath.split('.');

	this.name = path.pop();
	this.fullPath = fullPath;
	this.namespace = sel.getNamespace(path);

	this.baseClass = null;
	this.interfaces = [];
	this.mixins = [];
	
	this.statics = [];
	this.staticsId = {};
	this.properties = [];
	this.propertiesId = {};
	this.methods = [];
	this.methodsId = {};
}
ClassHandler.prototype.getName = function() { return this.name; };
ClassHandler.prototype.setName = function(value) { this.name = value; };

ClassHandler.prototype.getFullPath = function() { return this.fullPath; };
ClassHandler.prototype.setFullPath = function(value) { this.fullPath = value; };

ClassHandler.prototype.getNamespace = function() { return this.namespace; };
ClassHandler.prototype.setNamespace = function(value) { this.namespace = value; };

ClassHandler.prototype.getBaseClass = function() { return this.base; };
ClassHandler.prototype.setBaseClass	= function(value) { this.base = value; };

ClassHandler.prototype.getInterface = function(index) { return this.interfaces[index]; };
ClassHandler.prototype.getInterfacesLength = function() { return this.interfaces.length; };
ClassHandler.prototype.addInterface = function(value) { this.interfaces.push(value); };

ClassHandler.prototype.getMixin = function(index) { return this.mixins[index]; };
ClassHandler.prototype.getMixinsLength = function() { return this.mixins.length; };
ClassHandler.prototype.addMixin = function(value) { this.mixins.push(value); };

ClassHandler.prototype.getStaticById = function(id) { return this.staticsId[index]; };
ClassHandler.prototype.getStatic = function(index) { return this.statics[index]; };
ClassHandler.prototype.getStaticsLength = function() { return this.statics.length; };
ClassHandler.prototype.addStatic = function(key, value) { this.statics.push(value); this.staticsId[key] = value; };

ClassHandler.prototype.getPropertyById = function(id) { return this.propertiesId[index]; };
ClassHandler.prototype.getProperty = function(index) { return this.properties[index]; };
ClassHandler.prototype.getPropertiesLength = function() { return this.properties.length; };
ClassHandler.prototype.addProperty = function(key, value) { this.properties.push(value); this.propertiesId[key] = value; };

ClassHandler.prototype.getMethodById = function(id) { return this.methodsId[index]; };
ClassHandler.prototype.getMethod = function(index) { return this.methods[index]; };
ClassHandler.prototype.getMethodsLength = function() { return this.methods.length; };
ClassHandler.prototype.addMethod = function(key, value) { this.methods.push(value); this.methodsId[key] = value; };




















