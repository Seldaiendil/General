describe("Animal class", function() {
	var animal;
	function setAnimal() {
		animal = new Animal();
	}
	beforeEach(setAnimal);
	
	describe("isFood method", function() {
		beforeEach(setAnimal);
		it("should return true if target is instance of a food class, setted by addFood method", function() {
			expect(animal.isFood(new Animal())).toBeFalse();
			animal.addFood(Animal);
			expect(animal.isFood(new Animal())).toBeTrue();
		});
		it("should return false if predator and target are same animal", function() {
			expect(animal.isFood(animal)).toBeFalse();
		});
		it("should return false anyway if this and target are family (parent, son or brothers)", function() {
			var parent = new Animal();
			var son = new Animal();
			var brother = new Animal();
			animal.addParent(parent);
			brother.addParent(parent);
			son.addParent(animal);
			animal.addFood(Animal);
			
			expect(animal.isFood(new Animal())).toBeTrue();
			expect(animal.isFood(parent)).toBeFalse();
			expect(animal.isFood(son)).toBeFalse();
			expect(animal.isFood(brother)).toBeFalse();
		});
	});
	describe("eat method", function() {
		var victim;
		beforeEach(function() {
			setAnimal();
			victim = new Animal();
		});
		it("victim must die", function() {
			expect(victim.isDead()).toBeFalse();
			animal.eat(victim);
			expect(victim.isDead()).toBeTrue();
		});
		it("should increment its size depending of victim size", function() {
			var originalArea = animal.getArea();
			victim = new Animal(0, 0, 1, 1);
			animal.eat(victim);
			var diff = animal.getArea() - originalArea;
			victim = new Animal(0, 0, 2, 2);
			animal = new Animal();
			originalArea = animal.getArea();
			animal.eat(victim);
			expect(animal.getArea() - originalArea).toBeBiggerThan(diff);
		});
	});
	describe("figth method", function() {
		beforeEach(setAnimal);
		it("should return true if target is not an animal", function() {
			expect(animal.fight(new LifeForm())).toBeTrue();
			expect(animal.fight(new LifeForm(0, 0, 100, 100))).toBeTrue();
		});
		it("should return false if target is an animal and its area is bigger or equals", function() {
			var opponent = new Animal();
			expect(animal.fight(opponent)).toBeFalse();
			opponent = new Animal(0, 0, 10, 10);
			expect(animal.fight(opponent)).toBeFalse();
		});
		it("should return true if target is an animal and its area is lower", function() {
			var opponent = new Animal(0, 0, 0.5, 0.5);
			expect(animal.fight(opponent)).toBeTrue();
			opponent = new Animal(0, 0, 0.9999, 0.9999);
			expect(animal.fight(opponent)).toBeTrue();
		});
	});
	describe("canReproduce method", function() {
		setAnimal();
		it("should return true if area is bigger than factorReproductor", function() {
			animal.factorReproductor = 10;
			animal.setSize(2);
			expect(animal.canReproduce()).toBeFalse();
			animal.setSize(4);
			expect(animal.canReproduce()).toBeTrue();
			animal.factorReproductor = 99;
			expect(animal.canReproduce()).toBeFalse();
			animal.setSize(10);
			expect(animal.canReproduce()).toBeTrue();
		});
	});
	describe("reproduce method", function() {
		beforeEach(setAnimal);
		var child;
		function haveChild(parent) {
			child = new Animal();
			return child;
		}
		it("should throw error if childConstructor property is not setted", function() {
			expect(function() {
				animal.reproduce()
			}).toThrowError();
		});
		it("should call childConstructor function once when called", function() {
			var spy = Spy.spyMethod(animal, 'reproduce', true);
			animal.setChildConstructor(haveChild);
			animal.reproduce();
			expect(spy.callCount).toBe(1);
		});
		it("should reduce its area when reproduce", function() {
			var area = animal.getArea();
			animal.setChildConstructor(haveChild);
			animal.reproduce();
			expect(animal.getArea()).toBeLowerThan(area);
		});
		it("should fire onReproduce event", function() {
			var spy = new Spy();
			animal.onReproduce.add(spy.spy);
			animal.setChildConstructor(haveChild);
			animal.reproduce();
			expect(spy.callCount).toBe(1);
			expect(spy.lastArguments[0]).toBe(child);
		});
	});
	describe("hunt method", function() {
		var victim;
		beforeEach(function() {
			setAnimal();
			victim = new Animal();
		});
		it("should fight with the victim if they are in touch", function() {
			animal.setPosition(5, 5);
			victim.setPosition(5, 5);
			var spy = Spy.spyMethod(animal, 'fight', true);
			animal.hunt(victim)
			expect(spy.callCount).toBe(1);
			expect(spy.lastArguments[0]).toBe(victim);
		});
		it("should eat the victim if can win fight", function() {
			animal = new Animal(3, 3, 2, 2);
			victim = new Animal(3, 3, 1, 1);
			var spy = Spy.spyMethod(animal, 'eat', true);
			animal.hunt(victim);
			expect(spy.callCount).toBe(1);
			expect(spy.lastArguments[0]).toBe(victim);
		});
	});
}, true);
