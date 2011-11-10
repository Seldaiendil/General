var PerformanceTest = (function() {
	
	function PerformanceTest() {
		this.methods = [];
		this.results = [];
		this.averages = [];
		this.density = 1;
		this.repetitions = 5;
	}

	PerformanceTest.prototype = {
		reset: function() {
			this.results = [];
			this.averages = [];
		},

		run: function() {
			var i;
			var generated = [];

			this.reset();
			for (i=this.methods.length; i--; ) {
				generated[i] = generateExecute(this.methods[i], this.density);
				this.results[i] = [];
			}

			for (i=this.repetitions; i--; )
				for (j=this.methods.length; j--; )
					this.results[j][this.repetitions - i - 1] = generated[j].call(null);

			for (i=this.methods.length; i--; )
				this.averages[i] = calcAverage(this.results[i]);
		},

		print: function() {
			var container = ce('table');
			container.border = 1;
			container.appendChild(printRow.call(this, '', 'th', function(j) { return this.methods[j].name; }));
			for (i=0; i<this.repetitions; i++)
				container.appendChild(printRow.call(this, "Lapse " + i, 'td', function(j) { return this.results[j][i]; }));
			container.appendChild(printRow.call(this, 'Average', 'th', function(j) { return this.averages[j]; }));
			document.body.appendChild(container);
			return container;
		}
	};

	var functionBody = /function\s*\w*\s*\([^\)]*\)\s*\{\s*((.|\n|\r)+)\s*\}/;

	function concatFn(code, fn) {
		if (fn instanceof Function)
			code.push(fn.toString().match(functionBody)[1]);
	}

	function generateExecute(method, density) {
		var pre = null, init = null, end = null, post = null;
		var code = [];

		if (!(method instanceof Function)) {
			if (!method.name)
				method.name = method.loop.name;
			pre = method.pre;
			init = method.init;
			end = method.end;
			post = method.post;
			method = method.loop;
		}

		concatFn(code, pre);
		code.push('var __originalstartvalue__ = new Date();');
		concatFn(code, init);

		var source = method.toString().match(functionBody)[1];
		console.log("Function body: " + source);

		for (var i = density * 1000; i--; )
			code[code.length] = source;

		concatFn(code, end);
		code.push('return new Date() - __originalstartvalue__;');
		concatFn(code, post);
		return new Function(code.join('\n'));
	}

	function calcAverage(dataList) {
		var sum = 0;
		for (var i=dataList.length; i--; )
			sum += dataList[i];
		return sum / dataList.length;
	}

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


	return PerformanceTest;
})();