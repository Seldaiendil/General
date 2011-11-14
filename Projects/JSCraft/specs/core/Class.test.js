describe('Object Oriented implementation', function() {
	describe('Class creator', function() {

		it('must return a instanciator function', function() {
			var temp = Object.extend({
				constructor: function() {
					this.x = 1;
				}
			});
			var instance = new temp();

			expect(temp).toBeFunction();
			expect(instance.constructor).toBe(temp);
			expect(instance instanceof temp).toBeTrue();
		});

		it('must use default constructor if no one given', function() {
			var temp = Object.extend({});
			expect(temp).toBeFunction();

			it('and must not be Object constructor', function() {
				expect(temp).not.toBe(Object)	
			});
		});

		it('should add every element on members to the instances', function() {
			var config = {
				members: {
					test: function() { },
					tast: function() { },
					x: 2
				}
			};
			var temp = Object.extend(config);
			var instance = new temp();

			expect(instance.test).toBe(config.members.test);
			expect(instance.tast).toBe(config.members.tast);
			expect(instance.x).toBe(2);

		});

		it('should create getters and setters for each key on "properties"', function() {
			var temp = Object.extend({
				properties: {
					x: {},
					y: {},
					eusefagio: {}
				}
			});
			var instance = new temp();

			expect(instance.getX).toBeFunction();
			expect(instance.setX).toBeFunction();
			expect(instance.getY).toBeFunction();
			expect(instance.setY).toBeFunction();
			expect(instance.getEusefagio).toBeFunction();
			expect(instance.setEusefagio).toBeFunction();

			it('and should set and get properties', function() {
				expect(instance.getX()).toBeUndefined();
				expect(instance.setX(5)).toBeUndefined();
				expect(instance.getX()).toBe(5);
			});

		});

		it('should not overwrite setters or getters if defined in members', function() {
			var config = {
				properties: {
					x: {}
				},
				members: {
					getX: function() { return 7; },
					setX: function() { throw new Error("Readonly!"); }
				}
			};
			var temp = Object.extend(config);
			var instance = new temp();

			expect(instance.getX).toBe(config.members.getX);
			expect(instance.setX).toBe(config.members.setX);
			expect(instance.getX()).toBe(7);
			expect(function() {
				instance.setX(2);
			}).toThrowError();
		})
	});

	describe('Class\'s extend method', function() {
		var baseClass = Object.extend({
			constructor: function() {
				this.value = 6;
			},
			properties: { x: {}, y: {} },
			members: {
				methodA: function() { return 'A'; },
				methodB: function() { return 'B'; },
				methodC: function(value, value2) { return 'C'; }
			}
		});

		it('must return a instanciator function', function() {
			var temp = baseClass.extend({
				constructor: function() {
					baseClass.call(this);
				}
			});
			var instance = new temp();

			expect(temp).toBeFunction();
			expect(instance.constructor).toBe(temp);
			expect(instance instanceof temp).toBeTrue();

			it('who also inherits from base class', function() {
				expect(instance.constructor.base).toBe(baseClass);
				expect(instance instanceof baseClass).toBeTrue();
			});
		});

		it('should set a default constructor if no one given who calls the parent constructor', function() {
			var temp = baseClass.extend();
			var instance = new temp();

			expect(instance.value).toBe(6);
		});

		it('must overwrite methods defined with the same name than in the parent', function() {
			var temp = baseClass.extend({
				members: {
					methodB: function() { return 'subclass B'; },
					methodC: function() { return 'subclass C'; }
				}
			});
			var instance = new temp();

			expect(instance.methodA).toBe(baseClass.prototype.methodA);
			expect(instance.methodA()).toBe('A');

			expect(instance.methodB).not.toBe(baseClass.prototype.methodB);
			expect(instance.methodB).toBe(temp.prototype.methodB);
			expect(instance.methodB()).toBe('subclass B');

			expect(instance.methodC).not.toBe(baseClass.prototype.methodC);
			expect(instance.methodC).toBe(temp.prototype.methodC);
			expect(instance.methodC()).toBe('subclass C');

			it('and each overwrited class must have a base property who is the overwrited method', function() {
				expect(instance.methodB.base).toBe(baseClass.prototype.methodB);
				expect(instance.methodB.base.call(instance)).toBe('B');

				expect(instance.methodC.base).toBe(baseClass.prototype.methodC);
				expect(instance.methodC.base.call(instance)).toBe('C');
			});
		});
	});
});
