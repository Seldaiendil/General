var Plant = (function() {
	function Plant() {
		LifeForm.call(this);
		this.container = null;
		this.weight = 1;
		this.dead = false;
		this.print = false;
	}
	Plant.prototype = new LifeForm();
	Plant.property('container');
	Plant.prototype.getWeight = null;
	Plant.prototype.setWeight = null;

	Plant.prototype.refresh = function() {
		if (this.body.parentNode)
			this.container.removeChild(this.body);

		this.body.style.height = this.getHeight();
		this.body.style.width = this.getWidth();
		this.body.style.left = this.getX();
		this.body.style.top = this.getY();

		this.container.appendChild(this.body);
	};
	Plant.prototype.render = function() {
		this.body = Dom.create('div');
		this.body.className = "Element Plant";
		this.refresh();
	};
	var base_die = Plant.prototype.die;
	Plant.prototype.die = function() {
		if (this.dead)
			return;
		base_die.apply(this, arguments);
		this.container.removeChild(this.body);
	};
	
	Plant.prototype.tick = function() {
		if (this.getArea() > 100)
			return;
		this.size.add(0.1);
		this.refresh();
	};
	Plant.prototype.toString = Phisics.idToString('Plant');
	return Plant;
})();