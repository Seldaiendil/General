describe("Testing Dom helper", function() {
	var head = document.getElementsByTagName('head')[0];
	describe("The method create", function() {
		var tag = "div",
			div = Dom.create(tag);
		it("must return a object with dom child's methods", function() {
			expect(div.appendChild).toBeFunction();
			expect(div.removeChild).toBeFunction();
			expect(div.childNodes.length).toBe(0);
		});
		it("must have a property 'tagName' than must return the string " +
		   "used to create the element", function() {
			expect(div.tagName.toLowerCase()).toBe(tag);
		});
		it("should be possible to add and remove it to DOM tree", function() {
			expect(function() {
				head.appendChild(div);
			}).not.toThrowError();
			expect(function() {
				head.removeChild(div);
			}).not.toThrowError();
		});
	});
	describe("The method get", function() {
		var id = "testing",
			div = document.createElement("div");
		div.id = id;
		head.appendChild(div);
		
		it("must return the item with given id", function() {
			expect(Dom.get(id)).toBe(div);
		});
		it("must return null if there is no element with given id", function() {
			expect(Dom.get("false id")).toBeNull();
		});
		it("must return first if there are two elements with given id", function() {
			var temp = document.createElement("span");
			temp.id = id;
			head.appendChild(temp);
			expect(Dom.get(id)).toBe(div);
			head.removeChild(temp);
		});
		
		head.removeChild(div);
	});
}, true);

describe("Enum class", function() {
	var enum1 = new Enum('test1', 'test2', 'test3');
	var enum2 = new Enum('trolololo', 'showMustGoOn', 'doYouRemember');
	it("should create a property for each argument given", function() {
		expect(enum1).toHaveProperty("test1");
		expect(enum1).toHaveProperty("test2");
		expect(enum1).toHaveProperty("test3");
		expect(enum2).toHaveProperty("trolololo");
		expect(enum2).toHaveProperty("showMustGoOn");
		expect(enum2).toHaveProperty("doYouRemember");
	});
	it("should assign to properties a number as argument index", function() {
		expect(enum1.test1).toBe(0);
		expect(enum1.test2).toBe(1);
		expect(enum1.test3).toBe(2);
		expect(enum2.trolololo).toBe(0);
		expect(enum2.showMustGoOn).toBe(1);
		expect(enum2.doYouRemember).toBe(2);
	});
}, true);