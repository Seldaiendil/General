qx.Class.define("eye.test.Promise", {
  extend: qx.dev.unit.TestCase,

  members: {
    /**
     * Execute callbacks
     */
    testCallbackOnComplete: function() {
      var prom = new eye.Promise();
      var success = false;

      prom.then(function() {
        success = true;
      });
      prom.complete();

      this.assert(success, "Promise.complete() does not execute callbacks");
    },

    testCallbackOnCompleteEvenWithMoreCallbacks: function() {
      var prom = new eye.Promise();
      var success1 = false;
      var success2 = false;
      var success3 = false;

      prom.then(function() { success1 = true; });
      prom.then(function() { success2 = true; });
      prom.then(function() { success3 = true; });
      prom.complete();

      this.assert(success1 && success2 && success3, "Promise.complete() does not execute all callbacks");
    },

    testCallbackWhenCompleted: function() {
      var prom = new eye.Promise();
      var success = false;

      prom.complete();
      prom.then(function() {
        success = true;
      });

      // Assert there and not on the callback so if the callback is not called this will fail
      //   otherwise we will have a false positive
      this.assert(success, "Promise.then() does not execute callbacks when promise is completed");
    },

    testCallbackWithArgumentsPassedToComplete: function() {
      var prom = new eye.Promise();
      var reference = {};
      var array = [];
      var success = false;

      prom.then(function(arg1, arg2) {
        success = arg1 === reference && arg2 === array;
      });
      prom.complete(reference, array);

      this.assert(success, "Promise.complete() does not pass it's arguments to callbacks");
    },

    testCallbackWithArgumentsPassedToComplete_reverse: function() {
      var prom = new eye.Promise();
      var reference = {};
      var array = [];
      var success = false;

      prom.complete(reference, array);
      prom.then(function(arg1, arg2) {
        success = arg1 === reference && arg2 === array;
      });

      this.assert(success, "Promise.complete() does not pass it's arguments to callbacks [reverse]");
    },

    testCallbackMustReciveGivenScope: function() {
      var prom = new eye.Promise();
      var scope = {};
      var success = false;

      prom.then(function() {
        success = this === scope;
      }, scope);
      prom.complete();

      this.assert(success, "Promise.then() does not pass callback to function");
    },


    /**
     * Error handling
     */
    testCallErrorHandlersOnFail: function() {
      var prom = new eye.Promise();
      
    }
  }
});
