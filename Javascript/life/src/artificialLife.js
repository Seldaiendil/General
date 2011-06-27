var ArtificialLife = (function() {
	/*
	 * Helper functions
	 */
	function getScreenSize() {
		var size = new Vector(document.body.clientWidth, document.body.clientHeight);
		getScreenSize = function() {
			return size;
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
		return new Vector(
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
	Map.prototype.configure = function() {
		var screen = getScreenSize();
		this.setCellSize(10);
		this.setColumns(Math.ceil(screen.x / this.getCellSize()));
		this.setRows(Math.ceil(screen.y / this.getCellSize()));
		this.clear();
		return this;
	};
	Phisics.prototype.configurePhisics_randomLocation = function(size) {
		var position = randomPosition(size);
		this.setPosition(position.x, position.y);
		this.setSize(size);
		return this;
	};
	LifeForm.prototype.configureGraphics = function(map) {
		this.setContainer(document.body);
		this.render();
		this.setMap(map);
		map.addElement(this);
		return this;
	};
	Plant.prototype.configure = function(map, onDie) {
		this.configurePhisics_randomLocation(1);
		this.configureGraphics(map);
		this.onDie.add(onDie);
		return this;
	};
	Animal.prototype.configurePhisics_child = function(parent) {
		this.setPosition(parent.getX(), parent.getY());
		this.setHeight(parent.getHeight() / 2);
		this.setWidth(parent.getWidth() / 2);
		return this;
	};
	Animal.prototype.configureAnimal_basicConfiguration = function(map, onReproduce) {
		this.setChildConstructor(reproduceAnimal);
		this.onReproduce.add(onReproduce);
		this.onReproduceHanlder = onReproduce;
		this.configureGraphics(map);
		return this;
	};
	Animal.prototype.configureAnimal = function(map, onReproduce, minSize, maxSize) {
		this.configurePhisics_randomLocation(random(5, 15));
		this.configureAnimal_basicConfiguration(map, onReproduce);
		this.setColor(random(255));
		return this;
	};
	Animal.prototype.configureAnimal_child = function(parent) {
		this.addParent(parent);
		this.configurePhisics_child(parent);
		this.configureAnimal_basicConfiguration(parent.map, parent.onReproduceHanlder);
		this.setColor((parent.getColor() + (random(50) - 25)) % 255);
		return this;
	};
	Carnivore.prototype.configure = function(map, onReproduce) {
		return this.configureAnimal(map, onReproduce, 7, 13);
	};
	Vegetarian.prototype.configure = function(map, onReproduce) {
		return this.configureAnimal(map, onReproduce, 5, 10);
	};

	/*
	 * Class
	 */
	function ArtificialLife() {
		// private vars
		this.map = null;
		this.elements = [];
		this.deadPlants = 0;
		this.ticks = 0;
		this.interval = null;
		this.events = {
			'document_click': null
		};
		
		// events handlers
		this.onAnimalReproduce = ArtificialLife_onAnimalReproduceHandler.bind(this);
		this.onPlantDie = ArtificialLife_onPlantDieHandler.bind(this);
		
		// parameters
		this.step = 1;
		this.plants = 10;
		this.vegetarians = 5;
		this.carnivores = 1;
		this.printMap = false;
		
		// events
		this.onGameOver = new Event();
	}
	ArtificialLife.property('step');
	ArtificialLife.property('plants');
	ArtificialLife.property('vegetarians');
	ArtificialLife.property('carnivores');
	ArtificialLife.property('printMap');
	function ArtificialLife_onAnimalReproduceHandler(child) {
		this.elements.push(child);
	}
	function ArtificialLife_onPlantDieHandler(plant) {
		this.deadPlants++;
	}
	function ArtificialLife_document_click() {
		if (this.interval)
			this.pause();
		else
			this.play();
	}
	ArtificialLife.prototype.executeElementsTick = function() {
		for (var i=this.elements.length; i--; )
			if (!this.elements[i].isDead())
				this.elements[i].tick();
	};
	ArtificialLife.prototype.restoreDeadPlants = function() {
		for (var i=this.deadPlants; i--; )
			this.elements.push(new Plant().configure(this.map, this.onPlantDie));
		this.deadPlants = 0;
	};
	ArtificialLife.prototype.clean = function() {
		var list = this.elements;
		var alive = [];
		for (var i=0; i<list.length; i++)
			if (!list[i].isDead())
				alive.push(list[i]);
		this.elements = alive;
	};
	ArtificialLife.prototype.checkIsOver = function() {
		for (var i=this.elements.length; i--; )
			for (var j=this.elements.length; j--; )
				if (this.elements[i].isFood && this.elements[i].isFood(this.elements[j]))
					return;
		alert("Game Over");
		this.pause();
		this.onGameOver.fire(this.elements);
	};
	ArtificialLife.prototype.tick = function() {
		this.executeElementsTick();
		this.restoreDeadPlants();
		this.clean();
		if (this.ticks % 50 === 0)
			this.checkIsOver();
		this.ticks++;
		return this;
	};
	ArtificialLife.prototype.populate = function() {
		this.map = new Map().configure();
		for (var i=this.plants; i--; )
			this.elements.push(new Plant().configure(this.map, this.onPlantDie));
		for (var i=this.vegetarians; i--; )
			this.elements.push(new Vegetarian().configure(this.map, this.onAnimalReproduce));
		for (var i=this.carnivores; i--; )
			this.elements.push(new Carnivore().configure(this.map, this.onAnimalReproduce));
		if (this.printMap)
			this.map.print(document.body);
		return this;
	};
	ArtificialLife.prototype.start = function() {
		this.ticks = 0;
		this.events['document_click'] = Event.add(document, 'click', 
			ArtificialLife_document_click.bind(this));
		this.play();
		return this;
	};
	ArtificialLife.prototype.stop = function() {
		this.pause();
		Event.remove(this.events['document_click']);
		this.ticks = 0;
		return this;
	};
	ArtificialLife.prototype.play = function() {
		this.interval = setInterval(this.tick.bind(this), this.step);
		return this;
	};
	ArtificialLife.prototype.pause = function() {
		clearInterval(this.interval);
		this.interval = null;
		return this;
	};
	ArtificialLife.prototype.toString = function() {
		return "[object ArtificialLife] { elements: " + this.elements.length + " }";
	};
	
	return ArtificialLife;
})();
