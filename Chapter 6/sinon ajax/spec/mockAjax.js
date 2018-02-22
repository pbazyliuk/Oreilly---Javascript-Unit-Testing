function getUsers(query, cb) {
  $.getJSON('/users?query=' + encodeURIComponent(query), function(data) {
    cb(data);
  });
}

describe('Sinon AJAX', function() {
  beforeEach(function() {
    this.fakeXHR = sinon.useFakeXMLHttpRequest();
    this.requests = [];
    var me = this;
    this.fakeXHR.onCreate = function(xhr) {
      me.requests.push(xhr);
    };
  });

  afterEach(function() {
    this.fakeXHR.restore();
  });

  it('basic', function(done) {
    var returnData = { mark: 'rox' };

    var callback = function(data) { 
      expect(data).toEqual(returnData);
      done();
    };

    getUsers('', callback);

    expect(this.requests.length).toBe(1);
    expect(this.requests[0].url).toBe('/users?query=');
    expect(this.requests[0].method).toBe('GET');
    expect(this.requests[0].async).toBeTruthy();

    this.requests[0].respond(200, [], JSON.stringify(returnData));
  });
});

describe('Sinon Fake Server', function() {
  beforeEach(function() {
    this.fakeServer = sinon.fakeServer.create();
  });

  afterEach(function() {
    this.fakeServer.restore();
  });

  it('basic', function(done) {
    var returnData = { mark: 'rox' };

    var callback = function(data) { 
      expect(data).toEqual(returnData);
      done();
    };

    this.fakeServer.respondWith(
      'GET',  // for GET requests..
      /users/, // to this URL..
      // Return:
      [ 200,  // server status
        { 'Content-Type': 'application/json' }, // Headers
        JSON.stringify(returnData) // Response body
      ]
    );

    getUsers('', callback);
    this.fakeServer.respond();
  });
});
