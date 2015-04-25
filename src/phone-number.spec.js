/* global describe, it, expect, element, browser, by, protractor */
describe('phoneValidator', function() {
  beforeEach(function() {
    browser.get('/demo/index.html');
  });

  it('should load the demo page', function() {
    expect(browser.getTitle()).toEqual('Angular libphonenumber Demo');
  });

  describe('phone-number:', function() {
    var runTests = function(input) {
      var BS = protractor.Key.BACK_SPACE;
      var tests = [
        {key: '1', viewValue: '1', modelValue: '1'},
        {key: '2', viewValue: '12', modelValue: '12'},
        {key: '3', viewValue: '1 23', modelValue: '123'},
        {key: '4', viewValue: '1 234', modelValue: '1234'},
        {key: '5', viewValue: '1 234-5', modelValue: '12345'},
        {key: '6', viewValue: '1 234-56', modelValue: '123456'},
        {key: '7', viewValue: '1 234-567', modelValue: '1234567'},
        {key: '8', viewValue: '1 234-567-8', modelValue: '12345678'},
        {key: '9', viewValue: '1 234-567-89', modelValue: '123456789'},
        {key: '0', viewValue: '1 234-567-890', modelValue: '1234567890'},
        {key: '1', viewValue: '1 234-567-8901', modelValue: '12345678901'},
        {key: BS, viewValue: '1 234-567-890', modelValue: '1234567890'},
        {key: BS, viewValue: '1 234-567-89', modelValue: '123456789'},
        {key: BS, viewValue: '1 234-567-8', modelValue: '12345678'},
        {key: BS, viewValue: '1 234-567', modelValue: '1234567'},
        {key: BS, viewValue: '1 234-56', modelValue: '123456'},
        {key: BS, viewValue: '1 234-5', modelValue: '12345'},
        {key: BS, viewValue: '1 234', modelValue: '1234'},
        {key: BS, viewValue: '1 23', modelValue: '123'},
        {key: BS, viewValue: '12', modelValue: '12'},
        {key: BS, viewValue: '1', modelValue: '1'},
        {key: BS, viewValue: '', modelValue: ''}
      ];

      for (var i = 0; i < tests.length; i++) {
        input.sendKeys(tests[i].key);
        expect(input.getAttribute('value')).toEqual(tests[i].viewValue);
        //expect(value.getText()).toEqual(tests[i].modelValue);
      }
    };

    it('should apply a phone number mask while the user is typing:', function() {
      var input = element(by.id('phoneNumberTest'));
      var value = element(by.id('phoneNumberTest'));
      element(by.id('countrycode')).sendKeys('us');
      runTests(input, value);
    });

    //it('should apply a phone number mask in a model with default value:', function () {
    //  var input = element(by.id('init-us-phone-input')),
    //    value = element(by.id('init-us-phone-value'));
    //
    //  expect(input.getAttribute('value')).toEqual('(313) 353-6767');
    //  input.clear();
    //
    //  runTests(input, value);
    //});
  });
});
