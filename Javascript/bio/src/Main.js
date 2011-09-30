Class('bio.Main', {
	screen: null,

	constructor: function() {
		this.screen = new bio.physic.Vector(document.body.clientWidth, document.body.clientHeight);

		this.manager = new bio.game.Manager(this.screen.x, this.screen.y)

		this.manager.addElements(60, this._createHerbivore, this);
		this.manager.addElements(10, this._createOmnivore, this);
		this.manager.addElements(10, this._createCarnivore, this);

		this.ticker = new bio.game.Ticker(1000 / 24);
		this.ticker.addListener('tick', this.tick, this);
		this.ticker.start();

		this.deadPlants = 100;
		
		var started = true;
		var self = this;
		document.addEventListener('click', function() {
			if (started)
				self.ticker.pause();
			else
				self.ticker.play();
			started = !started;
		});
	},


	tick: function() {
		this.manager.tick();

		this.manager.addElements(this.deadPlants, this._createPlant, this);
		this.deadPlants = 0;
	},

	random: function(min, max) {
		if (arguments.length === 1) {
			max = min;
			min = 0; 
		}
		return Math.round(Math.random() * (max - min)) + min;
	},

	_randomLocate: function(element, size) {
		element.setSize(size);
		element.setPosition(
			this.random(this.screen.x - size),
			this.random(this.screen.y - size)
		);
	},

	_configureCell: function(element, size) {
		this._randomLocate(element, size);
		element.shove(this.random(360), this.random(1, 10));

		var view = new bio.view.Cell();
		view.setColorSeed(this.random(255));
		element.setView(view);

		return element;
	},

	_createCarnivore: function() {
		return this._configureCell(new bio.cell.Carnivore(), this.random(5, 15));
	},

	_createOmnivore: function() {
		return this._configureCell(new bio.cell.Omnivore(), this.random(3, 12));
	},

	_createHerbivore: function() {
		return this._configureCell(new bio.cell.Herbivore(), this.random(1, 10));
	},

	_createPlant: function() {
		var element = new bio.life.Plant();
		element.addListener('die', this._onPlantDie, this);
		this._randomLocate(element, 1);
		return element;
	},

	_onPlantDie: function() {
		this.deadPlants++;
	}
});
