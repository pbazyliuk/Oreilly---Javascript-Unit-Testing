var customMatchers = {
  toBeType: function(util, customEqualityTesters) {
    return {
      compare: function(actual, expected, message) {
        var ret = {};
        if (typeof expected == 'string') {
          ret.pass = util.equals(typeof actual, expected, customEqualityTesters);
          if (ret.pass) {
            ret.message = "Expected " + typeof actual + " to not be " + expected + ' ' + message;
          } else {
            ret.message = "Expected " + typeof actual + " to be " + expected + ' ' + message;
          }
        } else if (typeof expected === 'function') {
          ret.pass = actual instanceof expected;
          if (ret.pass) {
            ret.message = "Expected " + actual + " to not be an instance of " + expected;
          } else {
            ret.message = "Expected " + actual + " to be an instance of " + expected;
          }
        }
        return ret;
      }
    };
  },
  toBeVisible: function(util, customEqualityTesters) {
    return {
      compare: function(actual, message) {
        return {
          pass: actual.offsetParent !== null,
          message: "Element is unexpectedly invisible! " + message
        };
      },
      negativeCompare: function(actual, message) {
        return {
          pass: actual.offsetParent === null,
          message: "Element is unexpectedly visible! " + message
        };
      }
    };
  }
};

beforeEach(function() {
  jasmine.addMatchers(customMatchers);
});
