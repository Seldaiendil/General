Class('bio.map.Map', {
	constructor: function Map() {
		this.cellSize = 10;
		this.colums = 100;
		this.rows = 100;

		this.cells = new bio.map.CellManager();
		this.elements = new bio.map.ElementManager();
	},

	properties: [ 'cellSize', 'columns', 'rows' ],


	tick: function() {
		this.elements.tick();
		//this.cells.tick();
	},

	reset: function() {
		this._configureChilds();
		this.cells.reset();
		return this;
	},

	_configureChilds: function() {
		this.cells.setCellSize(this.cellSize);
		this.cells.setColumns(this.columns);
		this.cells.setRows(this.rows);

		this.elements.setSize(this.cellSize * this.columns, this.cellSize * this.rows);
	},


	//
	// Element Manager methods
	//

	addElement: function(element) {
		this.elements.add(element, this.cells);
	},

	removeElement: function(element) {
		this.elements.remove(element);
	},

	updateLocation: function(element) {
		this.elements.updateLocation(element, this.cells);
	},

	getShorterDistance: function(element1, element2) {
		return this.elements.getShorterDistance(element1, element2);
	},

	getShorterAngle: function(element1, element2) {
		return this.elements.getShorterAngle(element1, element2);
	},


	//
	// Cell Manager methods
	//
/*
	getCellsAtElement: function(element) {
		return this.cells.getCellsAtElement(element);
	},
*/
	getRangeFromElement: function(element, radius) {
		return this.cells.getRangeFromElement(element, radius);
	}
});
