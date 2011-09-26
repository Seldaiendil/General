var Map = (function() {
	function printElements(array) {
		return "{ " +
			array.join(", ")
				.replace(/\[object \w*\] { id: /g, "")
				.replace(/ }/g, "") +
			" }";
	};

	// Private Class
	function Range() {
		this.items = [];
		this.byId = {};
	};
	Range.prototype.length = function() {
		return this.items.length;
	};
	Range.prototype.forEach = function(action) {
		for (var i=this.items.length; i--; )
			action(this.items[i], i);
	};
	Range.prototype.get = function(index) {
		return this.items[index];
	};
	Range.prototype.getById = function(id) {
		return this.byId[id];
	};
	Range.prototype.push = function(el) {
		if (this.byId[el.getId()])
			return;
		this.items.push(el);
		this.byId[el.getId()] = el;
	};
	Range.prototype.remove = function(index) {
		if (typeof index !== 'number')
			index = this.items.indexOf(index);
		var target = this.items[index];
		this.items.splice(index, 1);
		this.byId[target.getId()] = null;
		return this;
	};
	Range.prototype.merge = function(array) {
		for (var i=array.length; i--; )
			this.push(array[i]);
	};
	Range.prototype.toString = function() {
		return "[object Range] " + printElements(this.items);
	};
	
	// Private Class
	function Cell(x, y) {
		this.location = new Vector(x, y);
		this.byId = [];
		this.elements = [];
		this.smells = [];
		this.water = 0.5;
		this.nutrients = 1.0
		this.x = x;
		this.y = y;
	}
	Cell.property('elements', true);
	Cell.prototype.get = function(index) {
		return this.elements[index];
	};
	Cell.prototype.length = function() {
		return this.elements.length;
	};
	Cell.prototype.getWater = function() {
		var extract = this.water * 0.10;
		this.water -= extract;
		return extract;
	};
	Cell.prototype.getNutrients = function() {
		var extract = this.nutrients * 0.10;
		this.nutrients -= extract;
		return extract;
	};
	Cell.prototype.push = function(el) {
		if (!this.byId[el.getId()]) {
			this.elements.push(el);
			this.byId[el.getId()] = true;
		}
		return this;
	};
	Cell.prototype.remove = function(el) {
		if (this.byId[el.getId()]) {
			this.elements.splice(this.elements.indexOf(el), 1);
			this.byId[el.getId()] = false;
		}
		return this;
	};
	Cell.prototype.toString = function() {
		return "[object Cell] x: " + this.x + " y: " + this.y + " " + printElements(this.elements);
	};

	// Class
	function Map(cols, rows) {
		this.cellSize = 10;
		this.columns = cols || 100;
		this.rows = rows || 100;

		// cache
		this.cache = {
			size: null,
			halfSize: null,
			distance: []
		};
		refreshSizeCache.call(this);

		this.items = [];
		this.map = [];
	}
	Map.property('cellSize');
	Map.property('columns');
	Map.property('rows');
	Map.prototype.setCellSize = function(value) {
		this.cellSize = value;
		refreshSizeCache.call(this);
	};
	Map.prototype.setColumns = function(value) {
		this.columns = value;
		refreshSizeCache.call(this);
	};
	Map.prototype.setRows = function(value) {
		this.rows = value;
		refreshSizeCache.call(this);
	};
	
	function refreshSizeCache() {
		this.cache.size = new Vector(
			this.columns * this.cellSize,
			this.rows * this.cellSize
		);
		this.cache.halfSize = this.cache.size.copy().multiply(0.5);
	};
	Map.prototype.calcCellNumber = function(value) {
		return Math.floor(value / this.cellSize);
	};
	Map.prototype.calcCellNumberCeil = function(value) {
		return Math.ceil(value / this.cellSize);
	};
	Map.prototype.clear = function() {
		this.map = [];
		this.items = [];
		for (var range, i=this.columns; i--; ) {
			range = [];
			for (var j=this.rows; j--; )
				range.push(new Cell(this.columns - i - 1, this.rows - j - 1));
			this.map.push(range);
		}
		return this;
	};
	Map.prototype.getSize = function() {
		return this.cache.size.copy();
	};
 	Map.prototype.getCell = function(col, row) {
		if (!this.map[col])
			throw new Error("Column " + col + " not found. Map size: " + this.columns);
		return this.map[col][row];
	};
	Map.prototype.getCellAt = function(x, y) {
		return this.map[this.calcCellNumber(x)][this.calcCellNumber(y)];
	};
	Map.prototype.addElement = function(el) {
		this.updateLocation(el);
		return this;
	};
	Map.prototype.removeElement = function(el) {
		var lastLocations = this.items[el.getId()];
		for (var i=lastLocations.length; i--; )
			lastLocations[i].remove(el);
		return this;
	};
	Map.prototype.updateLocation = function(el) {
		var lastLocations = this.items[el.getId()];
		var currentLocations = this.getElementCells(el);
		this.items[el.getId()] = currentLocations;
		
		if (lastLocations)
			for (var i=lastLocations.length; i--; )
				lastLocations[i].remove(el);
		for (var i=currentLocations.length; i--; )
			currentLocations[i].push(el);
		return this;
	};
	function calcRange(start, end, size) {
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
	Map.prototype.getCellsAtZone = function(startX, startY, endX, endY) {
		var x = calcRange(startX, endX, this.cache.size.x);
		var y = calcRange(startY, endY, this.cache.size.y);
		var start = new Vector(this.calcCellNumber(x.start), this.calcCellNumber(y.start));
		var end = new Vector(this.calcCellNumberCeil(x.end), this.calcCellNumberCeil(y.end));
		var result = [];
		
		for (var i = start.x; i < end.x; i++)
			for (var j = start.y; j < end.y; j++)
				result.push(this.map[i % this.columns][j % this.rows]);
		return result;
	};
	Map.prototype.getElementCells = function(element) {
		return this.getCellsAtZone(
			element.getX(),
			element.getY(),
			element.getEndX(),
			element.getEndY()
		);
	};
	Map.prototype.getRangeFromVectors = function(startX, startY, endX, endY) {
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
	Map.prototype.getElementsShorterDistance = function(element1, element2) {
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
	};
	Map.prototype.getShorterAngle = function(element1, element2) {
	};
	Map.prototype.getRangeFromElement = function(element, radio) {
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
	};
	Map.prototype.getRange = function(arg) {
		if (typeof arg === 'number')
			return this.getRangeFromVectors.apply(this, arguments);
		else
			return this.getRangeFromElement.apply(this, arguments);
	};
	Map.prototype.print = function(parent) {
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
	Map.prototype.toString = function() {
		return "[object Map]";
	};

	Map.Range = Range;
	return Map;
})();
