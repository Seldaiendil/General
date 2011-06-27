sel.base.Function = new (function() {
	
	function getName_standard(funct) {
		return funct.name;
	}
	function getName_fromToString(funct) {
		var fName = func.toString().match(/function\s*([\w\$]*)\s*\(/)
		if (fName !== null)
			return fName[1];
	}

	if (function named() { }.name === 'named')
		this.getName = getName_standard;
	else
		this.getName = getName_fromToString;
})();
