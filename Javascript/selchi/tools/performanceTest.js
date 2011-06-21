var PerformanceTest = (function() {
	function PerformanceTest() {
		this.methods = [
			function() { },
			function() { }
		];
		this.results = [];
		this.averages = [];
		this.density = 10000;
		this.repetitions = 5;
	}
	PerformanceTest.prototype.reset = function() {
		this.results = [];
		this.averages = [];
	};
	PerformanceTest.prototype.run = function() {
		var method, start, lapse, i, j, k;
		this.reset();
		for (var i=this.methods.length; i--; )
			this.results[i] = [];
		for (i=this.repetitions; i--; ) {
			for (var j=this.methods.length; j--; ) {
				method = this.methods[j];
				start = new Date();
				for (var k=this.density; k--; )
					method();
				lapse = new Date() - start;
				this.results[j][i] = lapse;
			}
		}
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
	
	return PerformanceTest;
})();