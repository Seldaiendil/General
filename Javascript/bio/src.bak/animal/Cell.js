bio.controller.Animal.extend('bio.animal.Cell', {
	constructor: function Cell() {
		this.base(arguments);

		this.baseColor = {
			r: NaN,
			g: NaN,
			b: NaN
		};

		// Reproduction factors
		this.factor['reproduce at size'] = 150;
		this.factor['mitosis split velocity'] = 10;
	},


	tick: function(map, context) {
		if (this.canReproduce()) {
			debugger;
			this.reproduce();
			return;
		}

		this.base(arguments, map, context);

		if (isNaN(this.location.x) || isNaN(this.location.y)) {
			debugger;
		}
	},

	setView: function(value) {
		value.setBaseColor(this.baseColor);
		this.view = value;
	},

	canReproduce: function() {
		return this.getArea() > this.factor['reproduce at size'];
	},

	reproduce: function() {
		var child1 = this._createChild();
		var child2 = this._createChild();
		if (!(child1 instanceof bio.controller.Animal) || !(child2 instanceof bio.controller.Animal))
			throw new Error("childConstructor returns --[" + child + "]-- (" + (typeof child) + ")");
		
		var direction = Math.round(Math.random() * 380);
		var strength = this.factor['mitosis split velocity'];

		child1.setPosition(this.location.x, this.location.y);
		child2.setPosition(this.location.x, this.location.y);

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
