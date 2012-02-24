class PrinterMessageType {
	static final PrinterMessageType suite = const PrinterMessageType(0);
	static final PrinterMessageType spec = const PrinterMessageType(1);
	static final PrinterMessageType error = const PrinterMessageType(2);

	final int id;
	const PrinterMessageType(int this.id);
}

interface Printer default ConsolePrinter {
	Printer();

	void start();
	void prant(String message, [PrinterMessageType type]);
	void error(String message);

	void addLevel(String message);
	void removeLevel();
}

class ConsolePrinter implements Printer {
	final green = '\033[92m';
	//final error = '\033[91m';
	final restore = '\033[0m';
	int deep = 0;

	String get indent() {
		var result = '';
		for (int i = 0; i < deep; i++)
			result += '  ';
		return result;
	}

	void removeLevel() => deep--;
	void addLevel(String message) {
		prant(message);
		deep++;
	}

	void prant(String message, [PrinterMessageType type = PrinterMessageType.suite]) =>
		print("$indent$message");

	void error(String message) =>
		prant(message, PrinterMessageType.error);

	void start() { }
}