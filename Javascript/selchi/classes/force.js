var Force = (function() {
	function Degree(value) {
		this.setValue(value);
	}
	function Degree_fix() {
		this.value = this.value || 0;
		this.value %= 360;
		if (this.value < 0)
			this.value += 360;
	};
	Degree.prototype.copy = function() {
		return new Degree(this.value);
	};
	Degree.prototype.add = function(val) {
		this.value += val;
		Degree_fix.call(this);
		return this;
	};
	Degree.prototype.substract = function(val) {
		this.value -= val;
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
	Degree.prototype.getValue = function() {
		return this.value;
	};
	Degree.prototype.setValue = function(val) {
		this.value = val;
		Degree_fix.call(this);
	};
	Degree.prototype.toString = function() {
		return "[object Degree] " + this.value;
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
	Force.prototype.equals = function(target) {
		return this.getDirection() === target.getDirection() &&
			this.getStrength() === target.getStrength();
	};
	Force.prototype.copy = function() {
		return new Force(this.getDirection(), this.getStrength());
	};
	Force.prototype.getDirection = function() {
		return this.direction.getValue();
	};
	Force.prototype.setDirection = function(val) {
		this.direction.setValue(val);
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
	Force.prototype.getVector = function() {
		return this.direction.toVector().multiply(this.getStrength());
	};
	Force.prototype.merge = function(force) {
		var flow = this.getVector(),
			force = force.getVector();
		flow.merge(force);
		this.setStrength(flow.getHypotenuse());
		this.setDirection(flow.getAngle());
		return this;
	};
	Force.prototype.toString = function() {
		return "[object Force] { direction: " + this.getDirection() + ", strength: " + this.strength + "}";
	};
	
	return Force;
})();