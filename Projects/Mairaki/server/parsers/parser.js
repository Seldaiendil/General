var async = require('async');

exports.Parser = Parser;
function Parser(session, $) {
	this.session = session;
	this.parseGlobals($);
	//this.parseAllCities(callback);
}
Parser.prototype = {
	parseGlobals: function($) {
		var state = this.session.state;
		state.gold = num($('#value_gold').html());
		state.ships = getTotalFree($('#accountTransporter').html());

		var fields = {};
		$('#changeCityForm input').each(function(index, element) {
			fields[element.name] = element.value;
		});

		var cities = state.cities;
		$('#citySelect option p').each(function(index, element) {
			var id = element.parentNode.value;
			for (var i = cities.length; i--; )
				if (cities[i].id === id)
					return;

			var name = $(element).html().split('&nbsp;')[1].trim();
			state.addCity(id, name);
		});
		state.citiesById.fields = fields;
	},

	parseAllCities: function(callback) {
		var self = this;
		var citiesParsers = [];
		var cities = this.session.state.cities;

		for (var i = cities.length; i--; ) {
			citiesParsers.push(generateCityParser(this.session, cities[i]));
		}

		async.parallel(citiesParsers, function(err, results) {
			callback(err, self.session);
		});
	}
};

function generateCityParser(session, city) {
	return function(sync) {
		session.client.query('/index.php?view=city&id=' + city.id + '&trololo=' + city.name, function(err, $, window) {
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
				var match = element.href.match(/\?view=(\w+)&id=\d+&position=(\d+)/);
				if (!match || match[1] === 'buildingGround')
					return;

				city.addBuilding(match[2], match[1], element.title.split(/ /).pop());
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