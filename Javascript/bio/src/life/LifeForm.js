bio.map.Element.extend('bio.life.LifeForm', {
	constructor: function() {
		this.base(arguments);

		this.setView(new bio.view.Base());
	}
});
