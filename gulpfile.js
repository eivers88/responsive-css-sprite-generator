var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var babelify = require('babelify');
var watchify = require('watchify');
var exorcist = require('exorcist');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();

// Input file.
watchify.args.debug = true;
var bundler = watchify(browserify('./js/index.js', watchify.args));

// Babel transform
bundler.transform(babelify.configure({
    sourceMapRelative: 'js',
    presets: ['es2015']
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {

    gutil.log('Compiling JS...');

    return bundler.bundle()
        .on('error', function (err) {
            gutil.log(err.message);
            browserSync.notify("Browserify Error!");
            this.emit("end");
        })
        .pipe(exorcist('js/bundle.js.map'))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.stream({once: true}));
}

/**
 * Gulp task alias
 */
gulp.task('bundle', function () {
    return bundle();
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("styles/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("styles"))
        .pipe(browserSync.stream());
});

/**
 * First bundle, then serve from the ./app directory
 */
gulp.task('default', ['bundle', 'sass'], function () {

    browserSync.init({
        server: "./"
    });

    gulp.watch("styles/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});