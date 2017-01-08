'use strict';

var gulp = require('gulp');

module.exports = gulp.task('template', function(){
    gulp.src(['./src/index.html'])
        .pipe(gulp.dest('./build/'));
});