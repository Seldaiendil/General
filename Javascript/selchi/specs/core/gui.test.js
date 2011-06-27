describe("GUI base class", function() {
	var SubClass;
	beforeEach(function() {
		SubClass = GUI.extend(Function.empty);
	});

	describe("Method render", function() {
		var spy1 = new Spy();
		SubClass.prototype.render_ = spy1.spy;

		it("should call subclass render_ method", function() {
			var sub = new SubClass();
			sub.render();
			expect(spy1.callCount).toBe(1);
		});
		it("should change isRendered property to true", function() {
			var sub = new SubClass();
			expect(sub.isRendered()).toBe(false);
			sub.render();
			expect(sub.isRendered()).toBe(true);
		});
	});
	describe("Method destroy", function() {
		var spy1 = new Spy();
		SubClass.prototype.destroy_ = spy1.spy;

		it("should call subclass destroy_ method", function() {
			var sub = new SubClass();
			sub.destroy();
			expect(spy1.callCount).toBe(1);
		});
	});
}, true);