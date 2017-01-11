'use strict';

var gulp = require('gulp');

module.exports = gulp.task('watch', function() {
    gulp.watch('./src/styles/*.sass', ['sass']);
    gulp.watch('./src/**/*.html', ['template']);
    gulp.watch('./src/js/**/*.js',['scripts']);
});