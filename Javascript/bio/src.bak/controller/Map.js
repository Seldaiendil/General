(function() {

	function printItems() {
		return '[' + this.constructor.name + ' { ' + this.items.join(',') + ' }]';
	}

	// Cell private class
	var Cell = Class({
		constructor: function MapCell(x, y) {
			this.location = new bio.physic.Vector(x, y);
			this.byId = {};
			this.items = [];
			this.smells = [];
			this.nutrients = 1.0
			this.x = x;
			this.y = y;
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

		extractNutrients: function(factor) {
			if (this.nutrients < factor) {
				var result = this.nutrients;
				this.nutrients = 0;
				return result;
			}

			this.nutrients -= factor;
			return factor;
		},

		push: function(element) {
			if (!this.byId[element.getId()]) {
				this.items[this.items.length] = element;
				this.byId[element.getId()] = true;
			}
			return this;
		},

		remove: function(element) {
			if (this.byId[element.getId()]) {
				this.items.splice(this.items.indexOf(element), 1);
				this.byId[element.getId()] = false;
			}
			return this;
		},

		toString: printItems
	});



	var Range = Class({
		constructor: function Range() {
			this.items = [];
			this.byId = {};
		},


		length: function() {
			return this.items.length;
		},

		get: function(index) {
			return this.items[index];
		},

		getById: function(id) {
			return this.byId[id];
		},

		forEach: function(action) {
			for (var i=this.items.length; i--; )
				action(this.items[i], i);
		},

		push: function(element) {
			if (typeof this.byId[element.getId()] === 'number')
				return;
			
			var index = this.items.length;
			this.items[index] = element;
			this.byId[element.getId()] = index;
		},

		remove: function(index) {
			if (typeof index !== 'number')
				index = this.byId[index.getId()];
			var target = this.items[index];

			this.items.splice(index, 1);
			this.byId[target.getId()] = null;

			return this;
		},

		merge: function(array) {
			for (var i=array.length; i--; )
				this.push(array[i]);
		},

		toString: printItems
	});



	Class('bio.controller.Map', {
		constructor: function Map(cols, rows) {
			this.cellSize = 10;
			this.columns = cols || 100;
			this.rows = rows || 100;

			this.distanceCache = {};

			this.reset();
			this._refreshSizeCache();
		},


		getCellSize: function() { return this.cellSize; },
		setCellSize: function(value) {
			this.cellSize = value;
			this._refreshSizeCache();
		},

		getColumns: function() { return this.columns; },
		setColumns: function(value) {
			this.columns = value;
			this._refreshSizeCache();
		},

		getRows: function() { return this.rows; },
		setRows: function(value) {
			this.rows = value;
			this._refreshSizeCache();
		},

		_refreshSizeCache: function() {
			this.width = this.columns * this.cellSize;
			this.height = this.rows * this.cellSize;
			this.halfWidth = this.width / 2;
			this.halfHeight = this.height / 2;
		},

		calcCellNumber: function(value, ceil) {
			return Math[ceil ? 'ceil' : 'floor'](value / this.cellSize);
		},

		reset: function() {
			var range, j, lenj;
			this.map = [];
			this.locations = {};
			this.items = [];
			this.byId = {};

			for (var i = 0, len = this.columns; i < len; i++) {
				range = [];

				for (j = 0, lenj = this.rows; j < lenj; j++)
					range[range.length] = new Cell(i, j);
				
				this.map[this.map.length] = range;
			}
			return this;
		},

		getSize: function() {
			return {
				x: this.width,
				y: this.height
			};
		},

		getCell: function(col, row) {
			if (!this.map[col])
				throw new Error("Column " + col + " not found. Map size: " + this.columns);
			
			return this.map[col][row];
		},

		getCellAt: function(x, y) {
			return this.map[this.calcCellNumber(x)][this.calcCellNumber(y)];
		},

		addElement: function(element) {
			if (typeof this.byId[element.getId()] === 'number')
				return;
			
			this.updateLocation(element);

			var index = this.items.length;
			this.items[index] = element;
			this.byId[element.getId()] = index;

			element.addListener('move', this.updateLocation, this);
			element.addListener('reproduce', this._elementReproduce, this);
			element.addListener('destroy', this.removeElement, this);

			return this;
		},

		removeElement: function(element) {
			var id = element.getId();
			this.items.splice(this.byId[id], 1);
			this.byId[id] = null;

			element.removeListener('move', this.updateLocation, this);
			element.removeListener('reproduce', this._elementReproduce, this);
			element.removeListener('destroy', this.removeElement, this);

			var lastLocations = this.locations[element.getId()];
			for (var i=lastLocations.length; i--; )
				lastLocations[i].remove(element);
			
			return this;
		},

		_elementReproduce: function(parent, child1, child2) {
			this.addElement(child1);
			this.addElement(child2);
		},

		updateLocation: function(element) {
			this._roundMap(element);

			var lastLocations = this.locations[element.getId()];
			var currentLocations = this.getElementCells(element);
			this.locations[element.getId()] = currentLocations;

			if (lastLocations) {
				for (var i=lastLocations.length; i--; )
					lastLocations[i].remove(element);
			}
			
			for (var i=currentLocations.length; i--; )
				currentLocations[i].push(element);

			return this;
		},

		_roundMap: function(element) {
			var x = element.getX(),
				y = element.getY(),
				width = this.width,
				height = this.height;

			if (x < 0)
				element.setX(width + x);
			else if (x > width)
				element.setX(x % width);
			
			if (y < 0)
				element.setY(height + y);
			else if (y > height)
				element.setY(y % height);
		},

		_calcRange: function(start, end, size) {
			if (end - start > size)
				return { start: 0, end: size };
			
			start %= size;
			if (start < 0)
				start += size;
			
			end %= size;
			while (end < start)
				end += size;
			
			return { start: start, end: end };
		},

		getCellsAtZone: function(startX, startY, endX, endY) {
			var x = this._calcRange(startX, endX, this.width);
			var y = this._calcRange(startY, endY, this.height);
			var start = {
				x: this.calcCellNumber(x.start),
				y: this.calcCellNumber(y.start)
			};
			var end = {
				x: this.calcCellNumber(x.end, true),
				y: this.calcCellNumber(y.end, true)
			};

			var result = [];
			var cols = this.columns;
			var rows = this.rows;
			var map = this.map;
			var j;
			
			for (var i = start.x; i < end.x; i++)
				for (j = start.y; j < end.y; j++)
					result[result.length] = map[i % cols][j % rows];
			
			return result;
		},
		getElementCells: function(element) {
			return this.getCellsAtZone(
				element.getX(),
				element.getY(),
				element.getEndX(),
				element.getEndY()
			);
		},
		getRangeFromVectors: function(startX, startY, endX, endY) {
			var cells = this.getCellsAtZone(startX, startY, endX, endY),
				result = new Range();
			
			for (var i=0; i<cells.length; i++)
				result.merge(cells[i].getElements());
			
			return result;
		},

		_getSigne: function(number) {
			return Math.abs(number) / number;
		},

		_calcRoundMapLocation: function(element, target) {
			var location = element.location.copy();
			var diff = location.diff(target.location);

			// if distance is bigger than half map, it will be shorter by a lateral of the map
			if (Math.abs(diff.x) > this.halfWidth)
				location.x += this.halfWidth * this._getSigne(diff.x * -1);

			if (Math.abs(diff.y) > this.halfHeight)
				location.y += this.halfHeight * this._getSigne(diff.y * -1);

			return location;
		},

		getElementsShorterDistance: function(element1, element2) {
			var cache = this.distanceCache[element1.getId() + '-' + element2.getId()];
			if (cache)
				return cache;

			// TODO ?

			var location = this._calcRoundMapLocation(element1, element2),
				distance = element2.distance(location),
				id1 = element1.getId(),
				id2 = element2.getId();
			
			this.distanceCache[id1 + '-' + id2] = distance;
			this.distanceCache[id2 + '-' + id1] = distance;

			return distance;
		},

		getShorterAngle: function(element1, element2) {
			// TODO ?
		},

		getRangeFromElement: function(element, radio) {
			var range = this.getRangeFromVectors(
				element.getX() - radio,
				element.getY() - radio,
				element.getEndX() + radio,
				element.getEndY() + radio
			);
			var result = new Range();
			var target;

			for (var i=range.length(); i--; ) {
				target = range.get(i);
				if (target === element ||
					this.getElementsShorterDistance(element, target) > radio)
					continue;
				result.push(target);
			}

			return result;
		},

		getRange: function(arg) {
			if (typeof arg === 'number')
				return this.getRangeFromVectors.apply(this, arguments);
			else
				return this.getRangeFromElement.apply(this, arguments);
		},

		tick: function(context) {
			context.clearRect(0, 0, this.width, this.height);
			context.strokeRect(0, 0, this.width, this.height);

			var items = this.items;
			for (var i = items.length; i--; ) {
				items[i].tick(this, context);
			}

			// clear the cache
			this.distanceCache = {};
		}
	});
})();
