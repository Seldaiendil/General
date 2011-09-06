var Animal = (function() {
	function Animal(x, y, width, height) {
		LifeForm.call(this, x, y, width, height);
		
		// Factors used in algorythms
		this.factorVelocity = 1;
		//this.factorFoodEnergy = 100;
		this.factorVisibility = 10;
		this.factorMaxVelocity = 20;
		this.factorFoodMaxVelocity = 100;
		this.factorPredatorMaxVelocity = 20;
		this.factorReproductor = 150;
		this.factorSplitVelocity = 10;
		this.factorBrake = 0.5;
		this.factorEnergyLoss = 0.01;
		//this.factorEnergyFood = 0.0001;

		// private properties
		this.food = [];
		this.energy = 1;
		this.boored = false;
		this.childConstructor = Function.empty;

		// events
		this.onReproduce = new Event();
		this.onBeforeEat = new Event();
		this.onEat = new Event();
	}
	Animal.prototype = new LifeForm();
	Animal.property('childConstructor');

	Animal.prototype.addFood = function(foodClass) {
		this.food.push(foodClass);
	};
	Animal.prototype.isFood = function(target) {
		if (this === target || this.isFamily(target))
			return false;
		for (var i=this.food.length; i--; )
			if (target instanceof this.food[i])
				return true;
		return false;
	};
	Animal.prototype.eat = function(target) {
		this.onBeforeEat.fire(this, target);
		target.die();
		var relation = Math.sqrt((target.getArea() / this.getArea()) + 1);
		this.size.multiply(relation);
		this.onEat.fire(this, target);
	};
	Animal.prototype.fight = function(target) {
		if (target instanceof Animal)
			return this.getArea() > target.getArea();
		return true;
	};
	Animal.prototype.canReproduce = function() {
		return this.getArea() > this.factorReproductor;
	};
	Animal.prototype.reproduce = function() {
		var child = this.childConstructor(this);
		if (!(child instanceof Animal))
			throw new Error("childConstructor returns --[" + child + "]-- (" + (typeof child) + ")");
		var direction = Math.round(Math.random() * 380);
		var strength = this.factorSplitVelocity;
		this.size.multiply(0.5);
		this.shove(direction, strength);
		child.shove(direction + 180, strength);
		this.onReproduce.fire(child);
	};
	Animal.prototype.interact = function() {
		this.boored = true;
		// tmp are temporal properties to hold values between methods
		var initialShove =
		this.tmpCloserFood =
		this.tmpCloserPredator = new Force(0, 10000);
		this.tmpCurrentTarget = null;
		
		this.map.getRangeFromElement(this, this.size.x * this.factorVisibility).forEach(this.seeObject.bind(this));
		if (this.tmpCloserFood !== initialShove)
			this.shove(this.tmpCloserFood.getDirection(),
				(this.factorFoodMaxVelocity / this.tmpCloserFood.getStrength()) * this.factorVelocity);
		//if (this.tmpCloserPredator !== initialShove)
		//	this.shove(this.tmpCloserPredator.getDirection(),
		//		(this.factorPredatorMaxVelocity / this.tmpCloserPredator.getStrength()) * this.factorVelocity);
		
		// tmp properties are deleted
		delete this.tmpCloserFood;
		delete this.tmpCloserPredator;
		delete this.tmpCurrentTarget;
	};
	Animal.prototype.seeObject = function(target) {
		var distance = this.map.getElementsShorterDistance(this, target);//this.distance(target);
		if (this.isFood(target)) {
			this.hunt(target, distance);
		} else if (target instanceof Animal &&
			target.isFood(this) &&
			target.fight(this) &&
			distance < this.tmpCloserPredator.getStrength()) {
			this.tmpCloserPredator = new Force(target.angle(this), distance);
		}
	};
	Animal.prototype.hunt = function(target, distance) {
		if (this.testCollision(target)) {
			if (this.fight(target))
				this.eat(target);
		} else if (this.fight(target) && distance < this.tmpCloserFood.getStrength()) {
			this.boored = false;
			this.tmpCloserFood = new Force(this.angle(target), distance);
			this.tmpCurrentTarget = target;
		}
	};
	var base_shove = Animal.prototype.shove;
	Animal.prototype.shove = function(angle, distance) {
		base_shove.call(this, angle, distance);
		if (this.getVelocity() > this.factorMaxVelocity)
			this.setVelocity(this.factorMaxVelocity);
	};
	var base_tick = Animal.prototype.tick;
	Animal.prototype.tick = function() {
		if (this.isStopped())
			this.boored = true;
		if (this.boored) {
			// if boored move around
			this.modifyDirection(Math.round(Math.random() * 5) - 3);
			if (this.getVelocity() < 10)
				this.shove(this.getDirection(), Math.random() * this.factorVelocity);
		} else {
			this.brake(this.getVelocity() * this.factorBrake);
		}
		this.interact();
		this.move();
		if (this.canReproduce())
			this.reproduce();
		base_tick.apply(this, arguments);
	};
	Animal.prototype.toString = Phisics.idToString('Animal');
	return Animal;
})();