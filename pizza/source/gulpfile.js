'use strict';

// REQUIRES
var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
    minifyCss = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    rename = require('gulp-rename'),
    del = require('del'),
    htmlreplace = require('gulp-html-replace'),
    purify = require('gulp-purifycss'),
    combiner = require('stream-combiner2');

var paths = {
	content: ['pizza.html'],
	styles: ['css/*.css'],
	scripts: ['js/main.js'],
	images: ['images/*.jpg']
};

gulp.task('serve', function() {
	browserSync({
		server: {
			baseDir: './',
			index: 'pizza.html'
		},
		browser: 'google chrome'
	});
	gulp.watch(['*.html'], reload);
	gulp.watch(['./js/main.js'], reload);
	gulp.watch(['./css/style.css'], reload);
});

gulp.task('concatCSS', function() {
	return gulp.src(paths.styles)
			   .pipe(concatCss('styles.css'))
			   .pipe(gulp.dest('../dist/css/'));
	});

gulp.task('purifyCSS', ['concatCSS'], function() {
	return gulp.src('../dist/css/styles.css')
			   .pipe(purify(['./pizza.html', './js/main.js']))
			   .pipe(gulp.dest('../dist/css/'));
	});

gulp.task('stylesMin', ['purifyCSS'], function() {
	gulp.src('../dist/css/styles.css')
		.pipe(minifyCss())
		.pipe(rename(function(path) { path.basename += '.min'; }))
		.pipe(gulp.dest('../dist/css/'));
	return del('../dist/css/styles.css', {force: true});
	});

gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
			   .pipe(uglify())
			   .pipe(rename(function(path) { path.basename += '.min'; }))
			   .pipe(gulp.dest('../dist/js/'));
	});

gulp.task('move', function() {
	return gulp.src(['./images/*'], { base: './' })
			   .pipe(gulp.dest('../dist/'));
	});

gulp.task('replace', function() {
	return gulp.src(paths.content)
			   .pipe(htmlreplace({
			   		'css': '<link href="css/styles.min.css" rel="stylesheet">',
			   		'js': '<script src="js/main.min.js"></script>'
			   	}))
			   .pipe(gulp.dest('../dist/'));
	});

gulp.task('delDist', function() {
	return del('../dist/', {force: true});
	});

gulp.task('build', ['stylesMin', 'scripts', 'move', 'replace']);

gulp.task("watchFiles",  function() {
	gulp.watch('./js/main.js', ['build']);
	gulp.watch('./css/*', ['build']);
	gulp.watch('./pizza.html', ['build']);
	});

gulp.task('watch', ['watchFiles']);