bio.physic.PhysicObject.extend('bio.map.Element', {
	constructor: function Element() {
		this.base(arguments);

		this.view = null;
	},


	getView: function() { return this.view; },
	setView: function(value) {
		if (typeof value.render !== 'function')
			throw new Error("View has no render method");
		this.view = value;
	},

	tick: function(context) {
		this.move();
		this.view.render(context, this)	
	},

	destroy: function() {
		this.fireEvent('beforeDestroy', this);

		var throwError = this._destroyedError;

		for (var prop in this) {
			if (this.hasOwnProperty(prop))
				this[prop] = null;
			if (typeof this[prop] === 'function')
				this[prop] = throwError;
		}

		this.fireEvent('destroy', this);
	},

	_destroyedError: function() {
		throw new Error('Called a method of a destroyed element');
	}
});
