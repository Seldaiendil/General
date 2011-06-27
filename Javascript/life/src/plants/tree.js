function Tree() {
	Plant.call(this);
	this.container = null;
	this.css = new Tree.Css();

	this.leaf = null;
	this.trunk = null;
	this.root = null;
}
Tree.Css = function() {
	this.leaf = "Element Tree-leaf";
	this.trunk = "Element Tree-trunk";
	this.root = "Element Tree-root";
};
Tree.prototype = new Plant();
Tree.property('container');
Tree.property('css');
Tree.prototype.base = new Plant();
Tree.prototype.grown = function() {
	//alert(this.base.grown);
	this.base.grown.apply(this, arguments);
	this.refresh();
};
Tree.prototype.move = function() {
	//this.base.move.apply(this, arguments);
	this.refresh();
};
function px(val) {
	return Math.round(val) + "px";
}
Tree.prototype.refresh = function() {
	var width = this.getWidth(),
		height = this.getHeight(),
		nextLocation = this.getNextPosition(),
		diff = this.movement.getVector();

	if (this.root.parentNode) {
		this.container.removeChild(this.root);
		this.container.removeChild(this.trunk);
		this.container.removeChild(this.leaf);
	}

	this.root.style.width = px(width + 2);
	this.root.style.height = px(height + 2);
	this.root.style.left = px(this.getX() - 1);
	this.root.style.top = px(this.getY() - 1);

	this.trunk.style.width = px(width);
	this.trunk.style.height = px(height);
	this.trunk.style.left = px(this.getX() + (diff.x / 2));
	this.trunk.style.top = px(this.getY() + (diff.y / 2));

	this.leaf.style.width = px(width - 2);
	this.leaf.style.height = px(height - 2);
	this.leaf.style.left = px(nextLocation.x + 1);
	this.leaf.style.top = px(nextLocation.y + 1);

	this.container.appendChild(this.root);
	this.container.appendChild(this.trunk);
	this.container.appendChild(this.leaf);
};
Tree.prototype.render = function() {
	this.leaf = Dom.create('div');
	this.leaf.className = this.css.leaf;
	this.trunk = Dom.create('div');
	this.trunk.className = this.css.leaf;
	this.root = Dom.create('div');
	this.root.className = this.css.root;
	this.refresh();

};
