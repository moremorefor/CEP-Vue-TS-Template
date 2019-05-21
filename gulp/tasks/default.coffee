gulp        = require 'gulp'
browserSync = require 'browser-sync'
runSequence = require 'run-sequence'

gulp.task 'default', ['del'], ->
  runSequence(
    'sass',
    'typescript',
    'webpack',
    'copy'
    'deploy',
    'copy_modules',
    # 'browser-sync',
    'watch'
  )
