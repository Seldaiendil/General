var Carnivore = (function() {
	function Carnivore() {
		Animal.apply(this, arguments);
		AnimalGraphic.apply(this, arguments);
		
		//this.factorVisibility = 10;
		this.factorReproductor = 14 * 14;
		//this.factorFoodMaxVelocity = 200;
		
		this.food = [ Animal ];
	}
	Carnivore.prototype = new Animal();

	var base_hunt = Carnivore.prototype.hunt;
	Carnivore.prototype.hunt = function(target, distance) {
		if ((this.tmpCurrentTarget instanceof Vegetarian) && (target instanceof Carnivore))
			return;
		base_hunt.apply(this, arguments);
	};

	Carnivore.prototype.toString = Phisics.idToString('Carnivore');
	return Carnivore;
})();