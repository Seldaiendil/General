typedef void _Code();

void xdescribe(description, tests) { }
void describe(String description, _Code tests) {
	_Dassmine.getInstance().execute(_Dassmine.DESCRIBE, description, tests);
}

void xit(description, tests) { }
void it(String description, _Code tests)  {
	_Dassmine.getInstance().execute(_Dassmine.IT, description, tests);
}