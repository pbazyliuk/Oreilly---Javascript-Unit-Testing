describe('setup / teardown', function() {
  var foo = [ 'an', 'array' ];

  // THIS IS JASMINE SUITE OBJECT NOT VISIBLE TO TESTS
  console.log(this);

  beforeAll(function() {
    // HERE this is an empty object
    console.log('top-level beforeAll', this);
    foo = 99;
    this.thisVar = 11;
    this.myVar = 'myvar';
  });

  // run after all tests and sub-tests in this suite finish
  afterAll(function() {
    console.log('top-level afterAll', this);
    foo = 'afterAll';
    this.thisVar = 'afterAll';
  });

  describe('setup / teardown nested', function() {

    // Here 'this' is SUITE object NOT visible to tests

    // This foo will get overridden by beforeEach
    foo = 'SOMETHING ELSE';

    beforeAll(function() {
      // Run once right after outer scope beforeAll
      console.log('  nested beforeAll', this);
    });

    // run after all tests and sub-tests in this suite finish
    afterAll(function() {
      // Run once right after outer scope beforeAll
      console.log('  nested afterAll', this);
    });


    beforeEach(function() {
      // This is run after any outer 'beforeEach'
      console.log('  nested beforeEach', this);
    });

    afterEach(function() {
      // This is run before any outer 'afterEach'
      console.log('  nested afterEach', this);
    });

    it("foo should be 'mark'", function() {
      console.log('  nested first test');
      expect(foo).toBe('mark');
      this.inTest = 'SETTING THIS IN A TEST';
    });

    it("this.thisVar should be 11", function() {
      console.log('  nested second test');
      expect(this.thisVar).toBe(11);
    });

    describe('setup / teardown double nested', function() {
      beforeAll(function() {
        console.log('    double nested beforeAll', this);
      });

      // run after all tests and sub-tests in this suite finish
      afterAll(function() {
        console.log('    double nested afterAll', this);
      });

      beforeEach(function() {
        console.log('    double nested beforeEach', this);
      });

      afterEach(function() {
        console.log('    double nested afterEach', this);
      });

      it("foo should be 'mark'", function() {
        console.log('    double nested first test');
        expect(foo).toBe('mark');
      });

      it("this.thisVar should be undefined", function() {
        console.log('    double nested second test');
        expect(this.thisVar).toBe(11);
      });
    });
  });

  beforeEach(function() {
    // RUN BEFORE EVERY TEST FROM HERE ON DOWN!
    // THIS IS RESET!
    console.log('top-level beforeEach', this);
    foo = 'mark';
  });

  afterEach(function() {
    console.log('top-level afterEach', this);
    foo = 'zozo';
  });

  it('foo should be "mark"', function() {
    console.log('top-level test 1');
    expect(foo).toBe('mark');
  });

  it('this.thisVar should be 11', function() {
    console.log('top-level test 2');
    expect(this.thisVar).toBe(11);
  });

  it('this.someVar should be undefined', function() {
    console.log('top-level test 3');
    expect(this.someVar).toBeUndefined();
  });

  it('this.myVar should be "myVar"', function() {
    console.log('top-level test 4');
    expect(this.myVar).toBe('myvar');
  });
});

describe('setup / teardown async', function() {
  var boo = 66;

  beforeEach(function(done) {
    setTimeout(done, 2000);
    this.someVar = 44;
  }, 3000);

  it('boo should be 66', function() {
    expect(boo).toBe(66);
  });

  it('this.someVar should be 44', function() {
    expect(this.someVar).toBe(44);
  });

});
