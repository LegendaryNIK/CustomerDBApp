'use strict';

var gulp = require('gulp');

module.exports = gulp.task('watch', function() {
    gulp.watch('./src/styles/*.sass', ['sass']);
    gulp.watch('./src/index.html', ['template']);
    gulp.watch('./src/js/**/*.js',['scripts']);
});