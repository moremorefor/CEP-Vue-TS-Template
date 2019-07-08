gulp      = require 'gulp'
ts        = require 'gulp-typescript'
rename    = require 'gulp-rename'
plumber   = require 'gulp-plumber'
tsProject = ts.createProject 'src/jsx/tsconfig.json'
config    = require '../config'
paths     = config.path

gulp.task "typescript", () ->
    tsProject.src()
        .pipe(plumber())
        .pipe(tsProject()).js
        .pipe(rename({extname: '.jsx'}))
        .pipe(gulp.dest("#{paths.dest.jsx}"))

gulp.task 'typescriptWatch', gulp.series 'typescript', ->
    gulp.start 'deploy'