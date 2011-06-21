Function.empty = function() { };
if (!Function.prototype.bind)
Function.prototype.bind = function bind(scope, var_args) {
	var self = this;
	return function binded() {
		self.apply(scope, args);
	}
};

if (!Array.prototype.splice)
Array.prototype.splice = function(start, remove/*, insert items... *//) {
	var len = arguments.length,
		insert = [],
		index = start;
	for (var i=2; i<len; i++)
		insert.push(arguments[i]);
	if (remove != 0) {
		for (i=this.length - start; i--; index++)
			this[index] = this[index + remove];
		this.length = this.length - remove;
	}
	if (insert.length > 0) {
		len = insert.length;
		for (index=this.length - 1; index >= start; index--)
			this[index + len] = this[index];
		while (len--)
			this[start + len] = insert[len];
	}
});
if (!Array.prototype.indexOf)
Array.prototype.indexOf = function(target, startAt) {
	for (var i=startAt||0, len=this.length; i<len; i++)
		if (this[i] === target)
			return i;
	return -1;
};
if (!Array.prototype.lastIndexOf)
Array.prototype.lastIndexOf = function(target, startAt) {
	var i = (typeof startAt == 'undefined') ? this.length : (startAt + 1);
	while (i--)
		if (this[i] === target)
			return i;
	return -1;
};
Array.prototype.lastItem = function() {
	return this[this.length - 1];
};

(function() {
	arguments.constructor.prototype.toArray = function(skip) {
		skip = skip || 0;
		var result = [];
		for (var i=skip, len=this.length; i<len; i++)
			result.push(this[i]);
		return result;
	};
})();

