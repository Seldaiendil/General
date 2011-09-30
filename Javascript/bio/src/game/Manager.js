Class('bio.game.Manager', {
	constructor: function Manager(width, height) {
		Manager.base.call(this);

		this.width = width;
		this.height = height;
		
		this.elements = [];
		this.removeStack = [];

		var cellSize = 10;
		this.map = new bio.map.Map()
		this.map.setCellSize(cellSize);
		this.map.setColumns(Math.ceil(width / cellSize));
		this.map.setRows(Math.ceil(height / cellSize));
		this.map.reset();

		this.canvas = document.createElement('canvas');
		this.canvas.setAttribute('width', width);
		this.canvas.setAttribute('height', height);
		document.body.appendChild(this.canvas);
	},


	tick: function() {
		var context = this.canvas.getContext('2d');
		var items = this.items;

		context.clearRect(0, 0, this.width, this.height);
		this.map.tick();

		for (var i = this.elements.length; i--; )
			if (!this.elements[i].destroyed())
				this.elements[i].tick(this.map, context);
		
		this._flushRemoveStack();
	},

	addElements: function(count, factory, scope) {
		for (var i = count; i--; )
			this._add(factory.call(scope || null, i));
	},

	_add: function(element) {
		element.addListener('move', this._onElementMove, this);
		element.addListener('reproduce', this._onElementReproduce, this);
		element.addListener('destroy', this._onElementDestroy, this);

		this.elements.push(element);
		this.map.addElement(element);
		return element;
	},

	_flushRemoveStack: function() {
		var stack = this.removeStack;
		for (var i = stack.length; i--; )
			this.elements.splice(this.elements.indexOf(stack[i]), 1);
		this.removeStack = [];
	},

	_onElementMove: function(element) {
		this.map.updateLocation(element);
	},

	_onElementReproduce: function(element, child1, child2) {
		this._add(child1);
		this._add(child2);
	},

	_onElementDestroy: function(element) {
		this.map.removeElement(element);
		this.removeStack.push(element);
	}
});
