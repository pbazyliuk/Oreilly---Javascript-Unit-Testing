var sum = require('./sum');
var testSum = require('./testSum');

for (testFunc in testSum) {
  console.log('running test:', testFunc);
  testSum[testFunc](sum);
}

