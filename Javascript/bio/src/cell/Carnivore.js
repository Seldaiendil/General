bio.cell.Cell.extend('bio.cell.Carnivore', {
	constructor: function Carnivore() {
		Carnivore.base.call(this);

		this.factor['reproduce at size'] = 20 * 20;

		this.food = [ bio.cell.Cell ];
		this.baseColor = {
			r: 255,
			g: 0,
			b: NaN
		};
	},


	hunt: function hunt(target, distance, closerFood) {
		// Not to eat carnivores if there are vegetarians around
		if (!(closerFood.target instanceof bio.cell.Carnivore) &&
			target instanceof bio.cell.Carnivore)
			return;

		hunt.base.call(this, target, distance, closerFood);
	}
});
