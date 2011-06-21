describe("Force class", function() {
	var f = new Force(45, 10);

	describe("Equals method", function() {
		it("should return true if two forces properties have same values", function() {
			expect(f.equals(new Force(45, 10))).toBeTrue();
		});
		it("should return false in any other case", function() {
			expect(f.equals(new Force(0, 0))).toBeFalse();
			expect(f.equals(new Force(45, 0))).toBeFalse();
			expect(f.equals(new Force(0, 10))).toBeFalse();
			expect(f.equals(new Force(45, 5))).toBeFalse();
			expect(f.equals(new Force(40, 10))).toBeFalse();
			expect(f.equals(new Force(90, 20))).toBeFalse();
		});
	});
	describe("Copy method", function() {
		var copy = f.copy();
		it("must return a new vector with same values than original", function() {
			expect(copy.equals(f)).toBeTrue();
		});
		it("must not change the original vector when modify copy values", function() {
			copy.setDirection(5);
			copy.modifyStrength(3);
			expect(f.getDirection()).toBe(45);
			expect(f.getStrength()).toBe(10);
		});
	});
	describe("GetDirection method", function() {
		it("must return force direction", function() {
			expect(f.getDirection()).toBe(45);
		});
		it("must not return a direction bigger than 360", function() {
			var copy = f.copy();
			for (var i=400; i--; ) {
				copy.setDirection(i);
				expect(copy.getDirection()).toBeLowerThan(360);
			}
		});
	});
	describe("ModifyDirection method", function() {
		var copy = f.copy();
		it("must return the force object", function() {
			expect(copy.modifyDirection(1)).toBe(copy);
		});
		it("must modify force object adding given value to direction", function() {
			copy.setDirection(5);
			expect(copy.modifyDirection(10).getDirection()).toBe(15);
			expect(copy.modifyDirection(-15).getDirection()).toBe(0);
		});
		it("must calc positive degrees when direction become negative", function() {
			copy.setDirection(0);
			expect(copy.modifyDirection(-90).getDirection()).toBe(270);
			expect(copy.modifyDirection(-360).getDirection()).toBe(270);
		});
		it("must not modify strength absolute value", function() {
			expect(Math.abs(copy.modifyDirection(30).getStrength())).toBe(10);
			expect(Math.abs(copy.modifyDirection(361).getStrength())).toBe(10);
			expect(Math.abs(copy.modifyDirection(-180).getStrength())).toBe(10);
			expect(Math.abs(copy.modifyDirection(-90).getStrength())).toBe(10);
		});
	});
	describe("ModifyStrength method", function() {
		var copy = f.copy();
		it("must return the force object", function() {
			expect(copy.modifyStrength(1)).toBe(copy);
		});
		it("must modify force object adding given value to strenth", function() {
			copy.setStrength(5);
			expect(copy.modifyStrength(10).getStrength()).toBe(15);
			expect(copy.modifyStrength(-90).getStrength()).toBe(75);
			expect(copy.modifyStrength(50).getStrength()).toBe(125);
		});
		it("must modify direction absolute value only when strength become negative", function() {
			copy.setStrength(0);
			copy.setDirection(45);
			expect(copy.modifyStrength(10).getDirection()).toBe(45);
			expect(copy.modifyStrength(50).getDirection()).toBe(45);
			expect(copy.modifyStrength(-100).getDirection()).toBe(225);
			expect(copy.modifyStrength(-168).getDirection()).toBe(45);
		});
	});
	describe("GetVector method", function() {
		it("must return a vector instance", function() {
			expect(f.getVector()).toBeInstanceOf(Vector);
		});
		describe("Vector properties can never be bigger than strength", Function.empty);
		it("must return a 0 vector if force properties are 0", function() {
			expect(new Force(0, 0).getVector().equals(new Vector(0, 0))).toBeTrue();
		});
		it("must return x positive with strength value and y 0 if direction is 0", function() {
			expect(new Force(0, 10).getVector().equals(new Vector(10, 0))).toBeTrue();
		});
		it("and x bigger than y if direction is between 0 and 45", function() {
			function test(vec) {
				expect(vec.y).toBeBetween(0, force.getStrength());
				expect(vec.x).toBeBetween(vec.y, force.getStrength());
			}
			var force = new Force(10, 10);
			test(force.getVector());
			test(force.setDirection(30).getVector());
		});
		it("must return x and y with same value when direction is 45", function() {
			var force = new Force(45, 10);
			var vec = force.getVector().round();
			expect(vec.x).toBe(vec.y);
			expect(vec.x).toBeBetween(0, force.getStrength());
		});
		it("and x lower than y if direction is between 45 and 90", function() {
			function test(vec) {
				expect(vec.x).toBeBetween(0, force.getStrength());
				expect(vec.y).toBeBetween(vec.x, force.getStrength());
			}
			var force = new Force(55, 10);
			test(force.getVector());
			test(force.setDirection(80).getVector());
		});
		it("must return x 0 and y with strength value if direction is 90", function() {
			expect(new Force(90, 10).getVector().round().equals(new Vector(0, 10))).toBeTrue();
		});
		it("and x negative and lower than y if direction is between 90 and 135", function() {
			function test(vec) {
				expect(vec.x).toBeNegative();
				vec.abs();
				expect(vec.x).toBeBetween(0, force.getStrength());
				expect(vec.y).toBeBetween(vec.x, force.getStrength());
			}
			var force = new Force(100, 10);
			test(force.getVector());
			test(force.setDirection(125).getVector());
		});
		it("must return x and y with same value but x negative when direction is 135", function() {
			var force = new Force(135, 10);
			var vec = force.getVector().round();
			expect(vec.x).toBeNegative();
			vec.abs();
			expect(vec.x).toBeBetween(0, force.getStrength());
			expect(vec.y).toBe(vec.x);
		});
		it("and x bigger than y but negative if direction is between 135 and 180", function() {
			function test(vec) {
				expect(vec.x).toBeNegative();
				vec.abs();
				expect(vec.y).toBeBetween(0, force.getStrength());
				expect(vec.x).toBeBetween(vec.y, force.getStrength());
			}
			var force = new Force(145, 10);
			test(force.getVector());
			test(force.setDirection(170).getVector());
		});
		it("must return x negative with strength value and y 0 if direction is 180", function() {
			expect(new Force(180, 10).getVector().round().equals(new Vector(-10, 0))).toBeTrue();
		});
		it("and x bigger than y both negative if direction is between 180 and 225", function() {
			function test(vec) {
				expect(vec.y).toBeBetween(-force.getStrength(), 0);
				expect(vec.x).toBeBetween(-force.getStrength(), vec.y);
			}
			var force = new Force(190, 10);
			test(force.getVector());
			test(force.setDirection(215).getVector());
		});
		it("must return x and y with same negative value when direction is 225", function() {
			var force = new Force(225, 10);
			var vec = force.getVector().round();
			expect(vec.x).toBe(vec.y);
			expect(vec.x).toBeBetween(-force.getStrength(), 0);
		});
		it("and x lower than y both negative if direction is between 225 and 270", function() {
			function test(vec) {
				expect(vec.x).toBeBetween(-force.getStrength(), 0);
				expect(vec.y).toBeBetween(-force.getStrength(), vec.x);
			}
			var force = new Force(235, 10);
			test(force.getVector());
			test(force.setDirection(260).getVector());
		});
		it("must return x 0 and y with negative strength value if direction is 270", function() {
			expect(new Force(270, 10).getVector().round().equals(new Vector(0, -10))).toBeTrue();
		});
		it("and x lower than y but y must be negative if direction is between 270 and 315", function() {
			function test(vec) {
				expect(vec.y).toBeNegative();
				vec.abs();
				expect(vec.x).toBeBetween(0, force.getStrength());
				expect(vec.y).toBeBetween(vec.x, force.getStrength());
			}
			var force = new Force(280, 10);
			test(force.getVector());
			test(force.setDirection(305).getVector());
		});
		it("must return x and y with same value but y negative when direction is 315", function() {
			var force = new Force(315, 10);
			var vec = force.getVector().round();
			expect(vec.y).toBeNegative();
			vec.abs();
			expect(vec.x).toBeBetween(0, force.getStrength());
			expect(vec.y).toBe(vec.x);
		});
		it("and x bigger than y but y must be negative if direction is between 315 and 360", function() {
			function test(vec) {
				expect(vec.y).toBeNegative();
				vec.abs();
				expect(vec.y).toBeBetween(0, force.getStrength());
				expect(vec.x).toBeBetween(vec.y, force.getStrength());
			}
			var force = new Force(325, 10);
			test(force.getVector());
			test(force.setDirection(350).getVector());
		});
	});
	describe("Merge method", function() {
		var copy;
		beforeEach(function() {
			copy = f.copy();
		});
		it("must sum strength when direction is same", function() {
			function test(direction) {
				var temp = new Force(direction, 10);
				temp.merge(temp);
				expect(temp.getDirection()).toBe(direction);
				expect(Math.abs(temp.getStrength())).toBe(20);
			}
			test(0);
			test(135);
			test(270);
		});
		it("must get the average direction when strength is same", function() {
			function test(direction1, direction2) {
				var force1 = new Force(direction1, 10);
				var force2 = new Force(direction2, 10);
				force1.merge(force2);
				expect(force1.getDirection()).toBe((direction1 + direction2) / 2);
			}
			test(0, 90);
			test(45, 180);
		});
	});
}, true);