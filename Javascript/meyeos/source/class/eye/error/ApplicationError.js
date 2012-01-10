qx.Class.define('eye.error.ApplicationError', {
	extend: Error,

	construct: function(app, message) {
		this.base(arguments, "[App:" + app + "] " + message);
	}
});