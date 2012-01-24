var ps = require('./parser.js');

var client = new ps.Client('www.seriesyonkis.com');
var storage = new ps.Storage('sy.json');

storage.load().then(function(data) {
	if (!data._loaded) {
		client.query('/').then(function($, html) {
			var series = {};

			$('.shows_list').children('dl').children('dd').each(function(i) {
				var link = $(this).children('a');
				//console.log("Serie found: " + link.attr('title'));

				series[link.attr('href')] = {
					seasons: [],
					title: link.attr('title'),
					href: link.attr('href')
				};
			});

			data._loaded = true;
			data.series = series;

			storage.save(data).then(function() {
				scanSeries(data);
			});
		});
	} else {
		scanSeries(data);
	}
});


function scanSeries(data) {
	var ids = Object.keys(data.series);
	massRequest(0);

	function massRequest(current) {
		var promises = [];
		var max = current + 10;
		if (max > data.series.length)
			max = data.series.length;
		
		for (var i = current; i < max; i++)
			promises.push(requestOne(data.series[ids[i]]));
		
		new ps.Promise.all(promises).then(function() {
			if (diff)
				fin();
			if (max !== data.series.length)
				massRequest(max);
		});

		var diff = true;
	}

	function requestOne(serie) {
		if (serie._loaded)
			return new ps.Promise.completed();

		var prom = new ps.Promise();

		client.query(serie.href).then(function($, window, html) {
			serie._loaded = true;
			console.log("Parseando serie: " + serie.title);

			$('#seasons-list .expand').each(function(i) {
				var temporada = serie.seasons[i] = {
					title: $(this).children('.season').children('strong').html(),
					capitulos: []
				};

				$(this).children('table').children('tbody').children().each(function(i) {
					var td = $(this).children('.episode-title');
					var cap = temporada.capitulos[i] = {
						title: td.text().replace(/\s+/g, ' '),
						href: td.children('a').attr('href')
					}

				});

			});

			prom.complete();
		});

		return prom;
	}

	function fin() {
		console.log("GUARDANDOOOOO");
		storage.save(data);
	}
}
