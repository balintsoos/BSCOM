var gulp        = require('gulp');
var browserify  = require('gulp-browserify');
var rename      = require('gulp-rename');
var gutil       = require('gulp-util');

gulp.task('build-JS', function () {
  gulp.src('./src/js/main.js')
    .pipe(browserify({
      insertGlobals : false,
      debug : true,
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('./build/js'));
    
  gutil.log(gutil.colors.magenta('Build ended succesfully'));
});

gulp.task('build-CSS', function () {
  gulp.src('./src/css/stlye.scss')
    
    
  gutil.log(gutil.colors.magenta('Build ended succesfully'));
});

gulp.watch('./src/js/**/*.js', ['build-JS'])
  .on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });

gulp.task('default', ['build-JS']);