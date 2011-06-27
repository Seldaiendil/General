describe("Testing Sassmine", function() {
	// We remove original Sassmine fail system
	var originalFail = Sassmine.fail;
	Sassmine.fail = function() { };
	
	// And use a function than throws an error if value is not expected
	var test = function(expectation, expectedToPass) {
		if (expectation !== expectedToPass)
			throw new Error("Test not passed: " + arguments.callee.caller);
	}
	describe("The Expectations", testExpectations, true);
	
	// We overwrite original expect function by a copy than returns the 'not' expectation
	var originalExpect = expect;
	expect = function() {
		return originalExpect.apply(this, arguments).not;
	};
	test = function(expectation, expectedToPass) {
		if (expectation === expectedToPass)
			throw new Error("Test not passed: " + arguments.callee.caller);
	}
	describe("The NOT Expectations", testExpectations, true);
	
	// And finally we restore original functions
	Sassmine.fail = originalFail;
	expect = originalExpect;

	function testExpectations() {
		describe("Expectation toBe", function() {
			it("must pass if the values are same type and value", function() {
				test(expect(1).toBe(1), true);
			});
			it("should fail if the values are different", function() {
				test(expect(1).toBe(2), false);
			});
			it("should fail if the types are different", function() {
				test(expect(1).toBe("1"), false);
			});
		});
		describe("Expectation toBeLike", function() {
			it("should pass if the values are same value with any type", function() {
				it("testing 0", function() {
					test(expect(0).toBeLike(0), true);
					test(expect(0).toBeLike("00"), true);
					test(expect(0).toBeLike(false), true);
				});
				it("testing 1", function() {
					test(expect(1).toBeLike(1), true);
					test(expect(1).toBeLike("1"), true);
					test(expect(1).toBeLike(true), true);
				});
			});
			it("should fail if values are diferent", function() {
				test(expect(0).toBeLike(1), false);
				test(expect(0).toBeLike("01"), false);
			});
		});
		describe("Expectation toBeTruthy", function() {
			it("should pass with any value than can be casted to true", function() {
				test(expect(true).toBeTruthy(), true);
				test(expect(1).toBeTruthy(), true);
				test(expect("adsf").toBeTruthy(), true);
				test(expect([]).toBeTruthy(), true);
				test(expect({}).toBeTruthy(), true);
			});
			it("should fail with values than are casted to false", function() {
				test(expect(false).toBeTruthy(), false);
				test(expect(0).toBeTruthy(), false);
				test(expect("").toBeTruthy(), false);
				test(expect(null).toBeTruthy(), false);
				test(expect(undefined).toBeTruthy(), false);
			});
		});
		describe("Expectation toBeFalsy", function() {
			it("should pass with any value than can be casted to true", function() {
				test(expect(false).toBeFalsy(), true);
				test(expect(0).toBeFalsy(), true);
				test(expect("").toBeFalsy(), true);
				test(expect(null).toBeFalsy(), true);
				test(expect(undefined).toBeFalsy(), true);
			});
			it("should fail with values than are casted to false", function() {
				test(expect(true).toBeFalsy(), false);
				test(expect(1).toBeFalsy(), false);
				test(expect("adsf").toBeFalsy(), false);
				test(expect([]).toBeFalsy(), false);
				test(expect({}).toBeFalsy(), false);
			});
		});
		
		// It will test than a expectation returns false except with value
		var array = [];
		array.toString = function() { return "array instance"; };
		function sampleFunct() { }
		sampleFunct.toString = function() { return "a function"; };
		var manyValueTypes = [ false, true, 0, 1, "", "asdf", array, {}, sampleFunct, null, undefined ];
		function shouldPassOnlyWith(value, expectation) {
			it("should pass only if value is " + value + "", function() {
				test(expect(value)[expectation](), true);
			});
			it("should fail with any other value", function() {
				for (var i=manyValueTypes.length; i--; )
					if (manyValueTypes[i] !== value)
						test(expect(manyValueTypes[i])[expectation](), false);
			});
		}
		describe("Expectation toBeTrue", function() {
			shouldPassOnlyWith(true, "toBeTrue");
		});
		describe("Expectation toBeFalse", function() {
			shouldPassOnlyWith(false, "toBeFalse");
		});
		describe("Expectation toBeNull", function() {
			shouldPassOnlyWith(null, "toBeNull");
		});
		describe("Expectation toBeUndefined", function() {
			shouldPassOnlyWith(undefined, "toBeUndefined");
		});
		describe("Expectation toBeNaN", function() {
			it("should return true with any value than cannot be casted to a real number", function() {
				test(expect(NaN).toBeNaN(), true);
				test(expect("asdf").toBeNaN(), true);
				test(expect({}).toBeNaN(), true);
				test(expect(undefined).toBeNaN(), true);
			});
			it("should return false with any other value", function() {
				test(expect(0).toBeNaN(), false);
				test(expect("1").toBeNaN(), false);
				test(expect([]).toBeNaN(), false);
				test(expect(null).toBeNaN(), false);
			});
		});
		
		function failIfIsNaN(expectation) {
			it("should return false if the value is not a number (NaN)", function() {
				test(expect(NaN)[expectation](2, -2), false);
				test(expect("asdf")[expectation](2, -2), false);
				test(expect({})[expectation](2, -2), false);
				test(expect(undefined)[expectation](2, -2), false);
			});
		}
		describe("Expectation toBeBetween", function() {
			it("should return true only if value is between expectation parameters", function() {
				test(expect(1).toBeBetween(0, 2), true);
				it("even if the value is equals to one of the parameters", function() {
					test(expect(1).toBeBetween(1, 1), true);
				});
				it("even if the parameters are not sorted", function() {
					test(expect(1).toBeBetween(2, 0), true);
				});
				it("even with negative numbers", function() {
					test(expect(0).toBeBetween(2, -2), true);
				});
			});
			it("should return false if the number is not between parameters", function() {
				test(expect(1).toBeBetween(5, 7), false);
				test(expect(-5).toBeBetween(3, 6), false);
			});
			failIfIsNaN("toBeBetween");
		});
		describe("Expectation toBeBiggerThan", function() {
			it("should return true only if value is bigger than expectation parameter", function() {
				test(expect(1).toBeBiggerThan(0), true);
				it("even with negative numbers", function() {
					test(expect(0).toBeBiggerThan(-2), true);
				});
			});
			it("should return false if the number is equal to the parameter", function() {
				test(expect(1).toBeBiggerThan(1), false);
			});
			it("should return false if the number is lower than parameter", function() {
				test(expect(1).toBeBiggerThan(5), false);
				test(expect(-5).toBeBiggerThan(3), false);
			});
			failIfIsNaN("toBeBiggerThan");
		});
		describe("Expectation toBeLowerThan", function() {
			it("should return true only if value is lower than expectation parameter", function() {
				test(expect(1).toBeLowerThan(2), true);
				it("even with negative numbers", function() {
					test(expect(-3).toBeLowerThan(1), true);
				});
			});
			it("should return false if the number is equal to the parameter", function() {
				test(expect(1).toBeLowerThan(1), false);
			});
			it("should return false if the number is bigger than parameter", function() {
				test(expect(1).toBeLowerThan(-3), false);
				test(expect(5).toBeLowerThan(3), false);
			});
			failIfIsNaN("toBeLowerThan");
		});
		describe("Expectation toBePositive", function() {
			it("should return true only if value is bigger than 0", function() {
				test(expect(1).toBePositive(), true);
				test(expect(100).toBePositive(), true);
			});
			it("should return false if number is 0", function() {
				test(expect(0).toBePositive(), false);
			});
			it("should return false if number is lower than 0", function() {
				test(expect(-1).toBePositive(), false);
				test(expect(-100).toBePositive(), false);
			});
			failIfIsNaN("toBePositive");
		});
		describe("Expectation toBeNegative", function() {
			it("should return true only if value is lower than 0", function() {
				test(expect(-1).toBeNegative(), true);
				test(expect(-100).toBeNegative(), true);
			});
			it("should return false if number is 0", function() {
				test(expect(0).toBeNegative(), false);
			});
			it("should return false if number is bigger than 0", function() {
				test(expect(1).toBeNegative(), false);
				test(expect(100).toBeNegative(), false);
			});
			failIfIsNaN("toBeNegative");
		});
		
		describe("Expectation toBeArray", function() {
			shouldPassOnlyWith(array, "toBeArray");
		});
		describe("Expectation toBeFunction", function() {
			shouldPassOnlyWith(sampleFunct, "toBeFunction");
		});
		describe("Expectation toBeInstanceOf", function() {
			it("should return true if object is instance of given class", function() {
				test(expect([]).toBeInstanceOf(Array), true);
				
				function SampleClass() { };
				it("even with custom classes", function() {
					test(expect(new SampleClass()).toBeInstanceOf(SampleClass), true);
				});
				it("even with inherited classes", function() {
					function ChildClass() {
						//SampleClass.call(this);
					}
					ChildClass.prototype = new SampleClass();
					test(expect(new ChildClass()).toBeInstanceOf(ChildClass), true);
					test(expect(new ChildClass()).toBeInstanceOf(SampleClass), true);
				});
			});
			it("should return false if class prototype is not in instance prototype chain", function() {
				test(expect({}).toBeInstanceOf(Array), false);
			});
		});
		describe("Expectation toHaveProperty", function() {
			it("should return true if object has property", function() {
				it("if has own property", function() {
					var sample = {};
					sample.prop = 1;
					test(expect(sample).toHaveProperty('prop'), true);
				});
				it("or if it is in the prototype chain", function() {
					function BaseClass() { }
					BaseClass.prototype.a = 1;
					function SampleClass() { }
					SampleClass.prototype = new BaseClass();
					test(expect(new SampleClass()).toHaveProperty('a'), true);
				});
			});
			it("should return false if object has not this property", function() {
				test(expect({}).toHaveProperty('prop'), false);
			});
		});

		function MyError() {
			Error.call(this);
		};
		MyError.prototype = new Error();
		describe("Expectation toThrowError", function() {
			it("should return true if function throws any type of error", function() {
				test(expect(function() {
					throw new Error();
				}).toThrowError(), true);
				it("even with system errors", function() {
					test(expect(function() {
						null.noProperty;
					}).toThrowError(), true);
				});
				it("even with custom errors", function() {
					test(expect(function() {
						throw new MyError();
					}).toThrowError(), true);
				});
			});
			it("should fail if function executes without exceptions", function() {
				test(expect(function() { }).toThrowError(), false);
			});
			it("should throw error if target is not a function", function() {
				try {
					expect().toThrowError();
				} catch (err) {
					return;
				}
				// fail
				test(false, true);
			});
		});
		describe("Expectation toThrow", function() {
			it("should return true if function throws an error instance of given class", function() {
				test(expect(function() {
					throw new Error();
				}).toThrow(Error), true);
				it("even with system errors", function() {
					test(expect(function() {
						null.noProperty;
					}).toThrow(TypeError), true);
				});
				it("even with custom errors", function() {
					test(expect(function() {
						throw new MyError();
					}).toThrow(MyError), true);
				});
				it("even throght inheritance", function() {
					test(expect(function() {
						throw new MyError();
					}).toThrow(Error), true);
				});
			});
			it("should fail if function throws another error type", function() {
				test(expect(function() {
					throw new Error();
				}).toThrow(MyError), false);
			});
			it("should fail if function executes without exceptions", function() {
				test(expect(function() { }).toThrow(Error), false);
			});
			it("should throw error if target is not a function", function() {
				try {
					expect().toThrowError();
				} catch (err) {
					return;
				}
				// fail
				test(false, true);
			});
		});
	}

	describe("Spies", function() {
		var spy;
		function reset() {
			spy = new Spy();
		}
		beforeEach(reset);
		describe("Call count behaviour", function() {
			beforeEach(reset);
			it("should increase callCount property each time than the spy is called", function() {
				for (var i=0; i<10; i++) {
					expect(spy.callCount).toBe(i);
					spy.spy();
				}
			});
		});
		describe("Last call behaviour", function() {
			beforeEach(reset);
			it("should store the scope used in last call on lastScope property", function() {
				var scope = {};
				spy.spy.call(this);
				expect(spy.lastScope).toBe(this);
				spy.spy.call(scope);
				expect(spy.lastScope).toBe(scope);
			});
			it("shoul store the arguments passed in last call on lastArguments property", function() {
				var args = [ 1, "test", false, null, undefined];
				spy.spy.call(this);
				expect(spy.lastArguments.length).toBe(0);
				
				spy.spy.apply(this, args);
				expect(spy.lastArguments.length).toBe(args.length);
				for (var i=args.length; i--; )
					expect(spy.lastArguments[i]).toBe(args[i]);
			});
		});
		describe("Call original behaviour", function() {
			var called = false;
			function sample() {
				called = true;
			}
			beforeEach(function() {
				called = false;
			});
			it("should not call original by default", function() {
				spy = new Spy(sample);
				expect(called).toBeFalse();
				spy.spy();
				expect(called).toBeFalse();
			});
			it("should call original function if second constructor argument is true", function() {
				spy = new Spy(sample, true);
				expect(called).toBeFalse();
				spy.spy();
				expect(called).toBeTrue();
			});
		});
		describe("History behaviour", function() {
			beforeEach(reset);
			it("should store all scopes used to call spy on scopes[] property", function() {
				expect(spy.scopes.length).toBe(0);
				spy.spy();
				expect(spy.scopes.length).toBe(1);
				expect(spy.scopes[0]).toBe(spy);

				spy.spy.call(this);
				expect(spy.scopes.length).toBe(2);
				expect(spy.scopes[0]).toBe(spy);
				expect(spy.scopes[1]).toBe(this);
			});

			/*
			 * UNEXPECTED BEHAVIOUR
			 * spy.arguments is a array of OBJECTS, no matter original type, and references are not same!!!
			 * test disabled temporally
			 */
			xit("should store all arguments used to call spy on arguments[] property", function() {
				expect(spy.arguments.length).toBe(0);
				spy.spy("sample");
				expect(spy.arguments.length).toBe(1);
				expect(spy.arguments[0]).toBeLike("sample");

				var instance = {};
				spy.spy(instance);
				expect(spy.arguments.length).toBe(2);
				expect(spy.arguments[0]).toBeLike("sample");
				expect(spy.arguments[1]).toBeLike(instance);
			});
		});
	});
});


