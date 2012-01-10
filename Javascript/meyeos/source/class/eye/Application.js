qx.Class.define("eye.Application", {
	type: 'abstract',
	extend: qx.core.Object,

	statics: {
		
		start: function(name /*, args...*/) {
			var prom = new eye.Promise();
			var ref = eye.app[name];

			if (!ref) {
				prom.fail(new eye.error.ApplicationError(name, 'Unknown application'));
			} else if (!ref.Main || typeof ref.Main !== 'function') {
				prom.fail(new eye.error.ApplicationError(name, 'Main class not found'));
			} else {

				var args = [];
				if (arguments.length > 1)
					for (var i = 1, len = arguments.length; i < len; i++)
						args.push(arguments[i]);

				var app = new ref.Main();
				prom.bind(app.start.apply(app, args));

			}
			
			return prom;
		}

	}
});
