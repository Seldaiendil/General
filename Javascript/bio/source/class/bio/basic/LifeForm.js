qx.Class.define('bio.basic.LifeForm', {
	extend: qx.core.Object,

	construct: function(x, y, width, height) {
		this._phi = new window.Phisics(x, y, width, height);
		this._factors = {};
		this.__parents = [];
	},

	destruct: function() {
		this._phi = this.__parents = null;
	},

	properties: {
		view: {
			check: 'bio.core.IView',
			apply: '_applyView'
		},
		map: {
			check: 'bio.map.Map',
			apply: '_applyMap'
		},
		id: {
			check: "Number",
			deferredInit: true
		}
	},


	members: {
		_phi: null,
		_factors: null,
		__dead: false,
		__parents: null,
		__count: 0,


		tick: function() {
			this.view.update(this._phi.location, this._phi.size);
			
			if (this.__count % 10 === 0) {
				this.__garbageCollector();
			}
			this.__count++;
		},


		move: function() {
			var phi = this._phi;
			var size = this.getMap().getSize();

			phi.move();

			if (phi.getX() < 0) {
				phi.setX(size.x + phi.getX());
			} else if (phi.getX() > size.x) {
				phi.setX(phi.getX() % size.x);
			}

			if (phi.getY() < 0) {
				phi.setY(size.y + phi.getY());
			} else if (phi.getY() > size.y) {
				phi.setY(phi.getY() % size.y);
			}
		},


		isDead: function() {
			return this.__dead;
		},

		die: function() {
			if (this.__dead) {
				return;
			}
			this.__dead = true;

			var map = this.getMap();
			if (map) {
				map.removeElement(this);
			}
		},


		addChild: function(child) {
			if (qx.core.Environment.get('qx.debug')) {
				qx.core.Assert.assertInstance(child, bio.basic.LifeForm);
			}
			child.__parents.push(this);
		},

		isParentOf: function(target) {
			if (qx.core.Environment.get('qx.debug')) {
				qx.core.Assert.assertInstance(target, bio.basic.LifeForm);
			}
			return target.__parents.indexOf(this) !== -1;	
		},

		isSonOf: function(target) {
			if (qx.core.Environment.get('qx.debug')) {
				qx.core.Assert.assertInstance(target, bio.basic.LifeForm);
			}
			return this.__parents.indexOf(target) !== -1;
		},

		isBrother: function(target) {
			if (qx.core.Environment.get('qx.debug')) {
				qx.core.Assert.assertInstance(target, bio.basic.LifeForm);
			}
			for (var i = this.__parents.length; i--; ) {
				if (this.__parents[i].isParentOf(target)) {
					return true;
				}
			}
			return false;
		},

		isFamily: function(target) {
			if (qx.core.Environment.get('qx.debug')) {
				qx.core.Assert.assertInstance(target, bio.basic.LifeForm);
			}
			return this.isSonOf(target) || this.isParentOf(target) || this.isBrother(target);
		},

		__garbageCollector: function() {
			// Remove references of dead parents to let the garbage collector collects them
			for (var i = this.__parents.length; i--; ) {
				if (this.__parents[i].isDead()) {
					this.__parents.splice(i, 1);
				}
			}
		}
	}
});
