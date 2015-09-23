/**
 * angular-libphonenumber
 * Nathan Hammond's libphonenumber ported to an angular filter
 * @version v0.0.4
 * @link https://github.com/cwill747/angular-libphonenumber
 * @license Apache-2.0
 */
(function (angular) {

/**
 * @ngdoc filter
 * @name phone-number
 * @kind function
 *
 * @description
 * filters a user typed phone number into a formatted number
 *
 */
/* global phoneUtils, angular */
angular.module('cwill747.phonenumber', [])
  .directive('phoneNumber', ['$log', function($log) {
    function clearValue(value) {
      if (!value) {
        return value;
      }
      return value.replace(/([^0-9|+])/g, '');
    }

    function applyPhoneMask(value, region) {
      var phoneMask = value;
      try {
        phoneMask = phoneUtils.formatAsTyped(value, region);
      }
      catch (err) {
        $log.debug(err);
      }
      return phoneMask;
    }

    return {
      restrict: 'A',
      require: '?ngModel',
      scope: {
        countryCode: '='
      },
      controllerAs: '',
      controller: function() {
        this.countryCode = this.countryCode || 'us';
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch('countryCode', function() {
          ctrl.$modelValue = ctrl.$viewValue + ' ';
        });
        function formatter(value) {
          if (ctrl.$isEmpty(value)) {
            return value;
          }
          return applyPhoneMask(clearValue(value), scope.countryCode);
        }

        function parser(value) {
          if (ctrl.$isEmpty(value)) {
            return value;
          }

          var formattedValue = clean(value);
          return clearValue(formattedValue);
        }
        
        function clean(value) {
          var cleanValue = clearValue(value);
          var formattedValue = '';
          if (cleanValue && cleanValue.length > 1) {
            formattedValue = applyPhoneMask(cleanValue, scope.countryCode);
          }
          else {
            formattedValue = cleanValue;
          }
          return formattedValue;
        }
        
        element.on('keyup', function() {
          var x = ctrl.$viewValue;
          var y = clean(x);
          if(x && y) {
            var start = this.selectionStart;
            var end = this.selectionEnd + y.length - x.length;
            if(x.length < y.length) {
              start = start + (y.length - x.length);
            }
            if(x !== y) {
              ctrl.$setViewValue(y);
              ctrl.$render();
            }
            this.setSelectionRange(start, end);
          }
        });

        function validator(value) {
          var isValidForRegion = false;
          try {
            isValidForRegion = phoneUtils.isValidNumberForRegion(value, scope.countryCode);
          }
          catch (err) {
            $log.debug(err);
          }
          var valid = ctrl.$isEmpty(value) || isValidForRegion;
          ctrl.$setValidity('phoneNumber', valid);
          return value;
        }

        ctrl.$formatters.push(formatter);
        ctrl.$formatters.push(validator);
        ctrl.$parsers.push(parser);
        ctrl.$parsers.push(validator);
      }
    };

  }]);

})(angular);
