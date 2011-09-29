bio.controller.LifeForm.extend('bio.controller.Animal', {
	constructor: function Animal() {
		this.base(arguments);

		this.food = [];
		this.energy = 1;
		this.boored = false;

		// Basic factors
		this.factor['visibility'] = 10;

		// Timelapse factors
		this.factor['friction'] = 0.5;
		this.factor['energy loss'] = 0.01;

		// Velocity factors
		this.factor['velocity'] = 1;
		this.factor['max velocity'] = 20;
		this.factor['max velocity hunting'] = 100;
		this.factor['max velocity escaping'] = 20;
	},


	addFood: function(foodClass) {
		this.food.push(foodClass);
	},

	isFood: function(target) {
		if (this === target || this.isFamily(target))
			return false;
		
		for (var i = this.food.length; i--; )
			if (target instanceof this.food[i])
				return true;
		return false;
	},

	eat: function(target) {
		this.fireEvent('beforeEat', this, target);

		target.die();
		var relation = Math.sqrt((target.getArea() / this.getArea()) + 1);
		this.size.multiply(relation);

		this.fireEvent('eat', this, target);
	},

	fight: function(target) {
		if (target instanceof bio.controller.Animal)
			return this.getArea() > target.getArea();
		return true;
	},

	// Abstract
	canReproduce: function() { },
	reproduce: function() {},
	_createChild: function() {},

	interact: function(map) {
		this.boored = true;
		var Force = bio.physic.Force;

		var initialShove = new Force(0, Infinity)
		var closer = {
			food: {
				distance: Infinity,
				target: null
			},
			predator: {
				distance: Infinity,
				target: null
			}
		};

		var neighbors = map.getRangeFromElement(this, this.size.x * this.factor['visibility']);

		console.debug(neighbors.toString());
		for (var i = neighbors.length(); i--; ) {
			this.seeObject(neighbors.get(i), map, closer);
		}

		var food = closer.food.target;
		var predator = closer.predator.target;
		if (food) {
			this.shove(this.angle(food),
				(this.factor['max velocity hunting'] / closer.food.distance) * this.factor['velocity']
			);
		} else if (predator) {
			this.shove(predator.angle(this),
				(this.factor['max velocity escaping'] / closer.predator.distance) * this.factor['velocity']
			);
		}
	},

	seeObject: function(target, map, closer) {
		var distance = map.getElementsShorterDistance(this, target);

		if (this.isFood(target)) {
			this.hunt(target, distance, closer.food);
		} else {
			if (target instanceof bio.controller.Animal &&
				target.isFood(this) &&
				target.fight(this) &&
				distance < closer.predator.distance) {
				
				closer.predator = {
					distance: distance,
					target: target
				};
			}
		}
	},

	hunt: function(target, distance, closerFood) {
		if (!this.fight(target))
			return;

		if (this.testCollision(target)) {
			this.eat(target);
		} else if (distance < closerFood.distance) {
			this.boored = false;

			closerFood.distance = distance;
			closerFood.target = target;
		}
	},

	shove: function(angle, distance) {
		this.base(arguments, angle, distance);

		if (this.getVelocity() > this.factor['max velocity'])
			this.setVelocity(this.factor['max velocity']);
	},

	tick: function(map, context) {
		if (this.isStopped())
			this.boored = true;

		this.interact(map);
		
		if (this.boored) {
			// if boored move around
			this.modifyDirection(Math.round(Math.random() * 5) - 3);
			if (this.getVelocity() < 10)
				this.shove(this.getDirection(), Math.random() * 2 * this.factor['velocity']);
		}


		this.brake(this.getVelocity() * this.factor['friction']);
		this.move();
		
		this.base(arguments, context);
	}
});
