function Vector(x, y) {
	this.x = typeof x !== 'undefined' ? x : NaN;
	this.y = typeof y !== 'undefined' ? y : this.x;
}
Vector.prototype.equals = function(target) {
	return this.x === target.x && this.y === target.y;
};
Vector.prototype.copy = function() {
	return new Vector(this.x, this.y);
};
Vector.prototype.isZero = function() {
	return this.x === 0 && this.y === 0;
};
Vector.prototype.round = function(decimals) {
	decimals = typeof decimals === 'undefined' ? 2 : decimals;
	var operator = Math.pow(10, decimals);
	this.x = Math.round(this.x * operator) / operator;
	this.y = Math.round(this.y * operator) / operator;
	return this;
};
Vector.prototype.abs = function() {
	this.x = Math.abs(this.x);
	this.y = Math.abs(this.y);
	return this;
};
Vector.prototype.add = function(val) {
	this.x += val;
	this.y += val;
	return this;
};
Vector.prototype.multiply = function(val) {
	this.x *= val;
	this.y *= val;
	return this;
};
Vector.prototype.merge = function(vector) {
	this.x += vector.x;
	this.y += vector.y;
	return this;
};
Vector.prototype.diff = function(vector) {
	return new Vector(
		this.x - vector.x,
		this.y - vector.y
	);
};
Vector.prototype.getHypotenuse = function() {
	if (this.isZero())
		return 0;
	return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2), 2)
};
Vector.prototype.getAngleRadians = function() {
	if (this.isZero())
		return 0;
	var arctan = Math.atan(this.y / this.x);
	if (arctan < 0)
		arctan = Math.PI + arctan;
	if (this.y < 0 || (this.y === 0 && this.x < 0))
		arctan += Math.PI;
	return arctan;
};
Vector.prototype.getAngle = function() {
	var angle = this.getAngleRadians() / Math.PI * 180;
	while (angle < 0)
		angle += 360;
	return angle % 360;
};
Vector.prototype.toString = function() {
	return "[object Vector] { x: " + this.x + ", y: " + this.y + " }";
};
