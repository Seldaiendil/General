var LifeForm = (function() {
	function LifeForm(x, y, width, height) {
		Phisics.call(this, x, y, width, height);
		this.map = null;
		
		this.parents = [];
		this.dead = false;
		this.onDie = new Event();
	}
	LifeForm.prototype = new Phisics();
	LifeForm.property('map');

	LifeForm.prototype.isDead = function() {
		return this.dead;
	};
	LifeForm.prototype.die = function() {
		if (this.isDead())
			return;
		this.dead = true;
		if (this.map)
			this.map.removeElement(this);
		this.onDie.fire(this);
	};
	LifeForm.prototype.addParent = function(parent) {
		this.parents.push(parent);
	};
	LifeForm.prototype.isSonOf = function(parent) {
		return this.parents.indexOf(parent) !== -1;
	};
	LifeForm.prototype.isParentOf = function(son) {
		return son.parents.indexOf(this) !== -1;
	};
	LifeForm.prototype.areBrothers = function(target) {
		for (var i=this.parents.length; i--; )
			if (this.parents[i].isParentOf(target))
				return true;
		return false;
	};
	LifeForm.prototype.isFamily = function(target) {
		return this.isSonOf(target) || this.isParentOf(target) || this.areBrothers(target);
	};
	LifeForm.prototype.garbageCollector = function() {
		// Remove references of dead parents to let the garbage collector collects them
		for (var i=this.parents.length; i--; )
			if (!this.parents[i].isDead())
				this.parents.splice(i, 1);
	};
	var base_move = LifeForm.prototype.move;
	LifeForm.prototype.move = function() {
		base_move.apply(this, arguments);
		var size = this.map.getSize();
		if (this.getX() < 0)
			this.setX(size.x + this.getX());
		else if (this.getX() > size.x)
			this.setX(this.getX() % size.x);
		if (this.getY() < 0)
			this.setY(size.y + this.getY());
		else if (this.getY() > size.y)
			this.setY(this.getY() % size.y);
	};
	var count = 0;
	LifeForm.prototype.tick = function() {
		this.map.updateLocation(this);
		if (count % 10 === 0)
			this.garbageCollector();
		count++;
	};
	LifeForm.prototype.toString = Phisics.idToString('LifeForm');

	return LifeForm;
})();
