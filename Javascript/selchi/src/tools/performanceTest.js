var PerformanceTest = (function() {


	function PerformanceTest() {
		this.methods = [];
		this.results = [];
		this.averages = [];
		this.density = 1;
		this.repetitions = 5;
	}


	PerformanceTest.prototype.reset = function() {
		this.results = [];
		this.averages = [];
	};


	PerformanceTest.prototype.run = function() {
		var method, start, lapse, i, j, k;

		this.reset();
		buildExecute(this.density);

		for (i=this.methods.length; i--; )
			this.results[i] = [];
		
		for (i=this.repetitions; i--; )
			for (j=this.methods.length; j--; )
				this.results[j][this.repetitions - i - 1] = execute(this.methods[j]);

		
		for (i=this.methods.length; i--; )
			this.averages[i] = calcAverage(this.results[i]);
	};


	PerformanceTest.prototype.print = function() {
		var container = ce('table');
		container.border = 1;
		container.appendChild(printRow.call(this, '', 'th', function(j) { return this.methods[j].name; }));
		for (i=0; i<this.repetitions; i++)
			container.appendChild(printRow.call(this, "Lapse " + i, 'td', function(j) { return this.results[j][i]; }));
		container.appendChild(printRow.call(this, 'Average', 'th', function(j) { return this.averages[j]; }));
		document.body.appendChild(container);
		return container;
	};
	

	function printRow(thInnerHtml, contentType, contentValue) {
		var tr = ce('tr');
		var td = ce('th');
		td.innerHTML = thInnerHtml;
		tr.appendChild(td);
		for (j=0; j<this.methods.length; j++) {
			td = ce(contentType);
			td.innerHTML = contentValue.call(this, j);
			tr.appendChild(td);
		}
		return tr;
	}


	function ce(tag) {
		return document.createElement(tag);
	}

	
	function calcAverage(dataList) {
		var sum = 0;
		for (var i=dataList.length; i--; )
			sum += dataList[i];
		return sum / dataList.length;
	}


	var execute = function() { throw new Error() };
	function buildExecute(density) {
		var code = 'var start = new Date();\n';
		for (var i = density * 1000; i--; )
			code += 'method();\n';
		code += 'return new Date() - start;';
		execute = new Function('method', code);
	}


	return PerformanceTest;
})();