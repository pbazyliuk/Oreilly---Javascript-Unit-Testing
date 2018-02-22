// Failed tests run first!

var test = QUnit.test;
QUnit.module("basic assertions");
test('equal ==', function(assert) {
  assert.equal(5, '5');
  assert.notEqual(5, 'howdy');
});

test('strictEqal ===', function(assert) {
  assert.strictEqual(33, 33);
  assert.notStrictEqual('33', 33);
});

test('deep equal', function(assert) {
  assert.deepEqual({ a: 'b', c: [1,2] }, { a: 'b', c: [1,2] });
  assert.notDeepEqual({ a: 'b', c: [1,2] }, { a: 'b', c: [5,7] });
  assert.expect(2);
});

test('ok truthy', function(assert) {
  assert.ok(1);
  assert.ok('0');
  assert.ok(true);
  assert.ok({});

  assert.notOk(false);
  assert.notOk(0);
  assert.notOk('');

  assert.notOk([], 'Empty array is truthy!'); // this will fail!
});

test('throws', function(assert) {
  var fun = function() { throw new Error('hello!'); };
  assert.throws(fun);
  assert.throws(fun, Error);
  assert.throws(fun, /hello/);
  assert.throws(fun, function(err) { return err.message == 'hello!'; });
});

test('prop equal - strict testing of hasOwnProperties properties', function(assert) {
  var Obj = function() { this.a = 99, this.c = 'mark rox'; };
  var x = new Obj();

  assert.propEqual({ a: 99, c: 'mark rox' }, { a: 99, c: 'mark rox' });
  assert.propEqual({ a: 99, c: 'mark rox' }, x);
  assert.notPropEqual({ a: 'b', c: 'd' }, { z: 33, c: 44 });
});

QUnit.module("custom assertions");
// Convert any expression into an assertion using true/false
QUnit.assert.isFunky = function(value, expected, message) {
  this.push(value.match(/funky/i), value, 'funky', message);
};

test('mark is funky', function(assert) {
  assert.isFunky('mark and the funky bunch');
  assert.isFunky('mark and the lame bunch', null, 'not funky!');
});

// Async - need a new 'done' function for each async operation.
QUnit.module("async");
test('async', function(assert) {
  var done1 = assert.async();
  var done2 = assert.async();
  setTimeout(function() {
    assert.equal(33, '33');
    done1();
    setTimeout(function() {
      assert.ok('OK!');
      done2();
      var done3 = assert.async();
      setTimeout(function() {
        assert.notOk(false);
        done3();
      }, 1000);
    }, 1000);
  }, 1000);
});

QUnit.module("beforeEach / afterEach",
{
  beforeEach: function() {
    this.setup = 'Setup Before!';
  },
  // Async before/after?  No problem!
  afterEach: function(assert) {
    var done = assert.async();
    var me = this;
    setTimeout(function() {
      delete me.setup;
      done();
    }, 1000);
  }
});
test('test before / after', function(assert) {
  assert.equal(this.setup, 'Setup Before!');
  this.setup = 'done one';
});
test('test before / after', function(assert) {
  assert.equal(this.setup, 'Setup Before!');
  assert.notEqual(this.setup, 'done one');
});

// qunit-fixture automatically cleaned up between tests
QUnit.module('fixtures', {
  beforeEach: function() {
    this.fixture = document.getElementById('qunit-fixture');
  }
});
test('add element', function(assert) {
  this.fixture.innerHTML = '<funky class="funky_element">Wow!</funky>';
  assert.ok(document.getElementsByTagName('funky').length);
});
test('element gone', function(assert) {
  assert.notOk(document.getElementsByTagName('funky').length);
});
