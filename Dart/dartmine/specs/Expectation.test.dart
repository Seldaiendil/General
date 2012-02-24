class MockedDartmine extends DartmineImpl {
	fail(String message) { }
}

TestExpectation() {
	var mock = new MockedDartmine();
	var test;

	EXECUTETESTS(bool success) {
		var values = {
			"true (bool)": true,
			"false (bool)": false,
			"0 (int)": 0,
			"1 (int)": 1,
			"2 (int)": 2,
			"0.0 (double)": 0.1,
			"1.1 (double)": 1.1,
			"2.2 (double)": 2.1,
			"0 (string)": '0',
			"1 (string)": '1',
			"2 (string)": '2',
			"'' (string)": '',
			"'hi' (string)": 'hi',
			"{} (map)": {},
			"[] (list)": [],
			"() {} (function)": () { },
			"null (null)": null,
			"NaN (double)": 0/0,
			"Infinity (double)": 1/0
		};


		describe("toBe() method", () {
			var keys = values.getKeys();

			for (var i in keys) {

				// NaN != NaN
				if (i != 'NaN (double)') {
					it ("should pass if same value is passed $i", () {
						if (test(values[i]).toBe(values[i]) != success)
							throw new Exception("${values[i]} is not $i!!!");
					});
				}

				it("should fail otherwise", () {
					for (var j in keys) {
						if (j != i)
							if (test(values[i]).toBe(values[j]) == success)
								throw new Exception("${values[i]} is $j!");
					}
				});
			}

		});


		testSpecialEquality(index, bool handler(Expectation _)) {
			var val = values[index];

			it("should pass if value is $index", () {
				if (handler(test(val)) != success)
					throw new Exception("$val is not $index!!!");
			});

			it("should fail with any other value", () {
				for (var i in values.getKeys())
					if (i != index)
						if (handler(test(values[i])) == success)
							throw new Exception("${values[i]} is $index!");
			});
		}
		describe("isTrue() method",       () => testSpecialEquality("true (bool)",      (expect) => expect.toBeTrue()));
		describe("toBeFalse() method",    () => testSpecialEquality("false (bool)",     (expect) => expect.toBeFalse()));
		describe("toBeNull() method",     () => testSpecialEquality("null (null)",      (expect) => expect.toBeNull()));
		describe("toBeNaN() method",      () => testSpecialEquality("NaN (double)",     (expect) => expect.toBeNaN()));
		describe("toBeList() method",     () => testSpecialEquality("[] (list)",        (expect) => expect.toBeList()));
		describe("toBeMap() method",      () => testSpecialEquality("{} (map)",         (expect) => expect.toBeMap()));
		describe("toBeFunction() method", () => testSpecialEquality("() {} (function)", (expect) => expect.toBeFunction()));

		describe("toBeBetween() method", () {
			it("should pass if passed argument is a number between operators", () {
				if (test(5).toBeBetween(3, 7) != success)
					throw new Exception("5 is not between 3 and 7");

				it("doesn't matter the order", () {
					if (test(5).toBeBetween(3, 7) != success)
						throw new Exception("5 is not between 7 and 3");
				});

				it("even with negative numbers", () {
					if (test(-5).toBeBetween(-3, -7) != success)
						throw new Exception("-5 in not between -3 and -7");
				});

				it("also pass if value is one of the range limits", () {
					if (test(3).toBeBetween(3, 7) != success)
						throw new Exception("3 is not between 3 and 7");

					if (test(7).toBeBetween(3, 7) != success)
						throw new Exception("7 is not between 3 and 7");
				});
			});

			it("should fail if value is not a number", () {

				});
		});

		describe('', () { });
	}

	describe("Expectation class", () {
		test = (val) => new Expectation(mock, val);
		EXECUTETESTS(true);
	});

	describe("NOT Expectation class", () {
		test = (val) => new Expectation(mock, val).not;
		EXECUTETESTS(false);
	});

}

/*
	bool toBeBetween(val1, val2);
	bool toBeLowerThan(val);
	bool toBeBiggerThan(val);
	bool toBePositive();
	bool toBeNegative();

	bool toThrowError();
	// bool toThrow(Class);
*/