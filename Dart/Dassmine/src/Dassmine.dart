#library("dassmine");
#source('functions.dart');
#source('Printer.dart');
#source('ConsolePrinter.dart');

class _Dassmine {

	/** Singleton instance */
	static _Dassmine instance = null;

	/** Singleton method */
	static _Dassmine getInstance() {
		if (_Dassmine.instance !== null)
			return _Dassmine.instance;
		
		return _Dassmine.instance = new _Dassmine();
	}


	/** Used to difference describe function from it function */
	const DESCRIBE = 0;
	const IT = 1;


	/** Output manager */
	_Printer printer;

	Dassmine() {
		printer = new _Printer();
	}



	void execute(int type, String description, _Code tests) {
		try {
			tests();
		} catch (Exception err) {
			printer.error(type, description, err);
		}
	}
}
