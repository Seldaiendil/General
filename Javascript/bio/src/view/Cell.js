Class('bio.view.Cell', {
	constructor: function() {
		this.colorSeed = 10;
		this.baseColor = { r: 0, g: 0, b: 0 };
		this.rgbColor = {};
		this.color = "blue";
	},


	getColorSeed: function() { return this.colorSeed; },
	setColorSeed: function(value) {
		this.colorSeed = value;
		this._applyNewColor();
	},

	getBaseColor: function() { return this.baseColor; },
	setBaseColor: function(value) {
		this.baseColor = value;
		this._applyNewColor();
	},

	_applyNewColor: function() {
		var colors = [ 'r', 'g', 'b' ];
		var letter, base;
		var rgb = {};

		for (var i = colors.length; i--; ) {
			letter = colors[i];
			base = this.baseColor[letter];
			rgb[letter] = isNaN(base) ? this.colorSeed : base;
		}

		this.rgbColor = rgb;
		this.color = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
	},

	render: function(context, location, size, movement) {
		var sizeDiff = size.x / 5;
		var positionDiff = sizeDiff / 2;

		context.save();

		context.translate(location.x, location.y);
		context.rotate(movement.getDirectionRadians());

		context.lineWidth = 2;
		context.strokeStyle = 'black';
		context.fillStyle = this.color;

		var prev = movement.copy().modifyDirection(180).getVector().add(-positionDiff);
		var force = movement.getVector();
		var next = force.copy().add(positionDiff);

		/*
		context.beginPath();
		context.moveTo(prev.x, prev.y);
		context.lineTo(size.x + sizeDiff, prev.y);
		context.lineTo(size.x + sizeDiff, prev.x)
		*/

		// Draw tail
		context.strokeRect(prev.x, prev.y, size.x + sizeDiff, size.y + sizeDiff);
		context.fillRect(prev.x, prev.y, size.x + sizeDiff, size.y + sizeDiff);

		// Draw body
		context.strokeRect(0, 0, size.x, size.y);
		context.fillRect(0, 0, size.x, size.y);

		// Draw head
		context.strokeRect(next.x, next.y, size.x - sizeDiff, size.y - sizeDiff);
		context.fillRect(next.x, next.y, size.x - sizeDiff, size.y - sizeDiff);

		var multiplier = 30;
		context.translate(size.x / 2, size.y / 2);
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(force.x * multiplier, force.y * multiplier)
		context.stroke();

		context.fillStyle = 'blue';
		context.translate(force.x * multiplier, force.y * multiplier)
		context.fillRect(-2, -2, 4, 4);

		context.restore();
	}
});
