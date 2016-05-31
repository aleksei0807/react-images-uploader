var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('styles', function () {
  return gulp.src('./styles/*.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./styles'))
    .pipe(gulp.dest('./examples/build'));
});

gulp.task('themes', function () {
  return gulp.src('./styles/themes/**/*.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./styles/themes'))
    .pipe(gulp.dest('./examples/build/themes'));
});

gulp.task('default', ['styles', 'themes']);

gulp.task('watch', function () {
	gulp.watch(['./styles/*.styl', './styles/themes/**/*.styl'], ['default']);
});
