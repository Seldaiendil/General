#library('bio.physic');
#import('Vector.dart');
#import('Force.dart');

class PhysicObject {
	//
	// FIELDS
	//
	Vector location;
	Vector size;
	Force movement;
	Force intent;
	double weight;


	//
	// CONSTRUCTORS
	//
	PysicObject([num x = 0], [num y = 0], [num width = 1], [num height = 1]) {
		location = new Vector(x, y);
		size = new Vector(width, height);
		movement = new Force(0, 0);
		intent = new Force(0, 0);
		weight = 0;
	}

	//
	// PROPERTIES
	//
	num get x() => location.x;
	    set x(num value) => location.x = value;
	num get y() => location.y;
	    set y(num value) => location.y = value;

	num get direction() => movement.direction;
	    set direction(num value) => movement.direction = value;
	num get velocity() => movement.strength;
	    set velocity(num value) => movement.strength = value;
	
	
	// Getters
	Vector get start() => location - (size / 2);
	Vector get end() => location + (size / 2);

	double get area() => size.x * size.y;


	//
	// METHODS
	//

	// Setters
	setPosition(num x, num y) {
		location.x = x;
		location.y = y;
	}
	setSize(num x, num y) {
		size.x = x;
		size.y = y;
	}

	// Compare with other objects
	num distance(target) {
		if (target is PhysicObject)
			target = target.location;
		if (!(target is Vector)
			throw new Error('[PhysicObject.distance(target)]: Target is not a vector');
		return (location - target).hypotenuse;
	}

	num angle(target) {
		if (target is PhysicObject)
			target = target.location;
		if (!(target is Vector)
			throw new Error('[PhysicObject.angle(target)]: Target is not a vector');
		return (location - target).angle;
	}

	bool testCollision(PhysicObject target) {
		var start = this.start;
		var end = this.end;
		var targetStart = target.start;
		var targetEnd = target.end;

		return (
			start.x < targetEnd.x &&
			start.y < targetEnd.y &&
			end.x > targetStart.x &&
			end.y > targetStart.y
		);
	}

	// Movement
	move() {
		location += movement;
		fireEvent('move', this, location.x, location.y);
	}
	shove(var degrees, num strength) {
		Force force;
		if (degrees is Force)
			force = degrees;
		else
			force = new Force(degrees, strength * (1 - weight));
		
		movement += force;
	}

	accelerate(num strength) {
		movement.strength += strength;
	}
	brake(num strength) {
		num result = movement.strength - strength;
		if (result < 0)
			result = 0;
		movement.strength = result;
	}

	stop() {
		movement = new Force(0, 0);
	}
	isStopped() {
		return Math.round(movement.strength * 10) == 0;
	}
}