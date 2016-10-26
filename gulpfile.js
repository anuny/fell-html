'use strict';

var gulp        = require('gulp');
var less        = require('gulp-less');
var ejs         = require('gulp-ejs');
var rename        = require('gulp-rename');
var browserSync = require("browser-sync");
var reload      = browserSync.reload;


var BASE = {
	SRC    : './src',
	DIST   : './dist',
	STATIC : '/static'
}

var SUFFIX = {
	TPL    : '{html,htm,tpl,ejs}',
	CSS    : '{less,css}',
	IMAGES : '{jpg,png,gif,bmp,svg,ico}',
	FONTS  : '{otf,eot,svg,ttf,woff,woff2}'
}

var PATH = {
	SRC:{
		HTML   : BASE.SRC + '/html/**/*.' + SUFFIX.TPL,
		DATAS  : BASE.SRC + '/datas/**/*.*',
		CSS    : BASE.SRC + BASE.STATIC + '/css/**/*.' + SUFFIX.CSS,
		JS     : BASE.SRC + BASE.STATIC + '/js/**/*.js',
		IMAGES : BASE.SRC + BASE.STATIC + '/images/**/*.' + SUFFIX.IMAGES,
		FONTS  : BASE.SRC + BASE.STATIC + '/fonts/**/*.'+ SUFFIX.FONTS
	},
	DIST:{
		DATAS  : BASE.DIST + '/datas/',
		CSS    : BASE.DIST + BASE.STATIC + '/css/',
		JS     : BASE.DIST + BASE.STATIC + '/js/',
		IMAGES : BASE.DIST + BASE.STATIC + '/images/',
		FONTS  : BASE.DIST + BASE.STATIC + '/fonts/'
	}
}

gulp.task('tpl', function () {
    gulp.src(PATH.SRC.HTML) 
        .pipe(ejs())
		.pipe(rename({extname:'.html'}))
        .pipe(gulp.dest(BASE.DIST));
});

gulp.task('html',['tpl'],reload);


gulp.task('css', function () {
    gulp.src(PATH.SRC.CSS) 
        .pipe(less())
        .pipe(gulp.dest(PATH.DIST.CSS))
		.pipe(reload({stream:true}));
});

gulp.task('js', function () {
    gulp.src(PATH.SRC.JS) 
        .pipe(gulp.dest(PATH.DIST.JS))
		.pipe(reload({stream:true}));
});

gulp.task('images', function () {
    gulp.src(PATH.SRC.IMAGES) 
        .pipe(gulp.dest(PATH.DIST.IMAGES))
		.pipe(reload({stream:true}));
});

gulp.task('fonts', function () {
    gulp.src(PATH.SRC.FONTS) 
        .pipe(gulp.dest(PATH.DIST.FONTS))
		.pipe(reload({stream:true}));
});

gulp.task('datas', function () {
    gulp.src(PATH.SRC.DATAS) 
        .pipe(gulp.dest(PATH.DIST.DATAS))
		.pipe(reload({stream:true}));
});


gulp.task('server',['tpl','css','js','images','fonts','datas'],function(){
	browserSync({server:BASE.DIST,notify: false});
	gulp.watch(PATH.SRC.HTML,   ['html']);
	gulp.watch(PATH.SRC.CSS,    ['css']);
	gulp.watch(PATH.SRC.JS,     ['js']);
	gulp.watch(PATH.SRC.IMAGES, ['images']);
	gulp.watch(PATH.SRC.FONTS,  ['fonts']);
	gulp.watch(PATH.SRC.DATAS,  ['datas']);
});

gulp.task('default',['server']); 