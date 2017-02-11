var gulp = require('gulp');
var watch = require('gulp-watch');
var shell = require('gulp-shell')
var rename = require('gulp-rename');

var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var imageop = require('gulp-image-optimization');

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

gulp.task('sass', function() {
	gulp.src(paths.style.all)
		.pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions', 'IE >= 9'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.style.output))
        .pipe(rename(function(path) {
            path.extname = '.min.css';
        }))
        .pipe(cssnano({
            debug: true,
            zindex: false,
            autoprefixer: false
        }))
		.pipe(gulp.dest(paths.style.output));
});

gulp.task('images', function(cb) {
  gulp.src(['srcimages/**/*.png','srcimages/**/*.jpg','srcimages/**/*.gif','srcimages/**/*.jpeg']).pipe(imageop({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
  })).pipe(gulp.dest('public/images/entries')).on('end', cb).on('error', cb);
});

gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('watch', [
  'watch:sass',
]);

gulp.task('build', ['images', 'sass']);

gulp.task('default', ['watch', 'runKeystone']);
