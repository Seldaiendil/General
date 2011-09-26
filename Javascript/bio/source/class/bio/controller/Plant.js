qx.Class.define('bio.controller.Plant', {
	extend: bio.basic.LifeForm,

	construct: function() {
		this._phi.weight = 1;

		this._factors['max grown'] = 100;
		this._factors['absorb nutrients'] = 0.1;

		this.setView(new bio.view.Plant);
	},

	members: {
		tick: function() {
			this.feed();
			this.base(arguments);
		},


		toBeEaten: function(factorEat) {
			var size = this._phi.size;
			
			// If size is not bigger than factorEat it will die and return
			// as much nutriens as it can
			if (size.x < factorEat || size.y < factorEat) {
				this.die();

				var maxReturn = size.x > size.y ? size.x : size.y;
				return factorEat < maxReturn ? factorEat : maxReturn;
			}

			size.add(-factorEat);
			return factorEat;
		},


		feed: function() {
			var cells = this.getMap().getElementCells();
			var absorb = this._factors['absorb nutrients'];
			var nutrients = 0;

			for (var i = cells.length; i--; ) {
				nutrients += cells[i].extractNutrients(absorb)
			}

			if (this._phi.getArea() > this._factors['max grown']) {
				this._phi.size.add(nutrients);
			}
		}
	}
});
