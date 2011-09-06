qx.Class.define('bio.phisics.Force', {

	extend: qx.core.Object,

	implement: bio.phisics.IForce,

	construct: function(degrees, strength) {
		this.__degrees = new bio.phisics.Degree;

		var len = arguments.length;
		if (len > 0) {
			if (len > 1) {
				this.setStrength(strength);
			}
			this.setDirection(degrees);
		}
	},
	
	properties: {

		direction: {
			apply: '_applyDirection',
			nullable: false,
			check: 'Number',
			init: 0
		},

		strength: {
			transform: '_transformStrength',
			nullable: false,
			check: 'Number',
			init: 0
		}

	},


	members: {

		__degrees: null,
		
		copy: function() {
			return new bio.phisics.Force(this.getDirection(), this.getStrength());
		},
		equals: function(force) {
			return (
				this.getDirection() === force.getDirection() &&
				this.getStrength() === force.getStrength()
			);
		},

		getDirection: function() {
			return this.__degrees.getValue();
		},
		modifyDirection: function(value) {
			this.__degrees.add(value);
			return this;
		},
		modifyStrength: function(value) {
			this.setStrength(this.getStrength() + value);
			return this;
		},

		getVector: function() {
			return this.__degrees.toVector().multiply(this.getStrength());
		},
		merge: function(force) {
			var flow = this.getVector();
			var shove = force.getVector();

			flow.merge(shove);
			this.setStrength(flow.getHypotenuse());
			this.setDirection(flow.getAngle());
			return this;
		},


		toString: function() {
			return this.base(arguments) + ' { direction: ' + this.getDirection() + ', strength: ' + this.getStrength() + ' }';
		},


		_applyDirection: function(value) {
			this.__degrees.setValue(value);
		},

		_transformStrength: function(value) {
			if (value < 0) {
				this.__degrees.setValue(this.__degrees.getValue() - 180);
				value *= -1;
			}
			return value;
		}

	}

});
