var del         = require('del'),
  gulp          = require('gulp'),
  ejs           = require('gulp-ejs');
  sass          = require('gulp-sass'),
  gutil         = require('gulp-util'),
  rename        = require('gulp-rename'),
  uglify        = require('gulp-uglify'),
  postcss       = require('gulp-postcss'),
  prettify      = require('gulp-prettify'),
  sourcemaps    = require('gulp-sourcemaps'),
  autoprefixer  = require('autoprefixer'),
  cssnano       = require('cssnano'),
  browserify    = require('browserify'),
  source        = require('vinyl-source-stream'),
  buffer        = require('vinyl-buffer');

// clean dist folder
gulp.task('clean', function () {
  del.sync(['./dist/**/*']);
});

// JS build
gulp.task('build:JS', function () {
  var b = browserify({
    entries: './src/js/main.js',
    debug: true,
  });

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(rename('app.js'))
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(rename('app.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'));
});

// HTML build
gulp.task('build:HTML', function () {
  gulp.src('./src/templates/index.ejs')
    .pipe(ejs().on('error', gutil.log))
    .pipe(rename('index.html'))
    .pipe(prettify({
      indent_size: 2,
      extra_liners: []
    }))
    .pipe(gulp.dest('./dist'));
});

// Sass and CSS build
gulp.task('build:CSS', function () {
  var preprocessors = [
    autoprefixer({browsers: ['last 2 versions']}),
    cssnano()
  ];

  gulp.src('./src/style/style.scss')
    .pipe(rename('style.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
      .pipe(postcss(preprocessors))
      .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/style'));
});

gulp.task('copy:HTML', function () {
  gulp.src('./src/error.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy:JSON', function () {
  gulp.src('./src/*.json')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy:FONT', function () {
  gulp.src('./node_modules/font-awesome/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts'));
});

// Image copy
gulp.task('copy:IMG', function () {
  gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./dist/img'));
});

// Watcher
gulp.task('watch', function () {
  function log (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  }

  // watch JS
  gulp.watch('./src/js/**/*.js', ['build:JS'])
    .on('change', function (event) {
      log(event);
    });

  // watch HTML
  gulp.watch('./src/*.html', ['build:HTML'])
    .on('change', function (event) {
      log(event);
    });

  // watch CSS
  gulp.watch('./src/style/**/*.scss', ['build:CSS'])
    .on('change', function (event) {
      log(event);
    });
});

gulp.task('default', ['build']);

gulp.task('build', ['clean', 'build:JS', 'build:HTML', 'build:CSS', 'copy:HTML', 'copy:JSON', 'copy:FONT', 'copy:IMG']);

gulp.task('build-development', ['build', 'watch']);
