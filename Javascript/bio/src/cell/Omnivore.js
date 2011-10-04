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
	}
});
