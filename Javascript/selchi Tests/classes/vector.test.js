describe("Vector class", function() {
	var v = new Vector(3, 4);

	describe("Equals method", function() {
		it("should return true if two vectors properties have same values", function() {
			expect(v.equals(new Vector(3, 4))).toBeTrue();
		});
		it("should return false in any other case", function() {
			expect(v.equals(new Vector(4, 3))).toBeFalse();
			expect(v.equals(new Vector(0, 0))).toBeFalse();
			expect(v.equals(new Vector(3, 1))).toBeFalse();
			expect(v.equals(new Vector(1, 4))).toBeFalse();
		});
	});
	describe("Copy method", function() {
		var copy = v.copy();
		it("must return a new vector with same values than original", function() {
			expect(copy.equals(v)).toBeTrue();
		});
		it("must not change the original vector when modify copy values", function() {
			copy.x = 5;
			copy.y += 3;
			expect(v.x).toBe(3);
			expect(v.y).toBe(4);
		});
	});
	describe("IsZero method", function() {
		it("must return true only if both x and y properties are 0", function() {
			expect(new Vector(0, 0).isZero()).toBeTrue();
			expect(new Vector(3, 0).isZero()).toBeFalse();
			expect(new Vector(0, 2).isZero()).toBeFalse();
			expect(v.isZero()).toBeFalse();
		});
	});
	/* It produces indeterministic fails
	describe("Round method", function() {
		var vec;
		beforeEach(function() {
			vec = new Vector(Math.random(), Math.random())
		});
		it("must return same vector instance", function() {
			expect(vec.round()).toBe(vec);
		});
		it("must round both properties with two decimals by default", function() {
			expect(vec.x * 100).not.toBe(Math.round(vec.x * 100));
			expect(vec.y * 100).not.toBe(Math.round(vec.y * 100));
			vec.round();
			expect(vec.x * 100).toBe(Math.round(vec.x * 100));
			expect(vec.y * 100).toBe(Math.round(vec.y * 100));
		});
		it("must round both properties with decimals as given for example 0", function() {
			expect(vec.x).not.toBe(Math.round(vec.x));
			expect(vec.y).not.toBe(Math.round(vec.y));
			vec.round(0);
			expect(vec.x).toBe(Math.round(vec.x));
			expect(vec.y).toBe(Math.round(vec.y));
		});
		it("or 1", function() {
			expect(vec.x * 10).not.toBe(Math.round(vec.x * 10));
			expect(vec.y * 10).not.toBe(Math.round(vec.y * 10));
			vec.round(1);
			expect(vec.x * 10).toBe(Math.round(vec.x * 10));
			expect(vec.y * 10).toBe(Math.round(vec.y * 10));
		});
	});
	*/
	describe("Abs method", function() {
		it("must return same vector instance", function() {
			var vec = new Vector(3, 5);
			expect(vec.abs()).toBe(vec);
		});
		it("must not modify vector if values are positive", function() {
			expect(new Vector(3, 5).abs().equals(new Vector(3, 5))).toBeTrue();
		});
		it("must modify only negative values", function() {
			expect(new Vector(-3, 5).abs().equals(new Vector(3, 5))).toBeTrue();
			expect(new Vector(3, -5).abs().equals(new Vector(3, 5))).toBeTrue();
			expect(new Vector(-3, -5).abs().equals(new Vector(3, 5))).toBeTrue();
		});
	});
	describe("Add & Multiply method", function() {
		var copy = new Vector(3, 5);
		it("must modify both properties of vector adding given value", function() {
			copy.add(1);
			expect(copy.equals(new Vector(4, 6))).toBeTrue();
			copy.add(-3);
			expect(copy.equals(new Vector(1, 3))).toBeTrue();
			copy.multiply(4);
			expect(copy.equals(new Vector(4, 12))).toBeTrue();
			copy.multiply(1 / 2)
			expect(copy.equals(new Vector(2, 6))).toBeTrue();
		});
	});
	describe("Merge method", function() {
		var target = new Vector(5, 7);
		it("must modify original vector adding to its properties the values of target properties", function() {
			expect(target.merge(v).equals(new Vector(8, 11))).toBeTrue();
		});
	});
	describe("Diff method", function() {
		var target = new Vector(5, 7);
		it("must return a new vector with the diferences of vector properties against target properties", function() {
			expect(target.diff(v).equals(new Vector(2, 3))).toBeTrue();
		});
	});
	describe("GetHypotenuse method", function() {
		it("must return 0 if vector properties are 0", function() {
			expect(new Vector(0, 0).getHypotenuse()).toBe(0);
		});
		it("must return the hipotenuse with the corresponding formule", function() {
			expect(v.getHypotenuse()).toBe(5);
			expect(new Vector(5, 5).getHypotenuse()).toBe(Math.sqrt(50));
		});
	});
	describe("GetAngle method", function() {
		it("must return 0 if vector properties are 0", function() {
			expect(new Vector(0, 0).getAngle()).toBe(0);
		});
		it("must return 0 if vector property y is 0 and x positive", function() {
			pepe = true;
			expect(new Vector(3, 0).getAngle()).toBe(0);
			pepe = false;
			expect(new Vector(7, 0).getAngle()).toBe(0);
		});
		it("and between 0 and 45 if x is bigger than y", function() {
			expect(new Vector(3, 1).getAngle()).toBeBetween(0, 45);
		});
		it("must return 45 if vector properties are positive and equals", function() {
			expect(new Vector(3, 3).getAngle()).toBe(45);
			expect(new Vector(5, 5).getAngle()).toBe(45);
		});
		it("and between 45 and 90 if y is bigger than x", function() {
			expect(new Vector(1, 3).getAngle()).toBeBetween(45, 90);
		});
		it("must return 90 if vector property x is 0 and y positive", function() {
			expect(new Vector(0, 3).getAngle()).toBe(90);
			expect(new Vector(0, 7).getAngle()).toBe(90);
		});
		it("and between 90 and 135 if y is bigger than x", function() {
			expect(new Vector(-1, 3).getAngle()).toBeBetween(90, 135);
		});
		it("must return 135 if vector property x is negative and y positive", function() {
			expect(new Vector(-3, 3).getAngle()).toBe(135);
			expect(new Vector(-5, 5).getAngle()).toBe(135);
		});
		it("and between 135 and 180 if x is bigger than y", function() {
			expect(new Vector(-3, 1).getAngle()).toBeBetween(135, 180);
		});
		it("must return 180 if vector property y is 0 and x negative", function() {
			expect(new Vector(-3, 0).getAngle()).toBe(180);
			expect(new Vector(-7, 0).getAngle()).toBe(180);
		});
		it("and between 180 and 225 if x is bigger than y", function() {
			expect(new Vector(-3, -1).getAngle()).toBeBetween(180, 225);
		});
		it("must return 225 if vector properties are negative and equals", function() {
			expect(new Vector(-3, -3).getAngle()).toBe(225);
			expect(new Vector(-5, -5).getAngle()).toBe(225);
		});
		it("and between 225 and 270 if y is bigger than x", function() {
			expect(new Vector(-1, -3).getAngle()).toBeBetween(225, 270);
		});
		it("must return 270 if vector property x is 0 and y negative", function() {
			expect(new Vector(0, -3).getAngle()).toBe(270);
			expect(new Vector(0, -7).getAngle()).toBe(270);
		});
		it("and between 270 and 315 if x is bigger than y", function() {
			expect(new Vector(1, -3).getAngle()).toBeBetween(270, 315);
		});
		it("must return 315 if vector property y is negative and x positive", function() {
			expect(new Vector(3, -3).getAngle()).toBe(315);
			expect(new Vector(5, -5).getAngle()).toBe(315);
		});
		it("and between 315 and 360 if x is bigger than y", function() {
			expect(new Vector(3, -1).getAngle()).toBeBetween(315, 360);
		});
	});
}, true);
var pepe = false;