gulp          = require 'gulp'
webpack       = require 'webpack'
webpackStream = require 'webpack-stream'
config        = require '../config'
paths         = config.path

webpackConfig = require("../../webpack.config")

gulp.task "webpack", () ->
  webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest("#{paths.dest.js}"))

gulp.task 'webpackWatch', ['webpack'], ->
  gulp.start 'deploy'
