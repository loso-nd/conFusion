'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');

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

gulp.task('default', gulp.series(['browser-sync']), async function() {
    gulp.start('sass:watch');
});
/*
gulp.task('default', gulp.parallel('sass:watch', 'browser-sync', function() {
   gulp.series('sass:watch')();
}));
*/
// Clean
gulp.task('clean', function() {
   return del(['dist']);
});

// copyfont task
gulp.task('copyfonts', async function() {
   gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
   .pipe(gulp.dest('./dist/fonts'));
});

// Images Task
gulp.task('imagemin', async function() {
   return gulp.src('img/*.{png,jpg,gif}')
     .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
     .pipe(gulp.dest('dist/img'));
 });

 //Usemin Task - takes the html files combines, concats and replaces them with the files in the dist file
gulp.task('usemin', async function() {
   return gulp.src('./*.html')
   .pipe(flatmap(function(stream, file){
      return stream
      .pipe(usemin({
         css: [ rev() ],
         html: [ function() { return htmlmin({ collapseWhitespace: true })} ],
         js: [ uglify(), rev()],
         inlinejs: [ uglify() ],
         inlinecss: [ cleanCss(), 'concat']
      }))
   }))
   .pipe(gulp.dest('dist/'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('copyfonts','imagemin', 'usemin')));
/* Examples from discussion 
first
gulp.task('default', gulp.series(['browser-sync']), function() {
    gulp.start('sass:watch');
});

last
gulp.task('build', gulp.series('clean', gulp.parallel('copyfonts','imagemin', 'usemin')), function(){
    gulp.start('copyfonts', 'imagemin', 'usemin');
 });


gulp.task('default', gulp.series(['clean', 'styles']));

gulp.task('build', gulp.series('clean', gulp.parallel('copyfonts','imagemin', 'usemin')));*/