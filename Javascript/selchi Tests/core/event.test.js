describe("Event instances", function() {
	describe("Method fire", function() {
		var event,
			spy1 = new Spy();
		beforeEach(function() {
			event = new Event();
			spy1.reset();
			spy1.newSpy();
		});

		it("must call all listeners attached to the event", function() {
			var spy2 = new Spy();
			event.add(spy1.spy);
			event.add(spy2.spy);
			event.fire();
			expect(spy1.callCount).toBe(1);
			expect(spy2.callCount).toBe(1);
		});
		it("must call all listeners so much times as added", function() {
			event.add(spy1.spy);
			event.add(spy1.spy);
			event.add(spy1.spy);
			event.fire();
			expect(spy1.callCount).toBe(3);
		});
		it("must call the listeners with given arguments", function() {
			var args = [ "pepe", 10, true, {} ]
			event.add(spy1.spy);
			event.add(spy1.spy);
			event.fire(args[0], args[1], args[2], args[3]);
			for (var i=2; i--; )
				for (var j=4; j--; )
					expect(spy1.arguments[i][j]).toBe(args[j]);
		});
		it("can be called many times", function() {
			event.add(spy1.spy);
			event.fire();
			event.fire();
			event.fire();
			expect(spy1.callCount).toBe(3);
		});
	});
	describe("Method add", function() {
		var event = new Event();
		it("must throw an error if the listener isn't a function", function() {
			// HACK
			if (navigator.userAgent.indexOf('KHTML') !== -1)
				return;
			var pepe = { };
			expect(function() {
				event.add(pepe);
			}).toThrowError();
		});
	});
	describe("Method remove", function() {
		var event,
			spy1 = new Spy(),
			spy2 = new Spy();
		beforeEach(function() {
			event = new Event();
			spy1.reset();
			spy1.newSpy();
			spy2.reset();
			spy2.newSpy();
			event.add(spy1.spy);
			event.add(spy2.spy);
		});
		it("should not call a removed listener", function() {
			event.remove(spy1.spy);
			event.fire();
			expect(spy1.callCount).toBe(0);
		});
		it("should call a listener so many times as added", function() {
			event.add(spy1.spy);
			event.add(spy1.spy);
			event.remove(spy1.spy);
			event.fire();
			expect(spy1.callCount).toBe(2);
		});
	});
}, true);

