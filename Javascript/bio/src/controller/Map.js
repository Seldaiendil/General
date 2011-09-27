(function() {

	// Cell private class
	var Cell = oo.Class({
		constructor: function MapCell(x, y) {
			this.location = new bio.physic.Vector(x, y);
			this.byId = [];
			this.elements = [];
			this.smells = [];
			this.nutrients = 1.0
			this.x = x;
			this.y = y;
		},


		getElements: function() {
			return this.elements;
		},

		length: function() {
			return this.elements.length;
		},

		get: function(index) {
			return this.elements[index];
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
			if (!this.byId[el.getId()]) {
				this.elements[this.elements.length] = element;
				this.byId[el.getId()] = true;
			}
			return this;
		},

		remove: function(element) {
			if (this.byId[el.getId()]) {
				this.elements.splice(this.elements.indexOf(element), 1);
				this.byId[el.getId()] = false;
			}
			return this;
		}
	});



	var Range = oo.Class({
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
			if (typeof this.byId[element.getId()] !== 'number')
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
			this.byId[target.getId()] = NaN;

			return this;
		},

		merge: function(array) {
			for (var i=array.length; i--; )
				this.push(array[i]);
		};	
	});



	oo.Class('bio.controller.Map', {
		constructor: function Map(cols, rows) {
			this.cellSize = 10;
			this.cols = cols || 100;
			this.rows = rows || 100;

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

			for (var i = 0, len = this.columns.length; i < len; i++) {
				range = [];

				for (j = 0, lenj = this.rows.length; j < lenj; j++)
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
			this.updateLocation(element);

			element.addListener('move', this.updateLocation, this);
			element.addListener('destroy', this.removeElement, this);

			return this;
		},

		removeElement: function(element) {
			var lastLocations = this.locations[element.getId()];
			for (var i=lastLocations.length; i--; )
				lastLocations[i].remove(element);
			return this;
		},

		updateLocation: function(element) {
			var lastLocations = this.locations[element.getId()];
			var currentLocations = this.getElementCells(element);
			this.locations[element.getId()] = currentLocations;

			if (!lastLocations) {
				for (var i=currentLocations.length; i--; )
					currentLocations[i].push(el);
				
				return;
			}

			var j, found, newLocs = [], removeLocs = [];
			for (var i = lastLocations.length; i--; ) {
				found = false;
				for (j = currentLocations.length; j--; ) {
					if (lastLocations[i] === currentLocations[j])
						found = true;
				}
				if (!found)
					newLocs[newLocs.length] = lastLocations[i];
			}

			for (var i = currentLocations.length; i--; ) {
				found = false;
				for (j = lastLocations.length; j--; ) {
					if (currentLocations[i] === lastLocations[j])
						found = true;
				}
				if (!found)
					newLocs[newLocs.length] = currentLocations[i];
			}
			
			for (var i=lastLocations.length; i--; )
				lastLocations[i].remove(el);

			return this;
		},

		_calcRange = function(start, end, size) {
			if (end - start > size)
				return { start: 0, end: size };
			
			start %= size;
			if (start < 0)
				start += size;
			
			end %= size;
			while (end < start)
				end += size;
			
			return { start: start, end: end };
		}
		Map.prototype.getCellsAtZone: function(startX, startY, endX, endY) {
			var x = this._calcRange(startX, endX, this.width);
			var y = this._calcRange(startY, endY, this.height);
			var start = {
				x: this.calcCellNumber(x.start),
				y: this.calcCellNumber(y.start)
			};
			var end = {
				x: this.calcCellNumberCeil(x.end),
				y: this.calcCellNumberCeil(y.end)
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
				// ERROR: check error, sometimes cells[i] (120) is null when length is 121
				if (cells[i])
					result.merge(cells[i].getElements());
			
			return result;
		};
		function getSigne(number) {
			return Math.abs(number) / number;
		}
		function calcRoundMapLocation(element, target) {
			var location = element.location.copy();
			var diff = location.diff(target.location);
			// if distance is bigger than half map, it will be shorter by a lateral of the map
			if (Math.abs(diff.x) > this.cache.halfSize.x)
				location.x += this.cache.size.x * getSigne(diff.x * -1);
			if (Math.abs(diff.y) > this.cache.halfSize.y)
				location.y += this.cache.size.y * getSigne(diff.y * -1);
			return location;
		}
		function getCacheIndex(element1, element2) {
			Math.min(element1.getId(), element2.getId()) + "-" + Math.max(element1.getId(), element2.getId())
		}
		Map.prototype.getElementsShorterDistance: function(element1, element2) {
			var cacheIndex = getCacheIndex(element1, element2);
			var cache = this.cache.distance[cacheIndex];
			if (cache) {
				return cache.target.distance(cache.position);
			}
			//// TOOODOOOOOOOOOOO HEEREEEEE!!!!!!!!!!!
			
			
			
			
			
			
			
			
			
			
			
			
			this.cache.distance[cacheIndex] = {
				source: element1,
				target: element2,
				position: calcRoundMapLocation.call(this, element1, element2)
			};
			cache = this.cache.distance[cacheIndex];
			return cache.target.distance(cache.position);
		},
		getShorterAngle: function(element1, element2) {
		},
		getRangeFromElement: function(element, radio) {
			var range = this.getRangeFromVectors(
				element.getX() - radio,
				element.getY() - radio,
				element.getEndX() + radio,
				element.getEndY() + radio
			);
			
			for (var i=range.length(); i--; ) {
				var target = range.get(i);
				if (target === element) {
					range.remove(i);
					continue;
				}
				if (this.getElementsShorterDistance(element, target) > radio)
					range.remove(i);
			}
			return range;
		},
		getRange: function(arg) {
			if (typeof arg === 'number')
				return this.getRangeFromVectors.apply(this, arguments);
			else
				return this.getRangeFromElement.apply(this, arguments);
		},
		print: function(parent) {
			var cell,
				container = Dom.create('div'),
				width = this.columns * this.cellSize - 1,
				height = this.rows * this.cellSize - 1;
			container.className = "Map";
			container.style.width = width;
			for (var i=Math.ceil(this.columns / 2); i--; ) {
				cell = Dom.create('div');
				cell.className = "MapCell MapCol";
				cell.style.width = this.cellSize - 1;
				cell.style.height = height;
				cell.style.left = i * 2 * this.cellSize;
				container.appendChild(cell);
			}
			for (var i=Math.ceil(this.rows / 2); i--; ) {
				cell = Dom.create('div');
				cell.className = "MapCell MapRow";
				cell.style.width = width;
				cell.style.height = this.cellSize - 1;
				cell.style.top = i * 2 * this.cellSize;
				container.appendChild(cell);
			}
			parent.appendChild(container);
		};


	});

})();
