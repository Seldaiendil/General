bio.physic.PhysicObject.extend('bio.map.Element', {
	constructor: function Element() {
		this.base(arguments);

		this.destroyed = false;
		this.view = null;

		this.factor = {
			'friction': 0.05
		};
	},


	getView: function() { return this.view; },
	setView: function(value) {
		if (typeof value.render !== 'function')
			throw new Error("View has no render method");
		this.view = value;
	},

	tick: function(context) {
		this.friction();
		this.move();
		this.view.render(context, this)	
	},

	friction: function() {
		this.brake(this.factor['friction']);
	},

	destroy: function() {
		this.fireEvent('beforeDestroy', this);
		this.destroyed = true;
		this.fireEvent('destroy', this);

		var throwError = this._destroyedError;

		for (var prop in this) {
			if (typeof this[prop] === 'function')
				this[prop] = throwError;
			else if (this.hasOwnProperty(prop))
				this[prop] = null;
		}
	},

	_destroyedError: function() {
		debugger;
		throw new Error('Called a method of a destroyed element');
	}
});
