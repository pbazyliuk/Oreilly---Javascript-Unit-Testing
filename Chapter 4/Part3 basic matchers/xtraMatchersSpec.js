describe('bonus matchers within other matchers', function() {
  describe('jasmine.any', function() {
    it('jasmine.any with builtins', function() {
      expect({}).toEqual(jasmine.any(Object));
      expect([]).toEqual(jasmine.any(Object));
      expect(null).toEqual(jasmine.any(Object)); // GAH!
      expect(5).toEqual(jasmine.any(Number));
      expect('5').toEqual(jasmine.any(String));
      expect(function(){}).toEqual(jasmine.any(Function));
    });

    it('jasmine.any with custom', function() {
      var User = function() {};
      var user = new User();
      expect(user).toEqual(jasmine.any(User));
      expect(user).toEqual(jasmine.any(Object));
    });

    it('jasmine.any with custom prototypical interhitance', function() {
      var Person = function() {};
      var User = function() {};
      User.prototype = new Person();
      var user = new User();
      expect(user).toEqual(jasmine.any(Object));
      expect(user).toEqual(jasmine.any(Person));
      expect(user).toEqual(jasmine.any(User));
    });
  });

  describe('jasmine.anything', function() {
    it('matches anything not "null" or "undefined"', function() {
      expect(true).toEqual(jasmine.anything());
      expect(false).toEqual(jasmine.anything());
      expect(0).toEqual(jasmine.anything());
      expect('').toEqual(jasmine.anything());
      expect(null).not.toEqual(jasmine.anything());
      expect(undefined).not.toEqual(jasmine.anything());
    });
  });

  describe('jasmine.objectContaining', function() {
    beforeEach(function() {
      this.obj = { mark: 'rox', you: 'also rock' };
    });

    it('matches some key/value pairs', function() {
      expect(this.obj).toEqual(jasmine.objectContaining({ mark: 'rox' }));
      expect(this.obj).toEqual(jasmine.objectContaining({ you: 'also rock' }));
      expect(this.obj).toEqual(jasmine.objectContaining({ mark: 'rox', you: 'also rock' }));
      expect(this.obj).toEqual(jasmine.objectContaining({ mark: jasmine.anything() }));
      expect(this.obj).toEqual(jasmine.objectContaining({ mark: jasmine.any(String) }));
      expect(this.obj).not.toEqual(jasmine.objectContaining({ they: 'are great' }));
    });
  });

  describe('jasmine.arrayContaining', function() {
    beforeEach(function() {
      this.array = [ 'red', 'green', 'blue', 'purple' ];
    });

    it('matches some array items', function() {
      expect(this.array).toEqual(jasmine.arrayContaining(['purple', 'blue']));
      expect(this.array).not.toEqual(jasmine.arrayContaining(['orange', 'blue']));
      expect(this.array).not.toEqual(jasmine.arrayContaining([55]));
      expect(this.array).toEqual(jasmine.arrayContaining([jasmine.anything()]));
      expect(this.array).not.toEqual(jasmine.arrayContaining([jasmine.any(Number)]));
    });
  });

  describe('jasmine.stringMatching', function() {
    beforeEach(function() {
      this.string = 'The quick brown fox jumps over the lazy dog.';
    });

    it('matches strings regex style', function() {
      expect('mark').toEqual(jasmine.stringMatching(/^mark$/));
      expect('super-duper').toEqual(jasmine.stringMatching(/r-d/));
    });
  });

  describe('asymmetricMatch', function() {
    beforeEach(function() {
      this.chewbaccaMatch = {
        asymmetricMatch: function(actual) {
          return actual.match(/chew(ie|bacca)/i);
        }
      };
    });

    it('matches!', function() {
      expect('chewbacca').toEqual(this.chewbaccaMatch);
      expect('cHEWIE').toEqual(this.chewbaccaMatch);
    });

    it("it doesn't!", function() {
      expect('han').not.toEqual(this.chewbaccaMatch);
      expect('luke').not.toEqual(this.chewbaccaMatch);
    });
  });
});
