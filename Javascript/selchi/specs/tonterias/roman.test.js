describe("Roman Numbers", function() {
	var mapping = {
		'': 0, 'I': 1, 'II': 2, 'III': 3, 'IV': 4,
		'V': 5, 'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9,
		'X': 10, 'XI': 11, 'XII': 12, 'XIII': 13, 'XIV': 14,
		'XV': 15, 'XVI': 16, 'XVII': 17, 'XVIII': 18, 'XIX': 19,
		'XX': 20, 'XXI': 21, 'XXII': 22, 'XXIII': 23, 'XXIV': 24,
		'XXV': 25, 'XXVI': 26, 'XXVII': 27, 'XXVIII': 28, 'XXIX': 29,
		
		'XXX': 30, 'XXXIV': 34, 'XXXV': 35, 'XXXIX': 39,
		'XL': 40, 'XLIV': 44, 'XLV': 45, 'XLIX': 49,
		'L': 50, 'LIV': 54, 'LV': 55, 'LIX': 59,
		'LX': 60, 'LXIV': 64, 'LXV': 65, 'LXIX': 69,
		'LXX': 70, 'LXXIV': 74, 'LXXV': 75, 'LXXIX': 79,
		'LXXX': 80, 'LXXXIV': 84, 'LXXXV': 85, 'LXXXIX': 89,
		'XC': 90, 'XCIV': 94, 'XCV': 95, 'XCIX': 99,
		'C': 100, 'CIV': 104, 'CV': 105, 'CIX': 109,
		'CX': 110, 'CXIV': 114, 'CXV': 115, 'CXIX': 119,
		'CXX': 120, 'CXXIV': 124, 'CXXV': 125, 'CXXIX': 129,
		
		'CXXX': 130, 'CXL': 140, 'CL': 150, 'CXC': 190,
		'CC': 200, 'CCXL': 240, 'CCL': 250, 'CCXC': 290,
		'CCC': 300, 'CCCXL': 340, 'CCCL': 350, 'CCCXC': 390,
		'CD': 400, 'CDXL': 440, 'CDL': 450, 'CDXC': 490,
		'D': 500, 'DXL': 540, 'DL': 550, 'DXC': 590,
		'DC': 600, 'DCXL': 640, 'DCL': 650, 'DCXC': 690,
		'DCC': 700, 'DCCXL': 740, 'DCCL': 750, 'DCCXC': 790,
		'DCCC': 800, 'DCCCXL': 840, 'DCCCL': 850, 'DCCCXC': 890,
		'CM': 900, 'CMXL': 940, 'CML': 950, 'CMXC': 990,
		'M': 1000, 'MXL': 1040, 'ML': 1050, 'MXC': 1090,
		'MC': 1100, 'MCXL': 1140, 'MCL': 1150, 'MCXC': 1190,
		'MCC': 1200, 'MCCXL': 1240, 'MCCL': 1250, 'MCCXC': 1290,
		
		'M': 1000, 'MCD': 1400, 'MD': 1500, 'MCM': 1900,
		'MM': 2000, 'MMCD': 2400, 'MMD': 2500, 'MMCM': 2900,
		'MMM': 3000, 'MMMCD': 3400, 'MMMD': 3500, 'MMMCM': 3900,
		
		'MMMCMXCIX': 3999
	}
	
	describe("When parse units", function() {
		for (var i in mapping) {
			it("should return '" + i + "' if the number is " + mapping[i], function() {
				expect(roman(mapping[i])).toBe(i);
			});
		}
	});
	
	describe("When parse romans", function() {
		for (var i in mapping) {
			it("should return '" + mapping[i] + "' if the string is " + i, function() {
				expect(roman(i)).toBe(mapping[i]);
			});
		}
	});
}, true);
