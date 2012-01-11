qx.Class.define('eye.Promise', {
	extend: qx.core.Object,

	construct: function() {
		this.base(arguments);
		this._callbacks = [];
		this._errors = [];
		this._args = null;
		this._state = 'pending';
	},

	statics: {
		
		bind: function() {
			
		}

	}

	members: {
		
		_state: null,
		_callbacks: null,
		_errors: null,
		_args: null,

		complete: function() {
			var i, len, json;

			if (this._state !== 'pending')
				throw new Error('Trying to complete a promise already closed');

			this._state = 'completed';
			this._args = [];

			for (i = 0, len = arguments.length; i < len; i++)
				this._args.push(arguments[i]);

			for (i = 0, len = this._callbacks.length; i < len; i++) {
				json = this._callbacks[i];
				json.handler.apply(json.scope, this._args);
			}
		},

		then: function(callback, scope, error, errorScope) {
			if (arguments.length === 2 && typeof scope === 'function') {
				error = scope;
				scope = null;
			}

			var prom = new eye.Promise();

			//this.onError(error, errorScope, prom);

			if (typeof callback === 'function') {
				if (this._state === 'pending') {
					this._callbacks.push({
						handler: callback,
						scope: scope,
						promise: prom
					});
				} else {
					callback.apply(scope, this._args);
				}
			}

			return prom;
		},

		/*
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
		*/

	}
});
