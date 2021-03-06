/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Alexander Steitz (aback)

************************************************************************ */

qx.Class.define("qx.test.bom.Attribute",
{
  extend : qx.dev.unit.TestCase,

  members :
  {
    setUp : function()
    {
      var div = document.createElement("div");
      div.id = "el";

      this._el = div;
      document.body.appendChild(div);

      var input = document.createElement("input");
      this._input = input;
      document.body.appendChild(input);

      var checkBox = document.createElement("input");
      checkBox.type = "checkbox";

      this._checkBox = checkBox;
      document.body.appendChild(checkBox);
    },


    tearDown : function() {
      document.body.removeChild(this._el);
      document.body.removeChild(this._checkBox);
    },


    testSetAttribute : function()
    {
      var Attribute = qx.bom.element.Attribute;

      Attribute.set(this._el, "maxLength", 10);
      this.assertEquals(10, this._el.getAttribute("maxLength"));

      Attribute.set(this._checkBox, "checked", true);
      this.assertTrue(this._checkBox["checked"]);

      Attribute.set(this._el, "className", "vanillebaer");
      this.assertEquals("vanillebaer", this._el["className"]);

      Attribute.set(this._el, "selected", true);
      this.assertEquals("selected", this._el.getAttribute("selected"));

    },

    testSetAttributeWithUndefinedValue : function()
    {
      var Attribute = qx.bom.element.Attribute;

      Attribute.set(this._el, "src", undefined);
      this.assertNotEquals("undefined", this._el.getAttribute("src"));
    },

    testGetAttribute : function()
    {
      var Attribute = qx.bom.element.Attribute;

      this.assertNull(Attribute.get(this._input, "maxLength"));
      this.assertFalse(Attribute.get(this._checkBox, "checked"));
      this.assertNull(Attribute.get(this._el, "className"));
      this.assertNull(Attribute.get(this._el, "innerHTML"));
      this.assertNull(Attribute.get(this._checkBox, "tabIndex"));
      this.assertFalse(Attribute.get(this._checkBox, "readOnly"));
      this.assertNull(Attribute.get(this._input, "value"));

      this._checkBox.setAttribute("checked", true);
      this.assertEquals(true, Attribute.get(this._checkBox, "checked"));

      if ((qx.core.Environment.get("engine.name") == "mshtml") &&
          (parseFloat(qx.core.Environment.get("engine.version")) <= 7 ||
           (parseFloat(qx.core.Environment.get("engine.version")) == 8 &&
           qx.core.Environment.get("browser.documentmode") == 7))) {
        this._checkBox.setAttribute("checked", false);
      } else {
        this._checkBox.removeAttribute("checked");
      }
      this.assertFalse(Attribute.get(this._checkBox, "checked"));

      this._el["className"] = "vanillebaer";
      this.assertEquals("vanillebaer", Attribute.get(this._el, "className"));

      this._el.innerHTML = "vanillebaer";
      this.assertEquals("vanillebaer", Attribute.get(this._el, "innerHTML"));

      this._checkBox["tabIndex"] = 1000;
      this.assertEquals(1000, Attribute.get(this._checkBox, "tabIndex"));

      this._checkBox["tabIndex"] = 0;
      this.assertNull(Attribute.get(this._checkBox, "tabIndex"));

      this._checkBox["tabIndex"] = -1;
      this.assertEquals(-1, Attribute.get(this._checkBox, "tabIndex"));

      this._checkBox["readOnly"] = true;
      this.assertTrue(Attribute.get(this._checkBox, "readonly"));

      this._checkBox["value"] = "vanillebaer";
      this.assertEquals("vanillebaer", Attribute.get(this._checkBox, "value"));
    },

    testRemoveAttribute : function()
    {
      var Attribute = qx.bom.element.Attribute;

      Attribute.set(this._input, "maxLength", 10);
      Attribute.set(this._input, "maxLength", null);

      var maxLengthValue = qx.core.Environment.select("engine.name", {
                            "mshtml": 2147483647,
                            "webkit": 524288,
                            "default": -1
                           });

      this.assertEquals(maxLengthValue, this._input["maxLength"]);
      this.assertNull(Attribute.get(this._input, "maxLength"));

      Attribute.set(this._checkBox, "checked", true);
      Attribute.set(this._checkBox, "checked", null);
      this.assertFalse(this._checkBox["checked"]);

      Attribute.set(this._el, "html", "vanillebaer");
      Attribute.set(this._el, "html", null);
      this.assertNull(this._el.getAttribute("html"));
    },

    testResetAttribute : function()
    {
      var Attribute = qx.bom.element.Attribute;

      Attribute.set(this._input, "maxLength", 10);
      Attribute.reset(this._input, "maxLength");
      this.assertNull(Attribute.get(this._input, "maxLength"));

      Attribute.set(this._checkBox, "disabled", true);
      Attribute.reset(this._checkBox, "disabled");
      this.assertFalse(Attribute.get(this._checkBox, "disabled"));

      Attribute.set(this._checkBox, "multiple", true);
      Attribute.reset(this._checkBox, "multiple");
      this.assertFalse(Attribute.get(this._checkBox, "multiple"));

      Attribute.set(this._el, "innerHTML", "<b>foo</b>");
      Attribute.reset(this._el, "innerHTML");
      this.assertNull(Attribute.get(this._el, "innerHTML"));

      // Skip this for Safari 2
      if (qx.core.Environment.get("engine.name") == "webkit" &&
        parseFloat(qx.core.Environment.get("engine.version")) < 530)
      {
        this.warn("Test skipped in Safari 2.");
      } else {
        Attribute.set(this._el, "tabIndex", 10);
        Attribute.reset(this._el, "tabIndex");
        this.assertNull(Attribute.get(this._el, "tabIndex"));

        Attribute.set(this._input, "tabIndex", 20);
        Attribute.reset(this._input, "tabIndex");
        this.assertNull(Attribute.get(this._input, "tabIndex"));
      }

      Attribute.set(this._checkBox, "checked", true);
      Attribute.reset(this._checkBox, "checked");
      this.assertFalse(Attribute.get(this._checkBox, "checked"));

      Attribute.set(this._checkBox, "readOnly", true);
      Attribute.reset(this._checkBox, "readonly");
      this.assertFalse(Attribute.get(this._checkBox, "readonly"));

      Attribute.set(this._input, "value", "foo");
      Attribute.reset(this._input, "value");
      this.assertNull(Attribute.get(this._input, "value"));

    }
  }
});