Class('bio.core.ItemHandler', {
	constructor: function ItemHandler() {
		if (arguments.callee.caller !== this.base)
			throw new Error('Instanciating abstract class');

		this.base(arguments);

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

	getById: function(id) {
		return this.items[this.byId[id]];
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
		this.byId[id] = null;
		delete this.byId[id];
		
		this.items.splice(index, 1);
		return this;
	}
});
