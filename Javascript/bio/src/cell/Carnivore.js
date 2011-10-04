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
	}
});
