const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const filter = require('gulp-filter');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sorting = require('postcss-sorting');
const sortConfig = require('../postcss-sorting.json');
const browserSync = require('browser-sync');
const config = require('../config');
const paths = config.path;

gulp.task('sass', function () {
    const plugins = [
        autoprefixer(),
        cssnano({ preset: 'default' }),
        sorting(sortConfig)
    ];

    return gulp
        .src(paths.src.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest(paths.dest.sass))
        .pipe(filter('**/*.css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('sassWatch', gulp.series('sass', 'deploy'));
