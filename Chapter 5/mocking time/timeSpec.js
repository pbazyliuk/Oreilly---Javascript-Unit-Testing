describe('mocking date & time', function() {

  beforeEach(function() {
    jasmine.clock().install();
    this.fakeTime = new Date(2020, 4, 20);
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('Mocking date', function() {
    jasmine.clock().mockDate(this.fakeTime);
    expect(new Date()).toEqual(this.fakeTime);
  });

  it('Back to real date', function() {
    expect(new Date()).not.toEqual(this.fakeTime);
  });

  it('Moving the date', function() {
    jasmine.clock().mockDate(this.fakeTime);
    jasmine.clock().tick(1000 * 60 * 60 * 24); // One day later
    expect(this.fakeTime.getTime()).toBeLessThan(new Date().getTime());
    expect(new Date()).toEqual(new Date(2020, 4, 21));
  });

  // No 'done'!!  This is all synchronous.
  it('setTimeout', function() {
     var callback = jasmine.createSpy('callback');
     setTimeout(callback, 0);

     expect(callback).not.toHaveBeenCalled();

     jasmine.clock().tick(1);

     expect(callback).toHaveBeenCalled();
  });

  // No 'done'!!  This is all synchronous.
   it('setInterval', function() {
     var callback = jasmine.createSpy('callback');
     setInterval(callback, 10);

    expect(callback).not.toHaveBeenCalled();

    jasmine.clock().tick(1);

    expect(callback).not.toHaveBeenCalled();

    jasmine.clock().tick(8);

    expect(callback).not.toHaveBeenCalled();

    // 10th tick - callback
    jasmine.clock().tick(1);

    expect(callback.calls.count()).toEqual(1);

    // 10 more ticks
    jasmine.clock().tick(10);

    // Another callback
    expect(callback.calls.count()).toEqual(2);

    jasmine.clock().tick(100);

    // now has been called 10 more times
    expect(callback.calls.count()).toEqual(12);
  });
  
});
