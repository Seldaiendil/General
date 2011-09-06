/**
 * Class used to handle Force degrees. It fixes the value when degrees are
 * bigger than 360 or negative.
 * It also calculates radian and vector of a degree
 */
qx.Class.define('bio.phisics.Degree', {

	extend: qx.core.Object,

	/**
	 * @param Value {Number} Value to initialize the value property.
	 */
	construct: function(value) {
		if (arguments.length > 1) {
			this.setValue(value);
		}
	},
	
	properties: {
		/**
		 * The value of the degree. Will always be between 0 and 360
		 */
		value: {
			transform: '_transformValue',
			nullable: false,
			check: 'Number',
			init: 0
		}
	},


	members: {
		
		/**
		 * Creates a new instance with same values
		 */
		copy: function() {
			return new bio.phisics.Force.Degree(this.getValue());
		},

		/**
		 * Checks if differents instances have the same values
		 * @param degree {bio.phisics.Force.Degree} The degree instance to compare with
		 */
		equals: function(degree) {
			return this.getValue() === degree.getValue();
		},


		/**
		 * Adds given argument to the value
		 * @param value {Number} The value will be added to the angle, can be negative
		 */
		add: function(value) {
			this.setValue(this.getValue() + value);
		},


		/**
		 * Returns the angle value as radian
		 */
		toRadian: function() {
			return this.getValue() * Math.PI / 180;
		},

		/**
		 * Returns a vector with strength 1 and the angle direction.
		 */
		toVector: function() {
			var radian = this.toRadian();
			return new bio.phisics.Vector(Math.cos(radian), Math.sin(radian));
		},


		_transformValue: function(value) {
			value %= 360;
			if (value < 0) {
				value += 360;
			}
			return value;
		}

	}

});
