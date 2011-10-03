bio.life.Animal.extend('bio.cell.Cell', {
	constructor: function Cell() {
		Cell.base.call(this);

		this.baseColor = {
			r: NaN,
			g: NaN,
			b: NaN
		};

		// Reproduction factors
		this.factor['reproduce at size'] = 200;
		this.factor['mitosis split velocity'] = 5;
	},


	tick: function tick(map, context) {
		if (this.canReproduce()) {
			this.reproduce();
			return;
		}

		tick.base.call(this, map, context);
	},

	setView: function(value) {
		if (!(value instanceof bio.view.Cell))
			throw new Error('View does not inherits from bio.view.Cell!');

		value.setBaseColor(this.baseColor);
		this.view = value;
	},

	canReproduce: function() {
		return this.getArea() > this.factor['reproduce at size'];
	},

	reproduce: function() {
		var child1 = this._createChild();
		var child2 = this._createChild();

		if (!(child1 instanceof bio.life.Animal) || !(child2 instanceof bio.life.Animal))
			throw new Error("childConstructor returns --[" + child + "]-- (" + (typeof child) + ")");

		var direction = Math.round(Math.random() * 360);
		var strength = this.factor['mitosis split velocity'];

		child1.shove(direction, strength);
		child2.shove(direction + 180, strength);

		this.fireEvent('reproduce', this, child1, child2);
		this.destroy();
	},

	_createChild: function() {
		var child = new this.constructor();
		child.setPosition(this.location.x, this.location.y);
		child.setSize(this.size.x / 2, this.size.y / 2);
		child.setView(new this.view.constructor());
		this.addChild(child);
		return child;
	}
});
