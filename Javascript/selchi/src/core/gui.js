function GUI() {
	this.container_ = null;
	this.body_ = null;
	this.css_ = {};
	this.isRendered_ = false;
	this.intervals_ = [];
	this.events_ = [];
}
GUI.property('container_');
GUI.property('body_', true);
GUI.property('css_');

GUI.prototype.isRendered = function() {
	return this.isRendered_;
};
GUI.prototype.render_ = Function.empty;
GUI.prototype.render = function() {
	this.render_();
	this.isRendered_ = true;
	this.render = Function.empty;
};
GUI.prototype.destroy_ = Function.empty;
GUI.prototype.destroy = function() {
	this.destroy_();
	for (var i = this.intervals_.length; i--; )
		clearInterval(this.intervals_[i]);
	for (i = this.events_.length; i--; )
		Event.remove(this.events_[i]);
	this.destroy = Function.empty;
};