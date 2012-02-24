interface Expectation default ExpectationImpl {
	final value;

	Expectation(Dartmine parent, value);

	Expectation get not();
	bool test(bool success, String message);

	bool toBe(objective);
	bool toBeTrue();
	bool toBeFalse();
	bool toBeNull();
	bool toBeNaN();

	bool toBeBetween(val1, val2);
	bool toBeLowerThan(val);
	bool toBeBiggerThan(val);
	bool toBePositive();
	bool toBeNegative();

	bool toBeList();
	bool toBeMap();
	bool toBeFunction();
	// bool toBeInstanceof(Class);

	bool toThrowError();
	// bool toThrow(Class);
}



class ExpectationImpl implements Expectation {
	final _parent;
	final value;

	ExpectationImpl(Dartmine this._parent, this.value);

	NegativeExpectation get not() => new NegativeExpectation(_parent, value);
	String get _to() => "to";

	String _printObject(object) => "--[$object]-- (type)";
	String _standardMsg(target, text, [objective]) =>
		"Expected ${_printObject(target)} $_to $text " + (objective != null ? _printObject(objective) : '');

	bool test(bool success, String message) {
		if (!success)
			_parent.fail(message);
		//print("Pass $message");
		return success;
	}

	//
	// Comparison expectations
	//
	bool toBe(objective) =>
		test(value == objective, _standardMsg(value, 'be', objective));

	bool toBeTrue() =>
		test(value == true, _standardMsg(value, 'be', true));

	bool toBeFalse() =>
		test(value == false, _standardMsg(value, 'be', false));

	bool toBeNull() =>
		test(value == null, _standardMsg(value, 'be', null));

	bool toBeNaN() =>
		test(value is num && value.isNaN(), _standardMsg(value, 'be', 0/0));


	//
	// Number expectations
	//
	bool toBeBetween(val1, val2) =>
		test(value is num && value >= Math.min(val1, val2) && value <= Math.max(val1, val2), 
			"Expected ${_printObject(value)} $_to be between ${_printObject(val1)} and ${_printObject(val2)}");

	bool toBeLowerThan(val) =>
		test(value is num && value < val, _standardMsg(value, 'be lower than', val));

	bool toBeBiggerThan(val) =>
		test(value is num && value > val, _standardMsg(value, 'be bigger than', val));

	bool toBePositive() =>
		test(value is num && value > 0, _standardMsg(value, 'be positive'));

	bool toBeNegative() =>
		test(value is num && value < 0, _standardMsg(value, 'be negative'));

	//
	// Class expectations
	//
	bool toBeList() =>
		test(value is List, _standardMsg(value, 'be a List'));

	bool toBeMap() =>
		test(value is Map, _standardMsg(value, 'be a Map'));

	bool toBeFunction() =>
		test(value is Function, _standardMsg(value, 'be a Function'));

	// toBeInstanceof(Class)

	bool toThrowError() {
		if (value !is Function)
			throw new Exception("Target is not a Function");

		try {
			value();
			return test(false, "Expected ${_printObject(value)} $_to throw a exception");
		} catch(ex) {
			return test(true, "Expected ${_printObject(value)} $_to throw a exception but --[$ex]-- thrown with message --[${ex.message}]--")
		}
	}

	// toThrow(Class)
}



class NegativeExpectation extends ExpectationImpl {
	NegativeExpectation(Dartmine parent, value) : super(parent, value);

	Expectation get not() => new Expectation(_parent, value);
	String get _to() => "to not";

	bool test(bool success, String message) =>
		super.test(!success, message);
}
