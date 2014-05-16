var gulp = require('gulp');

var connect = require('gulp-connect');
var sass = require('gulp-sass');
var markdown = require('gulp-markdown');
var markdownpdf = require('gulp-markdown-pdf');

var paths = {
  styles: 'sass/*.scss'
}

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('markdown', function() {
  return gulp.src('contract.md')
    .pipe(markdown())
    .pipe(gulp.dest('./'));
});

gulp.task('styles', function() {
  return gulp.src('sass/*.scss')
    .pipe(sass())
    .pipe(connect.reload())
    .pipe(gulp.dest('css'))
});

gulp.task('watch', function() {
  gulp.watch('sass/*.scss', ['styles']);
  gulp.watch('*.md', ['markdown']);
});

gulp.task('pdf', function() {
  return gulp.src('contract.md')
    .pipe(markdownpdf({
      cssPath: './css/main.css'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['connect', 'watch']);


