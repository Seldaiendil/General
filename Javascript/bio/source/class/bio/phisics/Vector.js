qx.Class.define('bio.phisics.Vector', { extend: qx.core.Object });
bio.phisics.Vector = (function() {


	var Assert = qx.core.Assert;
	var decimalsCache = {};


	function Vector(x, y) {
		this.x = this.y = NaN;
		var len = arguments.length;
		if (len > 0) {
			this.x = x;
			if (len > 1) {
				this.y = y;
			}
		}
	}


	Vector.prototype.getX = function() {
		return this.x;
	};
	Vector.prototype.setX = function(value) {
		if (qx.core.Environment.get('qx.debug')) {
			Assert.assertNumber(value, 'Value is not a number');
			if (isNaN(value)) {
				throw new qx.core.AssertionError('value is NaN');
			}
		}
		this.x = value;
	};


	Vector.prototype.getY = function() {
		return this.y;
	};
	Vector.prototype.setY = function(value) {
		if (qx.core.Environment.get('qx.debug')) {
			Assert.assertNumber(value, 'Value is not a number');
			if (isNaN(value)) {
				throw new qx.core.AssertionError('value is NaN');
			}
		}
		this.y = value;
	};


	Vector.prototype.equals = function(target) {
		if (qx.core.Environment.get('qx.debug')) {
			Assert.assertInstance(target, Vector, 'Target is not instance of bio.phisics.Vector');
		}

		return this.x === target.x && this.y === target.y;
	};


	Vector.prototype.copy = function() {
		return new Vector(this.x, this.y);
	};


	Vector.prototype.isZero = function() {
		return this.x === 0 && this.y === 0;
	};


	Vector.prototype.round = function(decimals) {
		if (!(decimals in decimalsCache)) {
			var dec = arguments.length > 0 ? decimals : 2;
			decimalsCache[decimals] = Math.pow(10, dec);
		}

		var operator = decimalsCache[decimals];
		this.x = Math.round(this.x * operator) / operator;
		this.y = Math.round(this.y * operator) / operator;
		return this;
	};


	Vector.prototype.abs = function() {
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
		return this;
	};


	Vector.prototype.add = function(value) {
		if (qx.core.Environment.get('qx.debug')) {
			Assert.assertNumber(value, 'Value is not a number');
			if (isNaN(value)) {
				throw new qx.core.AssertionError('value is NaN');
			}
		}

		this.x += value;
		this.y += value;
		return this;
	};


	Vector.prototype.multiply = function(value) {
		if (qx.core.Environment.get('qx.debug')) {
			Assert.assertNumber(value, 'Value is not a number');
			if (isNaN(value)) {
				throw new qx.core.AssertionError('value is NaN');
			}
		}

		this.x *= value;
		this.y *= value;
		return this;
	};


	Vector.prototype.merge = function(target) {
		if (qx.core.Environment.get('qx.debug')) {
			Assert.assertInstance(target, Vector, 'Target is not instance of bio.phisics.Vector');
		}

		this.x += target.x;
		this.y += target.y;
		return this;
	};


	Vector.prototype.diff = function(target) {
		if (qx.core.Environment.get('qx.debug')) {
			Assert.assertInstance(target, Vector, 'Target is not instance of bio.phisics.Vector');
		}

		return new Vector(
			this.x - target.x,
			this.y - target.y
		);
	};


	Vector.prototype.getHypotenuse = function() {
		if (this.isZero()) {
			return 0;
		}
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2), 2)
	};


	Vector.prototype.getAngleRadians = function() {
		if (this.isZero()) {
			return 0;
		}
		var arctan = Math.atan(this.y / this.x);
		if (arctan < 0) {
			arctan += Math.PI;
		}
		if (this.y < 0 || (this.y === 0 && this.x < 0)) {
			arctan += Math.PI;
		}
		return arctan;
	};


	Vector.prototype.getAngle = function() {
		var angle = this.getAngleRadians() / Math.PI * 180;
		while (angle < 0) {
			angle += 360;
		}
		return angle % 360;
	};


	Vector.prototype.toString = function() {
		return "[class bio.phisics.Vector] { x: " + this.x + ", y: " + this.y + " }";
	};


	return Vector;
})();