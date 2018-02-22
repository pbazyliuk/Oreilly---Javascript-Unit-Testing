// None of these functions will actually be called once an expectation is set
// An interface
var UserStore = {
  save: function() { console.log('this will not be called once mocked'); throw new Error(); },
  find: function() { throw new Error('whoops!'); },
  delete: function() {},
  update: function() {},
};
// An implementation
var userStore = Object.create(UserStore);

// Object that uses dependency
var UserView = function(userStore) {
  this.userStore = userStore;
};
UserView.prototype.save = function(userObj) {
  return this.userStore.save(userObj);
};
UserView.prototype.update = function(userObj) {
  return this.userStore.update(userObj);
};

describe('Sinon Mocks', function() {
  beforeEach(function() {
    this.mockUserStore = sinon.mock(userStore);
    this.userView = new UserView(userStore);
  });

  afterEach(function() {
    expect(this.mockUserStore.verify.bind(this.mockUserStore)).not.toThrow();
    this.mockUserStore.restore();
  });

  it('basic expectation', function() {
    // expectation replace original method with empty stub
    var stub = this.mockUserStore.expects('save').exactly(1);
    this.userView.save({ name: 'mark', color: 'blue' });
    expect(stub.calledOnce).toBeTruthy(); // spy API
    this.mockerUserStore.verify();
  });

  it('atleast / atmost expectation', function() {
    var stub = this.mockUserStore.expects('save').atLeast(1).atMost(2);
    this.userView.save({ name: 'mark', color: 'blue' });
    this.userView.save({ name: 'mark', color: 'blue' });

    expect(stub.calledTwice).toBeTruthy(); // spy API
  });

  it('verifying expectations', function() {
    this.mockUserStore.expects('save').never(); // Expectation API
    this.mockUserStore.expects('update').once().on(userStore).returns(99);

    var ret = this.userView.update({ name: 'mark', color: 'blue' });

    expect(ret).toBe(99); 
  });

  it('verifying expectations and stubs', function() {
    this.mockUserStore.expects('save').never(); // Expectation API
    sinon.stub(userStore, 'update').returns(99); // Use stub API

    var ret = this.userView.update({ name: 'mark', color: 'blue' });

    expect(ret).toBe(99); 

    // Can verify this now
    expect(userStore.update.returned(99)).toBeTruthy();  // Use spy API
  });

  it('with expectation', function() {
    var userObject = { name: 'mark', color: 'blue' };
    this.mockUserStore.expects('save').withArgs(userObject);
    this.userView.save(userObject);
  });

  it('this expectation', function() {
    this.mockUserStore.expects('save').on(userStore);
    this.userView.save({ name: 'mark', color: 'blue' });
  });
});
