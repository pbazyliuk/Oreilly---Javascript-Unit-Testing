describe('es6 promise matchers', function() {
  beforeEach(function() {
    beforeEach(JasminePromiseMatchers.install);

    var me = this;
    this.promise = new Promise(function(resolve, reject) {
      me.resolve = resolve;
      me.reject = reject;
    });
  });

  it('resolved', function(done) {
    this.resolve();
    expect(this.promise).toBeResolved(done);
  });

  it('resolved with', function(done) {
    this.resolve('HOWDY');
    expect(this.promise).toBeResolvedWith('HOWDY', done);
  });

  it('rejected', function(done) {
    this.reject();
    expect(this.promise).toBeRejected(done);
  });

  it('rejected with', function(done) {
    this.reject('ERROR');
    expect(this.promise).toBeRejectedWith('ERROR', done);
  });
});
