(function() {

	// Degree private class
	var Degree = Class({
		constructor: function Degree(value) {
			this.setValue(value);
		},


		_fix: function() {
			this.value = this.value || 0;
			this.value %= 360;

			if (this.value < 0)
				this.value += 360;
		},

		copy: function() {
			return new this.constructor(this.value);
		},

		add: function(val) {
			this.value += val;
			this._fix();
			return this;
		},

		substract: function(val) {
			this.value -= val;
			this._fix();
			return this;
		},

		toRadian: function() {
			return this.value * Math.PI / 180;
		},

		toVector: function() {
			var radian = this.toRadian();
			return new bio.physic.Vector(Math.cos(radian), Math.sin(radian));
		},

		getValue: function() {
			return this.value;
		},

		setValue: function(val) {
			this.value = val;
			this._fix();
		},

		toString: function() {
			return this.base(arguments) + ' ' + this.value;
		}
	});

	Class('bio.physic.Force', {
		constructor: function Force(degrees, strength) {
			this.direction = new Degree();
			this.strength = NaN;
			this.setDirection(degrees);
			this.setStrength(strength);
		},


		_fixStrength: function() {
			if (this.strength < 0) {
				this.direction.setValue(this.direction.getValue() - 180);
				this.strength *= -1;
			}
		},

		equals: function(target) {
			return this.getDirection() === target.getDirection() &&
				this.getStrength() === target.getStrength();
		},

		copy: function() {
			return new this.constructor(this.getDirection(), this.getStrength());
		},

		getDirection: function() {
			return this.direction.getValue();
		},

		getDirectionRadians: function() {
			return this.direction.toRadian();
		},

		setDirection: function(val) {
			this.direction.setValue(val);
			return this;
		},

		modifyDirection: function(addition) {
			this.direction.add(addition);
			return this;
		},

		getStrength: function() {
			return this.strength;
		},

		setStrength: function(val) {
			this.strength = val;
			this._fixStrength();
			return this;
		},

		modifyStrength: function(addition) {
			this.setStrength(this.getStrength() + addition);
			return this;
		},

		getVector: function() {
			return this.direction.toVector().multiply(this.getStrength());
		},

		merge: function(force) {
			var flow = this.getVector(),
				force = force.getVector();
			flow.merge(force);
			this.setStrength(flow.getHypotenuse());
			this.setDirection(flow.getAngle());
			return this;
		},

		toString: function() {
			return this.base(arguments) + " { direction: " + this.getDirection() + ", strength: " + this.strength + "}";
		}
	});
})();

