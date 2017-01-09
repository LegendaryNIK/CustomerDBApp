'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    browserify = require('browserify');

module.exports = gulp.task('scripts', function() {
    return gulp.src(['./src/js/app.js', './src/js/Controllers/*.js'])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./build/'));
});