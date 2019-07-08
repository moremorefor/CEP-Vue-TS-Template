os = require 'os'
setupConfig = require '../setup/config.json'

srcDir = 'src'
destDir = 'public'

path =
  src:
    dir    : srcDir
    html   : srcDir + '/*.html'
    css    : srcDir + '/css/*.min.css'
    sass   : srcDir + '/css/app.sass'
    img    : srcDir + '/img/*'
    js     : './' + srcDir + '/js/main.js'
    jslib  : './' + srcDir + '/js/libs-js/*.js'
    jsx    : srcDir + '/jsx/*.ts'
    jsxlib : srcDir + '/jsx/libs/*'
    csxs   : srcDir + '/CSXS/manifest.xml'
    debug  : srcDir + '/.debug'
    shellscript: srcDir + '/*.sh'
    application: srcDir + '/*.app/**/*'
  dest:
    dir    : destDir
    html   : destDir
    sass   : destDir + '/css'
    img    : destDir + '/img'
    js     : destDir + '/js/'
    jsx    : destDir + '/jsx/'
    jsxlib : destDir + '/jsx/libs/'
  watch:
    html   : srcDir + '/**/*.html'
    vue    : srcDir + '/**/*.vue'
    sass   : srcDir + '/**/*.sass'
    scss   : srcDir + '/**/*.scss'
    js     : srcDir + '/js/**/*.js'
    ts     : srcDir + '/js/**/*.ts'
    jsx    : srcDir + '/jsx/*.ts'
    jsxlib : srcDir + '/jsx/libs/*'
    png    : srcDir + '/**/*.png'
    jpg    : srcDir + '/**/*.jpg'
    gif    : srcDir + '/**/*.gif'
    shellscript: srcDir + '/*.sh'
    application: srcDir + '/*.app/**/*'
  deploy:
    src    : destDir + '/**/*'
    dest   : os.homedir() + '/Library/Application Support/Adobe/CEP/extensions/' + setupConfig.bundleId
    debug  : destDir + '/.debug'
    nodemodules_extendscriptShim : './node_modules/extendscript-es5-shim/**/*'

module.exports =
  path: path
