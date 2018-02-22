var assert = require('assert');

module.exports.testSum = function(sum) {
  var answer = sum(4, 5);
  assert(answer === 10, '4 + 5 != 9!');
}

module.exports.testConcat = function(sum) {
  var answer = sum('mark', 'test');
  assert(answer === 'marktest', 'mark + test = marktest');
}
