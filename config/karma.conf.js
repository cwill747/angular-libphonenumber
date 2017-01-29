module.exports = function(config) {
  var customLaunchers = {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 8.1',
      version: '55'
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'Windows 8.1',
      version: '50'
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    }
  };


  var configuration = {
    basePath: __dirname + '/..',
    frameworks: ['jasmine'],
    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'dist/libphonenumber.js',
      'src/phone-number.spec.js',
      { //ignore e2e specs
        pattern: 'src/**/*.e2e.js',
        included: false,
        served: false,
        watched: false
      },
      'src/phone-number.js'
    ],
    port: 9876,
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'src/phone-number.js': ['coverage']
    },
    coverageReporter: {
      dir: 'coverage',
      reporters: [{
        type: 'lcov',
        subdir: 'report-lcov'
      }, {
        type: 'html',
        subdir: 'report-html'
      }]
    },
    colors: true,
    autoWatch: false,
    singleRun: false,
    browsers: ['Chrome'],
    customLaunchers: {
      // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
      Chrome_travis_ci: {
        base: 'Firefox'
      }
      // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
    }
  };


  if (process.env.TRAVIS) {
    configuration.customLaunchers = customLaunchers;
    configuration.browsers = Object.keys(customLaunchers);
    configuration.singleRun = true;
    configuration.sauceLabs= {
      testName: 'angular-libphonenumber Unit Tests',
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      startConnect: false,
    };

    configuration.reporters.push('coveralls', 'saucelabs');
  }

  config.set(configuration);
};
