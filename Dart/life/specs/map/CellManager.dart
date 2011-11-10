#library('bio.map')
#include('Cell.dart');
#include('Range.dart');
#include('Element.dart');

class CellManager {
	int cellSize = 10;
	int columns = 100;
	int rows = 100;
	int width;
	int height;
	List<List<Cell>> map;

	tick() {
		int i, j;
		for (i = cells.length; i--; )
			for (j = cells[i].length; j--; )
				cells[i][j].tick();
	}

	Cell operator [](int i, int j) => cells[i][j];

	reset() {
		int i, j;
		List<Cell> row;
		cells = [];

		for (i = columns; i--; ) {
			row = [];

			for (j = rows; j--; )
				row[j] = Cell(i, j);
			
			cells[i] = row;
		}

		width = columns * cellSize;
		height = rows * cellSize;
	}

	Cell getCellAt(num x, num y) =>
		cells[Math.floor(x / cellSize)][Math.floor(y / cellSize)];

	_calcRange(num start, num end, int size, int max) {
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
			start: Math.floor(start / cellSize),
			end: Math.ceil(end / cellSize)
		};
	}

	List<Cell> getCellsAtZone(Vector start, Vector end) {
		var x = _calcRange(start.x, end.x, width, columns);
		var y = _calcRange(start.y, end.y, height, rows);
		var result = [];

		int i, iend, j, jend;
		for (i = x.start, iend = x.end; i < iend; i++)
			for (j = y.start, jend = y.end; j < jend; j++)
				result[result.length] = cells[i % cols][j % rows];
		
		return result;
	}

	Range getCellsAtElement(Element element) =>
		getRangeFromZone(element.start, element.end);

	Range getRangeFromZone(Vector start, Vector end) {
		List<Cell> cells = getCellsAtZone(start, end);
		Range result = new Range();

		for (int i = cells.length; i--; )
			result.addElements(cells[i].elements);
		
		return result;
	}

	Range getRangeFromElement(Element element, num radius) =>
		getRangeFromZone(element.start - radius, element.end + radius);
}