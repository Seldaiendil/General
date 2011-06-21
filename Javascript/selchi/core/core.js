var Selchi = (function() {
	function Selchi() { }
	var isIE = navigator.userAgent.indexOf("MSIE") !== -1;
	Selchi.isIE = function() {  return isIE; };
	return Selchi;
})();

var Dom = {
	get: function(id) {
		return document.getElementById(id);
	},
	create: function(tag) {
		return document.createElement(tag);
	}
};

function Enum() {
	var i=arguments.length;
	while (i--)
		this[arguments[i]] = i;
}
