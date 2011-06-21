Function.empty = function() { };
Function.prototype.extend = function(childClass) {
	var self = this;
	function extension() {
		self.apply(this, arguments);
		childClass.apply(this, arguments);
	}
	extension._pepe_ = childClass.name;
	extension.prototype = new this();
	extension.prototype.constructor = extension;
	extension.prototype._base_ = new this();
	return extension;
};
if (!Array.prototype.bind)
Function.prototype.bind = function(scope) {
	var self = this;
	return function() {
		self.apply(scope, arguments);
	};
};

/*
 * tricky methods
 */
Function.prototype.property = function(fieldName, readonly) {
	var propertyName = (fieldName.charAt(0).toUpperCase() + fieldName.substr(1)).replace(/_/, '');
	this.prototype['get' + propertyName] = function() {
		return this[fieldName];
	};
	if (readonly)
		return;
	this.prototype['set' + propertyName] = function(value) {
		this[fieldName] = value;
	};
};

if (!Array.prototype.splice)
Array.prototype.splice = function(start, remove/*, insert items... */) {
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
};
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
