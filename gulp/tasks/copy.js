const gulp = require('gulp');
const browserSync = require('browser-sync');
const config = require('../config');
const paths = config.path;

gulp.task('copy', function () {
    return gulp
        .src(
            [
                paths.src.html,
                paths.src.css,
                paths.src.jslib,
                paths.src.jsxlib,
                paths.src.csxs,
                paths.src.debug,
                paths.src.shellscript,
                paths.src.application
            ],
            { base: paths.src.dir, allowEmpty: true }
        )
        .pipe(gulp.dest(paths.dest.dir))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('copy_modules', function () {
    return gulp
        .src([paths.deploy.nodemodules_extendscriptShim], { base: './node_modules', allowEmpty: true })
        .pipe(gulp.dest(paths.dest.dir + '/node_modules'));
});

gulp.task(
    'deploy',
    gulp.series('del_deploy', function () {
        return gulp
            .src([paths.deploy.src, paths.deploy.debug], { base: paths.dest.dir, allowEmpty: true })
            .pipe(gulp.dest(paths.deploy.dest));
    })
);

gulp.task('copyWatch', gulp.series('copy', 'deploy'));
