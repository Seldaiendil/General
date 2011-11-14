var Base = (function() {
	
	var uniqueId = 0;
	var eventId = 0;

	return Object.extend({
		constructor: function() {
			this._listeners = {};
			this._id = uniqueId++;
		},

		members: {

			getId: function() {
				return this._id;
			},


			//
			// EVENTS
			//

			on: function(event, handler, scope) {
				var id = 'event|' + event + '|' + eventId++;
				var listeners = this._listeners;

				if (!listeners[event])
					listeners[event] = [];
				
				listeners[event].push({
					handler: handler,
					scope: scope || this,
					id: id
				});

				return id;
			},

			un: function(event, handler, scope) {
				if (arguments.length === 1)
					return this._unById(event);
				
				scope = scope || this;
				
				var listeners = this._listeners[event];
				if (!listeners)
					return false;

				for (var i = listeners.length; i--; ) {
					if (listeners[i].handler === handler &&
						listeners[i].scope === scope) {
							
						listeners.splice(i, 1);
						return true;
					}
				}

				return false;
			},

			_unById: function(id) {
				var event = id.split('|')[1];
				var listeners = this._listeners[event];
				if (!listeners)
					return false;

				for (var i = listeners.length; i--; ) {
					if (listeners[i].id === id) {
						listeners.splice(i, 1);
						return true;
					}
				}

				return false;
			},

			emit: function(event, var_args) {
				var listeners = this._listeners[event];
				if (!listeners)
					return;
				
				var args = [];
				if (arguments > 1) {
					args.concat(arguments);
					args.shift();
				}
				
				var list;
				for (var i = 0, len = listeners.length; i < len; i++) {
					list = listeners[i];
					list.handler.apply(list.scope, args);
				}
			}

		}
	});

})();