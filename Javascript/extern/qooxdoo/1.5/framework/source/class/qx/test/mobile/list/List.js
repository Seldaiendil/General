/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tino Butz (tbtz)

************************************************************************ */
/* ************************************************************************
#asset(qx/icon/Tango/48/places/folder.png)
************************************************************************ */

qx.Class.define("qx.test.mobile.list.List",
{
  extend : qx.test.mobile.MobileTestCase,

  members :
  {
    __createModel : function()
    {
      var data = [];
      data.push({title:"1", subTitle : "s1", image: "qx/icon/Tango/48/places/folder.png"});
      data.push({title:"2", subTitle : "s2", image: "qx/icon/Tango/48/places/folder.png"});
      data.push({title:"3", subTitle : "s3", image: "qx/icon/Tango/48/places/folder.png"});
      data.push({title:"4", subTitle : "s4", image: "qx/icon/Tango/48/places/folder.png"});
      data.push({title:"5", subTitle : "s5", image: "qx/icon/Tango/48/places/folder.png"});
      return new qx.data.Array(data);
    },


    __createList : function(createItemRenderer, configureItemFunction) {
      var list = new qx.ui.mobile.list.List();
      this.getRoot().add(list);
      list.setDelegate({
        configureItem : configureItemFunction ? configureItemFunction : this.__configureItemFunction,
        createItemRenderer :  createItemRenderer ? createItemRenderer : null
      });
      list.setModel(this.__createModel());
      return list;
    },


    __configureItemFunction : function(item,data,row)
    {
      item.setImage(data.image);
      item.setTitle(data.title);
      item.setSubTitle(data.subTitle);
    },

    __assertItemsAndModelLength : function(list, dataLength) {
      var childrenLength = list.getContentElement().childNodes.length;
      this.assertEquals(dataLength, childrenLength);
    },

    testCreate : function()
    {
      var list = this.__createList();
      this.__assertItemsAndModelLength(list, 5);
      list.destroy();
    },


    testCustomRenderer : function() {
      var list = this.__createList(function() {
        return new qx.ui.mobile.list.renderer.Default();
      });
      this.__assertItemsAndModelLength(list, 5);
      list.destroy();
    },


    testSetModelNull : function()
    {
      var list = this.__createList(function() {
        return new qx.ui.mobile.list.renderer.Default();
      });
      this.__assertItemsAndModelLength(list, 5);
      list.setModel(null);
      this.__assertItemsAndModelLength(list, 0);
      list.destroy();
    },


    testModelChangeRemove : function()
    {
      var list = this.__createList(function() {
        return new qx.ui.mobile.list.renderer.Default();
      });
      this.__assertItemsAndModelLength(list,5);
      list.getModel().removeAt(0);
      this.__assertItemsAndModelLength(list,4);
      list.destroy();
    },

    testModelChangeEdit : function()
    {
      var list = this.__createList(function() {
        return new qx.ui.mobile.list.renderer.Default();
      });
      this.__assertItemsAndModelLength(list,5);
      // TODO: Add check for text here
      list.getModel().setItem(0, {title:"affe", subTitle:"1", image:"qx/icon/Tango/48/places/folder.png"});
      this.__assertItemsAndModelLength(list,5);
      var text = list.getContentElement().childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerHTML;
      this.assertEquals("affe", text);
      list.destroy();
    },


    testModelChangeAdd : function()
    {
      var list = this.__createList(function() {
        return new qx.ui.mobile.list.renderer.Default();
      });
      this.__assertItemsAndModelLength(list,5);
      list.getModel().push({title:"6", subTitle:"6", image:"qx/icon/Tango/48/places/folder.png"});
      this.__assertItemsAndModelLength(list,6);
      list.destroy();
    }
  }
});
