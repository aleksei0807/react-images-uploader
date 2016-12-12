/* eslint-disable */
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var functions = require('postcss-functions');
var precss = require('precss');
var atImport = require("postcss-import");
var easyImport = require('postcss-easy-import');
var postCssModules = require('postcss-modules');
var cssnano = require('cssnano');

var processors = [
	atImport({
		plugins: [easyImport],
	}),
	postCssModules({
		scopeBehaviour: 'global',
		generateScopedName: '[name]__[local]___[hash:base64:5]',
	}),
	autoprefixer,
	precss({
		variables: {
			variables: require('./src/styles/vars.css')
		}
	}),
	functions({
		functions: require('./src/styles/funcs.css')
	}),
	cssnano()
];

gulp.task('styles', function () {
  return gulp.src('./src/styles/styles.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./'))
    .pipe(gulp.dest('./examples/build'));
});

gulp.task('examples-page-styles', function () {
  return gulp.src('./examples/src/style.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./examples'));
});

gulp.task('default', ['styles', 'examples-page-styles']);

gulp.task('watch', function () {
	gulp.watch(['./styles/*.css', './examples/src/style.css'], ['default']);
});
