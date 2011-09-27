bio.animal.Cell.extend('bio.animal.cell.Carnivore', {
	constructor: function() {
		this.base(arguments);

		this.factor['reproduce at size'] = 14 * 14;

		this.food = [ bio.animal.Cell ];
	},


	hunt: function(target, distance, closerFood) {
		// Not to eat carnivores if there are vegetarians around
		if (closerFood.target instanceof bio.animal.cell.Vegetarian &&
			target instanceof bio.animal.cell.Carnivore)
			return;

		this.base(arguments);
	}
});
