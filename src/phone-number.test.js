var TestUtil = {
  compile: function(html, initialScope) {
    var container;

    inject(function($compile, $rootScope) {
      if (angular.isDefined(initialScope)) {
        angular.extend($rootScope, initialScope);
      }

      container = $compile(html)($rootScope);
      $rootScope.$apply();
    });

    return container;
  }
};

describe('phonenumber', function() {
  beforeEach(module('cwill747.phonenumber'));

  it('should register a $parser and a $formatter', function() {
    var input = TestUtil.compile('<input ng-model="model">');
    var model = input.controller('ngModel');

    var maskedInput = TestUtil.compile('<input type="text" ng-model="maskedModel" phone-number country-code="us">');
    var maskedModel = maskedInput.controller('ngModel');

    expect(maskedModel.$parsers.length).toBe(model.$parsers.length + 2);
    expect(maskedModel.$formatters.length).toBe(model.$formatters.length + 2);
  });

  it('should format initial model values', function() {
    var input = TestUtil.compile('<input type="text" ng-model="model" phone-number ' +
      'country-code="us">', {
      model: '3011201034'
    });

    var model = input.controller('ngModel');
    expect(model.$viewValue).toBe('(301) 120-1034');
  });

  it('should fail silently with a non-valid country code', function() {
    var input = TestUtil.compile('<input type="text" ng-model="model" phone-number ' +
      'country-code="xx">', {
      model: '3011201034'
    });

    var model = input.controller('ngModel');
    expect(model.$valid).toBeFalsy();
  });

  it('should format the number as it is typed', function() {
    var input = TestUtil.compile('<input type="text" ng-model="model" phone-number ' +
      'country-code="us">');
    var model = input.controller('ngModel');

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
      {key: '1', viewValue: '1 234-567-8901', modelValue: '12345678901'}
    ];

    for (var i = 0; i < tests.length - 1; i++) {
      input.val(tests[i].modelValue).triggerHandler('input');
      expect(model.$viewValue).toBe(tests[i].viewValue);
      expect(model.$modelValue).toBe(tests[i].modelValue);
      expect(model.$valid).toBeFalsy();
    }
    input.val(tests[tests.length - 1].modelValue).triggerHandler('input');
    expect(model.$viewValue).toBe(tests[tests.length - 1].viewValue);
    expect(model.$modelValue).toBe(tests[tests.length - 1].modelValue);
    expect(model.$valid).toBeTruthy();
  });
  it('should ignore non digits', function() {
    var input = TestUtil.compile('<input type="text" ng-model="model" phone-number ' +
      'country-code="us">');
    var model = input.controller('ngModel');

    var tests = [
      {value:'@', viewValue:'', modelValue:''},
      {value:'2-', viewValue:'2', modelValue:'2'},
      {value:'23a', viewValue:'23', modelValue:'23'},
      {value:'23_34', viewValue:'233-4', modelValue:'2334'},
      {value:'23346!', viewValue:'233-46', modelValue:'23346'},
      {value:'23346!32400', viewValue:'(233) 463-2400', modelValue:'2334632400'},
    ];

    tests.forEach(function(test) {
      input.val(test.value).triggerHandler('input');
      expect(model.$viewValue).toBe(test.viewValue);
      expect(model.$modelValue).toBe(test.modelValue);
    });
  });
});