describe('jquery matchers', function() {

  beforeEach(function() {
    this.textElem = $('input[type=text]');
  });

  it('form', function() {
    expect($('input[type=checkbox]')).toBeChecked();
    expect($('option[selected]')).toBeSelected();
    expect(this.textElem).toHaveValue('disabled') //input, textarea
  });

  it('dom', function() {
    $('[checked]').focus();
    expect('[checked]').toBeFocused();
    expect($('#hidden')).toBeHidden();
    expect(document.getElementById('hidden')).toBeHidden();
    expect(document.querySelector('#hidden')).toBeHidden();
    expect($('div')).toBeInDOM();
    expect($(this.textElem)).toBeInDOM();
    expect($('<div></div>')).not.toBeInDOM();
    expect($('#hidden')).not.toBeVisible();
    expect($('#css')).toBeVisible();
    expect($('#empty')).toBeEmpty(); // child dom elements or text
    expect($('#css')).toBeEmpty(); // child dom elements or text
    expect(document.body).not.toBeEmpty(); // child dom elements or text
    expect(this.textElem).toBeDisabled();

    expect($('<span></span')).toExist();
    expect(this.textElem).toBeMatchedBy('[value=disabled]');
    expect($('<div></div>')).toEqual('div');
    expect($('input')).toHaveLength(2) // how many elements match
  });

  it('events', function() {
    var eventHandler = function(event) { /* fun */ };
    this.textElem.click(eventHandler);
    expect(this.textElem).toHandle('click');
    expect(this.textElem).toHandleWith('click', eventHandler);
  });

  it('metadata / html data', function() {
    var data = { super: 'secret' };
    this.textElem.data(data);
    expect(this.textElem).toHaveData('super'); // .data()
    expect(this.textElem).toHaveData('super', 'secret'); // .data()

    expect(this.textElem).toHaveProp('disabled'); // .prop()

    expect(this.textElem).toHaveAttr('value'); // .attr()
    expect(this.textElem).toHaveAttr('value', 'disabled'); // .attr()
  });

  it('recursive html element search', function() {
    expect($('#contain')).toContainElement('div[class=contained]'); // .find(selector)
  });

  it('finds text, html, or css', function() {
    // .html()
    // full match ==
    expect($('#second-option')).toHaveHtml('What about me?'); // all HTML
    // match anywhere in .html() (not regexp)
    expect($('#second-option')).toContainHtml('about'); // Some HTML

    // not everything!
    expect($('form')).not.toHaveHtml('<option selected> Pick Me! </option>');
    expect($('form')).toContainHtml('<option selected> Pick Me! </option>');

    // .text() - not trimmed - string or regexp
    expect($('option[selected]')).toHaveText(' Pick Me! ');
    expect($('option[selected]')).toHaveText(/^ Pick/);
    expect($('option[selected]')).toHaveText(/pick me/i);

    // .text() - trimmed - string or regexp
    expect($('option[selected]')).not.toContainText(' Pick Me! ');
    expect($('option[selected]')).toContainText('Pick Me!');
    expect($('option[selected]')).toContainText(/Pick/);
    expect($('option[selected]')).not.toContainText(/ $/);

    // .attr('id')
    expect($(this.textElem)).toHaveId('textId');

    // .hasClass(...)
    expect($('div[class=contained')).toHaveClass('contained');
    expect($('<div class="foo moo goo"></div>')).toHaveClass('moo');

    // .css(...)
    expect($('#hidden')).toHaveCss({ display: 'none' });
    expect($('#css')).toHaveCss({ borderColor: 'rgb(255, 0, 0)' });
  });
});
