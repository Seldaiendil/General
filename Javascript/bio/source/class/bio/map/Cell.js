qx.Class.define('bio.map.Cell', {
	extend: qx.core.Object,

	construct: function(x, y) {
		this.__location = new window.Vector(x, y);
		this.__byId = {};
		this.__elements = [];
		this.__smells = [];
		this.__nutrients = 2.0;
	},

	destruct: function() {
		this.__location = this.__byId = this.__elements = this.__smells = null;
	},


	members: {
		__location: null,
		__byId: null,
		__elements: null,
		__smells: null,
		__nutrients: null,

		
		get: function(index) {
			return this.__elements[index];
		},

		length: function() {
			return this.__elements.length;
		},

		push: function(element) {
			if (this.__byId[element.toHashCode()]) {
				return;
			}

			this.__elements.push(element);
			this.__byId[element.toHashCode()] = true;

			return this;
		},

		remove: function(element) {
			if (!this.__byId[element.toHashCode()]) {
				return;
			}

			this.__elements.splice(this.__elements.indexOf(el), 1);
			this.__byId[element.toHashCode()] = false;

			return this;
		},


		extractNutrients: function(factor) {
			this.__nutrients -= factor;

			if (this.__nutrients >= 0) {
				return factor;
			}

			var returns = factor + this.__nutrients;
			this.__nutrients = 0;
			return returns
		}

	}
});
