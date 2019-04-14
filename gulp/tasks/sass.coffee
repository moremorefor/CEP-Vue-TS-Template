gulp        = require 'gulp'
sass        = require 'gulp-sass'
filter      = require 'gulp-filter'
pleeease    = require 'gulp-pleeease'
browserSync = require 'browser-sync'
config      = require '../config'
paths       = config.path

gulp.task 'sass', ->
  sassOptions =
    style      : 'nested'
    sourcemap  : true

  return gulp.src("#{paths.src.sass}")
   .pipe(sass().on('error', sass.logError))
   .pipe pleeease(
     autoprefixer:
       browsers: ['last 4 versions']
     minifier: false
   )
   .pipe gulp.dest( "#{paths.dest.sass}" )
   .pipe filter('**/*.css')
   .pipe browserSync.reload({stream:true})

gulp.task 'sassWatch', ['sass'], ->
  gulp.start 'deploy'
