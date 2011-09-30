Class('bio.physic.PhysicObject', {
	constructor: function PhysicObject(x, y, width, height) {
		PhysicObject.base.call(this);
		
		x = x || 0;
		y = y || 0;
		width = width || 1;
		height = height || 1;

		this.location = new bio.physic.Vector(x, y);
		this.size = new bio.physic.Vector(width, height);
		this.movement = new bio.physic.Force(0, 0);
		this.view = null;

		this.weight = 0.0;
	},

	properties: [ 'weight' ],


	getMovement: function() { return this.movement; },

	getWidth: function() { return this.size.x; },
	setWidth: function(value) { this.size.x = value; },
	getHeight: function() { return this.size.y; },
	setHeight: function(value) { this.size.y = value; },

	getX: function() { return this.location.x; },
	setX: function(value) { this.location.x = value; },
	getY: function() { return this.location.y; },
	setY: function(value) { this.location.y = value; },

	getStartX: function() {
		return this.location.x - this.size.x / 2;
	},
	getStartY: function() {
		return this.location.y - this.size.y / 2;
	},

	getEndX: function() {
		return this.location.x + this.size.x / 2;
	},
	getEndY: function() {
		return this.location.y + this.size.y / 2;
	},

	getPosition: function() {
		return this.location.copy();
	},
	setPosition: function(x, y) {
		this.location.x = x;
		this.location.y = y;
	},

	getSize: function() {
		return this.size.copy();
	},
	setSize: function(x, y) {
		y = typeof y === 'undefined' ? x : y;
		this.size.x = x;
		this.size.y = y;
	},
	getArea: function() {
		return this.size.x * this.size.y;
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
			this.getStartX() < target.getEndX() &&
			this.getStartY() < target.getEndY() &&
			this.getEndX() > target.getStartX() &&
			this.getEndY() > target.getStartY()
		);
	},

	distance: function(target) {
		if (target instanceof bio.physic.PhysicObject)
			target = target.location;
		return this.location.diff(target).getHypotenuse();
	},

	angle: function(target) {
		if (target instanceof bio.physic.PhysicObject)
			target = target.location;
		return target.diff(this.location).getAngle();
	},

	getNextPosition: function() {
		return this.location.copy().merge(this.movement.getVector());
	},

	_move: function() {
		this.location.merge(this.movement.getVector());
	},
	move: function() {
		this._move();
		this.fireEvent('move', this, this.location.x, this.location.y);
	},

	shove: function(degrees, strength) {
		var force;
		if (degrees instanceof bio.physic.Force)
			force = degrees;
		else
			force = new bio.physic.Force(degrees, strength * (1 - this.weight));
		this.movement.merge(force);
	},

	accelerate: function(force) {
		this.movement.modifyStrength(force);
	},

	brake: function(force) {
		var vel = this.movement.getStrength() - force;
		if (vel < 0)
			vel = 0;
		this.movement.setStrength(vel);
	},

	stop: function() {
		this.movement = new bio.physic.Force(0, 0);
	},

	isStopped: function() {
		return Math.round(this.movement.getStrength() * 10) === 0;
	}
});
