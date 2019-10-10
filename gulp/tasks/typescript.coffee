gulp          = require 'gulp'
ts            = require 'gulp-typescript'
rename        = require 'gulp-rename'
plumber       = require 'gulp-plumber'
tsCommon      = ts.createProject 'src/jsx/tsconfig.json'
tsPhotoshop   = ts.createProject 'src/jsx/Photoshop/tsconfig.json'
tsIllustrator = ts.createProject 'src/jsx/Illustrator/tsconfig.json'
config        = require '../config'
paths         = config.path
setup         = require '../../setup/config'

gulp.task "typescript", ->
    console.log('   ┣ Compile: Common jsx')
    tsCommon.src()
        .pipe(plumber())
        .pipe(tsCommon()).js
        .pipe(rename({extname: '.jsx'}))
        .pipe(gulp.dest("#{paths.dest.jsx}"))
    if setup.application.includes('Photoshop')
        console.log('   ┣ Compile: Photoshop jsx')
        tsPhotoshop.src()
            .pipe(plumber())
            .pipe(tsPhotoshop()).js
            .pipe(rename({extname: '.jsx'}))
            .pipe(gulp.dest("#{paths.dest.jsx}"))
    if setup.application.includes('Illustrator')
        console.log('   ┗ Compile: Illustrator jsx')
        tsIllustrator.src()
            .pipe(plumber())
            .pipe(tsIllustrator()).js
            .pipe(rename({extname: '.jsx'}))
            .pipe(gulp.dest("#{paths.dest.jsx}"))

gulp.task 'typescriptWatch', gulp.series(
    'typescript',
    "deploy"
)