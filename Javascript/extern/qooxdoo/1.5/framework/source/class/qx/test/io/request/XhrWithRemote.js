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
     * Tristan Koch (tristankoch)

************************************************************************ */

qx.Class.define("qx.test.io.request.XhrWithRemote",
{
  extend: qx.dev.unit.TestCase,

  include: [qx.test.io.MRemoteTest,
            qx.dev.unit.MRequirements],

  members:
  {
    setUp: function() {
      this.req = new qx.io.request.Xhr();
      this.require(["http"]);
    },

    tearDown: function() {
      this.req.dispose();
    },

    "test: fetch resource": function() {

      var req = this.req,
          url = this.noCache(this.getUrl("qx/test/xmlhttp/sample.txt"));

      req.addListener("success", function(e) {
        this.resume(function() {
          this.assertEquals("SAMPLE", e.getTarget().getResponseText());
        }, this);
      }, this);

      req.setUrl(url);
      req.send();

      this.wait();
    },

    "test: recycle request": function() {
      var req = new qx.io.request.Xhr(),
          url1 = this.noCache(this.getUrl("qx/test/xmlhttp/sample.txt") + "?1"),
          url2 = this.noCache(this.getUrl("qx/test/xmlhttp/sample.txt") + "?2"),
          count = 0;

      req.addListener("success", function() {
        count++;

        if (count == 2) {
          this.resume();
        } else {
          req.setUrl(url2);
          req.send();
        }
      }, this);

      req.setUrl(url1);
      req.send();

      this.wait();
    },

    "test: progress phases": function() {
      var req = this.req,
          phases = [],
          expectedPhases = ["opened", "sent", "loading", "load", "success"],
          url = this.getUrl("qx/test/xmlhttp/sample.txt");

      req.addListener("changePhase", function() {
        phases.push(req.getPhase());

        if (req.getPhase() === "success") {
          this.resume(function() {
            this.assertArrayEquals(expectedPhases, phases);
          }, this);
        }

      }, this);

      req.setUrl(url);
      req.send();

      this.wait();
    },

    // "test: fetch resources simultaneously": function() {
    //   this.require(["php"]);
    //
    //   var count = 1,
    //       upTo = 20,
    //       startedAt = new Date(),
    //       duration = 0;
    //
    //   for (var i=0; i<upTo; i++) {
    //     var req = new qx.io.request.Xhr(),
    //         url = this.noCache(this.getUrl("qx/test/xmlhttp/loading.php")) + "&duration=6";
    //
    //     req.addListener("success", function() {
    //       this.resume(function() {
    //         // In seconds
    //         duration = (new Date() - startedAt) / 1000;
    //         this.debug("Request #" + count + " completed (" +  duration + ")");
    //         if (count == upTo) {
    //           return;
    //         }
    //
    //         ++count;
    //         this.wait(6000 + 1000);
    //       }, this);
    //     }, this);
    //
    //     req.setUrl(url);
    //     req.send();
    //   }
    //
    //   // Provided two concurrent requests are made (each 6s), 20 requests
    //   // (i.e. 10 packs of requests) should complete after 60s
    //   this.wait(60000 + 1000);
    // },

    noCache: function(url) {
      return qx.util.Uri.appendParamsToUrl(url, "nocache=" + (new Date).valueOf());
    }

  }
});
