qx.Interface.define('bio.phisics.IForce', {
	
	properties: { direction: {}, strength: {} },


	members: {
		
		copy: function() { },
		equals: function(force) {
			this.assertInterface(force, bio.phisics.IForce);
		},

		modifyDirection: function(value) {
			this.assertNumber(value);
			if (isNaN(value)) {
				throw new Error('value is NaN');
			}
		},
		modifyStrength: function(value) {
			this.assertNumber(value);
			if (isNaN(value)) {
				throw new Error('value is NaN');
			}
		},

		getVector: function() { },
		merge: function(force) {
			this.assertInterface(force, bio.phisics.IForce);
		}

	}

});
