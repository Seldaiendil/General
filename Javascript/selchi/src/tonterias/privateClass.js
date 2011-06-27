var PrivateClass = (function() {
	var id = 0;
	var prop = [];
	function propertiesContainer() {
		this.a = 2;
		this.b = "asdf";
	}
	
	function PrivateClass() {
		this.__id__ = id++;
		prop[this.__id__] = new propertiesContainer();
	}
	function PrivateClass_privateMethod() {
		return Math.pow(prop[this.__id__].a);
	}
	PrivateClass.prototype.publicMethod = function() {
		return PrivateClass_privateMethod.call(this);
	};
	return PrivateClass;
})();