const gulp = require('gulp');
const shell = require('gulp-shell');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const imageop = require('gulp-image-optimization');

const paths = {
  src: ['./models/**/*.js', './routes/**/*.js', 'keystone.js', 'package.json'],
  style: {
    all: './src/styles/**/*.scss',
    output: './public/styles/',
  },
};

gulp.task('watch:sass', () => {
  gulp.watch(paths.style.all, ['sass']);
});

gulp.task('sass', () => {
  gulp.src(paths.style.all)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 4 versions', 'IE >= 9'],
      cascade: false,
    }))
    .pipe(gulp.dest(paths.style.output))
    .pipe(rename((path) => {
      path.extname = '.min.css'; // eslint-disable-line
    }))
    .pipe(cssnano({
      debug: true,
      zindex: false,
      autoprefixer: false,
    }))
    .pipe(gulp.dest(paths.style.output));
});

gulp.task('images', (done) => {
  gulp.src(['src/images/**/*.png', 'src/images/**/*.jpg', 'src/images/**/*.gif', 'src/images/**/*.jpeg'])
    .pipe(imageop({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true,
    }))
    .pipe(gulp.dest('public/images/entries'))
    .on('end', done)
    .on('error', done);
});

gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('watch', [
  'watch:sass',
]);

gulp.task('build', ['images', 'sass']);

gulp.task('default', ['watch', 'runKeystone']);
