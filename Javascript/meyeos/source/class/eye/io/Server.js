qx.Class.define('eye.io.Server', {
	extend: qx.core.Object,

	construct: function(checknum) {
		this._checknum = checknum;
	},

	members: {
		_checknum: null,

		module: function(module, method, params) {
			new eye.io.server.call.Module(this._checknum, module, method, params);
		}
	}
});