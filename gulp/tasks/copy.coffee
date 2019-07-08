gulp        = require 'gulp'
browserSync = require 'browser-sync'
config      = require '../config'
paths       = config.path

gulp.task 'copy', ->
  gulp
    .src [
      "#{paths.src.html}",
      "#{paths.src.css}",
      "#{paths.src.jslib}",
      "#{paths.src.jsxlib}",
      "#{paths.src.csxs}",
      "#{paths.src.debug}",
      "#{paths.src.shellscript}",
      "#{paths.src.application}"
    ], { base: "#{paths.src.dir}" }
    .pipe gulp.dest( "#{paths.dest.dir}" )
    .pipe browserSync.reload({stream:true})

gulp.task 'copy_modules', ->
  gulp.src [
    "#{paths.deploy.nodemodules_extendscriptShim}"
  ], { base: "./node_modules" }
  .pipe gulp.dest( "#{paths.dest.dir}/node_modules" )

gulp.task 'copyWatch', gulp.series 'copy', ->
  gulp.start 'deploy'

gulp.task 'deploy', gulp.series "del_deploy", ->
  gulp
    .src [
      "#{paths.deploy.src}",
      "#{paths.deploy.debug}"
    ], { base: "#{paths.dest.dir}" }
    .pipe gulp.dest( "#{paths.deploy.dest}" )
