qx.Class.define('eye.apps.init.Session', {
	extend: qx.core.Object,

	members: {

		__key: 'meyeos_session'
		
		hasValidSession: function() {
			return !!qx.bom.Cookie.get(this.__key);
		},

		getUser: function() {
			new eye.core.User().set({
				name: 'matias',
				lastname: 'quezada',
				email: 'amatiasq@gmail.com'
			});
		}

	}
});
