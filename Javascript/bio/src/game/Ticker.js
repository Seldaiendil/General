Class('bio.game.Ticker', {
	constructor: function Ticker(step) {
		Ticker.base.call(this);
		
		this.step = step || 100;
		this.interval = null;
		this.ticks = 0;
	},

	properties: [ 'step' ],


	start: function() {
		this.ticks = 0;
		this.play();
	},

	stop: function() {
		this.pause();
	},

	play: function() {
		this.interval = setInterval(this.tick.bind(this), this.step);
	},

	pause: function() {
		clearInterval(this.interval);
		this.interval = null;
	},

	tick: function() {
		document.title = this.ticks;
		this.fireEvent('tick', this.ticks);
		this.ticks++;
	}
});
