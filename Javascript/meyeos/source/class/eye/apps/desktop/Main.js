qx.Class.define('eye.apps.desktop.Main', function() {
	extend: eye.Application,


	properties: {

		color: {
			check: 'String',
			apply: '_applyColor',
			event: 'changeColor',
			validate: '_validateColor'
		}
		
		wallpaper: {
			check: 'String',
			apply: '_applyWallpaper',
			event: 'changeWallpaper'
		}

	},


	statics: {
		
		stackCentered

	},


	members: {

		_root: null,
		_wallpaper: null,
		_interactive: null,
		_overlay: null,
		
		start: function(container) {
			this.base(arguments);
			container.setLayout(new qx.ui.layout.Grow);

			var Composite = qx.ui.container.Composite;
			var Canvas = qx.ui.layout.Canvas;
			var root = new Composite(new Canvas());

			this._wallpaper = new eye.apps.desktop.Wallpaper();
			root.add(this._wallpaper, { x: 0, y: 0, width: '100%', height: '100%' });

			this._interactive = new eye.apps.desktop.InteractiveZone();
			root.add(this._interactive, { x: 0, y: 0, width: '100%', height: '100%' });

			this._overlay = new Composite(new Canvas());
			this._overlay.exclude();
			root.add(this._overlay, { x: 0, y: 0, width: '100%', height: '100%' });
		},


		_applyWallpaper: function(value, old) {
			this._wallpaper.setImage(value);
		},

		_validateColor: function(value) {
			return qx.util.ColorUtil.isNamedColor(value);
		},

		_applyColor: function(value) {
			this._wallpaper.setColor(value);
		},


		getPane: function() {
			return this._interactive.getPane();
		},

		addBar: function(bar, edge) {
			return this._interactive.addBar(bar, edge);
		},

		removeBar: function(bar) {
			return this._interactive.removeBar(bar);
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