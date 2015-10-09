var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var sass = require('gulp-sass');

var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

var vendorSources = [
  '/node_modules/angular/angular.min.js',
  '/node_modules/angular-route/angular-route.min.js',
  '/node_modules/angular-animate/angular-animate.min.js',
];


gulp.task('vendors', function() {
  return gulp.src(vendorSources)
  .pipe(plumber({
    errorHandler: function (error) {
      console.log(error.message);
      this.emit('end');
    }}))
    .pipe(gulp.dest('server/public/vendors/'));
});

gulp.task('styles', function(){
  return gulp.src(['client/styles/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('server/public/assets/styles/'))
    .pipe(livereload())
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function(){
  return gulp.src('client/scripts/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('server/public/assets/scripts/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('server/public/assets/scripts/'))
    .pipe(livereload())
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('views', function() {

   return gulp.src('client/views/**/*.html')
   .pipe(plumber({
     errorHandler: function (error) {
       console.log(error.message);
       this.emit('end');
   }}))
       .pipe(gulp.dest('server/public/assets/views'))
       .pipe(livereload())
       .pipe(notify({ message: 'Views task complete' }));
});

gulp.task('watch', function (){
    livereload.listen();
    gulp.watch("client/styles/**/*.scss", ['styles']);
    gulp.watch("client/scripts/**/*.js", ['scripts']);
    gulp.watch('client/views/**/*.html', ['views']);

});

gulp.task('default', ['vendors', 'styles','scripts','views', 'watch']);
