var gulp = require('gulp'),
  path = require('path'),
  jshint = require('gulp-jshint'),
  jscs = require('gulp-jscs'),
  stylish = require('gulp-jscs-stylish'),
  karma = require('karma').server,
  plugins = require('gulp-load-plugins')({
    config: path.join(__dirname, 'package.json')
  }),
  express = require('express'),
  protractor = require('gulp-protractor').protractor;




var noop = function() {
};

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

var paths = {
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
  gulp.src(paths.src.files)
    .pipe(filterNonCodeFiles())
    .pipe(jshint())                           // hint (optional)
    .pipe(jscs())                             // enforce style guide
    .on('error', noop)                        // don't stop on error
    .pipe(stylish.combineWithHintResults())   // combine with jshint results
    .pipe(jshint.reporter('jshint-stylish'));
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
});

gulp.task('test:unit', function(done) {
  var karmaConfig = {
    singleRun: true,
    configFile: path.join(__dirname, 'config/karma.conf.js')
  };

  karma.start(karmaConfig, done);
});

gulp.task('test-watch', function(done) {
  var karmaConfig = {
    singleRun: false,
    autoWatch: true,
    configFile: path.join(__dirname, 'config/karma.conf.js')
  };

  karma.start(karmaConfig, done);
});

gulp.task('webdriver_update', require('gulp-protractor').webdriver_update);

gulp.task('test:e2e', ['webdriver_update', 'serve'], function() {
  gulp.src(paths.src.e2e)
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
    .pipe(gulp.dest('./'))
    // commit the changed version number
    //.pipe(plugins.git.commit('chore: bump package version'))
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