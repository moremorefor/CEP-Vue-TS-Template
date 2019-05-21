gulp      = require 'gulp'
ts        = require 'gulp-typescript'
rename    = require 'gulp-rename'
tsProject = ts.createProject 'src/jsx/tsconfig.json'
config    = require '../config'
paths     = config.path

gulp.task "typescript", () ->
    tsProject.src()
        .pipe(tsProject()).js
        .pipe(rename({extname: '.jsx'}))
        .pipe(gulp.dest("#{paths.dest.jsx}"))

gulp.task 'typescriptWatch', ['typescript'], ->
  gulp.start 'deploy'