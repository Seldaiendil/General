oo.Class('bio.physic.PhysicObject', {
	constructor: function(x, y, width, height) {
		this.base(arguments);
		
		x = x || 0;
		y = y || 0;
		width = width || 1;
		height = height || 1;

		this.location = new bio.phisics.Vector(x, y);
		this.size = new bio.phisics.Vector(width, height);
		this.movement = new bio.phisics.Force(0, 0);

		this.weight = 0.0;
	},


	getMovement: function() { return this.movement; },
	getWeight: function() { return this.weight; },
	setWeight: function(value) { this.weight = value; },

	getWidth: function() { return this.size.x; },
	setWidth: function(value) { this.size.x = value; },
	getHeight: function() { return this.size.y; },
	setHeight: function(value) { this.size.y = value; },

	getX: function() { return this.location.x; },
	setX: function(value) { this.location.x = value; },
	getY: function() { return this.location.y; },
	setY: function(value) { this.location.y = value; },

	getEndX: function() {
		return this.location.x + this.size.x;
	},
	getEndY: function() {
		return this.location.y + this.size.y;
	},

	getPosition: function() {
		return this.location.copy();
	},
	setPosition: function(x, y) {
		this.location.x = x;
		this.location.y = y;
	},

	getArea: function() {
		return this.getWidth() * this.getHeight();
	},

	getSize: function() {
		return this.size.copy();
	},
	setSize: function(x, y) {
		y = typeof y === 'undefined' ? x : y;
		this.size.x = x;
		this.size.y = y;
	},

	getDirection: function() {
		return this.movement.getDirection();
	},
	setDirection: function(degree) {
		this.movement.setDirection(degree);
	},
	modifyDirection: function(degree) {
		this.movement.modifyDirection(degree);
	},

	getVelocity: function() {
		return this.movement.getStrength();
	},
	setVelocity: function(value) {
		this.movement.setStrength(value);
	},
	modifyVelocity: function(addition) {
		this.movement.modifyStrength(addition);
	},

	testCollision: function(target) {
		return (
			this.getX() < target.getEndX() &&
			this.getY() < target.getEndY() &&
			this.getEndX() > target.getX() &&
			this.getEndY() > target.getY()
		);
	},

	distance: function(target) {
		if (target instanceof bio.physic.PhysicObject)
			return this.objectDistance(target);
		return this.location.diff(target).getHypotenuse();
	},

	objectDistance: function(target) {
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
	},

	angle: function(target) {
		if (target instanceof bio.physic.PhysicObject)
			target = target.location;
		return target.diff(this.location).getAngle();
	},

	getNextPosition: function() {
		return this.location.copy().merge(this.movement.getVector());
	},

	move: function(noevent) {
		this.location.merge(this.movement.getVector());
		if (noevent)
			return;
		this.fireEvent('move', this.location.x, this.location.y);
	},

	shove: function(degrees, strength) {
		var force;
		if (degrees instanceof Force)
			force = degrees;
		else
			force = new Force(degrees, strength * (1 - this.weight));
		this.movement.merge(force);
	},

	accelerate: function(force) {
		this.setVelocity(this.getVelocity() + force);
	},

	brake: function(force) {
		var vel = this.getVelocity() - force;
		if (vel < 0)
			vel = 0;
		this.setVelocity(vel);
	},

	stop: function() {
		this.movement = new Force(0, 0);
	},

	isStopped: function() {
		return Math.round(this.movement.getStrength() * 10) === 0;
	}
});
