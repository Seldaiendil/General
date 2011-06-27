describe("Function Extensions", function() {
	describe("Bind method", function() {
		it("must call binded function with given scope", function() {
			function getScope() {
				return this;
			}
			var scope = {},
				binded  = getScope.bind(scope);
			expect(binded()).toBe(scope);
		});
		it("must pass arguments to the function as called", function() {
			var bindSpy = jasmine.createSpy(),
				binded = bindSpy.bind(null),
				arg0 = "pepe",
				arg1 = 1,
				arg2 = false;
			binded(arg0, arg1, arg2)
			expect(bindSpy.mostRecentCall.args[0]).toBe(arg0);
			expect(bindSpy.mostRecentCall.args[1]).toBe(arg1);
			expect(bindSpy.mostRecentCall.args[2]).toBe(arg2);
		});
		it("must bind arguments too", function() {
			function check(a0, a1) {
				return a0 === arg0 && a1 === arg1;
			}
			var arg0 = "pepe",
				arg1 = 1,
				binded = check.bind(null, arg0, arg1);
			expect(binded()).toBe(true);
		});
		it("and add new arguments to binded arguments", function() {
			function check(a0, a1, a2) {
				return a0 === arg0 && a1 === arg1 && a2 === arg2;
			}
			var arg0 = "pepe",
				arg1 = 1,
				arg2 = false,
				binded = check.bind(null, arg0, arg1);
			expect(binded(arg2)).toBe(true);
		});
	});
});


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
});
