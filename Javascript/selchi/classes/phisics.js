var Phisics = (function() {
	var uniqueID = 0;
	function Phisics(x, y, width, height) {
		x = typeof x !== 'undefined' ? x : 0;
		y = typeof y !== 'undefined' ? y : 0;
		width = typeof width !== 'undefined' ? width : 1;
		height = typeof height !== 'undefined' ? height : 1;
		this.location = new Vector(x, y);
		this.size = new Vector(width, height);
		this.movement = new Force(0, 0);

		this.id = uniqueID++;
		this.weight = 0.0;

		this.onMove = new Event();
	}
	Phisics.idToString = function(className) {
		var text = "[object " + className + "] { id: ";
		return function() {
			return text + this.id + " }";
		};
	};
	Phisics.property('id', true);
	Phisics.property('movement', true);
	Phisics.property('weight');
	Phisics.prototype.setX = function(value) { this.location.x = value; }
	Phisics.prototype.setY = function(value) { this.location.y = value; }
	Phisics.prototype.setWidth = function(value) { this.size.x = value > 0 ? value : 0; }
	Phisics.prototype.setHeight = function(value) { this.size.y = value > 0 ? value : 0; }
	Phisics.prototype.getX = function() { return this.location.x; };
	Phisics.prototype.getY = function() { return this.location.y; };
	Phisics.prototype.getWidth = function() { return this.size.x; };
	Phisics.prototype.getHeight = function() { return this.size.y; };
	Phisics.prototype.getEndX = function() {
		return this.location.x + this.size.x;
	};
	Phisics.prototype.getEndY = function() {
		return this.location.y + this.size.y;
	};
	Phisics.prototype.getArea = function() {
		return this.getWidth() * this.getHeight();
	};
	Phisics.prototype.getPosition = function() {
		return this.location.copy();
	};
	Phisics.prototype.setPosition = function(x, y) {
		this.location.x = x;
		this.location.y = y;
	};
	Phisics.prototype.getSize = function() {
		return this.size.copy();
	};
	Phisics.prototype.setSize = function(x, y) {
		y = typeof y === 'undefined' ? x : y;
		this.size.x = x;
		this.size.y = y;
	};
	Phisics.prototype.getDirection = function() {
		return this.movement.getDirection();
	};
	Phisics.prototype.setDirection = function(degree) {
		this.movement.setDirection(degree);
	};
	Phisics.prototype.modifyDirection = function(degree) {
		this.movement.modifyDirection(degree);
	};
	Phisics.prototype.getVelocity = function() {
		return this.movement.getStrength();
	};
	Phisics.prototype.setVelocity = function(value) {
		this.movement.setStrength(value);
	};
	Phisics.prototype.modifyVelocity = function(addition) {
		this.movement.modifyStrength(addition);
	};
	Phisics.prototype.testCollision = function(target) {
		return (
			this.getX() < target.getEndX() &&
			this.getY() < target.getEndY() &&
			this.getEndX() > target.getX() &&
			this.getEndY() > target.getY()
		);
	};
	Phisics.prototype.distance = function(target) {
		if (target instanceof Phisics)
			return this.objectDistance(target);
			//target = target.location;
		return this.location.diff(target).getHypotenuse();
	};
	Phisics.prototype.objectDistance = function(target) {
		var isThisBiggerX = this.location.x > target.location.x;
		var isThisBiggerY = this.location.y > target.location.y;
		var point1 = new Vector(
			isThisBiggerX ? this.location.x : this.getEndX(),
			isThisBiggerY ? this.location.y : this.getEndY()
		);
		var point2 = new Vector(
			isThisBiggerX ? target.getEndX() : target.location.x,
			isThisBiggerY ? target.getEndY() : target.location.y
		);
		return point1.diff(point2).getHypotenuse();
	};
	Phisics.prototype.angle = function(target) {
		if (target instanceof Phisics)
			target = target.location;
		return target.diff(this.location).getAngle();
	};
	Phisics.prototype.getNextPosition = function() {
		return this.location.copy().merge(this.movement.getVector());
	};
	Phisics.prototype.move = function() {
		this.location.merge(this.movement.getVector());
		this.onMove.fire(this.location);
	};
	Phisics.prototype.shove = function(degrees, strength) {
		var force;
		if (degrees instanceof Force)
			force = degrees;
		else
			force = new Force(degrees, strength * (1 - this.weight));
		this.movement.merge(force);
	};
	Phisics.prototype.accelerate = function(force) {
		this.setVelocity(this.getVelocity() + force);
	};
	Phisics.prototype.brake = function(force) {
		var vel = this.getVelocity() - force;
		if (vel < 0)
			vel = 0;
		this.setVelocity(vel);
	};
	Phisics.prototype.stop = function() {
		this.movement = new Force(0, 0);
	};
	Phisics.prototype.isStopped = function() {
		return Math.round(this.movement.getStrength() * 10) === 0;
	};
	Phisics.prototype.toString = Phisics.idToString('Phisics');

	return Phisics;
})();
