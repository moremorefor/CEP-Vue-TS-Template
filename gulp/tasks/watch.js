const gulp = require('gulp');
const config = require('../config');
const paths = config.path;

gulp.task('watch', function () {
    gulp.watch([paths.watch.sass, paths.watch.scss], gulp.task('sassWatch'));
    gulp.watch(
        [paths.watch.js, paths.watch.ts, paths.watch.vue],
        gulp.task('webpackWatch')
    );
    gulp.watch([paths.watch.jsx], gulp.task('typescriptWatch'));
    gulp.watch(
        [
            paths.watch.html,
            paths.watch.jsxlib,
            paths.watch.png,
            paths.watch.jpg,
            paths.watch.gif,
            paths.watch.shellscript,
            paths.watch.application
        ],
        gulp.task('copyWatch')
    );
});
