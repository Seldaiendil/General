Class('bio.ArtificialLife', {
	constructor: function(map) {
		this.base(arguments);

		this.map = map;
		this.deadPlants = 0;
		this.ticks = 0;
		this.interval = null;
		this.context = null;


		// Parameters
		this.step = 1;
		this.printMap = false;
	},


	getStep: function() { return this.step; },
	setStep: function(value) { this.step = value; },

	start: function(context) {
		this.context = context;
		this.ticks = 0;
		this.play();
		return this;
	},
	stop: function() {
		this.pause();
		return this;
	},

	play: function() {
		this.interval = setInterval(this.tick.bind(this), this.step);
		return this;
	},
	pause: function() {
		clearInterval(this.interval);
		this.interval = null;
		return this;
	},

	add: function(number, constructor) {
		for (var i = number; i--; )
			this.map.addElement(constructor());
	},

	tick: function() {
		this.map.tick(this.context);

		if (this.ticks % 50 === 0)
			this.checkIsOver();

		this.ticks++;
		this.fireEvent('tick', this.map);
	},


	checkIsOver: function() {
		// TODO
	},
});
