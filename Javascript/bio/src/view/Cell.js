Class('bio.view.Cell', {
	constructor: function CellView() {
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

	render: function(context, element) {
		var location = element.location;
		var force = element.movement.getVector().multiply(3);

		context.save();
		context.translate(location.x, location.y);

		context.lineWidth = 1;
		context.strokeStyle = 'black';
		context.fillStyle = this.color;

		context.beginPath();
		context.arc(0, 0, element.size.x / 2, 0, Math.PI * 2);
		context.fill();
		context.stroke();

		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(force.x, force.y);
		context.stroke();

		context.fillStyle = 'blue';
		context.translate(force.x, force.y);
		context.arc(0, 0, 2, 0, Math.PI * 2);
		context.fill();

		context.restore();
	}
});
