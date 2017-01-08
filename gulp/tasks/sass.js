'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass');

module.exports = gulp.task('sass', function(){
    return gulp.src('src/styles/style.sass')
        .pipe(sass())
        .pipe(gulp.dest('./build/'))
});