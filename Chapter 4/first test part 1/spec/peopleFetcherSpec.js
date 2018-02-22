describe('fetch people', function() {
  beforeAll(function() {
    this.fixture = document.getElementById('html-fixture');
  });

  beforeEach(function() {
    this.fixture.innerHTML = '<input id="pid" type="number" value="33"></input><div id="person"></div>';
  });

  afterEach(function() {
    this.fixture.innerHTML = '';
  });

  it('should return a Promise', function() {
    fail('this is bad');
    var x = fetchPerson(1);
    expect(typeof x.then).toBe('function')
  });

  it('should call swapi with correct params', function(done) {
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(
      {
        ok: true,
        blob: function() { 
          return new Blob([JSON.stringify({ high: 'mighty' })], { type: 'application/json' }); }
      }
    ));
    var x = fetchPerson(1);
    expect(window.fetch).toHaveBeenCalledWith('https://swapi.co/api/people/1/?format=json');
    x.then(function(person) {
      expect(person.high).toBe('mighty');
      done();
    });
  });

  it('should register for the submit event', function() {
    var formElement = jasmine.createSpyObj('form', ['addEventListener']);
    handleForm(formElement);
    expect(formElement.addEventListener).toHaveBeenCalledWith("submit", jasmine.any(Function));
  });

  it('should prevent default submit event handling', function() {
    var event = jasmine.createSpyObj('event', ['preventDefault']);
    submitHandler(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should call fetchPerson correctly', function() {
    var event = jasmine.createSpyObj('event', ['preventDefault']);
    spyOn(window, 'fetchPerson').and.returnValue(Promise.resolve({}));
    submitHandler(event);
    expect(window.fetchPerson).toHaveBeenCalledWith('33');
  });
});
