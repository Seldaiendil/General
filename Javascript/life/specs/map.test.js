describe("Map class", function() {
	var map;
	beforeEach(function() {
		map = new Map();
	});
	function configureMap() {
		map.setCellSize(2);
		map.setColumns(5);
		map.setRows(5);
		map.clear();
	}

	describe("Reset method", function() {
		it("should create a two-dimensions array depending columns and rows properties", function() {
			map.setColumns(5);
			map.setRows(7);
			map.clear();
			expect(map.map.length).toBe(5);
			for (var i=5; i--; )
				expect(map.map[i].length).toBe(7);
		});
	});
	describe("AddElement method", function() {
		beforeEach(configureMap);
		it("should be able to recive any instance of subclass of Phisics and locate it depending its location", function() {
			var phi = new Phisics(5, 15);
			expect(function() {
				map.addElement(phi);
			}).not.toThrowError();

			pepe = true;
			phi.setX(8);
			phi.setY(6);
			pepe = false;
			map.addElement(phi);
			expect(map.getCell(4, 3).get(0)).toBe(phi);
		});
		it("should add it to all cells than the element occupies", function() {
			for (var i=0; i<5; i++)
				for (var j=0; j<5; j++)
					expect(map.getCell(i, j).length()).toBe(0);
			var phi = new Phisics(1, 1, 7, 7);
			map.addElement(phi);
			for (var i=0; i<4; i++)
				for (var j=0; j<4; j++)
					expect(map.getCell(i, j).get(0)).toBe(phi);
		});
	});

	function fillMap(map) {
		var elements = [
			new Phisics(0, 0, 1, 1),	// 27
			new Phisics(2, 2, 1, 1),
			new Phisics(4, 4, 1, 1),
			new Phisics(6, 6, 1, 1),
			new Phisics(8, 8, 1, 1)
		];
		for (var i=elements.length; i--; )
			map.addElement(elements[i]);
		return elements;
	}
	describe("removeElement method", function() {
		configureMap();
		var elements = fillMap(map);
		
		it("should remove given element from corresponding cell", function() {
			expect(map.getCell(0, 0).get(0)).toBe(elements[0]);
			map.removeElement(elements[0]);
			expect(map.getCell(0, 0).length()).toBe(0);
		});
		it("and not modify other elements", function() {
			expect(map.getCell(1, 1).get(0)).toBe(elements[1]);
			expect(map.getCell(2, 2).get(0)).toBe(elements[2]);
			expect(map.getCell(3, 3).get(0)).toBe(elements[3]);
			expect(map.getCell(4, 4).get(0)).toBe(elements[4]);
		});
	});
	describe("updateLocation method", function() {
		configureMap();
		var elements = fillMap(map);
		
		it("should remove element from last position and insert it at correct coordinates when they change", function() {
			var cell22 = map.getCell(2, 2);
			var cell41 = map.getCell(4, 1);
			var element = cell22.get(0);
			expect(element).toBe(elements[2]);
			expect(cell41.length()).toBe(0);
			element.setX(8);
			element.setY(3);
			map.updateLocation(element);
			expect(cell22.length()).toBe(0);
			expect(cell41.get(0)).toBe(element);
		});
	});
	describe("getCellsAtZone method", function() {
		beforeEach(configureMap);
		function test(x1, y1, x2, y2, result) {
			var cells = map.getCellsAtZone(x1, y1, x2, y2);
			expect(cells.length).toBe(result.length);
			for (var i=0; i<cells.length; i++)
				expect(cells[i]).toBe(result[i]);
		}
		it("should return the cells than matches given zone", function() {
			test(0, 0, 1, 1, [
				map.getCell(0, 0)
			]);
		});
		it("even with a range with many cells", function() {
			test(0, 0, 3, 3, [
				map.getCell(0, 0),
				map.getCell(0, 1),
				map.getCell(1, 0),
				map.getCell(1, 1)
			]);
		});
		it("should return cells from end when some zone values are negative", function() {
			test(-1, -1, 0, 0, [
				map.getCell(4, 4),
			]);
			test(-5, -5, -4, -4, [
				map.getCell(2, 2)
			]);
		});
		it("even with a range with many cells", function() {
			test(-3, -3, -1, -1, [
				map.getCell(3, 3),
				map.getCell(3, 4),
				map.getCell(4, 3),
				map.getCell(4, 4)
			]);
			test(-5, 0, -1, 1, [
				map.getCell(2, 0),
				map.getCell(3, 0),
				map.getCell(4, 0)
			]);
		});
		// UNSOLVED dont know how to make program understand when the required range is bigger
		xit("should not fail when required range is bigger than map size", function() {
			test(-6, 0, 6, 1, [
				map.getCell(2, 0),
				map.getCell(3, 0),
				map.getCell(4, 0),
				map.getCell(0, 0),
				map.getCell(1, 0)
			]);
		});
	});
	describe("getElementCells method", function() {
		beforeEach(configureMap);
		it("should return an array with all cells than element occupies", function() {
			var phi = new Phisics(1, 1, 1, 1);
			var cell = map.getElementCells(phi);
			expect(cell.length).toBe(1);
			expect(cell[0]).toBe(map.getCell(0, 0));
		});
		it("even with big elements", function() {
			var phi = new Phisics(2, 2, 4, 4);
			var cells = map.getElementCells(phi);
			expect(cells.length).toBe(4);
			expect(cells[0]).toBe(map.getCell(1, 1));
			expect(cells[1]).toBe(map.getCell(1, 2));
			expect(cells[2]).toBe(map.getCell(2, 1));
			expect(cells[3]).toBe(map.getCell(2, 2));
		});
	});
	describe("getRangeFromVectors method", function() {
		configureMap();
		var elements = fillMap(map);
		
		it("should return all elements on given range", function() {
			var range = map.getRangeFromVectors(0, 0, 3, 3);
			expect(range.length()).toBe(2);
			expect(range.get(0)).toBe(elements[0]);
			expect(range.get(1)).toBe(elements[1]);
			
			range = map.getRange(0, 3, 2, 7);
			expect(range.length()).toBe(0);
		});
	});
	describe("getRangeFromElement method", function() {
		configureMap();
		var elements = fillMap(map);
		
		it("should return all elements who distance with given element is lower than given radio", function() {
			var range = map.getRangeFromElement(elements[2], 1);
			expect(range.length()).toBe(0);
			
			range = map.getRangeFromElement(elements[2], 3);
			expect(range.length()).toBe(2);
			expect(range.get(0)).toBe(elements[1]);
			expect(range.get(1)).toBe(elements[3]);
			
			range = map.getRangeFromElement(elements[0], 4);
			expect(range.length()).toBe(2);
			expect(range.get(0)).toBe(elements[4]);
			expect(range.get(1)).toBe(elements[1]);
		});
	});
	describe("getRange method", function() {
		configureMap();
		var vectorSpy = Spy.spyMethod(map, 'getRangeFromVectors', false);
		var elementSpy = Spy.spyMethod(map, 'getRangeFromElement', false);
		beforeEach(function() {
			vectorSpy.reset();
			elementSpy.reset();
		});
		it("should call getRangeFromElement if first argument is Phisics instance", function() {
			map.getRange(new Phisics(), 5);
			expect(vectorSpy.callCount).toBe(0);
			expect(elementSpy.callCount).toBe(1);
		});
		it("should call getRangeFromVectors otherwise", function() {
			map.getRange(1, 2, 3, 4);
			expect(vectorSpy.callCount).toBe(1);
			expect(elementSpy.callCount).toBe(0);
		});
	});
}, true);


