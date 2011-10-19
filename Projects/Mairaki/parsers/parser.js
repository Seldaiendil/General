var async = require('async');

exports.Parser = Parser;
function Parser(session, callback) {
	var self = this;

	session.client.query('/index.php', {}, function(err, $, window) {
		self.parseGlobals(session, $, function() {
			self.parseAllCities(session, callback);
		});
	});

}
Parser.prototype = {
	parseGlobals: function(session, $, callback) {
		session.state.gold = num($('#value_gold').html());
		session.state.ships = getTotalFree($('#accountTransporter').html());

		var fields = {};
		$('#changeCityForm input').each(function(index, element) {
			fields[element.name] = element.value;
		});

		var cities = session.state.cities;
		$('#citySelect option p').each(function(index, element) {
			var id = element.parentNode.value;
			for (var i = cities.length; i--; )
				if (cities[i].id === id)
					return;

			var name = $(element).html().split('&nbsp;')[1].trim();
			session.state.addCity(id, name);
		});
		session.state.citiesById.fields = fields;

		callback(session);
	},

	parseAllCities: function(session, callback) {
		var citiesParsers = [];
		var cities = session.state.cities;

		for (var i = cities.length; i--; ) {
			citiesParsers.push(generateCityParser(session, cities[i]));
		}

		console.log("Length: " + cities.length)

		console.log(citiesParsers);
		async.parallel(citiesParsers, function(err, results) {
			callback(session);
		});

	}
};

function generateCityParser(session, city) {
	return function(sync) {
		session.client.query('/index.php?view=city&id=' + city.id + '&trololo=' + city.name, function(err, $, window) {
			console.log("Parsing City: " + city.name);
			city.level = num($('#mainview').attr('id').replace('phase', ''));
			city.resources = {
				habitants: getTotalFree($('#value_inhabitants').html()),
				wood:    num($('#value_wood'   ).html()),
				wine:    num($('#value_wine'   ).html()),
				marble:  num($('#value_marble' ).html()),
				crystal: num($('#value_crystal').html()),
				sulfur:  num($('#value_sulfur' ).html())
			};

			$('#locations a').each(function(index, element) {
				var match = element.href.match(/\?view=(\w+)&amp;id=\d+&amp;position=(\d+)/);
				if (!match || match[1] === 'buildingGround') {
					return;
				}

				city.newBuilding(match[2], match[1], element.title.split(/ /).pop());
			});

			sync(null, city);
		});
	};
}

function getTotalFree(text) {
	var temp = text.trim().split('(');
	return {
		free: num(temp[0]),
		total: num(temp[1])
	};
}

function num(text) {
	return parseInt(text.trim().replace(/,/, ''));
}