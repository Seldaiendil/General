#library('dartmine');

class _Dartmine {
	


}



class _Suite {
	String message;
	List<String> fails;

	bool failed = false;
	bool hide = false;

	Function beforeEach;
	Function handler;
	Function afterEach;

	_Suite parent;
	List<_Suite> suites;
	List<_Expectation> specs;

	_Suite(_Suite parent, String message, Function handler, bool hide, bool isSpec) {
		
	}
}