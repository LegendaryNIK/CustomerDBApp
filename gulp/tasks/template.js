'use strict';

var gulp = require('gulp');

module.exports = gulp.task('template', function(){
    gulp.src(['./src/**/*.html'])
        .pipe(gulp.dest('./build/'));
});