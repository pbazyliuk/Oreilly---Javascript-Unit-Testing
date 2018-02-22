describe('Totally fake spies', function() {
  describe("Create Spy", function() {
    beforeEach(function() {
      this.totallyFake = jasmine.createSpy('totallyFake');
    });

    it('spies on a function', function() {
      this.totallyFake();
      expect(this.totallyFake).toHaveBeenCalled();
    });

    it('spies on function parameters', function() {
      this.totallyFake(33);
      expect(this.totallyFake).toHaveBeenCalledWith(33);
    });

    it('spies on multiple function parameters', function() {
      this.totallyFake(33, 'mark');
      expect(this.totallyFake).toHaveBeenCalledWith(33, 'mark');
    });

    it('spies on a function but does not call through', function() {
      var next = this.totallyFake(33);
      expect(this.totallyFake).toHaveBeenCalledWith(33);
      expect(next).toBeUndefined();
    });

    it('spies on a function and calls through', function() {
  //    spyOn(this, 'increment').and.callThrough;
      var next = this.totallyFake(33);
      expect(this.totallyFake).toHaveBeenCalledWith(33);
      expect(this.totallyFake).toHaveBeenCalledWith(jasmine.any(Number));
      expect(next).toBeUndefined();
    });

    it('spies on a function and returns whatever', function() {
      this.totallyFake.and.returnValue(99);
      var next = this.totallyFake(33);
      expect(this.totallyFake).toHaveBeenCalledWith(33);
      expect(next).toBe(99);
    });

    it('spies on a function and calls whatever', function() {
      this.totallyFake.and.callFake(function(val){
        return val * 2;
      });
      var next = this.totallyFake(33);
      expect(this.totallyFake).toHaveBeenCalledWith(33);
      expect(next).toBe(66);
    });

    it('spies on a function and throws whatever', function() {
      this.totallyFake.and.throwError('FAKE ERROR');
      var me = this;
      expect(function() { me.totallyFake(33); }).toThrowError('FAKE ERROR');
    });
    
    it('spies on a function and then stubs', function() {
      this.totallyFake.and.throwError('FAKE ERROR');
      var me = this;
      expect(function() { me.totallyFake(33); }).toThrowError('FAKE ERROR');

      this.totallyFake.and.stub();
      this.totallyFake(33);
      expect(this.totallyFake).toHaveBeenCalledWith(33);
    });

    it('spies on multiple calls', function() {

      this.totallyFake(33);
      this.totallyFake(27);
      this.totallyFake(2390);

      expect(this.totallyFake.calls.count()).toBe(3);
    });

    it('spies on multiple calls and gets arguments', function() {
      this.totallyFake(33);
      this.totallyFake(27);
      this.totallyFake(2390, 'mark');

      expect(this.totallyFake.calls.argsFor(0)).toEqual([33]);
      expect(this.totallyFake.calls.argsFor(1)).toEqual([27]);
      expect(this.totallyFake.calls.argsFor(2)).toEqual([2390, 'mark']);
      expect(this.totallyFake.calls.argsFor(2)).toEqual(jasmine.arrayContaining([2390]));
    });

    it('spies on multiple calls and gets "this"', function() {
      var me = { mark: 'rox' };
      this.totallyFake.call(me, 33);

      var you = { you: 'rule' };
      this.totallyFake.call(you, 55);

      expect(this.totallyFake.calls.first()).toEqual({
        object: me,
        args: [33],
        returnValue: undefined
      });

      expect(this.totallyFake.calls.mostRecent()).toEqual({
        object: you,
        args: [55],
        returnValue: undefined
      });
    });

    it('spies on multiple calls and resets', function() {
      this.totallyFake(33);
      this.totallyFake(27);
      this.totallyFake(2390);

      expect(this.totallyFake.calls.count()).toBe(3);

      this.totallyFake.calls.reset();
      expect(this.totallyFake.calls.count()).toBe(0);
    });
  });

  describe("Create Spy Object", function() {
    beforeEach(function() {
      this.userStorage = jasmine.createSpyObj('userStorage',
        [ 
          'save',
          'get',
          'delete',
          'search',
        ]);

      this.user = new User(this.userStorage);
      this.userData = { name: 'mark', id: 'mark@zzo.com' };
    });

    it('saves a user', function() {
      this.user.save(this.userData);

      expect(this.user).toEqual(jasmine.any(User));
      expect(this.userStorage.save).toHaveBeenCalledWith(this.userData);
    });

    it('gets a user', function() {
      this.userStorage.get.and.returnValue(this.userData);
      var foundUser = this.user.get('mark@zzo.com');

      expect(this.userStorage.get).toHaveBeenCalledWith('mark@zzo.com');
      expect(foundUser).toEqual(this.userData);
    });
  });
});
