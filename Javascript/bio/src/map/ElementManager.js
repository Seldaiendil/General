Class('bio.map.ElementManager', {
	constructor: function ElementManager() {
		this.locations = {};

		this.width;
		this.height;
		this.halfWidth;
		this.halfHeight;
	},


	tick: function() {
		this.distanceCache = {};
	},

	setSize: function(width, height) {
		this.width = width;
		this.height = height;
		this.halfWidth = width / 2;
		this.halfHeight = height / 2;
	},

	add: function(element, cellManager) {
		this.locations[element.getId()] = [];
		this.updateLocation(element, cellManager);
	},

	remove: function(element) {
		var lastLocations = this.locations[element.getId()];
		for (var i=lastLocations.length; i--; )
			lastLocations[i].remove(element);
	},

	updateLocation: function(element, cellManager) {
		this._roundMap(element);

		var id = element.getId();
		var lastCells = this.locations[id];
		var currentCells = cellManager.getCellsAtElement(element);
		this.locations[id] = currentCells;

		var i, j, search, found;
		var remove = [];
		for (i = lastCells.length; i--; ) {
			search = lastCells[i];
			found = false;

			for (j = currentCells.length; j--; )
				if  (currentCells[j] === search)
					found = true;
			
			if (!found)
				remove[remove.length] = search;
		}
		
		var add = [];
		for (i = currentCells.length; i--; ) {
			search = currentCells[i];
			found = false;

			for (j = lastCells.length; j--; )
				if  (lastCells[j] === search)
					found = true;
			
			if (!found)
				add[add.length] = search;
		}

		for (i = remove.length; i--; )
			remove[i].remove(element);
		
		for (i = add.length; i--; )
			add[i].add(element);
	},

	_roundMap: function(element) {
		var x = element.getX();
		var y = element.getY();
		var width = this.width;
		var height = this.height;

		if (x < 0)
			element.setX(width + x);
		else if (x > width)
			element.setX(x % width);
		
		if (y < 0)
			element.setY(height + y);
		else if (y > height)
			element.setY(y % height);
	},

	distanceCache: {},
	getShorterDistance: function(element1, element2) {
		var cache = this.distanceCache[element1.getId() + '-' + element2.getId()];
		if (cache)
			return cache;
		
		var location = this._calcRoundMapLocation(element1, element2);
		var distance = element2.distance(location);
		var id1 = element1.getId();
		var id2 = element2.getId();

		this.distanceCache[id1 + '-' + id2] = distance;
		this.distanceCache[id2 + '-' + id1] = distance;
		return distance;
	},

	_calcRoundMapLocation: function(element1, element2) {
		var location = element1.location.clone();
		var diff = location.diff(element2.location);

		// if distance is bigger than half map, it will be shorter by a lateral of the map
		if (Math.abs(diff.x) > this.halfWidth)
			location.x += this.halfWidth * this._getSigne(Math.round(diff.x) * -1);
		
		if (Math.abs(diff.y) > this.halfHeight)
			location.y += this.halfHeight * this._getSigne(Math.round(diff.y) * -1);
		
		return location;
	},

	_getSigne: function(value) {
		return Math.abs(value) / value;
	},

	getShorterAngle: function(element1, element2) {
		// TODO
		throw new Error();
	}
});
