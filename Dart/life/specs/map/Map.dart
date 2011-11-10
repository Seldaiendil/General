class Map {
	int cellSize = 10;
	int columns = 100;
	int rows = 100;

	final var cells = new CellManager();
	final var element = new ElementManager();


	//
	// Methods
	//

	tick() => elements.tick();

	reset() {
		cells.cellSize = cellSize;
		cells.columns = columns;
		cells.rows = rows;

		elements.setSize(cellSize * columns, cellSize * rows);
		cells.reset();
	}


	//
	// ElementManager Methods
	//

	addElement(Element element) =>
		lements.add(element, cells);
	removeElement(Element element) =>
		elements.remove(element);

	updateLocation(Element element) =>
		elements.updateLocation(element, cells);

	num shorterDistance(Element element1, Element element2) =>
		elements.shorterDistance(element1, element2);
	num shorterAngle(Element element1, Element element2) =>
		elements.shorterAngle(element1, element2);


	//
	// CellManager methods
	//

	getRangeFromElement(Element element, num radius) =>
		cells.getRangeFromElement(element, radius);
}