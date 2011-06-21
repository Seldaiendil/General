var roman = (function() {
	var mapping = [
		{ num: 1, roman: "I" },
		{ num: 4, roman: "IV" },
		{ num: 5, roman: "V" },
		{ num: 9, roman: "IX" },
		{ num: 10, roman: "X" },
		{ num: 40, roman: "XL" },
		{ num: 50, roman: "L" },
		{ num: 90, roman: "XC" },
		{ num: 100, roman: "C" },
		{ num: 400, roman: "CD" },
		{ num: 500, roman: "D" },
		{ num: 900, roman: "CM" },
		{ num: 1000, roman: "M" }
	];
	
	function startsWith(text, start) {
		for (var i=start.length; i--; )
			if (text[i] != start[i])
				return false;
		return true;
	}

	var parse = {
		'number':	function(value) {
			var num,
				result = [];
			
			for (var i=mapping.length; i--; ) {
				num = mapping[i].num;
				while (value >= num) {
					result.push(mapping[i].roman);
					value -= num;
				}
			}
			return result.join("")
		},
		'string': function(value) {
			var roman,
				result = 0;
			for (var i=mapping.length; i--; ) {
				roman = mapping[i].roman;
				while (startsWith(value, roman)) {
					result += mapping[i].num;
					value = value.substr(roman.length);
				}
			}
			return result;
		}
	};
	
	return function(value) {
		return parse[typeof value](value);
	}
})();

