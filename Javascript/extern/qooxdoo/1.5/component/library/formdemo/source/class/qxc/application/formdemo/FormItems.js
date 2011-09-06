/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

qx.Class.define("qxc.application.formdemo.FormItems", {
  extend : qx.ui.container.Composite,

  construct : function() {
    this.base(arguments);

    this.__widgets = [];
    this._createView();
  },

  members : {
    __widgets : null,

    _createView : function()
    {
      var grid = new qx.ui.layout.Grid(20, 5);
      grid.setColumnFlex(0, 1);
      grid.setColumnFlex(1, 1);
      this.setLayout(grid);
      this.setPadding(10);
      var tabIndex = 1;

      /*****************************************
       * TEXT INPUT
       ****************************************/

      var textGroupBox = new qx.ui.groupbox.GroupBox("Text");
      textGroupBox.setLayout(new qx.ui.layout.Grid(8, 8));
      textGroupBox.setWidth(290);
      this.add(textGroupBox, {row: 0, column: 0});

      // text field
      var textField = new qx.ui.form.TextField();
      textField.setPlaceholder("placeholder");
      textField.setTabIndex(tabIndex++);
      var label = new qx.ui.basic.Label("TextField:");
      label.setBuddy(textField);
      textGroupBox.add(label, {row: 0, column: 0});
      textGroupBox.add(textField, {row: 0, column: 1});
      this.__widgets.push(textField);

      // password field
      var passwordField = new qx.ui.form.PasswordField();
      passwordField.setTabIndex(tabIndex++);
      passwordField.setPlaceholder("password");
      label = new qx.ui.basic.Label("PasswordField:");
      label.setBuddy(passwordField);
      textGroupBox.add(label, {row: 1, column: 0});
      textGroupBox.add(passwordField, {row: 1, column: 1});
      this.__widgets.push(passwordField);

      // text area
      var textArea = new qx.ui.form.TextArea();
      textArea.setTabIndex(tabIndex++);
      textArea.setPlaceholder("placeholder");
      label = new qx.ui.basic.Label("TextArea:");
      label.setBuddy(textArea);
      textGroupBox.add(label, {row: 2, column: 0});
      textGroupBox.add(textArea, {row: 2, column: 1});
      this.__widgets.push(textArea);

      // combo box
      var comboBox = new qx.ui.form.ComboBox();
      comboBox.setTabIndex(tabIndex++);
      comboBox.setPlaceholder("placeholder");
      label = new qx.ui.basic.Label("ComboBox:");
      label.setBuddy(comboBox);
      textGroupBox.add(label, {row: 3, column: 0});
      textGroupBox.add(comboBox, {row: 3, column: 1});
      this.__createItems(comboBox);
      this.__widgets.push(comboBox);

      // virtual combo box
      var virtualComboBox = new qx.ui.form.VirtualComboBox();
      virtualComboBox.setTabIndex(tabIndex++);
      virtualComboBox.setPlaceholder("placeholder");
      label = new qx.ui.basic.Label("VirtualComboBox:");
      label.setBuddy(virtualComboBox);
      textGroupBox.add(label, {row: 4, column: 0});
      textGroupBox.add(virtualComboBox, {row: 4, column: 1});
      this.__createItemsVirtual(virtualComboBox);
      this.__widgets.push(virtualComboBox);

      // date field
      var dateField = new qx.ui.form.DateField();
      dateField.setTabIndex(tabIndex++);
      dateField.setPlaceholder("dd.mm.YYYY");
      label = new qx.ui.basic.Label("DateField:");
      label.setBuddy(dateField);
      textGroupBox.add(label, {row: 5, column: 0});
      textGroupBox.add(dateField, {row: 5, column: 1});
      this.__widgets.push(dateField);

      /*****************************************
       * SELECTION
       ****************************************/

      var selectionGroupBox = new qx.ui.groupbox.GroupBox("Selection");
      selectionGroupBox.setLayout(new qx.ui.layout.Grid(8, 8));
      selectionGroupBox.setWidth(290);
      this.add(selectionGroupBox, {row:1, column: 0, rowSpan: 2});

      // select box
      var selectBox = new qx.ui.form.SelectBox();
      selectBox.setTabIndex(tabIndex++);
      label = new qx.ui.basic.Label("SelectBox:");
      label.setBuddy(selectBox);
      selectionGroupBox.add(label, {row: 0, column: 0});
      selectionGroupBox.add(selectBox, {row: 0, column: 1});
      this.__createItems(selectBox);
      this.__widgets.push(selectBox);

      // virtual select box
      var virtualSelectBox = new qx.ui.form.VirtualSelectBox();
      label = new qx.ui.basic.Label("VirtualSelectBox:");
      label.setBuddy(virtualSelectBox);
      selectionGroupBox.add(label, {row: 1, column: 0});
      selectionGroupBox.add(virtualSelectBox, {row: 1, column: 1});
      this.__createItemsVirtual(virtualSelectBox);
      this.__widgets.push(virtualSelectBox);

      // list
      var list = new qx.ui.form.List();
      list.setTabIndex(tabIndex++);
      list.setHeight(60);
      list.setWidth(155);
      label = new qx.ui.basic.Label("List:");
      label.setBuddy(list);
      selectionGroupBox.add(label, {row: 2, column: 0});
      selectionGroupBox.add(list, {row: 2, column: 1});
      this.__createItems(list);
      this.__widgets.push(list);

      // radio button group
      var radioButtonGroup = new qx.ui.form.RadioButtonGroup();
      radioButtonGroup.add(new qx.ui.form.RadioButton("RadioButton 1").set({tabIndex: tabIndex++}));
      radioButtonGroup.add(new qx.ui.form.RadioButton("RadioButton 2").set({tabIndex: tabIndex++}));
      radioButtonGroup.add(new qx.ui.form.RadioButton("RadioButton 3").set({tabIndex: tabIndex++}));
      label = new qx.ui.basic.Label("RadioButtonGroup:");
      label.setBuddy(radioButtonGroup);
      selectionGroupBox.add(label, {row: 4, column: 0});
      selectionGroupBox.add(radioButtonGroup, {row: 4, column: 1});
      this.__widgets.push(radioButtonGroup);

      /*****************************************
       * BUTTONS
       ****************************************/

      var buttonGroupBox = new qx.ui.groupbox.GroupBox("Buttons");
      buttonGroupBox.setLayout(new qx.ui.layout.Grid(8, 8));
      buttonGroupBox.setWidth(250);
      this.add(buttonGroupBox, {row: 0, column: 1});

      // button
      var button = new qx.ui.form.Button("Button").set({tabIndex: tabIndex++});
      label = new qx.ui.basic.Label("Button:");
      label.setBuddy(button);
      buttonGroupBox.add(label, {row: 0, column: 0});
      buttonGroupBox.add(button, {row: 0, column: 1});
      this.__widgets.push(button);

      // toggle button
      var toggleButton = new qx.ui.form.ToggleButton("ToggleButton").set({tabIndex: tabIndex++});
      label = new qx.ui.basic.Label("ToggleButton:");
      label.setBuddy(toggleButton);
      buttonGroupBox.add(label, {row: 1, column: 0});
      buttonGroupBox.add(toggleButton, {row: 1, column: 1});
      this.__widgets.push(toggleButton);

      // toggle button
      var repeatButton = new qx.ui.form.RepeatButton("0").set({tabIndex: tabIndex++});
      label = new qx.ui.basic.Label("RepeatButton:");
      label.setBuddy(repeatButton);
      buttonGroupBox.add(label, {row: 2, column: 0});
      buttonGroupBox.add(repeatButton, {row: 2, column: 1});
      this.__widgets.push(repeatButton);

      // menu button
      var menueButton = new qx.ui.form.MenuButton("MenuButton", null, this.__createMenuForMenuButton()).set({tabIndex: tabIndex++});
      label = new qx.ui.basic.Label("MenuButton:");
      label.setBuddy(menueButton);
      buttonGroupBox.add(label, {row: 3, column: 0});
      buttonGroupBox.add(menueButton, {row: 3, column: 1});
      this.__widgets.push(menueButton);

      // split button
      var splitButton = new qx.ui.form.SplitButton("SplitButton", null, this.__createMenuForSplitButton()).set({tabIndex: tabIndex++});
      label = new qx.ui.basic.Label("SplitButton:");
      label.setBuddy(splitButton);
      buttonGroupBox.add(label, {row: 4, column: 0});
      buttonGroupBox.add(splitButton, {row: 4, column: 1});
      this.__widgets.push(splitButton);

      // Listener
      repeatButton.addListener("execute", function()
      {
        var tempValue = parseInt(repeatButton.getLabel(), 10) + 1;
        repeatButton.setLabel(tempValue.toString());
      });

      /*****************************************
       * BOOLEAN INPUT
       ****************************************/

      var booleanGroupBox = new qx.ui.groupbox.GroupBox("Boolean");
      booleanGroupBox.setLayout(new qx.ui.layout.Grid(8, 8));
      booleanGroupBox.setWidth(250);
      this.add(booleanGroupBox, {row:1, column: 1});

      // check box
      var checkBox = new qx.ui.form.CheckBox("CheckBox").set({tabIndex: tabIndex++});
      label = new qx.ui.basic.Label("CheckBox:");
      label.setBuddy(checkBox);
      booleanGroupBox.add(label, {row: 0, column: 0});
      booleanGroupBox.add(checkBox, {row: 0, column: 1});
      this.__widgets.push(checkBox);

      // Tri-State check box
      var triCheckBox = new qx.ui.form.CheckBox("Tri-State CheckBox").set({
        triState: true,
        value: null
      });
      label = new qx.ui.basic.Label("Tri-State CheckBox:");
      label.setBuddy(triCheckBox);
      booleanGroupBox.add(label, {row: 1, column: 0});
      booleanGroupBox.add(triCheckBox, {row: 1, column: 1});
      this.__widgets.push(triCheckBox);

      // radio button
      var radioButton = new qx.ui.form.RadioButton("RadioButton").set({tabIndex: tabIndex++});
      label = new qx.ui.basic.Label("RadioButtons:");
      label.setBuddy(radioButton);
      booleanGroupBox.add(label, {row: 2, column: 0});
      booleanGroupBox.add(radioButton, {row: 2, column: 1});
      this.__widgets.push(radioButton);

      /*****************************************
       * NUMBER INPUT
       ****************************************/

      var numberGroupBox = new qx.ui.groupbox.GroupBox("Number");
      numberGroupBox.setLayout(new qx.ui.layout.Grid(8, 8));
      numberGroupBox.setWidth(250);
      this.add(numberGroupBox, {row: 2, column: 1});

      // spinner
      var spinner = new qx.ui.form.Spinner(0, 50, 100).set({tabIndex: tabIndex++});
      label = new qx.ui.basic.Label("Spinner:");
      label.setBuddy(spinner);
      numberGroupBox.add(label, {row: 0, column: 0});
      numberGroupBox.add(spinner, {row: 0, column: 1});
      this.__widgets.push(spinner);

      // slider
      var slider = new qx.ui.form.Slider().set({tabIndex: tabIndex++});
      slider.setWidth(130);
      label = new qx.ui.basic.Label("Slider:");
      label.setBuddy(slider);
      numberGroupBox.add(label, {row: 1, column: 0});
      numberGroupBox.add(slider, {row: 1, column: 1});
      this.__widgets.push(slider);

      slider.bind("value", spinner, "value");
      spinner.bind("value", slider, "value");
    },


    __createItems: function(widget)
    {
      for (var i = 0; i < 10; i++) {
        var tempItem = new qx.ui.form.ListItem("Item " + i);
        widget.add(tempItem);
      }
    },


    __createItemsVirtual: function(widget)
    {
      // Creates the model data
      var model = new qx.data.Array();
      for (var i = 0; i < 300; i++) {
        model.push("Item " + (i));
      }
      widget.setModel(model);
    },


    __createMenuForMenuButton : function()
    {
      // Creates the option menu
      var optionMenu = new qx.ui.menu.Menu;

      for (var i = 0; i < 3; i++) {
        optionMenu.add(new qx.ui.menu.RadioButton("Option" + i));
      }

      var groupOptions = new qx.ui.form.RadioGroup;
      groupOptions.add.apply(groupOptions, optionMenu.getChildren());

      // create main menu and buttons
      var menu = new qx.ui.menu.Menu();

      for (i = 0; i < 3; i++) {
        var tempButton = new qx.ui.menu.Button("Button" + i);
        menu.add(tempButton);
      }

      var optionButton = new qx.ui.menu.Button("Options", "", null, optionMenu);
      menu.addSeparator();
      menu.add(optionButton);

      return menu;
    },


    __createMenuForSplitButton : function()
    {
      var menu = new qx.ui.menu.Menu;

      var site1 = new qx.ui.menu.Button("Website 1");
      var site2 = new qx.ui.menu.Button("Website 2");
      var site3 = new qx.ui.menu.Button("Website 3");

      menu.add(site1);
      menu.add(site2);
      menu.add(site3);

      return menu;
    },


    getWidgets : function() {
      return this.__widgets;
    }
  }
});