/**
 * A re-implementation of Jasmine (http://pivotal.github.com/jasmine/) just for fun
 *
 * Author:
 *	Seldaiendil <seldaiendil2@gmail.com>
 *	A. Matías Q. <amatiasq@gmail.com>
 *
 * Licence:
 *	Copyright 2010 A. Matías Quezada
 *	This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.

 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function(global) {
	// Css classes
	var css = {
		'tree': "sassmine",
		'hide': "sassmineHide",
		'suite': "sassmineSuite",
		'spec': "sassmineSpec",
		'fail': "sassmineFailed",
		'errors': "sassmineErrorMessages",
	};

	/* 
	 * SassmineClass
	 * Singleton instance 'Sassmine' will be exported
	 * Contains general sassmine structure and references
	 */
	function SassmineClass() {
		this.container = document.createElement("div");
		this.button = document.createElement("button");
		this.tree = new Suite({ dom: this.container }, "", function() { }, false, false);

		this.currentNode = this.tree;
		this.forceShow = false;
		this.suitesCount = 0;
		this.specsCount = 0;
		
		this.tree.dom.className = css.tree;
		this.button.innerHTML = "Ver Todos";
		this.container.appendChild(this.button);
		this.button.onclick = buttonClickHandler;

		var self = this;
		window.addEventListener("load", function() {
			document.body.appendChild(self.container);
		}, true);
	}
	SassmineClass.prototype.notify = function(message) {
		document.title = message;
	};
	SassmineClass.prototype.fail = function(message) {
		this.currentNode.failed = true;
		this.currentNode.fails.push(message);
	};
	SassmineClass.prototype.createSuite = function(message, handler, hide, isSpec) {
		this.currentNode = new Suite(this.currentNode, message, handler, hide, isSpec);
		this.currentNode.execute();
		this.currentNode = this.currentNode.parent;
	};
	SassmineClass.prototype.describe = function(message, handler, hide) {
		this.suitesCount++;
		this.createSuite(message, handler, hide, false);
		this.notify("Executed " + this.suitesCount + " suites with " + this.specsCount + " specs.");
	};
	SassmineClass.prototype.it = function(message, handler) {
		this.specsCount++;
		this.createSuite(message, handler, false, true);
	};
	SassmineClass.prototype.beforeEach = function(action) {
		this.currentNode.beforeEach = action;
	};
	SassmineClass.prototype.afterEach = function(action) {
		this.currentNode.afterEach = action;
	};
	var Sassmine = new SassmineClass();

	function buttonClickHandler() {
		var divs = Sassmine.container.getElementsByTagName("div");
		for (var i=divs.length; i--; )
			divs[i].className = divs[i].className.replace(css.hide, "");
	};

	/*
	 * Suite
	 * Private class
	 * Provides a class to handle 'describe' and 'it' functions
	 */
	function Suite(parent, message, handler, hide, isSpec) {
		this.dom = document.createElement("div");
		this.message = message;
		this.handler = handler;
		this.failed = false;
		this.hide = hide;
		this.fails = [];

		this.beforeEach = null;
		this.afterEach = null;
		this.parent = parent;
		this.suites = [];
		this.specs = [];
		
		if (typeof parent.parent !== 'undefined')
			parent[isSpec ? 'specs' : 'suites'].push(this);
		parent.dom.appendChild(this.dom);
		this.dom.className = isSpec ? css.spec : css.suite;
		this.dom.innerHTML = message;
	}
	Suite.prototype.execute = function() {
		if (this.parent.beforeEach)
			this.parent.beforeEach();
		
		try {
			var result = this.handler.call(null);
		} catch(ex) {
			this.failed = true;
			this.fails.push(ex.message);
		}
		
		if (this.failed) {
			this.parent.failed = true;
			this.dom.className += " " + css.fail;
			if (this.fails.length > 0) {
				var messages = document.createElement('div');
				messages.className = css.errors;
				messages.innerHTML = this.fails.join("<br>");
				this.dom.appendChild(messages);
			}
		} else if (this.hide && !Sassmine.forceShow) {
			this.dom.className += " " + css.hide;
		}
		
		if (this.parent.afterEach)
			this.parent.afterEach();
	};
	
	/*
	 * Spy
	 * Public class, will be exported
	 * Provides a spy function than intercepts a function call and registrates scope, arguments and call counts
	 */
	function Spy(original, callOriginal) {
		this.reset();
		this.newSpy();
		this.original = original;
		this.callOriginal = callOriginal;
	}
	Spy.spyMethod = function(instance, method, callOriginal) {
		var spy = new Spy(instance[method], callOriginal)
		instance[method] = spy.spy;
		return spy;
	};
	Spy.prototype.reset = function() {
		this.callCount = 0;
		this.scopes = [];
		this.arguments = [];
		this.lastScope = null;
		this.lastArguments = [];
	};
	Spy.prototype.newSpy = function() {
		var self = this;
		this.spy = function() {
			self.callCount++;
			self.scopes.push(this);
			var args = [];
			for (var i=0, len=arguments.length; i<len; i++)
				args.push(arguments[i]);
			self.arguments.push(args);
			self.lastScope = this;
			self.lastArguments = args;
			if (self.callOriginal)
				self.original.apply(this, arguments);
		};
	};

	/*
	 * Expectations
	 * Private class
	 * Instances of this class will be returned when call expect() function
	 * Each expectation instance has a subinstance 'not', than reverses the result
	 */
	function Expectation(target, not) {
		this.target = target;
		// If this isn't the "not" expectation it must create one
		this.isNot = typeof not !== 'undefined';
		if (!this.isNot)
			this.not = new Expectation(target, true);
	}
	Expectation.prototype.test = function(bool, message) {
		if (bool !== this.isNot)
			return true;
		Sassmine.fail(message.replace("[NOT] ", this.isNot ? "not " : ""));
		return false;
	};
	Expectation.prototype.printObject = function(object) {
		return "--[" + object + "]-- (" + (typeof object) + ")"
	};
	Expectation.prototype.standardMessage = function(target, text, objetive) {
		var end = typeof objetive !== 'undefined' ? " " + this.printObject(objetive) : "";
		return "Expected " + this.printObject(this.target) + " " + text + end;
	};
	
	// Comparison expectations
	Expectation.prototype.toBe = function(objetive) {
		return this.test(this.target === objetive, this.standardMessage(this.target, "to [NOT] be", objetive));
	};
	Expectation.prototype.toBeLike = function(objetive) {
		return this.test(this.target == objetive, this.standardMessage(this.target, "to [NOT] be like", objetive));
	};
	Expectation.prototype.toBeTrue = function() {
		return this.test(this.target === true, this.standardMessage(this.target, "to [NOT] be", true));
	};
	Expectation.prototype.toBeFalse = function() {
		return this.test(this.target === false, this.standardMessage(this.target, "to [NOT] be", false));
	};
	Expectation.prototype.toBeTruthy = function() {
		return this.test(!!this.target, this.standardMessage(this.target, "to [NOT] be truthy"));
	};
	Expectation.prototype.toBeFalsy = function() {
		return this.test(!this.target, this.standardMessage(this.target, "to [NOT] be falsy"));
	};
	Expectation.prototype.toBeNull = function() {
		return this.test(this.target === null, this.standardMessage(this.target, "to [NOT] be", null));
	};
	Expectation.prototype.toBeUndefined = function() {
		return this.test(typeof this.target === 'undefined',
			this.standardMessage(this.target, "to [NOT] be undefined"));
	};
	Expectation.prototype.toBeNaN = function() {
		return this.test(isNaN(this.target), this.standardMessage(this.target, "to [NOT] be", NaN));
	};
	
	// Numeric expectations
	Expectation.prototype.toBeBetween = function(val1, val2) {
		return this.test(this.target >= Math.min(val1, val2) && this.target <= Math.max(val1, val2),
			"Expected " + this.printObject(this.target) + " to [NOT] be between " +
				this.printObject(val1) + " and " + this.printObject(val2));
	};
	Expectation.prototype.toBeLowerThan = function(num) {
		return this.test(this.target < num, this.standardMessage(this.target, "to [NOT] be lower than", num));
	};
	Expectation.prototype.toBeBiggerThan = function(num) {
		return this.test(this.target > num, this.standardMessage(this.target, "to [NOT] be bigger than", num));
	};
	Expectation.prototype.toBePositive = function() {
		return this.test(this.target > 0, this.standardMessage(this.target, "to [NOT] be positive"));
	};
	Expectation.prototype.toBeNegative = function() {
		return this.test(this.target < 0, this.standardMessage(this.target, "to [NOT] be negative"));
	};
	
	// Class expectations
	Expectation.prototype.toBeArray = function() {
		return this.test(Object.prototype.toString.call(this.target) === "[object Array]",
			this.standardMessage(this.target, "to [NOT] be a array"));
	};
	Expectation.prototype.toBeFunction = function() {
		return this.test(this.target instanceof Function, this.standardMessage(this.target, "to [NOT] be a function"));
	};
	Expectation.prototype.toBeInstanceOf = function(targetClass) {
		return this.test(this.target instanceof targetClass,
			this.standardMessage(this.target, "to [NOT] be instance of", targetClass));
	};
	Expectation.prototype.toHaveProperty = function(propertyName) {
		return this.test(propertyName in this.target,
			this.standardMessage(this.target, "to [NOT] have property --[" + propertyName + "]--"));
	};
	
	// Error manage expectations
	Expectation.prototype.toThrowError = function() {
		if (!(this.target instanceof Function))
			throw new Error("Target is not a function");
		try {
			this.target.call(global);
			return this.test(false, "Expected --[" + this.target + "]-- to [NOT] throw a exception");
		} catch (ex) {
			return this.test(true,
				"Expected --[" + this.target + "]-- to [NOT] throw error but --["
				+ ex + "]-- thrown with message --[" + ex.message + "]--");
		}
	};
	Expectation.prototype.toThrow = function(errorClass) {
		if (!(this.target instanceof Function))
			throw new Error("Target is not a function");
		try {
			this.target.call(global);
			return this.test(false, "Expected --[" + this.target + "]-- to [NOT] throw a exception");
		} catch (ex) {
			return this.test(ex instanceof errorClass,
				"Expected --[" + this.target + "]-- to [NOT] throw --[" + errorClass +
				"]-- but --[" + ex + "]-- thrown");
		}
	};

	// Export to global scope
	global.Spy = Spy;
	global.Sassmine = Sassmine;
	global.expect = function(target) {
		return new Expectation(target);
	};
	global.xdescribe = function() { };
	global.describe = function(message, action, hide) {
		Sassmine.describe(message, action, hide);
	};
	global.xit = function() { };
	global.it = function(message, action) {
		Sassmine.it(message, action);
	};
	global.beforeEach = function(action) {
		Sassmine.beforeEach(action);
	};
	global.afterEach = function(action) {
		Sassmine.afterEach(action);
	};
})(this);