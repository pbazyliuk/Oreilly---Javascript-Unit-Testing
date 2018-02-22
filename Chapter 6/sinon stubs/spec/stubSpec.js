// Stub an empty spy you control
// Tracks all calls like a spy
describe('Sinon Stubs', function() {
  beforeEach(function() {
    this.square = function(x) {
      return x * x;
    };

    this.emptyStub = sinon.stub();
    this.squareStub = sinon.stub(this, 'square');
  });

  afterEach(function() {
    this.square.restore();
    this.emptyStub.reset();
  });

  it('returns values', function() {
    this.emptyStub.returns(44);
    var back = this.emptyStub();

    expect(back).toBe(44);
    expect(this.emptyStub.returned(44)).toBeTruthy();

    expect(this.emptyStub.called).toBeTruthy();
    expect(this.emptyStub.calledOnce).toBeTruthy();
    expect(this.emptyStub.callCount).toBe(1);
  });

  it('returns other things', function() {
    // return a specified argument
    this.emptyStub.returnsArg(2);
    var ret = this.emptyStub('a string', [1, 3, 5], 'something else', { a: 'mark' });
    expect(ret).toBe('something else');

    // for fluent APIs
    this.emptyStub.onSecondCall().returnsThis();
    var back = this.emptyStub();
    expect(back).toBe(this);
  });

  it('throws values', function() {
    this.emptyStub.throws();
    expect(this.emptyStub).toThrow();

    this.emptyStub.throws(new RangeError('yo'));
    expect(this.emptyStub).toThrowError(RangeError);
  });

  it('calls passed callback with context', function() {
    var callback = sinon.spy();
    var myThis = { cool: 'object' };

    this.emptyStub.callsArgOn(1, myThis);
    this.emptyStub('some data', callback);

    expect(callback.called).toBeTruthy();
    expect(callback.callCount).toBe(1);
    expect(callback.calledOn(myThis)).toBeTruthy();

    this.emptyStub.onSecondCall().callsArgOnWith(1, myThis, 'some', 'parameters', 'for callback');
    this.emptyStub('some data', callback);

    expect(callback.calledTwice).toBeTruthy();
    expect(callback.getCall(1).calledOn(myThis)).toBeTruthy();
    expect(callback.secondCall.calledWithExactly('some', 'parameters', 'for callback')).toBeTruthy();
  });

  it('calls passed callback with context ASYNC', function(done) {
    var callback = function(param) {
      expect(param).toBe('param');
      done();
    };
    var myThis = { cool: 'object' };

    this.emptyStub.callsArgOnWithAsync(1, myThis, 'param');
    this.emptyStub('some data', callback);
  });

  it('calls only on passed args', function() {
    this.emptyStub.withArgs('walter', 'inslee').returns(40);
    var back = this.emptyStub('walter', 'inslee');
    expect(back).toBe(40);

    back = this.emptyStub('something else');
    expect(back).toBeUndefined();
  });
});

