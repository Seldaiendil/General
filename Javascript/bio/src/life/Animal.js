bio.life.LifeForm.extend('bio.life.Animal', {
	constructor: function Animal() {
		Animal.base.call(this);
		
		this.food = [ bio.life.Plant ];

		this.factor['visibility'] = 10;
		this.factor['velocity'] = 1;
		this.factor['velocity hunting'] = 100;
		this.factor['velocity escaping'] = 20;
		this.factor['max velocity'] = 10;
		this.factor['interaction brake'] = 2;
	},


	// Abstract
	canReproduce: function() { },
	reproduce: function() { },
	_createChild: function() { },


	tick: function tick(map, context) {
		this.interact(map);

		//if (this.boored)
		//	this.shove(this.getDirection() + (Math.random() * 6 - 3), Math.random() * 3);

		tick.base.call(this, context);
	},

	interact: function(map) {
		var Force = bio.physic.Force;
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

		var neighbors = map.getRangeFromElement(this, this.size.x * this.factor['visibility']).getElements();

		var element;
		for (var i = neighbors.length; i--; ) {
			element = neighbors[i];

			if (!(element instanceof bio.map.Element) || element.destroyed())
				continue;

			this.seeObject(element, map, closer);
		}
		
		var food = closer.food.target;
		var predator = closer.food.predator;
		this.boored = true;

		if (food && !food.destroyed()) {
			this.boored = false;
			var velocity = (this.factor['velocity hunting'] - closer.food.distance) * this.factor['velocity'];
			if (velocity > 0) {
				//this.brake(this.factor['interaction brake']);
				this.shove(this.angle(food), velocity);
			}
		} else if (predator && !predator.destroyed()) {
			this.boored = false;
			this.shove(
				this.angle(predator),
				(this.factor['velocity escaping'] / closer.predator.distance) * this.factor['velocity']
			);
		}
	},

	seeObject: function(target, map, closer) {
		var distance = this.distance(target);//map.getShorterDistance(this, target);

		if (this.isFood(target)) {
			this.hunt(target, distance, closer.food);
		} else if (this.isPredator(target) && distance < closer.predator.distance) {
			closer.predator = {
				distance: distance,
				target: target
			};
		}
	},

	isFood: function(target) {
		if (this === target || this.isFamily(target))
			return false;
		
		for (var i = this.food.length; i--; )
			if (target instanceof this.food[i])
				return true;
		
		return false;
	},

	isPredator: function(target) {
		return target instanceof bio.life.Animal &&
			target.isFood(this) &&
			target.fight(this);
	},

	hunt: function(target, distance, closerFood) {
		// Not canivalism if possible
		if (!(closerFood.target instanceof this.constructor) && target instanceof this.constructor)
			return;

		if (!this.fight(target))
			return;
		
		if (this.testCollision(target)) {
			this.eat(target);
		} else if (distance < closerFood.distance) {
			closerFood.distance = distance;
			closerFood.target = target;
		}
	},

	fight: function(target) {
		if (target instanceof bio.life.Animal)
			return this.getArea() > target.getArea();
		return true;
	},

	eat: function(target) {
		// BeforeEat can be prevented
		if (this.fireEvent('beforeEat', this, target))
			return;

		var relation = Math.sqrt((target.getArea() / this.getArea()) + 1);
		this.size.multiply(relation);
		
		target.die();
		this.fireEvent('eat', this, target);
	},

	move: function move() {
		if (this.getVelocity() > this.factor['max velocity'])
			this.setVelocity(this.factor['max velocity']);

		move.base.call(this); 
	}
});
