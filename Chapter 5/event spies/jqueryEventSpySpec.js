describe('jquery event spies', function() {
  beforeEach(function() {
    this.button = $('#button');

    this.button.on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
    });

    this.clickSpyEvent = spyOnEvent(this.button, 'click');
  });

  it('spy on click', function() {
    this.button.trigger('click');

    expect(this.clickSpyEvent).toHaveBeenTriggered();
    expect(this.clickSpyEvent).toHaveBeenStopped();
    expect(this.clickSpyEvent).toHaveBeenPrevented();

    expect('click').toHaveBeenTriggeredOn('#button');
    expect('click').toHaveBeenStoppedOn(this.button);
    expect('click').toHaveBeenPreventedOn(this.button);
  });

  it('spy on keypress', function() {
    var keyPressEvent = spyOnEvent(this.button, 'keypress');

    this.button.keypress(function(event) {
      event.stopImmediatePropagation();
    });

    expect(this.button).toHandle('keypress');

    this.button.trigger({
      type: 'keypress',
      which: 13
    });

    expect(keyPressEvent).toHaveBeenTriggered();
    expect(keyPressEvent).toHaveBeenStopped();

    this.button.off('keypress');
  });

  it('cannot spy on stopImmediate', function() {
    this.button.keypress(function(event) {
      event.stopImmediatePropagation();
    });

    var keyPressEvent = spyOnEvent(this.button, 'keypress');

    expect(this.button).toHandle('keypress');

    this.button.trigger({
      type: 'keypress',
      which: 13
    });

    expect(keyPressEvent).not.toHaveBeenTriggered();
    expect(keyPressEvent).not.toHaveBeenStopped();

    expect('keypress').not.toHaveBeenTriggeredOn('#button');
    expect('keypress').not.toHaveBeenStoppedOn(this.button);
    expect('keypress').not.toHaveBeenPreventedOn(this.button);

    this.button.off('keypress');
  });

});
