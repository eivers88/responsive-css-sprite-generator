var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

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
 * WATCH
 * */

gulp.task('watch', ['clean:sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch('./assets/js/bundle.js').on('change', browserSync.reload);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./assets/styles/**/*.scss', ['sass']);

});