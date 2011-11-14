describe('Base Class', function() {
	describe('Events behaviour', function() {
		describe('on method', function() {
			var base = new Base();

			it('should return a unique identifier', function() {
				var ids = {};

				expect(function() {
					var id;
					for (var i = 0; i < 1000; i++) {
						id = base.on('someEvent', function() { }, this);
						if (ids.hasOwnProperty(id))
							throw new Error('Id repeated: ' + id);
						ids[id] = true;
					}
				}).not.toThrowError();
			});
		});

		describe('emit method', function() {
			it('should call every function added to listen method', function() {
				var base = new Base();
				var spy = new Spy();

				base.on('someEvent', spy.spy);

				expect(spy.callCount).toBe(0);
				base.emit('someEvent');
				expect(spy.callCount).toBe(1);

				it('so many times as the listeners was added', function() {
					spy.reset();
					base.on('someEvent', spy.spy);
					base.on('someEvent', spy.spy);

					expect(spy.callCount).toBe(0);
					base.emit('someEvent');
					expect(spy.callCount).toBe(3);
				});
			});

			it('must pass the second argument passed to listen as handler scope', function() {
				var base = new Base();
				var spy = new Spy();
				var scope = {};

				base.on('someEvent', spy.spy, scope);

				expect(spy.lastScope).toBeFalsy();
				base.emit('someEvent');
				expect(spy.lastScope).toBe(scope);

				it('or it must pass the instance as default scope', function() {
					spy.reset();
					base.on('someOtherEvent', spy.spy);

					expect(spy.lastScope).toBeFalsy();
					base.emit('someOtherEvent');
					expect(spy.lastScope).toBe(base);
				});
			});
		});

		describe('un method', function() {
			it('should remove a listener with the same arguments', function() {
				var base = new Base();
				var spy = new Spy();

				base.on('someEvent', spy.spy);
				expect(base.un('someEvent', spy.spy)).toBeTrue();

				expect(spy.callCount).toBe(0);
				base.emit('someEvent');
				expect(spy.callCount).toBe(0);
			});

			it('must remove a listener with the id returned by on method', function() {
				var base = new Base();
				var spy = new Spy();

				var id = base.on('someEvent', spy.spy);
				expect(base.un(id)).toBeTrue();

				expect(spy.callCount).toBe(0);
				base.emit('someEvent');
				expect(spy.callCount).toBe(0);
			});

			it('should return false if try to remove a listener not added', function() {
				var base = new Base();
				function handler() { };

				expect(base.un('someEvent', handler)).toBeFalse();

				var id = base.on('someEvent', handler);
				base.un(id);
				expect(base.un(id)).toBeFalse();
			});
		});
	})
});