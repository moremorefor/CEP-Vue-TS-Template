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
    jslib  : './' + srcDir + '/js/libs/*.js'
    jsx    : srcDir + '/jsx/*.jsx'
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
  watch:
    html   : srcDir + '/**/*.html'
    vue    : srcDir + '/**/*.vue'
    sass   : srcDir + '/**/*.sass'
    scss   : srcDir + '/**/*.scss'
    js     : srcDir + '/js/**/*.js'
    ts     : srcDir + '/js/**/*.ts'
    jsx    : srcDir + '/jsx/*.jsx'
    png    : srcDir + '/**/*.png'
    jpg    : srcDir + '/**/*.jpg'
    gif    : srcDir + '/**/*.gif'
    shellscript: srcDir + '/*.sh'
    application: srcDir + '/*.app/**/*'
  deploy:
    src    : destDir + '/**/*'
    debug  : destDir + '/.debug'
    nodemodules_vue : './node_modules/vue/**/*'
    nodemodules_vuex : './node_modules/vuex/**/*'

module.exports =
  path: path
