var gulp = require('gulp');
var watch = require('gulp-watch');
var shell = require('gulp-shell')
var rename = require("gulp-rename");

var sass = require('gulp-sass');
var cssnano = require("gulp-cssnano");
var autoprefixer = require("gulp-autoprefixer");

var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json']

,
	'style': {
		all: './public/styles/**/*.scss',
		output: './public/styles/'
	}

};


gulp.task('watch:sass', function () {
	gulp.watch(paths.style.all, ['sass']);
});

gulp.task('sass', function(){
	gulp.src(paths.style.all)
		.pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 3 versions", "IE >= 10"],
            cascade: false
        }))
        .pipe(gulp.dest(paths.style.output))
        .pipe(rename(function(path) {
            path.extname = ".min.css";
        }))
        .pipe(cssnano({
            debug: true,
            zindex: false,
            autoprefixer: false
        }))
		.pipe(gulp.dest(paths.style.output));
});


gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('watch', [

  'watch:sass',

]);

gulp.task('default', ['watch', 'runKeystone']);
