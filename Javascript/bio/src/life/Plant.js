bio.life.LifeForm.extend('bio.life.Plant', {
	constructor: function Plant() {
		Plant.base.call(this);
		
		this.setView(new bio.view.Plant());
		
		this.weight = 1;
	},
	

	tick: function tick(map, context) {
		tick.base.call(this, context);

		if (this.getArea() < 100)
			this.size.add(0.05);
	}
});
