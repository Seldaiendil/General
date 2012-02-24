interface Dartmine default DartmineImpl {
	Printer output;

	Dartmine();
	Dartmine.dependences(Printer printer);

	void test(String message, void exec());

	void beforeEach(void action());
	void afterEach(void action());

	void fail(String message);
}


class DartmineImpl implements Dartmine {
	final Queue<Suite> _stack;
	final Printer output;
	bool debug = true;

	DartmineImpl() : this.dependences(new Printer());

	DartmineImpl.dependences(Printer this.output) :
		_stack = new Queue<Suite>()
	{
		_stack.add(new Suite('root'));
	}

	void test(String message, void exec()) {
		Suite current = new Suite(message);
		output.addLevel(message);

		Suite parent = _stack.last();
		_stack.add(current);

		if (debug) {
			parent.beforeEach();
			exec();
			parent.afterEach();
		} else {
			try {
				parent.beforeEach();
				exec();
				parent.afterEach();
			} catch (Exception err) {
				fail("ERROR ON TEST: ${err}");
			}
		}

		_stack.removeLast();
		output.removeLevel();
	}

	void beforeEach(void action()) =>
		_stack.last().before.add(action);

	void afterEach(void action()) =>
		_stack.last().after.add(action);

	void fail(String message) {
		output.error(message);
	}
}
