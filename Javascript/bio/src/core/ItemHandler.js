Class('bio.core.ItemHandler', {
	constructor: function ItemHandler() {
		ItemHandler.base.call(this);

		this.byId = {};
		this.items = [];
	},


	getElements: function() {
		return this.items;
	},

	length: function() {
		return this.items.length;
	},

	get: function(index) {
		return this.items[index];
	},

	add: function(element) {
		if (typeof this.byId[element.getId()] === 'number')
			return;
		
		this.byId[element.getId()] = true;
		this.items[this.items.length] = element;
		return this;
	},

	remove: function(element) {
		var id = element.getId();
		if (typeof this.byId[id] !== 'number')
			return;
		
		var index = this.byId[id];
		this.byId[id] = false;
		delete this.byId[id];
		
		this.items.splice(this.items.indexOf(element), 1);
		return this;
	}
});
