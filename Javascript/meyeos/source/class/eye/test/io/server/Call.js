qx.Class.define('eye.io.server.Call', {
	extend: qx.core.Object,

	construct: function(checknum, get, post) {
		this._checknum = checknum;
		this._get = get;
		this._post = post;
	},

	properties: {
		queueable: {
			check: 'Boolean',
			init: true
		}
	}

	members: {
		
		send: function() {
			
		}

	}
});
