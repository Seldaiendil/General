bio.controller.Animal.extend('bio.animal.Cell', {
	constructor: function() {
		this.base(arguments);

		// Reproduction factors
		this.factor['reproduce at size'] = 150;
		this.factor['mitosis split velocity'] = 10;
	},


	canReproduce: function() {
		return this.getArea() > this.factor['reproduce if size bigger'];
	},

	reproduce: function() {
		var child1 = this._createChild();
		var child2 = this._createChild();
		if (!(child1 instanceof Animal) || !(child2 instanceof Animal))
			throw new Error("childConstructor returns --[" + child + "]-- (" + (typeof child) + ")");
		
		var direction = Math.round(Math.random() * 380);
		var strength = this.factor['mitosis split velocity'];

		child1.shove(direction, strength);
		child2.shove(direction + 180, strength);

		this.fireEvent('reproduce', this, child1, child2);
		this.destroy();
	},
	_createChild: function() {
		return new this.constructor();
	}
});
