Class('bio.game.Ticker', {
	constructor: function(step) {
		this.base(arguments);
		
		this.step = step || 100;
		this.interval = null;
		this.ticks = 0;
		this.tick = null;
	},

	properties: [ 'step', 'tick' ],


	start: function() {
		this.ticks = 0;
		this.play();
	},

	stop: function() {
		this.pause();
	},

	play: function() {
		this.interval = setInterval(this._tick.bind(this), this.step);
	},

	pause: function() {
		clearInterval(this.interval);
		this.interval = null;
	},

	_tick: function() {
		this.ticks++;
		if (this.ticks === 1000) {
			this.pause();
			document.title = 'Game Over';
		}
		this.fireEvent('tick', this.ticks);
	}
});
