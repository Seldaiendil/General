qx.Class.define('bio.phisics.Vector', {

	extend: qx.core.Object,
	
	implement: bio.phisics.IVector,

	construct: function(x, y) {
		var len = arguments.length;
		if (len > 0) {
			if (len === 1) {
				y = x;
			}
			this.setX(x);
			this.setY(y);
		}
	},

	properties: {
		
		x: {
			event: 'changeX',
			check: 'Number',
			init: 0
		},
		
		y: {
			event: 'changeY',
			check: 'Number',
			init: 0
		}

	},


	members: {

		/**
		 * @lint ignoreReferenceField(__roundCache)
		 */
		__roundCache: {},
		
		isZero: function() {
			return this.getX() === 0 && this.getY() === 0;
		},

		copy: function() {
			return new bio.phisics.Vector(this.getX(), this.getY());
		},

		equals: function(vector) {
			return this.getX() === vector.getX() && this.getY() === vector.getY();
		},


		merge: function(vector) {
			this.setX(this.getX() + vector.getX());
			this.setY(this.getY() + vector.getY());
			return this;
		},

		diff: function(vector) {
			return new bio.phisics.Vector(
				this.getX() - vector.getX(),
				this.getY() - vector.getY()
			);
		},


		add: function(value) {
			this.setX(this.getX() + value);
			this.setY(this.getY() + value);
			return this;
		},

		multiply: function(value) {
			this.setX(this.getX() * value);
			this.setY(this.getY() * value);
			return this;
		},


		abs: function() {
			this.setX(Math.abs(this.getX()));
			this.setY(Math.abs(this.getY()));
			return this;
		},

		round: function(decimals) {
			var operator = this.__roundCache[decimals];
			if (typeof operator === 'undefined') {
				var dec = arguments.length === 0 ? 2 : decimals;
				operator = Math.pow(10, dec);
				this.__roundCache[decimals] = operator;
			}
			this.setX(Math.round(this.getX() * operator) / operator);
			this.setY(Math.round(this.getY() * operator) / operator);
			return this;
		},


		getHypotenuse: function() {
			if (this.isZero()) {
				return 0;
			}
			return Math.sqrt(Math.pow(this.getX(), 2) + Math.pow(this.getY(), 2), 2);
		},

		getAngleRadians: function() {
			if (this.isZero()) {
				return 0;
			}

			var arctan = Math.atan(this.getY() / this.getX());
			if (arctan < 0) {
				arctan += Math.PI;
			}

			if (this.getY() < 0 || (this.getY() === 0 && this.getX < 0)) {
				arctan += Math.PI;
			}

			return arctan;
		},

		getAngle: function() {
			var angle = this.getAngleRadians() / Math.PI * 180;
			while (angle < 0) {
				angle += 360
			}
			return angle % 360;
		},


		toString: function() {
			return this.base(arguments) + ' { x: ' + this.getX() + ', y: ' + this.getY() + ', }';
		}

	}

});
