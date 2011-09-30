Class('bio.Main', {
	screen: null,

	constructor: function() {
		this.screen = new bio.physic.Vector(document.body.clientWidth, document.body.clientHeight);

		this.manager = new bio.game.Manager(this.screen.x, this.screen.y)
		this.manager.addElements(100, this._createPlant, this);
		this.manager.addElements(1, this._createAnimal, this);

		this.ticker = new bio.game.Ticker(1000 / 24);
		this.ticker.addListener('tick', this.tick, this);
		this.ticker.start();
	},


	tick: function() {
		this.manager.tick();
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

	_createAnimal: function() {
		var element = new bio.life.Animal();
		this._randomLocate(element, 10);
		element.shove(this.random(360), this.random(1, 10));
		return element;
	},

	_createPlant: function() {
		var element = new bio.life.Plant();
		this._randomLocate(element, 10);
		return element;
	}
});
