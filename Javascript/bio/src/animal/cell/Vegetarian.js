bio.animal.Cell.extend('bio.animal.cell.Vegetarian', {
	constructor: function Vegetarian() {
		this.base(arguments);

		this.factor['max velocity'] = 30;

		this.food = [ bio.controller.Plant ];
		this.baseColor = {
			r: 0,
			g: 255,
			b: NaN
		};
	}
});
