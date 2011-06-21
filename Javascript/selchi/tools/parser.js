var Parser = (function() {
	function Tag(tag, css) {
		var tag = document.createElement(tag);
		tag.className = css || "";
		for (var i=2; i<arguments.length; i++) {
			if (typeof arguments[i] === 'string')
				tag.innerHTML = arguments[i];
			else {
				if (arguments[i] === null)
					alert(arguments.callee.caller);
				tag.appendChild(arguments[i]);
			}
		}
		return tag;
	};

	function Parser(element, name) {
		this.container = document.body;
		this.body = {};
		this.element = element;
		this.name = name || 'ROOT';
		this.path = [ ];
	}
	Parser.prototype.setContainer = function(container) {
		this.container = container;
	};
	
	function scan(element) {
		var map,
			el = this.getCurrentElement(),
			result = {
				fields: [],
				events: [],
				methods: []
			};
		for (var i in el) {
			map = { name: i, ref: el[i] };
			if (el[i] instanceof Event)
				result.events.push(map);
			else if (typeof el[i] == 'function')
				result.methods.push(map);
			else
				result.fields.push(map);
		}
		return result;
	}
	function getType(value) {
		if (value instanceof Event)
			return 'event';
		if (value === null)
			return 'null';
		return typeof value;
	}
	function getValue(obj) {
		if (typeof obj === 'function') {
			obj = obj.toString();
			var openKey = obj.indexOf('{') + 1,
				closeKey = obj.lastIndexOf('}');
			return obj.substr(0, openKey) + " ... " + obj.substr(closeKey);
		}
		var result = "" + obj;
		if (typeof obj === 'string')
			result = '"' + obj + '"';
		return result.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}
	function addRow(field) {
		var self = this;
		var target;
		this.body.appendChild(
			new Tag('DIV', 'Parser-field',
				new Tag('SPAN', 'Parser-this', "this."),
				target = new Tag('SPAN', 'Parser-member-name', field.name),
				new Tag('SPAN', 'Parser-equals', " = "),
				new Tag(
					'SPAN',
					'Parser-field-value Parser-field-type-' + getType.call(this, field.ref),
					getValue.call(this, field.ref)
				),
				new Tag('SPAN', 'Parser-dotcomma', ";")
			)
		);
		target.addEventListener('click', function() {
			self.walk(field.name);
		}, true);
	};

	Parser.prototype.getCurrentElement = function() {
		var el = this.element;
		for (var i=0; i<this.path.length; i++)
			el = el[this.path[i]];
		return el;
	};
	Parser.prototype.walk = function(property) {
		this.path.push(property);
		this.print();
	};
	Parser.prototype.print = function() {
		var self = this,
			props = scan.call(this);
		if (this.body.parentNode)
			this.container.removeChild(this.body);
		this.body = new Tag('DIV', 'Parser-container');
		
		for (var i=0; i<props.fields.length; i++)
			addRow.call(this, props.fields[i]);
		for (var i=0; i<props.events.length; i++)
			addRow.call(this, props.events[i]);
		for (var i=0; i<props.methods.length; i++)
			addRow.call(this, props.methods[i]);
		
		this.container.appendChild(this.body);
	};
	return Parser;
})();