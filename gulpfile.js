/*

    ┬ ┬┌─┐┌┐ ┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐
    │││├┤ ├┴┐└─┐│  ├─┤├─┘├┤ └─┐
    └┴┘└─┘└─┘└─┘└─┘┴ ┴┴  └─┘└─┘

    http://github.com/andreystarkov
    im@andreystarkov.ru

*/

var gulp = require('gulp'),
    rename = require("gulp-rename"),
    notify = require('gulp-notify'),
    del = require('del'),
    size = require('gulp-size'),
    path = require('path'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    clean = require('gulp-clean'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    minifyCss = require('gulp-minify-css'),
    gutil = require('gulp-util'),
    runSequence = require('run-sequence').use(gulp);

gulp.task('clean', function() {
    return gulp.src(['dist/css']).pipe(clean());
});

var LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    LessPluginCSScomb = require('less-plugin-csscomb');

  gulp.task('less', function() {

  var cleancss = new LessPluginCleanCSS({ advanced: true }),
  autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

    return gulp.src('assets/styles/styles.less')
        .pipe(sourcemaps.init())
        .pipe(less({ plugins: [autoprefix, cleancss]}))
        .pipe(rename({ suffix: '.less' }))
        .pipe(gulp.dest('assets/app'))
        .pipe(sourcemaps.write('./'))
        .pipe(size({
            title: 'LESS'
        }));
});

gulp.task('css-concat', function() {
  return gulp.src([
    'assets/app/styles.less.css',
    'css/fullwidth-slider.css',
    'css/bootstrap.min.css',
    'css/bootstrap-theme.min.css',
    'css/jquery-ui.structure.min.css',
    'css/jquery-ui.theme.min.css',
    'css/nanoscroller.css',
    'css/tooltipster.css'
    ])
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('assets/app'))
    .pipe(size({
        title: 'Concat CSS'
    }));
});

gulp.task('css-min', function() {
  return gulp.src('assets/app/styles.css')
    .pipe(minifyCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/styles'))
    .pipe(size({
        title: 'Minify CSS'
    }));
});

var JSFiles = [
 'assets/scripts/jquery/*.js',
 'assets/scripts/ui/*.js',
 'assets/scripts/jquery/plugins/*.js',
 'assets/scripts/libs/*.js'
];

gulp.task('jquery', function() {
  return gulp.src('assets/scripts/jquery/plugins/*.js')
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(size({
        title: 'jQuery Plugins'
    }));
});

gulp.task('libs', function() {
  return gulp.src(['assets/scripts/ui/*.js'])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(size({
        title: 'UI / Libs'
    }));
});

gulp.task('scripts-all', function() {
  return gulp.src(JSFiles)
    .pipe(concat('everything.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(size({
        title: 'JS Everything'
    }));
});

gulp.task('scripts', function(callback) {
    runSequence(
        'jquery',
        'libs',
        'scripts-all',
        callback)
});

gulp.task('styles', function(callback) {
    runSequence(
        'clean',
        'less',
        'css-concat',
        callback)
});

gulp.task('build', function(callback) {
    runSequence(
        'clean',
        'less',
        'css-concat',
        'css-min',
        'scripts',
        callback)
});


gulp.task('css-build', function(callback) {
    runSequence(
        'less',
        'css-concat',
        'css-min',
        callback)
});

gulp.task('watch', function () {
    gulp.watch('assets/styles/**/*.less', ['styles']);
 //   gulp.watch('css/**/*.css', ['css-concat']);
 //   gulp.watch('assets/scripts/**/*.js', ['scripts']);
});

gulp.task('default', ['styles','watch']);