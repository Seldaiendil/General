/** @requires bio.phisics.Vector */
qx.Class.define('bio.phisics.Force', { extend: qx.core.Object });
bio.phisics.Force = (function() {


	var Assert = qx.core.Assert;
	var Vector = bio.phisics.Vector;
	

	function Degree(value) {
		if (arguments.length > 0) {
			this.setValue(value);
		}
	}


	function Degree_fix() {
		this.value = this.value || 0;
		this.value %= 360;
		if (this.value < 0)
			this.value += 360;
	};


	Degree.prototype.getValue = function() {
		return this.value;
	};
	Degree.prototype.setValue = function(value) {
		if (qx.core.Environment.get('qx.debug')) {
			Assert.assertNumber(value, 'Value is not a number');
			if (isNaN(value)) {
				throw new qx.core.AssertionError('value is NaN');
			}
		}

		this.value = value;
		Degree_fix.call(this);
	};


	Degree.prototype.copy = function() {
		return new Degree(this.value);
	};


	Degree.prototype.add = function(value) {
		if (qx.core.Environment.get('qx.debug')) {
			Assert.assertNumber(value, 'Value is not a number');
			if (isNaN(value)) {
				throw new qx.core.AssertionError('value is NaN');
			}
		}

		this.value += value;
		Degree_fix.call(this);
		return this;
	};


	Degree.prototype.toRadian = function() {
		return this.value * Math.PI / 180;
	};


	Degree.prototype.toVector = function() {
		var radian = this.toRadian();
		return new Vector(Math.cos(radian), Math.sin(radian));
	};


	Degree.prototype.toString = function() {
		return "[class bio.phisics.Force.Degree] " + this.value;
	};



	function Force(degrees, strength) {
		this.direction = new Degree();
		this.strength = NaN;
		this.setDirection(degrees);
		this.setStrength(strength);
	}


	function Force_fixStrength() {
		if (this.strength < 0) {
			this.direction.setValue(this.direction.getValue() - 180);
			this.strength *= -1;
		}
	};


	Force.prototype.getDirection = function() {
		return this.direction.getValue();
	};
	Force.prototype.setDirection = function(value) {
		this.direction.setValue(value);
		return this;
	};
	Force.prototype.modifyDirection = function(addition) {
		this.direction.add(addition);
		return this;
	};


	Force.prototype.getStrength = function() {
		return this.strength;
	};
	Force.prototype.setStrength = function(val) {
		this.strength = val;
		Force_fixStrength.call(this);
		return this;
	};
	Force.prototype.modifyStrength = function(addition) {
		this.setStrength(this.getStrength() + addition);
		return this;
	};


	Force.prototype.equals = function(target) {
		if (qx.core.Environment.get('qx.debug')) {
			Assert.assertInstance(target, Force, 'Target is not instance of bio.phisics.Force');
		}

		return (
			this.getDirection() === target.getDirection() &&
			this.getStrength() === target.getStrength()
		);
	};


	Force.prototype.copy = function() {
		return new Force(this.getDirection(), this.getStrength());
	};


	Force.prototype.getVector = function() {
		return this.direction.toVector().multiply(this.getStrength());
	};


	Force.prototype.merge = function(target) {
		if (qx.core.Environment.get('qx.debug')) {
			Assert.assertInstance(target, Force, 'Target is not instance of bio.phisics.Force');
		}

		var flow = this.getVector(),
			force = target.getVector();
		flow.merge(force);
		this.setStrength(flow.getHypotenuse());
		this.setDirection(flow.getAngle());
		return this;
	};


	Force.prototype.toString = function() {
		return "[object bio.phisics.Force] { direction: " + this.getDirection() + ", strength: " + this.strength + "}";
	};

	
	return Force;
})();
