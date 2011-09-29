bio.core.ItemHandler.extend('bio.game.Manager', {
	constructor: function(count, width, height, config) {
		this.base(arguments);

		this.configure = config;
		this.width = width;
		this.height = height;

		var cellSize = 10;
		this.map = new bio.map.Map()
		this.map.setCellSize(cellSize);
		this.map.setColumns(width / cellSize);
		this.map.setRows(height / cellSize);
		this.map.reset();

		this.canvas = document.createElement('canvas');
		this.canvas.setAttribute('width', width + 'px');
		this.canvas.setAttribute('height', height + 'px');
		document.body.appendChild(this.canvas);

		for (var i = count; i--; ) {
			var element = this.createElement();
			this.add(element);
			this.map.addElement(element);
		}
	},


	tick: function() {
		var context = this.canvas.getContext('2d');
		var items = this.items;

		context.clearRect(0, 0, this.width, this.height);
		//this.map.tick();

		for (var i = items.length; i--; )
			items[i].tick(context);
	},

	createElement: function() {
		var element = new bio.life.LifeForm();

		this.configure(element);

		element.addListener('move', this._onElementMove, this);
		element.addListener('destroy', this._onElementDestroy, this);

		this.map.addElement(element);
		return element;
	},

	_onElementMove: function(element) {
		this.map.updateLocation(element);
	},

	_onElementDestroy: function(element) {
		this.map.removeElement(element);
		this.remove(element);
	}
});
