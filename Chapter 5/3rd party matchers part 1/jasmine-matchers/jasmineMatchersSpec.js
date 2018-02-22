describe('jasmine-matchers', function() {
  it('arrays', function() {
    expect([{}, {}]).toBeArrayOfObjects();
    expect({ mark: 92009 }).not.toHaveArray('mark');
    expect({ anArray: [ 1, 3, 5 ] }).toHaveArrayOfNumbers('anArray');
  });

  it('booleans', function() {
    expect(false).toBeBoolean();
    expect(true).not.toBeFalse();
    expect({ bool: true }).toHaveTrue('bool');
  });

  it('dates', function() {
    expect({ now: new Date('2010') }).toHaveDateBefore('now', new Date());
    expect(new Date()).toBeAfter(new Date(1999));
  });

  it('functions', function(done) {
    expect(done).toBeFunction();
    expect({ afunc: function() {} }).toHaveMethod('afunc');
    done();
  });

  it('numbers', function() {
    expect(8 + 7).toBeOddNumber();
    expect({ number: 88 }).toHaveEvenNumber('number');
  });

  it('objects', function() {
    expect(this).toBeEmptyObject();
    expect({ mark: 'foo' }).toHaveMember('mark');
    expect({ mark: 'foo' }).not.toHaveMember('you');
    expect({}).toImplement(new Object());
  });

  it('strings', function() {
    expect('<p>a paragraph</p>').toBeHtmlString();
    expect(JSON.stringify({ mark: 'foo' })).toBeJsonString();
    expect({ mark: 'foo' }).toHaveStringLongerThan('mark', 'I');
    expect({ mark: '   \t\n'}).toHaveWhitespaceString('mark');
  });
});
