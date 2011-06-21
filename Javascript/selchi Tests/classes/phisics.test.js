describe("Phisics class", function() {
	describe("On create a new instance", function() {
		var phi;
		beforeEach(function() {
			phi = new Phisics();
		});

		it("must have all position properties to 0 and size properties to 1", function() {
			expect(phi.getX()).toBe(0);
			expect(phi.getY()).toBe(0);
			expect(phi.getWidth()).toBe(1);
			expect(phi.getHeight()).toBe(1);
		});
		it("must have setters for all four properties", function() {
			expect(phi.setX).toBeFunction();
			expect(phi.setY).toBeFunction();
			expect(phi.setWidth).toBeFunction();
			expect(phi.setHeight).toBeFunction();
		});
	});
	describe("getEnd... methods", function() {
		var phi = new Phisics(2, 4, 7, 9);

		it("must return the addition of location and size", function() {
			expect(phi.getEndX()).toBe(9);
			expect(phi.getEndY()).toBe(13);
		});
	});
	describe("Method testCollision", function() {
		var phi = new Phisics(10, 10, 5, 5);

		it("must return false if target is at the right of object", function() {
				var target = new Phisics(3, 11, 3, 3);
				expect(phi.testCollision(target)).toBe(false);
		});
		it("must return false if target is at the top of object", function() {
				var target = new Phisics(11, 3, 3, 3);
				expect(phi.testCollision(target)).toBe(false);
		});
		it("must return false if target is at the left of object", function() {
				var target = new Phisics(17, 11, 3, 3);
				expect(phi.testCollision(target)).toBe(false);
		});
		it("must return false if target is at the bottom of object", function() {
				var target = new Phisics(11, 17, 3, 3);
				expect(phi.testCollision(target)).toBe(false);
		});
		it("should return true if target touches the right of object", function() {
				var target = new Phisics(8, 11, 3, 3);
				expect(phi.testCollision(target)).toBe(true);
		});
		it("should return true if target touches the top of object", function() {
				var target = new Phisics(11, 8, 3, 3);
				expect(phi.testCollision(target)).toBe(true);
		});
		it("should return true if target touches the left of object", function() {
				var target = new Phisics(14, 11, 3, 3);
				expect(phi.testCollision(target)).toBe(true);
		});
		it("should return true if target touches the bottom of object", function() {
				var target = new Phisics(11, 14, 3, 3);
				expect(phi.testCollision(target)).toBe(true);
		});
		it("should return true if target touches the top-right corner of object", function() {
				var target = new Phisics(8, 8, 3, 3);
				expect(phi.testCollision(target)).toBe(true);
		});
		it("should return true if target touches the top-left corner of object", function() {
				var target = new Phisics(8, 14, 3, 3);
				expect(phi.testCollision(target)).toBe(true);
		});
		it("should return true if target touches the bottom-right corner of object", function() {
				var target = new Phisics(14, 8, 3, 3);
				expect(phi.testCollision(target)).toBe(true);
		});
		it("should return true if target touches the bottom-left corner of object", function() {
				var target = new Phisics(14, 14, 3, 3);
				expect(phi.testCollision(target)).toBe(true);
		});
		it("should return true if target is inside object", function() {
				var target = new Phisics(11, 11, 3, 3);
				expect(phi.testCollision(target)).toBe(true);
		});
		it("should return true if target contains object", function() {
				var target = new Phisics(9, 9, 7, 7);
				expect(phi.testCollision(target)).toBe(true);
		});
	});
	describe("Move method", function() {
		var phi = new Phisics(10, 10, 1, 1);;
		beforeEach(function() {
			phi.setX(10);
			phi.setY(10);
			phi.setVelocity(1);
			phi.setDirection(0);
		});

		it("should move $(velocity) points at X axis and not move Y if direction is 0", function() {
			phi.setDirection(0);
			phi.move();
			expect(phi.getX()).toBe(11);
			expect(phi.getY()).toBe(10);
		});
		it("should move $(velocity) points at Y axis and not move X if direction is 90", function() {
			phi.setDirection(90);
			phi.move();
			expect(phi.getX()).toBe(10);
			expect(phi.getY()).toBe(11);
		});
		it("should move -$(velocity) points at X axis and not move Y if direction is 180", function() {
			phi.setDirection(180);
			phi.move();
			expect(phi.getX()).toBe(9);
			expect(phi.getY()).toBe(10);
		});
		it("should move -$(velocity) points at Y axis and not move X if direction is 270", function() {
			phi.setDirection(270);
			phi.move();
			expect(phi.getX()).toBe(10);
			expect(phi.getY()).toBe(9);
		});
		it("should move in two axies the same points if direction is 45 or 225", function() {
			phi.setDirection(45);
			phi.move();
			expect(phi.getX()).toBe(phi.getY());
			phi.setDirection(225);
			phi.move();
			expect(phi.getX()).toBe(phi.getY());
		});
		it("should move in two axies the same points but opposite if direction is 135 or 315", function() {
			phi.setDirection(135);
			phi.move();
			expect(phi.getX() + phi.getY()).toBe(20);
			phi.setDirection(315);
			phi.move();
			expect(phi.getX() + phi.getY()).toBe(20);
		});
	});
	describe("ModifiyVelocity method", function() {
		var phi = new Phisics();
		it("should add given value to velocity property", function() {
			phi.modifyVelocity(5);
			expect(phi.getVelocity()).toBe(5);
			phi.modifyVelocity(7);
			expect(phi.getVelocity()).toBe(12);
		});
	});
	describe("ModifyDirection method", function() {
		var phi = new Phisics();
		beforeEach(function() {
			phi.setDirection(0);
		});

		it("should add given value to direction property", function() {
			phi.modifyDirection(20);
			expect(phi.getDirection()).toBe(20);
			phi.modifyDirection(25);
			expect(phi.getDirection()).toBe(45);
		});
		it("must reduce direction value if it is bigger than 360", function() {
			phi.modifyDirection(360);
			expect(phi.getDirection()).toBe(0);
			phi.modifyDirection(405);
			expect(phi.getDirection()).toBe(45);
			phi.modifyDirection(180);
			expect(phi.getDirection()).toBe(225);
			phi.modifyDirection(181);
			expect(phi.getDirection()).toBe(46);
		});
		it("must reduce direction and add it 360 if value is negative", function() {
			phi.modifyDirection(-30);
			expect(phi.getDirection()).toBe(330);
			phi.setDirection(0);
			phi.modifyDirection(-400);
			expect(phi.getDirection()).toBe(320);
			phi.setDirection(0);
			phi.modifyDirection(-360);
			expect(phi.getDirection()).toBe(0);
		});
	});
	describe("Shove method", function() {
		var phi;
		beforeEach(function() {
			phi = new Phisics();
		});
		it("should modify velocity as much as shove strength if direction is same", function() {
			phi.shove(0, 50);
			expect(phi.getVelocity()).toBe(50);
			phi.shove(0, 10);
			expect(phi.getVelocity()).toBe(60);
			phi.shove(0, 100);
			expect(phi.getVelocity()).toBe(160);
		});
		it("should substract velocity and not modify direction if shove direction is opposite", function() {
			phi.shove(0, 50);
			expect(phi.getVelocity()).toBe(50);
			phi.shove(180, 30);
			expect(phi.getVelocity()).toBe(20);

			phi = new Phisics();
			phi.shove(45, 100);
			expect(Math.round(phi.getDirection())).toBe(45);
			expect(Math.round(phi.getVelocity())).toBe(100);
			phi.shove(225, 60);
			expect(Math.round(phi.getDirection())).toBe(45);
			expect(Math.round(phi.getVelocity())).toBe(40);
			phi.shove(225, 60);
			expect(Math.round(phi.getDirection())).toBe(225);
			expect(Math.round(phi.getVelocity())).toBe(20);
			phi.shove(225, 60);
			expect(Math.round(phi.getDirection())).toBe(225);
			expect(Math.round(phi.getVelocity())).toBe(80);
		});
		it("should merge directions if velocity is same", function() {
			var hypotenuse = Math.round(Math.sqrt(Math.pow(50, 2) * 2, 2));
			phi.shove(45, 50);
			phi.shove(135, 50);
			expect(Math.round(phi.getVelocity())).toBe(hypotenuse);
			expect(Math.round(phi.getDirection())).toBe(90);

			phi.setVelocity(50);
			phi.shove(180, 50);
			expect(Math.round(phi.getVelocity())).toBe(hypotenuse);
			expect(Math.round(phi.getDirection())).toBe(135);

			phi.setVelocity(50);
			phi.shove(0, 50);
			expect(Math.round(phi.getDirection())).toBe(Math.round(135 / 2));
		});
	});
	describe("Brake method", function() {
		var phi;
		beforeEach(function() {
			phi = new Phisics();
			phi.setVelocity(100);
		});
		it("should reduce velocity with given strength", function() {
			phi.brake(10);
			expect(phi.getVelocity()).toBe(90);
			phi.brake(0.1)
			expect(phi.getVelocity()).toBe(89.9);
		});
		it("should set velocity to 0 if result velocity is negative", function() {
			phi.brake(200);
			expect(phi.getVelocity()).toBe(0);
		});
	});
	describe("Stop method", function() {
		var phi;
		beforeEach(function() {
			phi = new Phisics();
		});
		it("should set velocity to 0", function() {
			phi.setVelocity(50);
			phi.stop();
			expect(phi.getVelocity()).toBe(0);

			phi.setVelocity(99);
			phi.stop();
			expect(phi.getVelocity()).toBe(0);

			phi.setVelocity(1000);
			phi.stop();
			expect(phi.getVelocity()).toBe(0);
		});
	});
	describe("IsStopped method", function() {
		var phi;
		beforeEach(function() {
			phi = new Phisics();
		});
		it("should return true if velocity rounded to 1 decimal is 0", function() {
			phi.setVelocity(0.0354);
			expect(phi.isStopped()).toBeTrue();
			phi.setVelocity(0.0954);
			expect(phi.isStopped()).toBeFalse();
			phi.setVelocity(1);
			expect(phi.isStopped()).toBeFalse();
			phi.setVelocity(1.034);
			expect(phi.isStopped()).toBeFalse();
		});
	});
}, true);
