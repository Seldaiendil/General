function parse(element, name) {
	var div = document.createElement('DIV'),
		container = document.createElement('DIV');
	container.innerHTML = "";
	for (var i in element) {
		div = document.createElement('DIV');
		try {
			div.innerHTML = name + "." + i + " = '" + element[i].toString().substr(0, 30) + "';";
			(function(prop) {
				div.addEventListener('click', function() {
					document.title = name + "." + prop;
					parse(element[prop]);
				}, true);
			})(i);
		} catch (e) { }
		container.appendChild(div);
	}
	return container;
}