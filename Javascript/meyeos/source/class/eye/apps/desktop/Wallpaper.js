qx.Class.define('eye.apps.desktop.Wallpaper', {
	extend: qx.ui.core.Widget,

	properties: {
		
		background: {
			check: 'String',
			apply: '_applyBackground'
		}

	},

	members: {

		_colors: [ 'red', 'blue' ]
		
		_applyBackground: function(value, old) {
			
		}

	}
});