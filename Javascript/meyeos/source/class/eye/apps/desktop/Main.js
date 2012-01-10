qx.Class.define('eye.apps.desktop.Main', function() {
	extend: eye.Application,

	properties: {
		
		wallpaper: {
			check: 'String',
			apply: '_applyWallpaper',
			event: 'changeWallpaper'
		}

	},

	members: {

		_root: null,
		_wallpaper: null,
		_interactive: null,
		_overlay: null,
		
		start: function(container) {
			container.setLayout(new qx.ui.layout.Grow);

			var Composite = qx.ui.container.Composite;
			var Canvas = qx.ui.layout.Canvas;

			var root = new Composite(new Canvas());
			root.addListener('resize', function() {
				var width = root.getWidth();
				var height = root.getHeight();

				this._wallpaper.setWidth(width);
				this._wallpaper.setHeight(height);

				this._interactive.setWidth(width);
				this._interactive.setHeight(height);

				if (this._overlay.isVisible()) {
					this._overlay.setWidth(width);
					this._overlay.setHeight(height);
				}
			});


			this._wallpaper = new eye.apps.desktop.Wallpaper();
			root.add(this._wallpaper, { x: 0, y: 0 });

			this._interactive = new eye.apps.desktop.InteractiveZone();
			root.add(this._interactive, { x: 0, y: 0 });

			this._overlay = new Composite(new Canvas());
			this._overlay.exclude();
			root.add(this._overlay, { x: 0, y: 0 });
		},


		_applyWallpaper: function(value, old) {
			this._wallpaper.setBackground(value);
		},


		showOverlay: function() {
			this._overlay.visible();
		},
		
		hideOverlay: function() {
			this._overlay.exclude();
		},

		getOverlay: function() {
			return this._overlay;
		}

	}
});