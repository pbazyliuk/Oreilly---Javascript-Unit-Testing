// By default calls through!
describe('Sinon Spying', function() {
  beforeEach(function() {
    this.increment = function(x) { 
      return x + 1;
    }
    sinon.spy(this, 'increment');
  });

  afterEach(function() {
    this.increment.restore();  // no more spying
  });

  it('spies on a function', function() {
    this.increment(33);
    expect(this.increment.called).toBeTruthy();
    expect(this.increment.calledOnce).toBeTruthy();
    expect(this.increment.callCount).toBe(1);
  });

  it('spies on function parameters', function() {
    this.increment(33);

    expect(this.increment.calledWith(33)).toBeTruthy();
    expect(this.increment.getCall(0).args[0]).toBe(33);
  });

  it('spies on multiple function parameters', function() {
    var next = this.increment(33, 'mark');

    expect(this.increment.calledWith(33, 'mark')).toBeTruthy();
    expect(this.increment.alwaysCalledWith(33, 'mark')).toBeTruthy();
    expect(this.increment.calledWithExactly(33, 'mark')).toBeTruthy();
    expect(this.increment.alwaysCalledWithExactly(33, 'mark')).toBeTruthy();
  });

  it('spies on multiple function parameters with matchers', function() {
    var next = this.increment(33, 'mark');

    expect(this.increment.calledWith(sinon.match.number, sinon.match(/mark/))).toBeTruthy();
    expect(this.increment.calledWith(sinon.match.typeOf('number'), sinon.match.string.or(sinon.match.truthy))).toBeTruthy();
  });

  it('returned & reset', function() {
    this.increment(33);
    this.increment(3);
    this.increment(99);

    expect(this.increment.returned(34)).toBeTruthy();
    expect(this.increment.returned(4)).toBeTruthy();
    expect(this.increment.returned(100)).toBeTruthy();

    expect(this.increment.alwaysReturned(8)).not.toBeTruthy();

    this.increment.reset();
    expect(this.increment.called).toBeFalsy();
  });

  it('cool bits & pieces', function() {
    var next1 = this.increment(33);
    var next2 = this.increment(3);
    var next3 = this.increment(99);

    expect(this.increment.calledOnce).toBeFalsy();
    expect(this.increment.calledTwice).toBeFalsy();
    expect(this.increment.calledThrice).toBeTruthy();

    // call still happens
    expect(next1).toBe(34); 
    expect(next2).toBe(4); 
    expect(next3).toBe(100); 

    // New?
    expect(this.increment.calledWithNew()).not.toBeTruthy();

    // Never
    expect(this.increment.neverCalledWith(47)).toBeTruthy();
    expect(this.increment.neverCalledWithMatch({ some: 'object' })).toBeTruthy();
    expect(this.increment.neverCalledWithMatch(/67/)).toBeTruthy();

    // Get 'this' object
    expect(this.increment.calledOn(this)).toBeTruthy();
    expect(this.increment.alwaysCalledOn(this)).toBeTruthy();
  });
    
  it('throwing', function() {
    this.thrower = function() { throw new Error('howdy!'); };
    sinon.spy(this, 'thrower');

    try {
      this.thrower();
    } catch(e) {
    }

    expect(this.thrower.threw()).toBeTruthy();
    expect(this.thrower.threw('Error')).toBeTruthy();
    expect(this.thrower.alwaysThrew).toBeTruthy();
  });

  it('empty spy', function(done) {
    var me = this;
    this.fakeFunction = sinon.spy();
    var functionThatUsesACallback = function(cb) {
      setTimeout(function() { cb('howdy!'); }, 1000);
    };

    functionThatUsesACallback(this.fakeFunction);

    setTimeout(function() { 
      expect(me.fakeFunction.called).toBeTruthy();
      expect(me.fakeFunction.calledWith('howdy!')).toBeTruthy();
      done();
    }, 2000);
  });


});
