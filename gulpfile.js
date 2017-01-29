var express = require('express');
var gulp = require('gulp');
var Server = require('karma').Server;
var path = require('path');
var plugins = require('gulp-load-plugins')({
  config: path.join(__dirname, 'package.json')
});
var gutil = require('gulp-util');

var noop = function() {};
var pkg = require('./package.json');
var header = ['/**',
    ' * <%= pkg.name %>',
    ' * <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    '(function (angular) {',
    '',
    ''
  ].join('\n');
var footer = [
    '',
    '})(angular);',
    ''
  ].join('\n');
var paths = {
  src: {
    files: ['src/**/*.js'],
    e2e: ['src/**/*.e2e.js']
  }
};
var commonBuild = {
  libs: [],
  files: [
    'src/*.js'
  ]
};

function filterNonCodeFiles() {
  return plugins.filter(function(file) {
    return !/\.json$|\.spec\.js$|\.e2e\.js$/.test(file.path);
  });
}

function customBuild() {
  var buildFilename = 'angular-libphonenumber';

  return function() {
    return gulp.src(commonBuild.files)
      .pipe(filterNonCodeFiles())
      .pipe(plugins.concat(buildFilename + '.js'))
      .pipe(plugins.header(header, {pkg: pkg}))
      .pipe(plugins.footer(footer))
      .pipe(gulp.dest('./dist/'))
      .pipe(plugins.uglify({preserveComments: 'some'}))
      .pipe(plugins.concat(buildFilename + '.min.js'))
      .pipe(gulp.dest('./dist/'));
  };
}

gulp.task('build', customBuild());

gulp.task('lint', function() {
  gulp.src(paths.src.files)
    .pipe(filterNonCodeFiles())
    .pipe(plugins.jshint())                               // hint (optional)
    .pipe(plugins.jscs())                                 // enforce style guide
    .on('error', noop)                                    // don't stop on error
    .pipe(plugins.jscsStylish.combineWithHintResults())   // combine with jshint results
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('default', ['lint', 'test', 'build'], function() {
  gulp.watch(paths.src.files, ['lint', 'build']);
});

gulp.task('serve', ['build'], function() {
  var server = express();

  server.use(express.static('./'));
  server.listen(8000, function() {
    console.log('Server running in port 8000');
  });
  // gulp.src('./')
  //   .pipe(plugins.webserver());
});

gulp.task('test:unit', function(done) {

  new Server({
    singleRun: true,
    configFile: path.join(__dirname, 'config/karma.conf.js')
  }, function(err){
    if(err === 0){
      done();
    } else {
      done(new gutil.PluginError('karma', {
        message: 'Karma Tests failed'
      }));
    }
  }).start();
});

gulp.task('test-watch', function(done) {

  new Server({
    singleRun: false,
    autoWatch: true,
    configFile: path.join(__dirname, 'config/karma.conf.js')
  }, function(err){
    if(err === 0){
      done();
    } else {
      done(new gutil.PluginError('karma', {
        message: 'Karma Tests failed'
      }));
    }
  }).start();
});

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
gulp.task('webdriver_update', require('gulp-protractor').webdriver_update);
// jscs:enable requireCamelCaseOrUpperCaseIdentifiers

gulp.task('test:e2e', ['webdriver_update', 'serve'], function() {
  gulp.src(paths.src.e2e)
    .pipe(plugins.protractor.protractor({
      configFile: path.join(__dirname, 'config/protractor.conf.js')
    }))
    .on('error', function(e) { throw e })
    .pipe(plugins.exit());
});

gulp.task('test', ['test:unit', 'test:e2e']);

/**
 * Bumping version number and tagging the repository with it.
 * Please read http://semver.org/
 *
 * You can use the commands
 *
 *     gulp patch     # makes v0.1.0 → v0.1.1
 *     gulp feature   # makes v0.1.1 → v0.2.0
 *     gulp release   # makes v0.2.1 → v1.0.0
 *
 * To bump the version numbers accordingly after you did a patch,
 * introduced a feature or made a backwards-incompatible release.
 */

function inc(importance) {
  // get all the files to bump version in
  return gulp.src(['./package.json', './bower.json'])
    // bump the version number in those files
    .pipe(plugins.bump({type: importance}))
    // save it back to filesystem
    .pipe(gulp.dest('./'));
  // commit the changed version number
  // .pipe(plugins.git.commit('chore: bump package version'))
}

gulp.task('patch', function() {
  return inc('patch');
});
gulp.task('feature', function() {
  return inc('minor');
});
gulp.task('release', function() {
  return inc('major');
});
