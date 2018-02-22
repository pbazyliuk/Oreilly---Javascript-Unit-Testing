describe('custom matchers', function() {
  describe('toBeType', function() {
    it('toBeType basic', function() {
      expect([]).toBeType('object', 'type is wrong!');
      expect([]).toBeType(Object);
      expect(4).toBeType('number');
    });
    it('toBeType custom', function() {
      function Car() {};
      var myCar = new Car();
      expect(myCar).toBeType(Car);
      expect(myCar).toBeType('object');
    });
    it('toBeType nulls', function() {
      expect(null).toBeType('object');
      expect(null).not.toBeType(Object);
    });
    it('toBeType undefined', function() {
      var a;
      expect(a).toBeType('undefined');
      expect(a).not.toBeType(Function);
    });
    it('toBeType functions', function() {
      var a = function() {};
      expect(a).toBeType('function');
      expect(a).toBeType(Function);
    });
    it('toBeType ES6', function() {
      'use strict';
      var A = class {}
      expect(A).toBeType('function');
      expect(A).toBeType(Function);
    });
  });
  describe('toBeVisible', function() {
    beforeEach(function() {
      document.getElementById('fixture').innerHTML = '<div id="mark"></div>';
    });

    afterEach(function() {
      document.getElementById('fixture').innerHTML = '';
    });

    it('toBeVisible simple', function() {
      var elem = document.getElementById('mark');
      expect(elem).toBeVisible('where is mark?');
      expect(document.body).not.toBeVisible('body has offset?');
    });

    it('toBeVisible error', function() {
      var elem = document.getElementById('mark');
      expect(elem).not.toBeVisible('where is mark?');
      expect(document.body).toBeVisible('body has offset?');
    });
  });
});
