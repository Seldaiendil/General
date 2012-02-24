#library('sel.dartmine');
#import('dartmine.internal.dart');

Dartmine _realInstance;
Dartmine _instance() {
	if (_realInstance == null)
		_realInstance = new Dartmine();
	return _realInstance;
}

void xdescribe() { }
void describe(String message, void test()) {
	_instance().test(message, test);
}

void xit() { }
void it(String message, void test()) {
	_instance().test(message, test);
}

void beforeEach(void action()) {
	_instance().beforeEach(action);
}

void afterEach(void action()) {
	_instance().afterEach(action);
}

Expectation expect(value) {
	return new Expectation(_instance(), value);
}