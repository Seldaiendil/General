var Canvas = Base.extend({

	properties: {
		x: {},
		y: {},
		width: {},
		height: {},
	},

	constructor: function() {
		var element = this._element = document.createElement('canvas');
		this._context = element.getContext()

		element.style.width('100%');
		element.style.height('100%');

		document.body.appendChild(element);
	},

	members: {
		
		drawRectangle: function() {
			
		}

	}
});
