if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // native functions don't have a prototype
      fNOP.prototype = this.prototype; 
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}

describe('basic matchers', function() {
  it('toBe: ===', function() {
    expect(5).toBe(5, 'hey it is not 5!');
    expect('5').not.toBe(5, '=== string vs int!');
    expect({ testing: 'is', awesome: 'yo!' }).not.toBe({ testing: 'is', awesome: 'yo!' }, 'object');
  });

  it('toEqual === + object inspection', function() {
    expect(5).toEqual(5);
    expect('5').not.toEqual(5);
    expect('5').not.toEqual('thirty seven');

    expect([1,2,3]).toEqual([1,2,3]);
    expect({ testing: 'is', awesome: 'yo!' }).toEqual({ testing: 'is', awesome: 'yo!' });
    expect(function() {}).not.toEqual(function() {});
  });

  it('toMatch - regex for strings', function() {
    expect("mary had a little lamb").toMatch('lamb');
    expect("mary had a little lamb").toMatch(/HAD A/i);
    expect("mary had a little lamb").not.toMatch(/billy/);
  });

  it('toBeDefined', function() {
    var b = 33;
    expect(b).toBeDefined();

    var a;
    expect(a).not.toBeDefined();

    var m = {};
    expect(m.property).not.toBeDefined();
  });

  it('toBeUndefined', function() {
    var b = 33;
    expect(b).not.toBeUndefined();

    var a;
    expect(a).toBeUndefined();

    var m = {};
    expect(m.property).toBeUndefined();
  });

  it('toBeNull', function(done) {
    var nu = null;
    expect(nu).toBeNull();

    var a;
    expect(a).not.toBeNull();

    function async(cb) {
      cb(null, 'it worked!');
    }
    async(function(err, data) {
      expect(err).toBeNull();
      done();
    });
  });

  it('toBeTruthy', function() {
    expect('').not.toBeTruthy();
    expect([]).toBeTruthy();
    expect({}).toBeTruthy();
    expect(0).not.toBeTruthy();
    expect('0').toBeTruthy();
    expect(false).not.toBeTruthy();
  });

  it('toBeFalsy', function() {
    expect('').toBeFalsy();
    expect([]).not.toBeFalsy();
    expect([0]).not.toBeFalsy();
    expect(0).toBeFalsy();
    expect('0').not.toBeFalsy();
    expect(null).toBeFalsy();
    expect(undefined).toBeFalsy();
    expect(NaN).toBeFalsy();
    expect(-0).toBeFalsy();
  });

  it('toContain', function(done) {
    expect([1,2,4]).toContain(4);
    expect([1,2,4]).not.toContain('2');
    expect([1,2,4]).not.toContain(undefined);
    expect(arguments).toContain(done);
    done();
  });

  it('toBeGreaterThan / toBeLessThan', function() {
    expect(5).toBeGreaterThan(4);
    expect(3).not.toBeGreaterThan('4');

    expect(5).toBeLessThan(99);
    expect(5).not.toBeLessThan(-Infinity);
  });

  it('toBeCloseTo', function() {
    expect(1.2).toBeCloseTo(1, 0);
    expect(1.2).not.toBeCloseTo(1, 1);

    expect(5.768).toBeCloseTo(5.762, 0);
    expect(5.768).toBeCloseTo(5.762, 1);

    // rounds up so match
    expect(5.768).toBeCloseTo(5.769, 2);

    // rounds down so doesn't!
    expect(5.768).not.toBeCloseTo(5.762, 2);

    expect(5.768).not.toBeCloseTo(5.762, 3);
  });

  it('toThrow', function() {
    function throwing() {
      throw new Error('throwing!');
    }
    expect(throwing).toThrow();

    function notThrowing() {}
    expect(notThrowing).not.toThrow();

    function maybeThrowing() {
      if (this.throw) {
        throw new Error('throwing!');
      }
    }
    expect(maybeThrowing.bind({ throw: true })).toThrow();
    expect(maybeThrowing.bind({ throw: false })).not.toThrow();
  });

  it('toThrowError', function() {
    function throwing() {
      throw new RangeError('throwing!');
    }
    expect(throwing).toThrowError('throwing!');
    expect(throwing).toThrowError(/throw/);
    expect(throwing).toThrowError(RangeError);

    var MyError = function(message) { this.message = message; }
    MyError.prototype = Object.create(Error.prototype);

    function myThrowing() {
      throw new MyError('throwing!');
    }
    expect(myThrowing).toThrowError('throwing!');
    expect(myThrowing).toThrowError(/throw/);
    expect(myThrowing).toThrowError(MyError);
    expect(myThrowing).not.toThrowError(RangeError);
  });
});
