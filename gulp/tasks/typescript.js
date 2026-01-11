const gulp = require('gulp');
const ts = require('gulp-typescript');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const tsCommon = ts.createProject('src/jsx/tsconfig.json');
const tsPhotoshop = ts.createProject('src/jsx/Photoshop/tsconfig.json');
const tsIllustrator = ts.createProject('src/jsx/Illustrator/tsconfig.json');
const config = require('../config');
const paths = config.path;
const setup = require('../../setup/config');

const merge = require('merge-stream');

gulp.task('typescript', function () {
    console.log('   ┣ Compile: Common jsx');
    const streams = [];

    streams.push(tsCommon
        .src()
        .pipe(plumber())
        .pipe(tsCommon())
        .js.pipe(rename({ extname: '.jsx' }))
        .pipe(gulp.dest(paths.dest.jsx)));

    if (setup.application.includes('Photoshop')) {
        console.log('   ┣ Compile: Photoshop jsx');
        streams.push(tsPhotoshop
            .src()
            .pipe(plumber())
            .pipe(tsPhotoshop())
            .js.pipe(rename({ extname: '.jsx' }))
            .pipe(gulp.dest(paths.dest.jsx)));
    }

    if (setup.application.includes('Illustrator')) {
        console.log('   ┗ Compile: Illustrator jsx');
        streams.push(tsIllustrator
            .src()
            .pipe(plumber())
            .pipe(tsIllustrator())
            .js.pipe(rename({ extname: '.jsx' }))
            .pipe(gulp.dest(paths.dest.jsx)));
    }

    return merge(streams);
});

gulp.task('typescriptWatch', gulp.series('typescript', 'deploy'));
