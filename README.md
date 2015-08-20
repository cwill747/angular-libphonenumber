# angular-libphonenumber - [AngularJS](http://angularjs.org/) input masks for phone numbers

[![Bower version][bower-image]][bower-url] [![Dependencies status][dep-status-image]][dep-status-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Code Climate][code-climate-image]][code-climate-url] [![Apache license][license-image]][license-url]

## Description
angular-libphonenumber is an angular directive that can be used as an input mask.
By default, all numbers are formatted in US format, but the format can be set with
the `country-code` descriptor. It uses 
[nathanhammond/libphonenumber](https://github.com/nathanhammond/libphonenumber) as a formatter
for phone number's, which calls 
[Google's libphonenumber](https://github.com/googlei18n/libphonenumber)
to format numbers as you type them. 

## Installation
Using [Bower](http://bower.io/):

```
bower install --save angular-libphonenumber
```
Then include it in your angular application:
```javascript
angular.module('myModule', ['cwill747.phonenumber']);
```

## Support
If you are having any questions or issues getting things to work, you can:

* Ask a question in [stackoverflow](http://stackoverflow.com/) under the [angular-libphonenumber](http://stackoverflow.com/questions/tagged/angular-libphonenumber) tag.

Project's issue on GitHub should be used discuss bugs and features.

## Contributing to the project

We welcome any contributions to the project. Please check the [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

Check out our contributors [here](https://github.com/cwill747/angular-libphonenumber/graphs/contributors)

### Development
#### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install global dev dependencies: `npm install -g gulp karma`
* Install local dev dependencies: `npm install` while current directory is angular-libphonenumber repo

#### Build
* Build the whole project: `gulp` - this will run `jshint`, `test`, and `build` targets

### Release
* Bump up version number in `package.json` or by running [npm version](https://docs.npmjs.com/cli/version)
* Commit the version change with the following message: `chore(release): [version number]`
* tag
* push changes and a tag (`git push --tags`)


[bower-image]: https://img.shields.io/bower/v/angular-libphonenumber.svg?style=flat-square
[bower-url]: http://bower.io/search/?q=angulartics-libphonenumber
[build-image]: http://img.shields.io/travis/cwill747/angular-libphonenumber.svg?style=flat-square
[build-url]: https://travis-ci.org/cwill747/angular-libphonenumber
[dep-status-image]: https://img.shields.io/david/cwill747/angular-libphonenumber.svg?style=flat-square
[dep-status-url]: https://david-dm.org/cwill747/angulartics-libphonenumber
[coverage-image]: https://img.shields.io/coveralls/cwill747/angular-libphonenumber.svg?style=flat-square
[coverage-url]: https://coveralls.io/r/cwill747/angular-libphonenumber?branch=master
[code-climate-image]: https://img.shields.io/codeclimate/github/cwill747/angular-libphonenumber.svg?style=flat-square
[code-climate-url]: https://codeclimate.com/github/cwill747/angular-libphonenumber
[license-image]: http://img.shields.io/badge/license-Apachev2-blue.svg?style=flat-square
[license-url]: http://www.apache.org/licenses/LICENSE-2.0