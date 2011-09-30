bio.core.ItemHandler.extend('bio.map.Range', {
	merge: function(array) {
		for (var i = array.length; i--; )
			if (!array[i].destroyed())
				this.add(array[i]);
	}
});
