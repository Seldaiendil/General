qx.Class.define('eye.apps.init.Main', {
	extend: eye.Application,

	construct: function() {
		this.base(arguments);
		this._server = new eye.io.Server(this._checknum);
	},

	members: {

		_server: null,
		_root: null,

		start: function(root) {
			var self = this;
			this.base(arguments);

			this._root = root;

			// if (this._session.isValid())
			this.createDesktop();
		},

		createDestkop: function() {
			this._root.removeAll();
			eye.Application.start('desktop', this._root);
		}

	}
});