'use strict';

var gulp = require('gulp');

module.exports = gulp.task('assets', function() {
    return gulp.src('src/assets/*.*')
        .pipe(gulp.dest('./build/assets/'))
});