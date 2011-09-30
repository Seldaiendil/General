Class('bio.map.CellManager', {
	constructor: function CellManager(cellSize) {
		this.columns = 100;
		this.rows = 100;
		this.cellSize = 10;
		this.cells = null;

		this.width = 0;
		this.height = 0;
	},

	properties: [ 'columns', 'rows', 'cellSize' ],


	tick: function() {
		var cells = this.cells;
		var j;

		for (var i = cells.length; i--; )
			for (j = cells[i].length; j--; )
				cells[i][j].tick();
	},

	reset: function() {
		var row, j;
		this.cells = [];

		for (var i = this.columns; i--; ) {
			row = [];

			for (j = this.rows; j--; )
				row[j] = new bio.map.MapCell(i, j);
			
			this.cells[i] = row;
		}

		this.width = this.columns * this.cellSize;
		this.height = this.rows * this.cellSize;
	},

	getCell: function(col, row) {
		return this.cells[col][row];
	},

	getCellAt: function(x, y) {
		return this.cells[
			Math.floor(x / this.cellSize)
		][
			Math.floor(y / this.cellSize)
		];
	},

	_calcRange: function(start, end, size, max) {
		if (end - start > size) {
			return {
				start: 0,
				end: max
			};
		}

		start %= size;
		if (start < 0)
			start += size;
		
		end %= size;
		if (end < start)
			end += size;

		return {
			start: Math.floor(start / this.cellSize),
			end: Math.ceil(end / this.cellSize)
		};
	},

	getCellsAtZone: function(startX, startY, endX, endY) {
		var x = this._calcRange(startX, endX, this.width, this.columns);
		var y = this._calcRange(startY, endY, this.height, this.rows);
		var result = [];

		var cols = this.columns;
		var rows = this.rows;
		var cells = this.cells;
		var j, jend;

		for (var i = x.start, end = x.end; i < end; i++)
			for (j = y.start, jend = y.end; j < jend; j++)
				result[result.length] = cells[i % cols][j % rows];
		
		return result;
	},

	getCellsAtElement: function(element) {
		return this.getCellsAtZone(
			element.getStartX(),
			element.getStartY(),
			element.getEndX(),
			element.getEndY()
		);
	},

	getRangeFromZone: function(startX, startY, endX, endY) {
		var cells = this.getCellsAtZone(startX, startY, endX, endY);
		var result = new bio.map.Range();

		for (var i = cells.length; i--; )
			result.merge(cells[i].getElements());
		
		return result;
	},

	getRangeFromElement: function(element, radius) {
		return this.getRangeFromZone(
			element.getStartX() - radius,
			element.getStartY() - radius,
			element.getEndX() + radius,
			element.getEndY() + radius
		);
	}
});

