'use strict';

// REQUIRES
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCss = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    imageop = require('gulp-image-optimization'),
    minifyhtml = require('gulp-minify-html'),
    rename = require('gulp-rename'),
    del = require('del'),
    gm = require('gulp-gm'),
    htmlreplace = require('gulp-html-replace'),
    purify = require('gulp-purifycss'),
    inline = require('gulp-inline-source');

var paths = {
	content: ['index.html', 'project-2048.html', 'project-mobile.html', 'project-webperf.html'],
	styles: ['css/print.css', '../dist/css/style.css'],
	scripts: ['js/*.js'],
	images: ['img/*.jpg']
};


// TASKS
gulp.task('inlineCss', ['replaceHtml'], function() {
	return gulp.src('../dist/*.html')
			   .pipe(inline())
			   .pipe(gulp.dest('../dist/'));
});

gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
			   .pipe(uglify())
			   .pipe(rename(function(path){ path.basename += '.min'; }))
			   .pipe(gulp.dest('../dist/js/'));
});

gulp.task('purifyCss', function() {
	return gulp.src('css/style.css')
    		   .pipe(purify(paths.content))
    		   .pipe(gulp.dest('../dist/css/'));
});

gulp.task('concatCSS', ['purifyCss'], function() {
	return gulp.src(paths.styles)
			   .pipe(concatCss('bundle.css'))
			   .pipe(gulp.dest('../dist/css/'));
});

gulp.task('styles', ['concatCSS'], function() {
	gulp.src('../dist/css/bundle.css')
	    .pipe(minifyCss())
	    .pipe(rename(function(path) { path.basename += '.min'; }))
	    .pipe(gulp.dest('../dist/css/'));

	return del(['../dist/css/bundle.css', '../dist/css/style.css'], {force: true});
});

gulp.task('replaceHtml', function() {
	return gulp.src(paths.content)
			   .pipe(htmlreplace({
					'css': '<link href="css/bundle.min.css" rel="stylesheet" inline>',
					'img': '<img style="width: 100px;" src="img/pizzeria.jpg">',
					'js': '<script async src="js/perfmatters.min.js"></script>'
				}))
			   .pipe(gulp.dest('../dist/'));
});

gulp.task('content', ['inlineCss'], function() {
    return gulp.src('../dist/*.html')
        .pipe(minifyhtml({
            empty: true,
            quotes: true
        }))
        .pipe(gulp.dest('../dist/'));
});

gulp.task('imageQuality', function() {
	return gulp.src(paths.images)
			   .pipe(gm(function(gmfile) {
					return gmfile.quality(30);
				}, { imageMagick: true }))
			   .pipe(gulp.dest('../dist/img'));
});

gulp.task('imageMod', ['imageQuality']);

gulp.task('build', ['imageMod', 'scripts', 'styles', 'content']);

gulp.task('serve', function() {
	browserSync({
		server: {
			baseDir: "./"
		},
		browser: 'google chrome'
	});

  	gulp.watch(['./views/*.html'], reload);
  	gulp.watch(['./views/js/main.js'], reload);
  	gulp.watch(['./views/css/style.css'], reload);
});

gulp.task('delDist', function() {
	return del('../dist/', {force: true});
});
