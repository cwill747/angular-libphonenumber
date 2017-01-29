var config = {
  framework: 'jasmine',
  baseUrl: 'http://localhost:8000',
  onPrepare: function () {
    var caps = browser.getCapabilities()
  },
  specs: ['src/phone-number.e2e.js'],
  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000
  },
  allScriptsTimeout: 20000,
  multiCapabilities: [{
    browserName: 'firefox'
  }, {
    browserName: 'chrome'
  }]
};

if (process.env.TRAVIS) {
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.multiCapabilities = [{
    browserName: 'firefox',
    version: '50',
    platform: 'Windows 8.1',
    name: "firefox-tests",
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER
  }, {
    browserName: 'chrome',
    version: '55',
    platform: 'Windows 8.1',
    name: "chrome-tests",
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER
  }];
}

exports.config = config;
