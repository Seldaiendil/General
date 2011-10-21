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
	},

	serialize: function(beauty) {
		return JSON.stringify(this.serializable(), null, beauty ? '\t' : null);
	},

	serializable: function() {
		var result = {};

		for (var i in this)
			if (i !== 'citiesById' && i !== 'cities')
				result[i] = this[i];

		result.cities = [];
		for (i = this.cities.length; i--; )
			result.cities[i] = this.cities[i].serializable();
		
		return result;
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
	},

	serializable: function() {
		var result = {};

		for (var i in this)
			if (i !== 'buildingsByName' && i !== 'buildings')
				result[i] = this[i];
		
		result.buildings = [];
		for (i = this.buildings.length; i--; ) {
			if (this.buildings[i])
				result.buildings[i] = this.buildings[i].serializable();
			else
				result.buildings[i] = null;
		}

		return result;
	}
}

function Building(name, level, position) {
	this.name = name;
	this.level = level;
	this.position = position;
}
Building.prototype = {
	serializable: function() {
		return this;
	}
};