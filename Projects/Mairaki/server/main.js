var start = require('./start.js').start;

start('es', 'Sigma', 'Seldaiendil', process.argv[2], function(session, parser) {
	console.log("INFO: Parsing data...")
	parser.parseAllCities(function() {
		console.log("INFO: Done.");
		require('fs').writeFile('result.json', session.state.serialize(true), 'utf8');
		console.log("Total calls: " + session.client.calls);
	});
});
