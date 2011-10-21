Object.defineProperty(Object.prototype, "extend", {
    enumerable: false,
    value: function(methods) {
    	for (var i in this) {
    		if (!(i in methods))
    			methods[i] = this[i];
    	}
        return methods;
    }
});