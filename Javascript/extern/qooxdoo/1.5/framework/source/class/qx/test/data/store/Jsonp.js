/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/* ************************************************************************

#asset(qx/test/*)

************************************************************************ */

qx.Class.define("qx.test.data.store.Jsonp",
{
  extend : qx.dev.unit.TestCase,

  include : [qx.dev.unit.MRequirements,
             qx.dev.unit.MMock],

  members :
  {
    __store : null,

    setUp : function()
    {
      this.__store = new qx.data.store.Jsonp();

      this.url = qx.util.ResourceManager.getInstance().
        toUri("qx/test/jsonp_primitive.php");
    },


    tearDown : function()
    {
      this.__store.dispose();

      // remove the former created classes
      qx.data.model = {};
      for (var name in qx.Class.$$registry) {
        if (name.search("qx.data.model") != -1) {
          delete qx.Class.$$registry[name];
        }
      }

      this.getSandbox().restore();
    },


    isLocal : function() {
      return window.location.protocol == "file:";
    },


    setUpFakeRequest : function()
    {
      var req = new qx.io.request.Jsonp();
      req.send = req.dispose = function() {};
      this.request = this.stub(req);
      this.stub(qx.io.request, "Jsonp").returns(this.request);
    },


    testSetCallbackParam: function() {
      this.setUpFakeRequest();
      this.stub(this.request, "setCallbackParam");

      this.__store = new qx.data.store.Jsonp();
      this.__store.setCallbackParam("myCallback");
      this.__store.setUrl("/url");

      this.assertCalledWith(this.request.setCallbackParam, "myCallback");
    },


    testSetCallbackName: function() {
      this.setUpFakeRequest();
      this.spy(this.request, "setCallbackName");

      this.__store = new qx.data.store.Jsonp();
      this.__store.setCallbackName("myCallback");
      this.__store.setUrl("/url");

      this.assertCalledWith(this.request.setCallbackName, "myCallback");
    },


    testWholePrimitive: function() {
      this.require(["php"]);

      this.__store.addListener("loaded", function() {
        this.resume(function() {
          var model = this.__store.getModel();
          this.assertEquals("String", model.getString(), "The model is not created how it should!");
          this.assertEquals(12, model.getNumber(), "The model is not created how it should!");
          this.assertEquals(true, model.getBoolean(), "The model is not created how it should!");
          this.assertNull(model.getNull(), "The model is not created how it should!");
        }, this);
      }, this);

      var url = this.url;
      this.__store.setUrl(url);

      this.wait();
    },


    testManipulatePrimitive: function() {
      this.require(["php"]);

      var manipulated = false;
      var delegate = {manipulateData : function(data) {
        manipulated = true;
        return data;
      }};

      this.__store.dispose();
      this.__store = new qx.data.store.Jsonp(null, delegate, "callback");

      this.__store.addListener("loaded", function() {
        this.resume(function() {
          this.assertTrue(manipulated);
        }, this);
      }, this);

      var url = this.url;
      this.__store.setUrl(url);

      this.wait();
    },


    testConfigureRequestPrimitive: function() {
      var delegate,
          self = this;

      delegate = {configureRequest : function(request) {
        self.assertInstance(request, qx.io.request.Jsonp);
      }};

      this.spy(delegate, "configureRequest");

      this.__store.dispose();
      this.__store = new qx.data.store.Jsonp(null, delegate, "callback");

      this.__store.addListener("loaded", function() {
        this.resume(function() {
          this.assertCalled(delegate.configureRequest);
        }, this);
      }, this);

      var url = this.url;
      this.__store.setUrl(url);

      this.wait();
    },


    testDisposeRequest: function() {
      this.setUpFakeRequest();
      var store = new qx.data.store.Jsonp(this.url);
      store.dispose();

      this.assertCalled(this.request.dispose);
    },


    testDisposeRequestDone: function() {
      this.setUpFakeRequest();
      var url = this.url;
      this.__store.addListener("loaded", function() {
        this.resume(function() {
          this.__store.dispose();
          this.assertCalled(this.request.dispose);
        }, this);
      }, this);
      this.__store.setUrl(url);
    },


    testErrorEvent : function() {
      // do not test that for IE and Opera because of the missing
      // error handler for script tags
      if (
        !(qx.core.Environment.get("browser.name") == "ie") &&
        !(qx.core.Environment.get("browser.name") == "opera"))
        {
        this.__store.addListener("error", function() {
          this.resume(function() {}, this);
        }, this);

        this.__store.setUrl("affe");

        this.wait();
      }
    }
  }
});