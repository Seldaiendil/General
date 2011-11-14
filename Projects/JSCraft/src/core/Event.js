var Event = (function() {
	var uniqueId = 0;

	return Class({

		constructor: function() {
			this._listeners = [];
		},

		members: {

			listen: function(handler, scope) {
				var id = 'eventId|' + uniqueId++;

				this._listeners.push({
					handler: handler,
					scope: scope,
					id: id
				});

				return id;
			},

			emit: function() {
				var listeners = this._listeners;
				var json;
				for (var i = 0, len = listeners.length; i < len; i++) {
					json = listeners[i];
					json.handler.call(json.scope);
				}
			}
		}
	});
})();