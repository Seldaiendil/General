class Dartmine {
	Suite _hierarchy;
	Printer output;

	Dartmine() {
		_hierarchy = new Suite();
		output = new Printer();
	}

	void describe(String message, void test()) {
		output.addLevel(message);

		try {
			test();
		} catch (Exception err) {
			
		}
	}
	void it(String message, void test()) { }
	void beforeEach(void action()) { }
	void afterEach(void action()) { }
}
