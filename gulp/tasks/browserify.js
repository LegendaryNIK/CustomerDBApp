'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify');

module.exports = gulp.task('browserify', function() {
    return browserify({
        entries: ['./src/js/app.js'],
        cache: {},
        packageCache: {},
        plugin: [watchify]
    })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('build'));
});