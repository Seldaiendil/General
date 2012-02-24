typedef void Action();

class Suite {
	final String message;
	final List<Action> before;
	final List<Action> after;

	Suite(String this.message) :
		before = new List<Action>(),
		after = new List<Action>();

	void beforeEach() {
		for (int i = 0; i < before.length; i++)
			before[i]();
	}

	void afterEach() {
		for (int i = 0; i < after.length; i++)
			after[i]();
	}
}