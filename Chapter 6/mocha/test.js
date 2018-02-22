// npm install mocha should
// BYO Assertions - just throw for failure!
var should = require('should');

describe('basic mocha!', function() {
  this.timeout(5000); // timeout after 5 seconds
  this.timeout(0); // disables timeout

  it('can look just like jasmine!', function() {
    ('55').should.equal('55');
  });

  it('async', function(done) {
    this.slow(500);
    this.timeout(4000);
    setTimeout(function() {
      (true).should.be.ok();
      done();
    }, 1000);
  });

  it('async fail', function(done) {
    setTimeout(function() {
      (true).should.be.ok();
      done('I failed!');
    }, 1000);
  });
});

describe('before / after', function() {
  before(function() {
    this.beforeAllTests = true;
  });

  after(function() {
    this.beforeAllTests = false;
  });

  // named
  beforeEach(function MyBeforeEach() {
    this.namedBeforeEach = true;
  });

  // async
  afterEach('MyAfterEach', function(done) {
    setTimeout(function() {
      this.namedBeforeEach = false;
      done();
    }, 1000);
  });

  it('will be ok', function() {
    (true).should.be.ok();
  });

  // not run!
  it('will not be ok', function() {
    (true).should.not.be.ok();
  });
});

// can apply 'skip' and 'only' to describe and it
describe('skip', function() {
  // 'xit' in jasmine-land
  it.skip('will not run!', function(done) {
    setTimeout(done, 1000000);
  });

  it('will run', function() {
    ('mark').should.not.equal('jeff');
  });
});

// err.expected and err.actual 
var halfAssertion = function(expected, actual) {
  if (expected * 2 != actual) {
    var error = new Error(expected + ' not half of ' + actual);
    error.actual = expected;
    error.expected = actual / 2;
    throw error;
  }
}

// err.expected and err.actual 
var funkyAssertion = function(value) {
  if (!value.match(/funky/i)) {
    var error = new Error(value + ' is not funky!');
    error.actual = value;
    error.expected = 'funky';
    throw error;
  }
}

describe('custom assertion', function() {
  it('halfAssertion', function() {
    halfAssertion(33, 66);
    halfAssertion(12, 99);
  });

  it('funkyAssertion', function() {
    funkyAssertion('mark is funky');
    funkyAssertion('jeff is lame');
  });
});
