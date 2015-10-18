var gulp          = require('gulp');
var sourcemaps    = require('gulp-sourcemaps');
var browserify    = require('gulp-browserify');
var rename        = require('gulp-rename');
var gutil         = require('gulp-util');
var sass          = require('gulp-sass');
var postcss       = require('gulp-postcss');
var autoprefixer  = require('autoprefixer');

// JS build
gulp.task('build:JS', function () {
  gulp.src('./src/js/main.js')
    .pipe(browserify({
      insertGlobals : false,
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('./build/js'));
    
  //gutil.log(gutil.colors.magenta('Build ended succesfully'));
});

// Sass and CSS build
gulp.task('build:CSS', function () {
  var processors = [
    autoprefixer({browsers: ['last 2 versions']})
  ];

  gulp.src('./src/css/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/css'));
    
  //gutil.log(gutil.colors.magenta('Build ended succesfully'));
});

// Watchers
gulp.task('watch', function () {
  gulp.watch('./src/js/**/*.js', ['build:JS'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
  gulp.watch('./src/css/**/*.scss', ['build:CSS'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['build:JS', 'build:CSS', 'watch']);
