describe('Event class', function() {
	describe('listen method', function() {
		var event = new Event();

		it('should return a unique identifier', function() {
			var ids = {};

			expect(function() {
				var id;
				for (var i = 0; i < 1000; i++) {
					id = event.listen(function() { }, this);
					if (ids.hasOwnProperty(id))
						throw new Error('Id repeated: ' + id);
					ids[id] = true;
				}
			}).not.toThrowError();
		});
	});

	describe('emit method', function() {
		it('should call every function added to listen method', function() {
			var event = new Event();
			var spy = new Spy();

			event.listen(spy.spy);

			expect(spy.callCount).toBe(0);
			event.emit();
			expect(spy.callCount).toBe(1);

			it('so many times as the listeners was added', function() {
				spy.reset();
				event.listen(spy.spy);
				event.listen(spy.spy);

				expect(spy.callCount).toBe(0);
				event.emit();
				expect(spy.callCount).toBe(3);
			});
		});

		it('must pass the second argument passed to listen as handler scope', function() {
			var event = new Event();
			var spy = new Spy();
			var scope = {};

			event.listen(spy.spy, scope);

			expect(spy.lastScope).toBeFalsy();
			event.emit();
			expect(spy.lastScope).toBe(scope);
		});
	});
});
