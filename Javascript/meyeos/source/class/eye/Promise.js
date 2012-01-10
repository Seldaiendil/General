qx.Class.define('eye.Promise', {
	extend: qx.core.Object,

	construct: function() {
		this.base(arguments);
		this._callbacks = [];
		this._errors = [];
		this._args = null;
	},

	members: {
		
		_callbacks: null,
		_errors: null,
		_args: null,


		then: function(callback, scope, error, errorScope) {
			if (arguments.length === 2 && typeof scope === 'function') {
				error = scope;
				scope = null;
			}

			var prom = new eye.Promise();

			this.onError(error, errorScope, prom);

			if (typeof callback === 'function') {
				this._callbacks.push({
					handler: callback,
					scope: scope,
					promise: prom
				});
			}

			return prom;
		},

		onError: function(callback, scope, promise) {
			if (typeof callback !== 'function')
				return;
			
			if (!promise)
				promise = new eye.Promise();
			
			this._errors.push({
				handler: callback,
				scope: scope,
				promise: promise
			});

			return promise;
		}

	}
});
