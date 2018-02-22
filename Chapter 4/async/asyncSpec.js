jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

describe('async', function() {
  beforeAll(function(done) {
    setTimeout(done, 0);
  });

  afterAll(function(done) {
    setTimeout(done, 60);
  }, 100);

  beforeEach(function(done) {
    var me = this;
    setTimeout(function() {
      me.then = new Date();
      done();
    }, 50);
  }, 100);

  afterEach(function(done) {
    setTimeout(done, 50);
  }, 100);

  it('is asynchronous!', function(done) {
    var me = this;
    setTimeout(function() {
      expect(me.then).toBeLessThan(new Date());
      done();
    }, 50);
  });

  it('fails asynchronously!', function(done) {
    var me = this;
    setTimeout(function() {
      expect(me.then).toBeLessThan(new Date());
      done.fail('not looking good');
    }, 50);
  });

  it('throws sync', function() {
    throw new Error('this will fail');
  });

  it('throws async', function(done) {
    var me = this;
    setTimeout(function() {
      expect(me.then).toBeLessThan(new Date());
      throw new Error('this will timeout');
    }, 50);
  });
});
