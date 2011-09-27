bio.animal.Cell.extend('bio.animal.cell.Vegetarian', {
	constructor: function() {
		this.base(arguments);

		this.factor['max velocity'] = 30;

		this.food = [ bio.controller.Plant ];
	}
});
