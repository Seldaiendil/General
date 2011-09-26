qx.Class.define('bio.map.Range', {
	extend: qx.core.Object,

	construct: function() {
		this.__items = [];
		this.__byId = {};
	},

	destruct: function() {
		this.__items = this.__byId = null;
	},


	members: {
		__items: null,
		__byId: null,

		
		length: function() {
			return this.__items.length;
		},

		get: function(index) {
			return this.__items[index];
		},

		getById: function(id) {
			return this.__byId[id];
		},

		push: function(element) {
			if (this.__byId[element.toHashCode()]) {
				return;
			}

			this.__items.push(element);
			this.__byId[element.toHashCode()] = element;

			return this;
		},

		remove: function(index) {
			if (typeof index !== 'string') {
				index = this.__items.indexOf(index);
			}

			var target = this.__items[index];
			this.__items.splice(index, 1);
			this.__byId[target.toHashCode()] = null;

			return this;
		},

		forEach: function(action, scope) {
			scope = scope || null;
			for (var i = this.__items.length; i--; ) {
				action.call(scope, this.__items[i], i);
			}
		},

		merge: function(array) {
			for (var i = array.length; i--; ) {
				this.push(array[i]);
			}
		}

	}
});
