bio.cell.Cell.extend('bio.cell.Omnivore', {
	constructor: function Omnivore() {
		Omnivore.base.call(this);

		this.factor['reproduce at size'] = 15 * 15;

		this.food = [ bio.life.Plant, bio.cell.Cell ];
		this.baseColor = {
			r: 0,
			g: 0,
			b: 255
		};
	},


	hunt: function hunt(target, distance, closerFood) {
		// Not to eat carnivores if there are vegetarians around
		if (!(closerFood.target instanceof bio.cell.Omnivore) &&
			target instanceof bio.cell.Omnivore)
			return;

		hunt.base.call(this, target, distance, closerFood);
	}
});
