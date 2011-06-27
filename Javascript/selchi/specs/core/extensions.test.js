describe("Function extension methods", function() {
	describe("Extend method", function() {
		function baseClass() {
			this.propertyA = "A";
			this.propertyOverride = "A";
		}
		baseClass.prototype.methodA = function() { return "A"; };
		baseClass.prototype.methodOverride = function() { return "A"; };
		var middleClass = baseClass.extend(function() {
			this.propertyB = "B";
			this.propertyOverride = "B";
		});
		middleClass.prototype.methodB = function() { return "B"; };
		middleClass.prototype.methodOverride = function() { return "B"; };
		var finalClass = middleClass.extend(function() {
			this.propertyC = "C";
			this.propertyOverride = "C";
		});
		finalClass.prototype.methodC = function() { return "C"; };
		finalClass.prototype.methodOverride = function() { return "C"; };
		finalClass.prototype.baseMethod = function() {
			return this._base_.methodOverride();
		};

		var instanceA = new baseClass();
		var instanceB = new middleClass();
		var instanceC = new finalClass();

		it("must have instance properties and methods", function() {
			expect(instanceA.propertyA).toBe("A");
			expect(instanceA.methodA()).toBe("A");
			expect(instanceB.propertyB).toBe("B");
			expect(instanceB.methodB()).toBe("B");
			expect(instanceC.propertyC).toBe("C");
			expect(instanceC.methodC()).toBe("C");
		});
		it("must inherits properties and methods over extensions", function() {
			expect(instanceB.propertyA).toBe("A");
			expect(instanceB.methodA()).toBe("A");
			expect(instanceC.propertyA).toBe("A");
			expect(instanceC.methodA()).toBe("A");
			expect(instanceC.propertyB).toBe("B");
			expect(instanceC.methodB()).toBe("B");
		});
		it("must have last implementation of override methods and properties", function() {
			expect(instanceB.propertyOverride).toBe("B");
			expect(instanceB.methodOverride()).toBe("B");
			expect(instanceC.propertyOverride).toBe("C");
			expect(instanceC.methodOverride()).toBe("C");
		});
		it("must have _base_ property to access base class methods", function() {
			expect(instanceC.baseMethod()).toBe("B");
		});
		it("must return true if call instanceof with any base class", function() {
			expect(instanceA).toBeInstanceOf(baseClass);
			expect(instanceB).toBeInstanceOf(middleClass);
			expect(instanceB).toBeInstanceOf(baseClass);
			expect(instanceC).toBeInstanceOf(finalClass);
			expect(instanceC).toBeInstanceOf(middleClass);
			expect(instanceC).toBeInstanceOf(baseClass);
		});
		it("constructor property must refer to object class", function() {
			expect(instanceA.constructor).toBe(baseClass);
			expect(instanceB.constructor).toBe(middleClass);
			expect(instanceC.constructor).toBe(finalClass);
		});
	});
	describe("Bind method", function() {
		var scope = {},
			bindSpy = new Spy(),
			binded = bindSpy.spy.bind(scope);
		it("must call binded function with given scope", function() {
			binded();
			expect(bindSpy.lastScope).toBe(scope);
		});
		it("must pass arguments to the function as called", function() {
			var arg0 = "pepe",
				arg1 = 1,
				arg2 = false;
			binded(arg0, arg1, arg2)
			expect(bindSpy.lastArguments[0]).toBe(arg0);
			expect(bindSpy.lastArguments[1]).toBe(arg1);
			expect(bindSpy.lastArguments[2]).toBe(arg2);
		});
	});

	/*
	 * tricky methods
	 */
	describe("Property method", function() {
		function Class1() {
			this.test1 = 5;
			this.test2 = 'hi';
		}
		Class1.property('test1');
		Class1.property('test2', true);
		var obj;

		beforeEach(function() {
			obj = new Class1();
		});

		it("should create getter and setter functions", function() {
			expect(obj.getTest1).toBeFunction();
			expect(obj.setTest1).toBeFunction();
		});
		it("readonly property must have just getter", function() {
			expect(obj.getTest2).toBeFunction();
			expect(obj.setTest2).not.toBeFunction();
		});
		it("should have expected behaviour, get and set the instance property", function() {
			var test1 = obj.getTest1();
			var test2 = obj.getTest2();
			expect(test1).toBe(obj.test1);
			expect(test2).toBe(obj.test2);
			obj.setTest1(9);
			expect(obj.test1).toBe(9);
		});
	});
}, true);

describe("Array extensions", function() {
	var obj = {},
		list = [ "pepe", false, 1, obj, "pepe" ];
	describe("Method indexOf", function() {
		it("should return the index of the given element", function()  {
			expect(list.indexOf(obj)).toBe(3);
		});
		it("should return -1 if the item is not found", function() {
			expect(list.indexOf("lola")).toBe(-1);
			expect(list.indexOf("1")).toBe(-1);
		});
		it("should return the index of the first", function() {
			expect(list.indexOf("pepe")).toBe(0);
		});
		it("should search starting from its second parameter", function() {
			expect(list.indexOf("pepe", 1)).toBe(4);
		});
		it("should return -1 if item isn't in the range", function() {
			expect(list.indexOf(false, 2)).toBe(-1);
		});
	});
	describe("Method lastIndexOf", function() {
		it("should return the index of the given element", function()  {
			expect(list.lastIndexOf(obj)).toBe(3);
		});
		it("should return -1 if the item is not found", function() {
			expect(list.lastIndexOf("lola")).toBe(-1);
			expect(list.lastIndexOf("1")).toBe(-1);
		});
		it("should return the index of the last", function() {
			expect(list.lastIndexOf("pepe")).toBe(4);
		});
		it("should search starting from its second parameter", function() {
			expect(list.lastIndexOf("pepe", 3)).toBe(0);
		});
		it("should return -1 if item isn't in the range", function() {
			expect(list.lastIndexOf(obj, 2)).toBe(-1);
		});
	});
	describe("Method lastItem", function() {
		it("must return the last item of the array", function() {
			expect(list.lastItem()).toBe("pepe");
		});
	});
	describe("Method splice", function() {
		it("should remove the count of elements given as second argument at first argument position", function() {
			var array = [ "apple", "bananna", "orange", "melon", "cherry", "strawberry" ];
			array.splice(2, 1);
			expect(array.join()).toBe("apple,bananna,melon,cherry,strawberry");
			array.splice(0, 2)
			expect(array.join()).toBe("melon,cherry,strawberry");
			array.splice(1, 0)
			expect(array.join()).toBe("melon,cherry,strawberry");
			array.splice(0, 2)
			expect(array.join()).toBe("strawberry");
			array.splice(0, 1)
			expect(array.join()).toBe("");
		});
		it("should add elements given as extra parameters at first argument position", function() {
			var array = [ "apple", "bananna" ];
			array.splice(0, 0, "orange");
			expect(array.join()).toBe("orange,apple,bananna");
			array.splice(2, 0, "melon", "cherry", "strawberry");
			expect(array.join()).toBe("orange,apple,melon,cherry,strawberry,bananna");
		});
		it("should be able to remove and add elements in one call", function() {
			var array = [ "apple", "bananna", "orange", "melon", "cherry", "strawberry" ];
			array.splice(2, 3, "omc")
			expect(array.join()).toBe("apple,bananna,omc,strawberry");
			array.splice(2, 1, "orange", "melon", "cherry")
			expect(array.join()).toBe("apple,bananna,orange,melon,cherry,strawberry");
			array.splice(0, 5, "ab", "o", "mc")
			expect(array.join()).toBe("ab,o,mc,strawberry");
		});
	});
}, true);
