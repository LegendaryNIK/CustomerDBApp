'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect');

module.exports = gulp.task('server', function() {
    connect.server({
        root: 'build',
        port: 1337
    });
});