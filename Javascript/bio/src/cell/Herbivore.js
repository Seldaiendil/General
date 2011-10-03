bio.cell.Cell.extend('bio.cell.Herbivore', {
	constructor: function Herbivore() {
		Herbivore.base.call(this);

		this.food = [ bio.life.Plant ];
		this.baseColor = {
			r: 0,
			g: 255,
			b: NaN
		};
	}
});
