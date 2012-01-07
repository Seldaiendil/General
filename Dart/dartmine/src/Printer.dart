class PrinterMessageType {
	static final PrinterMessageType suite = const PrinterMessageType(0);
	static final PrinterMessageType spec = const PrinterMessageType(1);
	static final PrinterMessageType error = const PrinterMessageType(2);

	final int id;
	const PrinterMessageType(int this.id);
}

interface Printer factory PrinterFactory {
	Printer();

	void start();
	void error(String message, PrinterMessageType type);

	void addLevel(String message);
	void removeLevel();
}

class PrinterFactory {
	factory Printer() {
		// If it is console
		if (true) {
			return new ConsolePrinter();
		//} else {
		//	return new HtmlPrinter();
		}
	}
}

class ConsolePrinter implements Printer {
	final green = '\033[92m';
	//final error = '\033[91m';
	final restore = '\033[0m';

	int _deep = 0;

	addLevel(String message, [PrinterMessageType type = PrinterMessageType.suite]) {
		var indent = '';
		for (int i = 0; i < _deep; i++)
			indent += '  ';
		
		print("$indent$message");
		_deep++;
	}

	removeLevel() {
		_deep--;
	}

	error() { }
}