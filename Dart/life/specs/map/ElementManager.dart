#library('bio.map')
#include('Element.dart');
#include('Cell.dart');
#include('CellManager.dart');

class ElementManager {
	int width, height;
	num halfWidth, halfHeight;
	Map<int, List<Cell>> locations = {};
	Map<String, Dynamic> distanceCache = {};

	tick() {
		distanceCache = {};
	}

	setSize(int width, int height) {
		this.width = width;
		this.height = height;
		halfWidth = width / 2;
		halfHeight = height / 2;
	}

	add(Element element, CellManager manager) {
		this.locations[element.id] = [];
		this.updateLocation(element, manager);
	}

	remove(Element element) {
		var lastLocations = locations[element.id];
		for (int i = lastLocations.length; i--; )
			lastLocations[i].remove(element)
		locations[element.id] = null;
	}

	updateLocation(Element element, CellManager manager) {
		_roundMap(element);

		var lastCells = locations[element.id];
		var current = manager.getCellsAtElement(element);
		locations[element.id] = current;

		var remove = _getNotInList(lastCells, current);
		var add = _getNotInList(current, lastCells);


		for (i = remove.length; i--; )
			remove[i].remove(element);
		
		for (i = add.length; i--; )
			add[i].add(element);
 	}

	_roundMap(Element element) {
		if (element.x < 0)
			element.x += width;
		else if (element.x > width)
			element.x %= width;
		
		if (element.y < 0)
			element.y += height;
		else if (element.y > height)
			element.y %= height;
	}

	List _getNotInList(List from, List target) {
		var result = [];
		var search;
		bool found;
		for (int i = from.length; i--; )
			search = from[i];
			found = false;

			for (int j = target.length; j--; ) {
				if (target[j] == search) {
					found = true;
					break;
				}
			}
			
			if (!found)
				result.push(search);
		}

		return result;
	}
}