const gulp = require('gulp');
const del = require('del');
const config = require('../config');
const paths = config.path;

gulp.task('del', function () {
    return del([paths.dest.dir]);
});

gulp.task('del_deploy', function () {
    return del([paths.deploy.dest], { force: true });
});
