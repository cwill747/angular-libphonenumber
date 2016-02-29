module.exports = function(wallaby) {
  return {
    files: [
      '../bower_components/jquery/dist/jquery.js',
      '../bower_components/angular/angular.js',
      '../bower_components/angular-mocks/angular-mocks.js',
      '../dist/libphonenumber.js',
      '../src/phone-number.js'
    ],

    tests: [
      '../src/phone-number.test.js'
    ]
  };
};