var AnimalGraphic = (function() {
	function AnimalGraphic() {
		this.getContainer = AnimalGraphic_getContainer;
		this.setContainer = AnimalGraphic_setContainer;
		this.getColor = AnimalGraphic_getColor
		this.setColor = AnimalGraphic_setColor;
		this.refresh = AnimalGraphic_refresh;
		this.render = AnimalGraphic_render;
		
		this.base_die = this.die;
		this.die = AnimalGraphic_die;
		this.base_tick = this.tick;
		this.tick = AnimalGraphic_tick;
	
		this.container = null;
		this.hold = null;
		this.body = null;
		this.head = null;
		this.tail = null;
		this.color = 10;
	}
	AnimalGraphic_getContainer = function() {
		return this.container;
	};
	AnimalGraphic_setContainer = function(container) {
		this.container = container;
	};
	AnimalGraphic_getColor = function(value) {
		return this.color;
	};
	AnimalGraphic_setColor = function(value) {
		this.color = value;
		var isVegetarian = this instanceof Vegetarian;
		var r = isVegetarian ? 0 : 255;
		var g = isVegetarian ? 255 : 0;
		var b = value;
		var color = "rgb(" + r + "," + g + "," + b + ")";
		this.head.style.backgroundColor = color;
		this.body.style.backgroundColor = color;
		this.tail.style.backgroundColor = color;
	};
	AnimalGraphic_refresh = function() {
		if (this.hold.parentNode)
			this.hold.parentNode.removeChild(this.hold);

		this.hold.style.left = this.getX();
		this.hold.style.top = this.getY();

		var sizeDiff = this.size.x / 5;
		var positionDiff = sizeDiff / 2;

		var prev = this.movement.copy().modifyDirection(180).getVector().add(-positionDiff);
		this.tail.style.marginLeft = prev.x;
		this.tail.style.marginTop = prev.y;

		var next = this.movement.getVector().add(positionDiff);
		this.head.style.marginLeft = next.x;
		this.head.style.marginTop = next.y;

		this.head.style.width = this.size.x - sizeDiff;
		this.head.style.height = this.size.y - sizeDiff;
		this.body.style.width = this.size.x;
		this.body.style.height = this.size.y;
		this.tail.style.width = this.size.x + sizeDiff;
		this.tail.style.height = this.size.y + sizeDiff;
		
		this.container.appendChild(this.hold);
	};
	AnimalGraphic_render = function() {
		this.hold = Dom.create('div');
		this.head = Dom.create('div');
		this.body = Dom.create('div');
		this.tail = Dom.create('div');

		this.hold.className = "Element Animal-hold";
		this.head.className = "Element Animal-head";
		this.body.className = "Element Animal-body";
		this.tail.className = "Element Animal-tail";

		this.hold.appendChild(this.tail);
		this.hold.appendChild(this.body);
		this.hold.appendChild(this.head);
		
		
		var self = this;
		this.eventOver = Event.add(this.head, 'mouseover', function() {
			self.head.innerHTML = "\n<br>" + self.id;
		});
		this.eventOut = Event.add(this.head, 'mouseout', function() {
			self.head.innerHTML = "";
		});
		

		this.refresh()
	};
	AnimalGraphic_die = function() {
		if (this.dead)
			return;
		this.base_die.apply(this, arguments);
		//this.hold.removeChild(this.head);
		//this.hold.removeChild(this.body);
		//this.hold.removeChild(this.tail);
		//Event.remove(this.eventOver);
		//Event.remove(this.eventOut);
		//this.hold.className = "Element Animal-dead";
		this.hold.parentNode.removeChild(this.hold);
	};
	AnimalGraphic_tick = function() {
		this.base_tick.apply(this, arguments);
		this.refresh();
	};
	return AnimalGraphic;
})();
