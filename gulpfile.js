'use strict';

var fs              = require('fs');
var gulp            = require('gulp');
var less            = require('gulp-less');
var swig            = require('gulp-swig');
var rename          = require('gulp-rename');
var uglify          = require('gulp-uglify');
var minifycss       = require('gulp-minify-css');
var concat          = require('gulp-concat');
var changed         = require('gulp-changed');
var browserSync     = require("browser-sync");
var reload          = browserSync.reload;


var option   = fs.readFileSync('./config.json').toString();
var options  = JSON.parse(option)||{};
var swigOptions = {
	defaults: {
		cache: false, 
		locals: {
			system: options.system 
		}
	},
	data: options.site
};

var BASE = {
	SRC    : './src',
	DIST   : './dist',
	STATIC : '/static'
};

var SUFFIX = {
	TPL    : options.system.fix.tpl||'{html,htm,tpl,ejs}',
	CSS    : options.system.fix.css||'{less,css}',
	IMAGES : options.system.fix.images||'{jpg,png,gif,bmp,svg,ico}',
	FONTS  : options.system.fix.fonts||'{otf,eot,svg,ttf,woff,woff2}',
	HTML   : options.system.fix.html||'.html',
	FILTER : '@*.*',
};

var PATH = {
	SRC:{
		HTML   : [ BASE.SRC + '/templates/**/*.' + SUFFIX.TPL,'!'+BASE.SRC + '/templates/**/'+SUFFIX.FILTER],
		DATAS  : [ BASE.SRC + '/datas/**/*.*','!'+BASE.SRC + '/datas/**/'+SUFFIX.FILTER],
		CSS    : [ BASE.SRC + BASE.STATIC + '/css/**/*.' + SUFFIX.CSS,'!'+BASE.SRC + BASE.STATIC + '/css/**/'+SUFFIX.FILTER],
		JS     : [ BASE.SRC + BASE.STATIC + '/js/**/*.js','!'+BASE.SRC + BASE.STATIC + '/js/**/'+SUFFIX.FILTER],
		IMAGES : [ BASE.SRC + BASE.STATIC + '/images/**/*.' + SUFFIX.IMAGES,'!'+BASE.SRC + BASE.STATIC + '/images/**/'+SUFFIX.FILTER],
		FONTS  : [ BASE.SRC + BASE.STATIC + '/fonts/**/*.'+ SUFFIX.FONTS,'!'+BASE.SRC + BASE.STATIC + '/fonts/**/'+SUFFIX.FILTER]
	},
	DIST:{
		DATAS  : BASE.DIST + '/datas/',
		CSS    : BASE.DIST + BASE.STATIC + '/css/',
		JS     : BASE.DIST + BASE.STATIC + '/js/',
		IMAGES : BASE.DIST + BASE.STATIC + '/images/',
		FONTS  : BASE.DIST + BASE.STATIC + '/fonts/'
	}
};




gulp.task('tpl', function () {
    return gulp.src(PATH.SRC.HTML)
		.pipe(changed(BASE.DIST))
		.pipe(swig(swigOptions))
		.pipe(rename({extname: SUFFIX.HTML}))
		.pipe(gulp.dest(BASE.DIST));
});

gulp.task('css', function () {
    return gulp.src(PATH.SRC.CSS)
		.pipe(changed(PATH.DIST.CSS))
		.pipe(less())
		.pipe(gulp.dest(PATH.DIST.CSS))
		.pipe(browserSync.stream());
});



gulp.task('minifycss', function() {
    return gulp.src('src/*.css')      //压缩的文件
        .pipe(gulp.dest('minified/css'))   //输出文件夹
        .pipe(minifycss());   //执行压缩
});

gulp.task('minifyjs', function() {
    return gulp.src('src/*.js')
        .pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('minified/js'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('minified/js'));  //输出
});


gulp.task('js', function () {
    return gulp.src(PATH.SRC.JS)
		.pipe(changed(PATH.DIST.JS))
		.pipe(gulp.dest(PATH.DIST.JS))
		.pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src(PATH.SRC.IMAGES)
		.pipe(changed(PATH.DIST.IMAGES))
		.pipe(gulp.dest(PATH.DIST.IMAGES))
		.pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src(PATH.SRC.FONTS)
		.pipe(changed(PATH.DIST.FONTS))
		.pipe(gulp.dest(PATH.DIST.FONTS))
		.pipe(browserSync.stream());
});

gulp.task('datas', function () {
    return gulp.src(PATH.SRC.DATAS)
		.pipe(changed(PATH.DIST.DATAS))
		.pipe(gulp.dest(PATH.DIST.DATAS))
		.pipe(browserSync.stream());
});

gulp.task('html',['tpl'],reload);

gulp.task('server',['tpl','css','js','images','fonts','datas'],function(){
	browserSync({server:BASE.DIST,notify: false,open: false});
	gulp.watch(PATH.SRC.HTML,   ['html']);
	gulp.watch(PATH.SRC.CSS,    ['css']);
	gulp.watch(PATH.SRC.JS,     ['js']);
	gulp.watch(PATH.SRC.IMAGES, ['images']);
	gulp.watch(PATH.SRC.FONTS,  ['fonts']);
	gulp.watch(PATH.SRC.DATAS,  ['datas']);
});

gulp.task('default',['server']); 