function Vegetarian() {
	Animal.apply(this, arguments);
	AnimalGraphic.apply(this, arguments);
	
	this.factorMaxVelocity = 30;
	
	this.food = [ Plant ];
}
Vegetarian.prototype = new Animal();
Vegetarian.prototype.toString = Phisics.idToString('Vegetarian');
