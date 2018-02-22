describe('saywhen', function() {
  beforeEach(function() {
    this.spy = jasmine.createSpy('spy');
  });

  it('default return', function() {
    when(this.spy).isCalled.thenReturn('lovely');
    expect(this.spy('weoi', 23, ['a', 'b' ], {})).toBe('lovely');
  });

  it('isCalledWith', function() {
    when(this.spy).isCalled.thenReturn('default');
    when(this.spy).isCalledWith(47, jasmine.any(Array)).thenReturn('fun!');
    when(this.spy).isCalledWith(jasmine.any(String)).thenReturn('so long');
    expect(this.spy('howdy')).toBe('so long');
    expect(this.spy(47, ['howdy'])).toBe('fun!');
    expect(this.spy({ something: 'else' })).toBe('default');

    expect(this.spy).toHaveBeenCalled();
    expect(this.spy).toHaveBeenCalledWith('howdy');
    expect(this.spy).toHaveBeenCalledWith(47, ['howdy']);
    expect(this.spy).toHaveBeenCalledWith({ something: 'else' });
  });

  it('return mix and match', function() {
    when(this.spy).isCalled.thenReturn('lovely');
    when(this.spy).isCalledWith('howdy').thenReturn('so long');
  
    expect(this.spy('howdy')).toBe('so long');
    expect(this.spy('say what')).toBe('lovely');
  });

  it('andFake', function() {
    when(this.spy).isCalled.thenReturn('spiffy');
    when(this.spy).isCalledWith(33).then(function(arg) {
      return arg + 1;
    });
    expect(this.spy(33)).toBe(34);

    when(this.spy).isCalledWith(jasmine.any(RegExp)).then(function(arg) {
      return 'regexp!';
    });
    expect(this.spy(/match me/)).toBe('regexp!');

  });

  it('throw', function() {
    when(this.spy).isCalledWith(jasmine.any(String)).thenThrow(new TypeError('A Number? Really?'));
    expect(this.spy.bind(null, 'throw')).toThrowError('A Number? Really?');
    expect(this.spy.bind(null, 33)).not.toThrowError();
  });

  it('multiple calls', function() {
    when(this.spy).isCalled.thenReturn('first time')
                            .thenReturn('second time')
                            .thenReturn('third time');

    expect(this.spy()).toMatch(/first/);
    expect(this.spy()).toMatch(/second/);
    expect(this.spy()).toMatch(/third/);
  });

  it('captors', function() {
    var captor = when.captor();
    when(this.spy).isCalledWith('a', 'b', captor);

    this.spy('a', 'b', 'first');
    this.spy('a', 'b', 'second');
    this.spy('a', 'third?');
    this.spy('a', 'b', 'third');

    expect(captor.values()).toEqual(['first', 'second', 'third']);
    expect(captor.latest).toBe('third');
  });

  it('captors specific values', function() {
    var captor = when.captor(jasmine.any(Object));
    when(this.spy).isCalledWith(captor).thenReturn('you win!');

    expect(this.spy({})).toEqual('you win!');
    expect(this.spy({ mark: 'is here' })).toEqual('you win!');
    expect(this.spy(33)).toBeUndefined();
  });
});
