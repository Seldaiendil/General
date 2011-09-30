bio.map.Element.extend('bio.life.LifeForm', {
	constructor: function LifeForm() {
		LifeForm.base.call(this);

		this.parents = [];
		this.alive = true;
	},


	isDead: function() {
		return !this.alive;
	},

	die: function() {
		// Until implement dead body dead() is destroy()
		this.fireEvent('die', this);
		this.destroy();
		return;

		if (this.isDead())
			return;
		
		this.alive = false;
		this.fireEvent('die', this);
	},

	addChild: function(child) {
		if (!(child instanceof bio.life.LifeForm))
			throw new Error(this + '.addChild(' + child + ') -- Argument is not a LifeForm!');
		
		child.parents[child.parents.length] = this;
	},

	isFamily: function(target) {
		if (!(target instanceof bio.life.LifeForm))
			throw new Error(this + '.isFamily(' + child + ') -- Argument is not a LifeForm!');
		
		var thisParents = this.parents;
		var targetParents = target.parents;
		var parent, j;

		// If this is parent of target
		for (var i = targetParents.length; i--; )
			if (targetParents[i] === this)
				return true;

		for (i = thisParents.length; i--; ) {
			parent = thisParents[i];

			// If target is a parent of this
			if (parent === target)
				return true;
			
			// If this and target share a parent they are brothers
			for (j = targetParents.length; j--; )
				if (targetParents[j] === parent)
					return true;
		}

		return false;
	},

	garbageCollector: function() {
		// Remove references of dead parents to let the garbage collector collects them
		for (var i = this.parents.length; i--; )
			if (this.parents[i].destroyed)
				this.parents.splice(i, 1);

		// Simba! you have forgotten me :(
	}
});
