describe('mock XMLHttpRequest', function() {

  beforeEach(function() {
    jasmine.Ajax.install();

    this.callback = jasmine.createSpy("callback");

    this.xhr = new XMLHttpRequest();

    var me = this;
    this.xhr.onreadystatechange = function() {
      if (this.readyState == this.DONE) {
        me.callback(this.responseValue());
      }
    };
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  // Synchronous!
  it("mocks responses after send", function() {

    this.xhr.open("GET", "/users/get/33");
    this.xhr.send();

    // Now can test things that are waiting for a response
    expect(this.callback).not.toHaveBeenCalled();

    // Number of requests made
    expect(jasmine.Ajax.requests.count()).toBe(1);

    // Get most recent request
    expect(jasmine.Ajax.requests.mostRecent().url).toBe('/users/get/33');

    // Get request by index
    expect(jasmine.Ajax.requests.at(0).url).toBe('/users/get/33');

    // Get first request
    expect(jasmine.Ajax.requests.first().url).toBe('/users/get/33');

    // Get request by filter regexp
    expect(jasmine.Ajax.requests.filter(/users/)[0].url).toBe('/users/get/33');

    // Get request by filter function
    expect(jasmine.Ajax.requests.filter(
      function(request) {
        return request.method === 'GET';
      })[0].method).toBe('GET');


    // responseTimeout (need to install mock clock - will move it 30s), responseError
    jasmine.Ajax.requests.mostRecent().respondWith({
      status: 200,
      contentType: 'application/json',
      responseType: 'json',
      responseText: JSON.stringify({ name: 'mark', id: 'mark@zzo.com' })
    });

    expect(this.callback).toHaveBeenCalledWith(jasmine.objectContaining({ name: 'mark' }));

  });

  describe('stub responses', function() {

    it("success response", function() {
      var request = JSON.stringify({ color: 'green' });
      var response = { results: [ { color: 'green', size: 'large', id: 1234 } ] };
      jasmine.Ajax.stubRequest('/products/find', request, 'POST').andReturn({
        status: 200,
        contentType: 'application/json',
        responseText: response
      });

      this.xhr.open('POST', '/products/find');
      this.xhr.setRequestHeader('Content-type', 'application/json');
      this.xhr.send(request);

      expect(this.callback).toHaveBeenCalledWith(jasmine.objectContaining(response));
      expect(this.callback.calls.count()).toEqual(1);
      expect(jasmine.Ajax.requests.mostRecent().data()).toEqual(JSON.parse(request));

      this.xhr.open('GET', '/products/find');
      this.xhr.send();

      expect(this.callback.calls.count()).toEqual(1);

    });

    it("error response", function() {
      var errorCallback = jasmine.createSpy("errorCallback");

      this.xhr.addEventListener('error', errorCallback);

      jasmine.Ajax.stubRequest('/products/find').andError();
      this.xhr.open('GET', '/products/find');
      this.xhr.send();

      expect(errorCallback).toHaveBeenCalled();
    });
    
    it("timeout response", function() {
      jasmine.clock().install();
      var now = new Date();
      jasmine.clock().mockDate(now);

      var timeoutCallback = jasmine.createSpy("timeoutCallback");

      this.xhr.addEventListener('timeout', timeoutCallback);

      jasmine.Ajax.stubRequest('/products/find').andTimeout();
      this.xhr.open('GET', '/products/find');
      this.xhr.send();

      expect(timeoutCallback).toHaveBeenCalled();
      expect(new Date().getTime()).toEqual(now.getTime() + 30000)

      jasmine.clock().uninstall();
    });
  });
});

describe('one shot ajax mock', function() {
  it('one shot', function() {

    jasmine.Ajax.withMock(function() {
      var callback = jasmine.createSpy("callback");
      var xhr = new XMLHttpRequest();

      var me = this;
      xhr.onreadystatechange = function() {
        if (this.readyState == this.DONE) {
          callback(this.responseValue());
        }
      };

      var response = { status: 'deleted' };
      jasmine.Ajax.stubRequest('/users/33', null, 'DELETE').andReturn({
        status: 200,
        contentType: 'application/json',
        responseText: response
      });

      xhr.open('DELETE', '/users/33');
      xhr.send();

      expect(callback).toHaveBeenCalledWith(jasmine.objectContaining(response));
      expect(callback.calls.count()).toEqual(1);
    });
  });
});
