interface Dartmine default DartmineImpl {
	Printer output;

	void describe(String message, void test());
	void it(String message, void test());
	void beforeEach(void action());
	void afterEach(void action());
}

class DartmineImpl implements Dartmine {
	Suite _hierarchy;
	Printer output;

	DartmineImpl() {
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

main() {
	print(new Dartmine());
}