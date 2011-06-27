var Field = GUI.extend(function Field() {
	this.texts_ = {};
	this.name_ = "";
	this.value_ = null;
});
Field.property('texts_');
Field.property('name_');
Field.property('value_');

//var TextFieldType = new Enum('NORMAL', 'PASSWORD', 'HIDDEN');
var TextField = Field.extend(function TextField() {
	this.maxLength_ = -1;
	this.isPassword_ = false;
});
TextField.property('maxLength_');
TextField.property('isPassword_');
TextField.Css = function() {
	this.body = 'TextField-body';
};
TextField.prototype.render_ = function() {
	var input = Dom.create('input');
	if (this.maxLength_ > 0)
		input.maxlength = this.maxLength_;
	input.className = this.css_.body;
	input.type = this.isPassword_ ? 'password' : 'text';
	input.name = this.name_;
	input.value = this.value_;
	this.body_ = input;
	this.container_.appendChild(input);
};

var CheckBox = (function() {
	var CheckBox = Field.extend(function CheckBox() {
		this.value_ = false;

		this.onChange = new Event();
	});
	CheckBox.Texts = function() {
		this.checked = '';
		this.unchecked = '';
	};
	CheckBox.Css = function() {
		this.checked = 'CheckBox CheckBox-checked';
		this.unchecked = 'CheckBox CheckBox-unchecked';
	};

	CheckBox.prototype.check = function() {
		set.call(this, true);
	};
	CheckBox.prototype.uncheck = function() {
		set.call(this, false);
	};
	CheckBox.prototype.isChecked = function() {
		return this.value_;
	};
	CheckBox.prototype.change = function() {
		set.call(this, !this.value_);
	};
	CheckBox.prototype.render_ = function() {
		this.body_ = Dom.create('div');
		this.events_.push(Event.add(this.body_, 'click', this.change.bind(this)));
		this.isRendered_ = true;
		set.call(this, this.value_);
		var self = this;
		this.container_.appendChild(this.body_);
	};

	function set(state) {
		/*if (state == this.value_)
			return;*/
		this.value_ = state;
		if (!this.isRendered_)
			return;
		this.body_.innerHTML = (state ? this.texts_.checked : this.texts_.unchecked) || "";
		this.body_.className = (state ? this.css_.checked : this.css_.unchecked) || "";
		//this.onChange.fire(state);
	};
	return CheckBox;
})();

var SelectionField = (function() {
	var SelectionField = Field.extend(function SelectionField() {
		this.options_= [];
	});
	SelectionField.property('options_');
	SelectionField.prototype.addOption = function(option, insertBefore) {
		if (!insertBefore)
			this.options_.push(option);
		else
			this.options_.splice(insertBefore, 0, option);
	};
	SelectionField.prototype.removeOption = function(position) {
		this.options_.splice(position, 1);
	};
	return SelectionField;
})();

var RadioButtonGroup = (function() {
	var RadioButtonGroup = SelectionField.extend(function RadioButtonGroup() {
		this.rows_ = [];
		this.checkboxes_ =  [];
		this.checked_ = null;
	});
	RadioButtonGroup.Css = function() {
		this.body = 'RadioButtonGroup';
		this.row = 'RadioButtonGroup-row';
		this.label = 'RadioButtonGroup-label';
		this.checked = 'RadioButton-22 RadioButton-checked-22';
		this.unchecked = 'RadioButton-22 RadioButton-unchecked-22';
	};
	RadioButtonGroup.prototype.render_ = function() {
		var i, row, check, label,
			checkCss = {
				checked: this.css_.checked,
				unchecked: this.css_.unchecked
			};
		this.body_ = Dom.create('div');
		this.body_.className = this.css_.body || "";
		for (i=0; i<this.options_.length; i++) {
			row = Dom.create('div');
			row.className = this.css_.row;
			check = new CheckBox();
			check.setName(this.options_[i].value);
			check.setCss(checkCss);
			check.setContainer(row);
			check.render();
			label = Dom.create('span');
			label.className = this.css_.label || "";
			label.innerHTML = this.options_[i].text;
			row.appendChild(label);
			this.body_.appendChild(row);
			this.rows_.push(row);
			this.checkboxes_.push(check);
		}
		this.container_.appendChild(this.body_);
	};

	return RadioButtonGroup;
})();
