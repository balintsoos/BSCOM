var del         = require('del'),
  gulp          = require('gulp'),
  ejs           = require('gulp-ejs');
  sass          = require('gulp-sass'),
  gutil         = require('gulp-util'),
  rename        = require('gulp-rename'),
  uglify        = require('gulp-uglify'),
  postcss       = require('gulp-postcss'),
  htmlmin       = require('gulp-htmlmin'),
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
    .pipe(htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyJS: true
    }))
    .pipe(gulp.dest('./dist'));
});

// Sass and CSS build
gulp.task('build:CSS', ['iconateHack'], function () {
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

gulp.task('iconateHack', function () {
  copy({
    from: './node_modules/iconate/dist/iconate.min.css',
    to: './dist/style'
  });
});

gulp.task('copy:HTML', function () {
  copy({
    from: './src/error.html',
    to: './dist'
  });
});

gulp.task('copy:JSON', function () {
  copy({
    from: './src/*.json',
    to: './dist'
  });
});

gulp.task('copy:FONT', function () {
  copy({
    from: './node_modules/font-awesome/fonts/**/*',
    to: './dist/fonts'
  });
});

// Image copy
gulp.task('copy:IMG', function () {
  copy({
    from: './src/img/**/*',
    to: './dist/img'
  });
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

gulp.task('build', ['build-production']);

gulp.task('build-production', ['clean', 'build:JS', 'build:HTML', 'build:CSS', 'copy:HTML', 'copy:JSON', 'copy:FONT', 'copy:IMG']);

gulp.task('build-development', ['build', 'watch']);

// Helper function
function copy(path, to) {
  var FROM;
  var TO;

  if (typeof path === "object") {
    if (!path.from || !path.to) {
      return;
    }

    FROM = path.from;
    TO = path.to;
  }

  if (typeof path === 'string' && typeof to === 'string') {
    FROM = path;
    TO = to;
  }

  gulp.src(FROM)
    .pipe(gulp.dest(TO));
}
