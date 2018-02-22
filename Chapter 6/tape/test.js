// npm install tape faucet tap-prettify
var test = require('tape');

test('basic tests', function(t) {
  // ===
  t.equal(5, 2+3, 'not strictly equal!');
  t.notEqual(5, '5', 'strictly equal!');

  // truthy
  t.ok('howdy!');
  t.notOk(0);

  // Deep equal ===
  t.deepEqual({ a: 'b'}, { a: 'b' });
  t.notDeepEqual({ a: 'b'}, { b: 'a' });

  // Deep equal ==
  t.deepLooseEqual({ a: 5}, { a: '5' });
  t.notDeepLooseEqual({ a: 'b'}, { b: 'a' });

  // throws
  t.throws(function() { throw new Error('howdy') }, 'throw');
  t.throws(function() { throw new Error('howdy') }, /howdy/, 'regex');
  t.doesNotThrow(function() { return 99; });

  t.end();
});

test('skip', { skip: true }, function(t) {
  t.ok(0);
});

test('plan', function(t) {
  t.plan(2);
  t.ok(1);
  t.equal('mark', 'mark');
});

test('async', { timeout: 4000 }, function(t) {
  setTimeout(function() {
    t.ok(47);
    t.end();  // 'done'
  }, 3000);
});

test('async with plan', { timeout: 40000 }, function(t) {
  t.plan(1);
  setTimeout(function() {
    t.ok(47);
  }, 3000);
});

test('timeoutAfter', function(t) {
  t.timeoutAfter(4000);
  t.plan(1);
  t.comment('In the middle of some tests!');
  setTimeout(function() {
    t.ok(47);
  }, 3000);
});

test('subtest', function(t) {
  t.ok(44, 'before');
  t.test('a subtest', function(subt) {
    subt.plan(1);
    setTimeout(function() {
      subt.ok(55, 'during');
    }, 1000);
  });
  t.ok(44, 'after');
  t.end();
});

test('another', function() {
  // ...
});
