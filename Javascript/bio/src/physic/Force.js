Class('bio.physic.Force', {
	constructor: function Force(degrees, strength) {
		this.direction = new bio.physic.Vector(0, 0);
		this.strength = 0;
		this.setDirection(degrees);
		this.setStrength(strength);
	},


	getDirection: function() {
		return this.direction.getAngle();
	},
	setDirection: function(value) {
		this.direction.setAngle(value);
	},
	modifyDirection: function(addition) {
		this.direction.setAngle(this.direction.getAngle() + addition);
	},

	getDirectionRadians: function() {
		return this.direction.getAngleRadians();
	},
	setDirectionRadians: function(value) {
		this.direction.setAngleRadians(value);
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
	_fixStrength: function() {
		if (this.strength < 0) {
			this.direction.multiply(-1);
			this.strength *= -1;
		}
	},

	getVector: function() {
		return this.direction.clone().multiply(this.strength);
	},

	equals: function(target) {
		return this.getDirectionRadians() === target.setDirectionRadians() &&
			this.getStrength() === target.getStrength();
	},

	clone: function() {
		return new this.constructor(this.getDirection(), this.getStrength());
	},

	merge: function(force) {
		var flow = this.getVector(),
			force = force.getVector();
		flow.merge(force);
		this.setDirectionRadians(flow.getAngleRadians());
		this.setStrength(flow.getHypotenuse());
		return this;
	},

	toString: function toString() {
		return toString.base.call(this) + " { direction: " + this.getDirection() + ", strength: " + this.strength + "}";
	}
});
