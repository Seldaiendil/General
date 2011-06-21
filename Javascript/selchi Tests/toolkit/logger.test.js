describe("Logger class", function() {
	var BaseClass;
	var SampleClass;
	function resetClass() {
		BaseClass = function() { }
		BaseClass.prototype.baseMethod = function() {
			return "In BaseClass";
		}
		SampleClass = function() {
			BaseClass.call(this);
			this.a = 1;
			this.b = 2;
		};
		SampleClass.prototype = new BaseClass();
		SampleClass.property('a');
		SampleClass.property('b');
		SampleClass.prototype.fail = function() {
			throw new Error("Trolololololo");
		};
		SampleClass.prototype.getCallStack = function() {
			return Logger.getCallStack();
		};
	}
	beforeEach(resetClass);

	describe("LogMethod method", function() {
		var instance = new SampleClass();
		var originalGet = instance.getA;
		var originalSet = instance.getA;
		Logger.logMethod(SampleClass.prototype, 'getA');
		Logger.logMethod(SampleClass.prototype, 'setA');
		Logger.logMethod(SampleClass.prototype, 'fail');
		Logger.logMethod(SampleClass.prototype, 'getCallStack');
		it("must replace original method by a logged method", function() {
			expect(instance.getA).not.toBe(originalGet);
			expect(instance.setA).not.toBe(originalSet);
			expect(instance.getA.logged).toBeTrue();
			expect(instance.setA.logged).toBeTrue();
		});
		it("must return function value", function() {
			instance.a = 5;
			expect(instance.getA()).toBe(5);
		});
		it("must call original function with given arguments", function() {
			instance.a = 4;
			instance.setA(3);
			expect(instance.a).toBe(3);
		});
		it("must log and rethrow errors", function() {
			expect(function() {
				instance.fail();
			}).toThrowError();
			expect(Logger.getErrors()[0].indexOf("fail")).not.toBe(-1);
		});
		it("must mantain a call stack with logged function calls", function() {
			expect(instance.getCallStack()[0]).toBe('getCallStack');
		});
	});
	describe("LogClass method", function() {
		var instance = new SampleClass;
		Logger.logClass(SampleClass);
		it("must log all methods except 'toString'", function() {
			expect(instance.getA.logged).toBeTrue();
			expect(instance.setA.logged).toBeTrue();
			expect(instance.getB.logged).toBeTrue();
			expect(instance.setB.logged).toBeTrue();
			expect(instance.fail.logged).toBeTrue();
			expect(instance.getCallStack.logged).toBeTrue();
			expect(instance.toString.logged).toBeFalsy();
		});
		it("must log even inherited mehthods", function() {
			expect(instance.baseMethod.logged).toBeTrue();
		});
	});
}, true);
