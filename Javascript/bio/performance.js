var load = {
	qooxdoo: false,
	selchi: false
};

function testLoad() {
	console.log(JSON.stringify(load));
	if (load.qooxdoo && load.selchi)
		start();
}

function start() {
	var test = new PerformanceTest();

	var cosa = {
		temp: {
			Force: Force
		}
	}

	test.methods = [
		function qooxdooClass() {
			new bio.phisics.Force(30, 40).getVector().getHypotenuse();
		},
		function javascriptClass() {
			new cosa.temp.Force(30, 40).getVector().getHypotenuse();
		},
	];
	test.repetitions *= 4;
	test.density = 12;
	test.run();
	test.print();
}
