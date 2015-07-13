# angular-libphonenumber - [AngularJS](http://angularjs.org/) input masks for phone numbers
[![Bower](https://img.shields.io/bower/v/angular-libphonenumber.svg?style=flat-square)]()
[![Build Status](http://img.shields.io/travis/cwill747/angular-libphonenumber.svg?style=flat-square)](https://travis-ci.org/cwill747/angular-libphonenumber)
[![Coverage Status](https://img.shields.io/coveralls/cwill747/angular-libphonenumber.svg?style=flat-square)](https://coveralls.io/r/cwill747/angular-libphonenumber?branch=master)
[![Code Climate](https://img.shields.io/codeclimate/github/cwill747/angular-libphonenumber.svg?style=flat-square)](https://codeclimate.com/github/cwill747/angular-libphonenumber)
[![David](https://img.shields.io/david/dev/cwill747/angular-libphonenumber.svg?style=flat-square)]()
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
