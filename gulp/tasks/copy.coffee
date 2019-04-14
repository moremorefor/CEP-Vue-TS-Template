gulp        = require 'gulp'
browserSync = require 'browser-sync'
config      = require '../config'
setup       = require '../../setup/config.json'
paths       = config.path
deployPath  = '/Users/' + setup.userName + '/Library/Application Support/Adobe/CEP/extensions/' + setup.bundleId

gulp.task 'copy', ->
  gulp
    .src [
      "#{paths.src.html}",
      "#{paths.src.css}",
      "#{paths.src.jslib}",
      "#{paths.src.jsx}",
      "#{paths.src.csxs}",
      "#{paths.src.debug}",
      "#{paths.src.shellscript}",
      "#{paths.src.application}"
    ], { base: "#{paths.src.dir}" }
    .pipe gulp.dest( "#{paths.dest.dir}" )
    .pipe browserSync.reload({stream:true})

gulp.task 'copy_modules', ->
  gulp.src [
    "#{paths.deploy.nodemodules_vue}",
    "#{paths.deploy.nodemodules_vuex}"
  ]
  .pipe gulp.dest( "#{deployPath}/node_modules" )

gulp.task 'copyWatch', ['copy'], ->
  gulp.start 'deploy'

gulp.task 'deploy', ["del_deploy"], ->
  gulp
    .src [
      "#{paths.deploy.src}",
      "#{paths.deploy.debug}"
    ], { base: "#{paths.dest.dir}" }
    .pipe gulp.dest( "#{deployPath}" )
