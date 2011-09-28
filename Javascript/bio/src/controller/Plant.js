bio.controller.LifeForm.extend('bio.controller.Plant', {
	constructor: function Plant() {
		this.base(arguments);

		this.weight = 1;
	},


	tick: function() {
		if (this.getArea() > 100)
			return;
		
		this.size.add(0.1);
	}
});
