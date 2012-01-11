qx.Class.define('eye.apps.desktop.InteractiveZone', {
	extend: qx.ui.core.Widget,

	construct: function() {
		this.base(arguments);

		this._setLayout(new qx.ui.layout.Dock())
		this._createChildControl('center');
	},

	members: {

		_validEdges: {
			top: true,
			bottom: true,
			left: true,
			right: true
		},


		addBar: function(bar, edge) {
			if (!this._validEdges[edge])
				throw new Error('Invalid edge');

			this._add(bar, { edge: edge });
			this.fireDataEvent('addedBar', bar);
		},

		removeBar: function(bar) {
			this._remove(bar);
		},

		removeAllBars: function() {
			this._removeAll();
			this._add(this.getChildControl('center'), { edge: 'center' });
		},


		getDesktop: function() {
			return this.getChildControl('desktop');
		},

		getPane: function() {
			return this.getChildControl('pane');
		},

		
		_createChildControlImpl: function(id) {
			var control;

			switch (id) {
				case 'center':
					control = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
					control.add(this.getChildControl('desktop'), { x: 0, y: 0, width: '100%', height: '100%' })
					control.add(this.getChildControl('pane'), { x: 0, y: 0, width: '100%', height: '100%' })
					this._add(control, { edge: 'center' });
					break;

				case 'pane':
					control = new qx.ui.container.Composite();
					break;
				
				case 'desktop':
					control = new qx.ui.window.Desktop();
					break;
			}

			return control || this.base(arguments);
		}

	}
})