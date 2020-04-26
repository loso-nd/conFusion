'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

//Settign up our gulp taks

gulp.task('sass', function () {
  return gulp.src('./css/*.scss')
  //if an error occus it will use the sass way to log the error
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

//Settign up our gulp watch task for SASS, BrowserSync, default to specify the task we want to watch
gulp.task('sass:watch', function () {
  gulp.watch('./css/*.scss', ['sass']);
});

gulp.task('browser-sync', function () {
   var files = [
      './*.html',
      './css/*.css',
      './img/*.{png,jpg,gif}',
      './js/*.js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: "./"
      }
   });

});

// Default task
gulp.task('default', ['browser-sync'], function() {
    gulp.start('sass:watch');
});