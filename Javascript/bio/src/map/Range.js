bio.core.ItemHandler.extend('bio.map.Range', {
	merge: function(array) {
		for (var i = array.length; i--; )
			this.add(array[i]);
	}
});
