var ps = require('./parser.js');

var client = new ps.Client('www.seriesyonkis.com');
var storage = new ps.Storage('sy.json');

storage.load().then(function(data) {
	if (!data._loaded) {
		client.query('/').then(function($, html) {
			var series = {};

			$('.shows_list').find('dl dd').each(function(i) {
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
	var i = 0;

	request();
	request();
	request();
	request();

	function request() {
		if (i >= data.series.length)
			return;
		
		if (i % 10 === 0)
			storage.save(data);
		
		var id = ids[i++];
		requestOne(data.series[id]).then(request);
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

				$(this).find('tbody tr').each(function(i) {
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
}
