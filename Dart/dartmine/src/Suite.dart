class Suite {
	String message;
	List<String> fails;

	bool failed = false;
	bool hide = false;

	Function beforeEach;
	Function handler;
	Function afterEach;

	Suite parent;
	List<_Suite> suites;
	List<_Expectation> specs;

	Suite(Suite parent, String message, Function handler, bool hide, bool isSpec) {
		
	}
}