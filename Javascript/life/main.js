ArtificialLife.prototype.configure = function() {
	this.setPlants(100);
	this.setVegetarians(50);
	this.setCarnivores(10);
	this.setPrintMap(false);
	this.setStep(100);
	
	this.populate();
	return this;
};

Event.onReady.add(function() {
	Logger.configureDiv();
	var life = new ArtificialLife().configure().start();
});
