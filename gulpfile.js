var gulp = require('gulp'),
  path = require('path'),
  jshint = require('gulp-jshint'),
  jscs = require('gulp-jscs'),
  stylish = require('gulp-jscs-stylish'),
  karma = require('karma').server,
  plugins = require('gulp-load-plugins')({
    config: path.join(__dirname, 'package.json')
  });

var noop = function () {};

var pkg = require('./package.json'),
  header = ['/**',
    ' * <%= pkg.name %>',
    ' * <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    '(function (angular) {',
    '',
    ''
  ].join('\n'),
  footer = [
    '',
    '})(angular);',
    ''
  ].join('\n');

var path = {
  src: {
    files: ['src/**/*.js'],
    e2e: ['src/**/*.spec.js']
  }
};

var commonBuild = {
  libs: [],
  files: [
    'src/*.js'
  ]
};

function customBuild(files) {
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
  gulp.src(path.src.files)
    .pipe(filterNonCodeFiles())
    .pipe(jshint())                           // hint (optional)
    .pipe(jscs())                             // enforce style guide
    .on('error', noop)                        // don't stop on error
    .pipe(stylish.combineWithHintResults())   // combine with jshint results
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', ['lint', 'test', 'build'], function() {
  gulp.watch(path.src.files, ['lint', 'build']);
});

gulp.task('serve', ['build'], function() {
  var express = require('express');
  var server = express();

  server.use(express.static('./'));
  server.listen(8000, function() {
    console.log('Server running in port 8000');
  });
});

gulp.task('test:unit', function(done) {
  var karmaConfig = {
    singleRun: true,
    configFile: __dirname + '/config/karma.conf.js'
  };

  karma.start(karmaConfig, done);
});

gulp.task('test-watch', function(done) {
  var karmaConfig = {
    singleRun: false,
    autoWatch: true,
    configFile: __dirname + '/config/karma.conf.js'
  };

  karma.start(karmaConfig, done);
});

gulp.task('webdriver_update', require('gulp-protractor').webdriver_update);

gulp.task('test:e2e', ['webdriver_update', 'serve'], function() {
  var protractor = require('gulp-protractor').protractor;

  gulp.src(path.src.e2e)
    .pipe(protractor({
      configFile: 'config/protractor.conf.js'
    }))
    .pipe(plugins.exit());
});

gulp.task('test', ['test:unit', 'test:e2e']);

function filterNonCodeFiles() {
  return plugins.filter(function(file) {
    return !/\.json$|\.spec\.js$|\.test\.js$/.test(file.path);
  });
}
