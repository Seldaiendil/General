/*
 * Helper functions
 */
function getScreenSize() {
	var size = new bio.physic.Vector(document.body.clientWidth, document.body.clientHeight);
	getScreenSize = function() {
		return size.clone();
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



/*
 * Configurations
 */
bio.physic.PhysicObject.prototype.configurePhisics = function(size) {
	return this;
};



Class('bio.Main', {
	constructor: function() {
		var screen = getScreenSize();

		this.ticker = new bio.game.Ticker(1000 / 24);
		this.ticker.addListener('tick', this.tick, this);

		var size = 10;
		this.manager = new bio.game.Manager(100, screen.x, screen.y, function(element) {
			var position = randomPosition(size);
			element.setPosition(position.x, position.y);
			element.setSize(size);
			element.shove(random(360), random(1, 10));
		});

		this.ticker.start();
	},


	tick: function() {
		this.manager.tick();
	}
});
