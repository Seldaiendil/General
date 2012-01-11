qx.Class.define('eye.apps.panel.Main', {
	extend: eye.Application,

	construct: function() {
		this.base(arguments);
		this._bar = new qx.ui.container.Composite()
	},

	properties: {
		
		edge: {
			event: 'changeEdge',
			check: [ 'top', 'left', 'right', 'bottom' ],
			apply: '_applyEdge',
			nullable: false,
			deferredInit: true
		}

	}

	members: {
		
		_bar: null,

		_relation: {
			top: 'horizontal',
			bottom: 'horizontal',
			left: 'vertical', 
			right: 'vertical'
		},

		_applyEdge: function(value, old) {
			var orientation = this._relation[value];
			var old = this._relation[old];
		
			this._bar.setLayoutProperties({ edge: value });

			if (orientation === old)
				return;
			
			var xbox = orientation === 'horizontal' ? 'HBox' : 'VBox';
			this._bar.setLayout(new qx.ui.layout[xbox]());
		},

		start: function(edge) {
			this.base(arguments);

			this.setEdge(edge);
		}

	}
});