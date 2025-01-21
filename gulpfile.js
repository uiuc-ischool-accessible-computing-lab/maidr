// gulpfile.js
// This is the config for gulp, which is a task runner.
// It takes all the JS and CSS files and bundles them into one JS file and one CSS file.
// To run: navigate to the root directory of this project and run "gulp"

var gulp = require('gulp');
var concat = require('gulp-concat');
var terser = require('gulp-terser');
var rename = require('gulp-rename');
var concatCss = require('gulp-concat-css');
var cleanCss = require('gulp-clean-css');

// js
gulp.task('scripts', function () {
  return gulp
    .src([
      './src/js/constants.js',
      './src/js/audio.js',
      './src/js/display.js',
      './src/js/barplot.js',
      './src/js/boxplot.js',
      './src/js/heatmap.js',
      './src/js/scatterplot.js',
      './src/js/histogram.js',
      './src/js/lineplot.js',
      './src/js/segmented.js',
      './src/js/controls.js',
      './src/js/goto.js',
      './src/js/init.js',
    ]) // order matters here
    .pipe(concat('maidr.js'))
    .pipe(gulp.dest('dist'))
    .pipe(terser())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist'));
});

// css
gulp.task('styles', function () {
  return gulp
    .src('src/css/*.css')
    .pipe(concatCss('maidr_style.css'))
    .pipe(gulp.dest('dist')) // destination folder for unminified version
    .pipe(cleanCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('dist')); // destination folder for minified version
});

// default task now runs both scripts and styles tasks
gulp.task('default', gulp.series('scripts', 'styles'));
