/*
 * Helper functions
 */
function getScreenSize() {
	var size = new bio.physic.Vector(document.body.clientWidth, document.body.clientHeight);
	getScreenSize = function() {
		return new bio.physic.Vector(
			500,
			200
		);
	};
	return getScreenSize();
}
function random(min, max) {
	if (typeof max === 'undefined') {
		max = min;
		min = 0; 
	}
	return Math.round(Math.random() * (max - min)) + min;
}
function randomPosition(objSize) {
	var screen = getScreenSize();
	return new bio.physic.Vector(
		random(screen.x - objSize),
		random(screen.y - objSize)
	);
}
function reproduceAnimal(parent) {
	var constructor = parent instanceof Carnivore ? Carnivore : Vegetarian;
	var animal = new constructor().configureAnimal_child(parent);
	//elements.push(animal);
	return animal;
};



/*
 * Configurations
 */
bio.controller.Map.prototype.configure = function() {
	var screen = getScreenSize();
	this.setCellSize(100);
	this.setColumns(Math.ceil(screen.x / this.getCellSize()));
	this.setRows(Math.ceil(screen.y / this.getCellSize()));
	this.reset();
	return this;
};
bio.physic.PhysicObject.prototype.configurePhisics = function(size) {
	var position = randomPosition(size);
	this.setPosition(position.x, position.y);
	this.setSize(size);
	return this;
};
bio.controller.Plant.prototype.configure = function(onDie) {
	this.configurePhisics(1);
	this.addListener('die', onDie);

	this.setView(new bio.view.Plant());
	return this;
};

bio.animal.Cell.prototype.configureCell = function(onReproduce, minSize, maxSize) {
	this.configurePhisics(random(5, 15));
	this.addListener('reproduce', onReproduce);

	var view = new bio.view.Cell();
	view.setColorSeed(random(255));
	this.setView(view);
	return this;
};
/*
bio.animal.Cell.prototype.configureCell_child = function(parent) {
	this.setColor((parent.getColor() + (random(50) - 25)) % 255);
	return this;
};
*/
bio.animal.cell.Carnivore.prototype.configure = function(onReproduce) {
	return this.configureCell(onReproduce, 7, 13);
};
bio.animal.cell.Vegetarian.prototype.configure = function(onReproduce) {
	return this.configureCell(onReproduce, 5, 10);
};



Class('bio.Main', {
	PLANTAS: 1,
	VEGETARIANOS: 1,
	CARNIVOROS: 0, 


	constructor: function() {
		var screen = getScreenSize();
		var canvas = document.createElement('canvas');
		canvas.setAttribute('width', screen.x + 'px');
		canvas.setAttribute('height', screen.y + 'px');
		document.body.appendChild(canvas);

		this.onPlantDie = this.onPlantDie.bind(this);
		this.onCellReproduce = this.onCellReproduce.bind(this);

		var map = new bio.controller.Map().configure();
		var al = new bio.ArtificialLife(map);

		al.setStep(300);

		al.add(this.PLANTAS,		this.createPlant.bind(this));
		al.add(this.VEGETARIANOS,	this.createVegetarian.bind(this));
		al.add(this.CARNIVOROS,		this.createCarnivore.bind(this));

		al.start(canvas.getContext('2d'));
	},


	createPlant: function() {
		return new bio.controller.Plant().configure(this.onPlantDie);
	},

	createVegetarian: function() {
		return new bio.animal.cell.Vegetarian().configure(this.onCellReproduce);
	},

	createCarnivore: function() {
		return new bio.animal.cell.Carnivore().configure(this.onCellReproduce);
	},


	onPlantDie: function() { },
	onCellReproduce: function() { }
});
