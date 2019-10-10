gulp        = require 'gulp'
browserSync = require 'browser-sync'

gulp.task 'default', gulp.series(
  'del',
  'sass',
  'typescript',
  'webpack',
  'copy'
  'copy_modules',
  'deploy',
  # 'browser-sync',
  'watch'
)
