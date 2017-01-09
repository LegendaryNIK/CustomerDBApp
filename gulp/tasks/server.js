'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    server = require('gulp-server-livereload');

module.exports = gulp.task('server', function() {
    connect.server({
        root: 'build',
        port: 1337
    });
});


/*
module.exports = gulp.task('server', function() {
    gulp.src('build')
        .pipe(server({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});*/