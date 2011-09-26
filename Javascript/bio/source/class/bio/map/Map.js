qx.Class.define('bio.map.Map', {
	extend: qx.core.Object,

	construct: function(columns, rows) {
		this.__items = [];
		this.__map = [];

		if (columns) {
			this.setColumns(columns);
		}
		if (rows) {
			this.setRows(rows);
		}

		this.__refreshSizeCache();
	},

	destruct: function() {
		
	},

	properties: {

		cellSize: {
			check: 'Number',
			apply: '__refreshSizeCache',
			init: 10
		},

		columns: {
			check: 'Number',
			apply: '__refreshSizeCache',
			init: 100
		},

		rows: {
			check: 'Number',
			apply: '__refreshSizeCache',
			init: 100
		}

	},


	members: {
		__items: null,
		__map: null,

		__halfHeight: 0,
		__halfWidth: 0,
		__height: 0,
		__width: 0,


		__refreshSizeCache: function() {
			this.__height = this.getRows() * this.getCellSize();
			this.__width = this.getColumns() * this.getCellSize();

			this.__halfHeight = this.__height / 2;
			this.__halfWidth = this.__width / 2;
		}

	}
});
