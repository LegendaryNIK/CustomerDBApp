'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');

module.exports = gulp.task('browserify', function() {
    return browserify({
        entries: ['./src/js/bundle.js'],
        cache: {},
        packageCache: {},
    })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('build'));
});