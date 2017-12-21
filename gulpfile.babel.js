const gulp = require('gulp');
let sass = require('gulp-ruby-sass');
let autoprefixer = require('gulp-autoprefixer');
let sourcemaps = require('gulp-sourcemaps');
let browserSync = require('browser-sync').create();

let usemin = require('gulp-usemin');
let uglify = require('gulp-uglify');
let htmlmin = require('gulp-htmlmin');
let cleanCss = require('gulp-clean-css');
let rev = require('gulp-rev');

/**
 * STYLESHEETS
 * */

gulp.task('clear:cache', function () {
    sass.clearCache();
});

gulp.task('clean:sass', ['clear:cache'], sassTask);

gulp.task('sass', sassTask);

function sassTask(){
    return sass('./assets/styles/**/*.scss', {sourcemap: true})
        .on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/styles'))
        .pipe(browserSync.stream({match: '**/*.css'}));
}

/**
 * USEMIN
 * */

gulp.task('usemin', function() {
  return gulp.src('./src/index.html')
    .pipe(usemin({
      html: [ htmlmin({ collapseWhitespace: true }) ],
      jsAttributes : {
        async: true
      },
      js: [ uglify(), rev() ],
      inlinecss: [ cleanCss(), 'concat' ]
    }))
    .pipe(gulp.dest('./'));
});

/**
 * WATCH
 * */

gulp.task('watch', ['clean:sass'], function() {

    browserSync.init({
        server: {
          baseDir: './',
          index: './src/index.html'
        }
    });

    gulp.watch('./assets/js/bundle.js').on('change', browserSync.reload);
    gulp.watch('./src/*.html').on('change', browserSync.reload);
    gulp.watch('./assets/styles/**/*.scss', ['sass']);

});
