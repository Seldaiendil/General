/**
 * This class manages coordinates X and Y.
 */
qx.Interface.define('bio.phisics.IVector', {
	
	properties: { x: {}, y: {} },

	events: {
		'changeX': "qx.event.type.DataEvent",
		'changeY': "qx.event.type.DataEvent"
	},

	members: {
		
		/**
		 * Checks if both values are 0
		 */
		isZero: function() { },

		/**
		 * Creates a new instance with same values
		 */
		copy: function() { },

		/**
		 * Checks if differents instances have the same values
		 * @param vector {bio.phisics.IVector} Vector to compare with
		 */
		equals: function(vector) {
			this.assertInterface(vector, bio.phisics.IVector);
		},

		/**
		 * Joins the given vector with this.
		 * @param vector {bio.phisics.IVector} Vector to compare with
		 */
		merge: function(vector) {
			this.assertInterface(vector, bio.phisics.IVector);
		},
		/**
		 * Substracts the given vector coordinates to this
		 * @param vector {bio.phisics.IVector} Vector to substract
		 */
		diff: function(vector) {
			this.assertInterface(vector, bio.phisics.IVector);
		},

		/**
		 * Adds value to both properties of this vector
		 * @param value {Number} The value will be added to both properties of the vector.
		 *		Can be negative to substract
		 */
		add: function(value) {
			this.assertNumber(value);
			if (isNaN(value)) {
				throw new Error('value is NaN');
			}
		},
		/**
		 * Adds value to both properties of this vector
		 * @param value {Number} The value will be multiplied to both properties of the vector.
		 *		Can be between 0 and 1 to divide
		 */
		multiply: function(value) {
			this.assertNumber(value);
			if (isNaN(value)) {
				throw new Error('value is NaN');
			}
		},

		/**
		 * Turns both properties of the vector to its absolute value.
		 */
		abs: function() { },

		/**
		 * Rounds both properties of the vector with so many decimals as given argument
		 * @param decimals {PositiveInteger?} Number of decimals. 2 by default
		 */
		round: function(decimals) {
			this.assertArgumentsCount(arguments, 0, 1);
			if (arguments.length === 1) {
				this.assertPositiveInteger(decimals);
			}
		},

		/**
		 * Returns the hypotenuse of the vector, aka strength.
		 */
		getHypotenuse: function() { },

		/**
		 * Returns the angle of the vector in radians.
		 */
		getAngleRadians: function() { },

		/**
		 * Returns the angle of the vector in degrees
		 */
		getAngle: function() { }

	}

});
