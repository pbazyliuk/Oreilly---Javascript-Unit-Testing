describe('Basic Spying', function() {
  beforeEach(function() {
    this.increment = function(x) { 
      return x + 1;
    }
    spyOn(this, 'increment');
  });

  it('spies on a function', function() {
    this.increment(33);
    expect(this.increment).toHaveBeenCalled();
  });

  it('spies on function parameters', function() {
    this.increment(33);
    expect(this.increment).toHaveBeenCalledWith(33);
    expect(this.increment).toHaveBeenCalledWith(jasmine.any(Number));
  });

  it('spies on multiple function parameters', function() {
    var next = this.increment(33, 'mark');
    expect(this.increment).toHaveBeenCalledWith(33, 'mark');
  });

  it('spies on a function but does not call through', function() {
    var next = this.increment(33);
    expect(this.increment).toHaveBeenCalledWith(33);
    expect(next).toBeUndefined();
  });

  it('spies on a function and calls through', function() {
    this.increment.and.callThrough();
    var next = this.increment(33);
    expect(this.increment).toHaveBeenCalledWith(33);
    expect(next).toEqual(34);
  });

  it('spies on a function and returns whatever', function() {
    this.increment.and.returnValue(99);
    var next = this.increment(33);
    expect(this.increment).toHaveBeenCalledWith(33);
    expect(next).toBe(99);
  });

  it('spies on a function and calls whatever', function() {
    this.increment.and.callFake(function(val){
      return val * 2;
    });
    var next = this.increment(33);
    expect(this.increment).toHaveBeenCalledWith(33);
    expect(next).toBe(66);
  });

  it('spies on a function and throws whatever', function() {
    this.increment.and.throwError('FAKE ERROR');
    var me = this;
    expect(function() { me.increment(33); }).toThrowError('FAKE ERROR');
  });
  
  it('spies on a function and then stubs', function() {
    this.increment.and.throwError('FAKE ERROR');
    var me = this;
    expect(function() { me.increment(33); }).toThrowError('FAKE ERROR');

    this.increment.and.stub();
    this.increment(33);
    expect(this.increment).toHaveBeenCalledWith(33);
  });

  it('spies on multiple calls', function() {
    this.increment(33);
    this.increment(27);
    this.increment(2390);

    expect(this.increment.calls.count()).toBe(3);
  });

  it('spies on multiple calls and gets arguments', function() {

    this.increment(33);
    this.increment(27);
    this.increment(2390, 'mark');

    expect(this.increment.calls.argsFor(0)).toEqual([33]);
    expect(this.increment.calls.argsFor(1)).toEqual([27]);
    expect(this.increment.calls.argsFor(2)).toEqual([2390, 'mark']);
    expect(this.increment.calls.argsFor(2)).toEqual(jasmine.arrayContaining(['mark']));
  });

  it('spies on multiple calls and gets "this"', function() {
    this.increment.and.callThrough();

    var me = { mark: 'rox' };
    this.increment.call(me, 33);

    var you = { you: 'rule' };
    this.increment.call(you, 55);

    expect(this.increment.calls.first()).toEqual({
      object: me,
      args: [33],
      returnValue: 34
    });

    expect(this.increment.calls.mostRecent()).toEqual({
      object: you,
      args: [55],
      returnValue: 56
    });
  });

  it('spies on multiple calls and resets', function() {

    this.increment(33);
    this.increment(27);
    this.increment(2390);

    expect(this.increment.calls.count()).toBe(3);

    this.increment.calls.reset();
    expect(this.increment.calls.count()).toBe(0);
  });
});
