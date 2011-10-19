exports.State = State;
function State(session) {
	this.gold = 0;
	this.cities = [];
	this.citiesById = {};

	this.ships = {
		free: 0,
		total: 0
	};

	this.news = {
		trade: false,
		military: false,
		research: false,
		diplomacy: false
	};
}
State.prototype = {
	addCity: function(id, name) {
		var city = new City(id, name);
		this.cities.push(city);
		this.citiesById[id] = city;
	}
}


function City(id, name) {
	this.id = id;
	this.name = name;
	this.level = 0;

	this.resources = {};
	this.buildings = [];
	this.buildingsByName = {};
}
City.prototype = {
	addBuilding: function(position, name, level) {
		var build = new Building(name, level, position);
		this.buildings[position] = build;
		this.buildingsByName[name] = build;
	}
}

function Building(name, level, position) {
	this.name = name;
	this.level = level;
	this.position = position;
}