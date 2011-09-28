bio.physic.PhysicObject.extend('bio.controller.LifeForm', {
	constructor: function LifeForm(x, y, width, height) {
		this.base(arguments, x, y, width, height);

		this.parents = [];
		this.dead = false;
		this.factor = {};
		this.view = null;
	},


	getView: function() { return this.view; },
	setView: function(value) { this.view = value; },

	isDead: function() {
		return this.dead;
	},

	die: function() {
		if (this.isDead())
			return;
		
		this.dead = true;
		this.fireEvent('die', this);
	},

	addChild: function(child) {
		child.parents.push(parent);
	},

	isChildOf: function(parent) {
		for (var i = this.parents.length; i--; )
			if (this.parents[i] === parent)
				return true;
		return false;
	},

	isParentOf: function(child) {
		for (var i = child.parents.length; i--; )
			if (child.parents[i] === this)
				return true;
		return false;
	},

	isBrother: function(target) {
		var i, j;
		for (i = this.parents.length; i--; )
			for (j = target.parents.length; j--; )
				if (this.parents[i] === target.parents[j])
					return true;
		return false;
	},

	isFamily: function(target) {
		return this.isChildOf(target) ||
			this.isParentOf(target) ||
			this.isBrother(target);
	},

	garbageCollector: function() {
		// Remove references of dead parents to let the garbage collector collects them
		for (var i=this.parents.length; i--; )
			if (!this.parents[i].isDead())
				this.parents.splice(i, 1);
	},

	destroy: function() {
		this.fireEvent('destroy');

		var keys = Object.keys(this);
		for (var i = keys.length; i--; ) {
			this[keys[i]] = null;
		}
	},

	count: 0,
	tick: function(context) {
		if (this.count % 10 === 0)
			this.garbageCollector();
		this.count++;

		this.view.render(context, this.location, this.size, this.movement);
	}
});