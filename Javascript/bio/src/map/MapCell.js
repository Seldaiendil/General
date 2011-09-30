bio.core.ItemHandler.extend('bio.map.MapCell', {
	constructor: function MapCell(x, y) {
		MapCell.base.call(this);

		//this.deads = [];
		//this.nutrients = 1.0;
		this.x = x;
		this.y = y;
	},

	properties: [ 'x', 'y' ]

	/*
	,tick: function() {
		for (var i = deads; i--; )
			this.nutrients += this.deads.extractNutrients(this.factor['extract nutrients']);
	}

	,extractNutrients: function() {
		if (this.nutrients >= factor) {
			this.nutrients -= factor;
			return factor;
		}

		var result = this.nutrients;
		this.nutrients = 0;
		return result;
	}
	*/
});
