describe("LifeForm class", function() {
	var life;
	beforeEach(function() {
		life = new LifeForm();
	});
	describe("isSonOf method", function() {
		it("should return true if given argument only was setted as parent with addParent method", function() {
			expect(life.isSonOf(new LifeForm())).toBeFalse();
			var parent = new LifeForm();
			life.addParent(parent);
			expect(life.isSonOf(parent)).toBeTrue();
		});
	});
	describe("isParentOf method", function() {
		it("should return true only if this is parent of argument", function() {
			expect(life.isParentOf(new LifeForm())).toBeFalse();
			var child = new LifeForm();
			child.addParent(life);
			expect(life.isParentOf(child)).toBeTrue();
		});
	});
	describe("areBrothers method", function() {
		it("should return true if this and argument have same parent", function() {
			expect(life.areBrothers(new LifeForm())).toBeFalse();
			var parent = new LifeForm();
			var brother = new LifeForm();
			life.addParent(parent);
			brother.addParent(parent);
			expect(life.areBrothers(brother)).toBeTrue();
		});
	});
	describe("die method", function() {	
		beforeEach(function() {
			life = new LifeForm();
		});
		it("should fire onDie event only once", function() {
			var spy = new Spy();
			life.onDie.add(spy.spy);
			expect(spy.callCount).toBe(0);
			life.die();
			expect(spy.callCount).toBe(1);
			life.die();
			expect(spy.callCount).toBe(1);
		});
		it("isDead method should return false after a die call", function() {
			expect(life.isDead()).toBeFalse();
			life.die();
			expect(life.isDead()).toBeTrue();
		});
	});
}, true);
