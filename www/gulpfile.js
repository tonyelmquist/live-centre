var gulp = require('gulp');
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var _ = require('lodash');
var path = require('path');
var del = require('del');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

// set variable via $ gulp --type production
var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';

// set variable via $ gulp --partner something (Useful for custom build options/changes)
var partner = $.util.env.partner || 'something';

var webpackConfig = require('./webpack.config.js').getConfig(environment, partner);

var port = $.util.env.port || 8777;
var app = 'app/';
var dist = 'dist/';
var iosHtml = '../ios/LiveCentre/html/';
var androidAssets = '../android/app/src/main/assets/';
var nodeModules = 'node_modules/';
var scriptsLib = app + 'lib/';

// https://github.com/ai/autoprefixer
var autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('scripts', function() {
  return gulp.src(webpackConfig.entry)
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(isProduction ? $.uglify().on('error', $.util.log) : $.util.noop())
    .pipe(gulp.dest(dist + 'js/'))
    .pipe($.size({ title : 'js' }))
    .pipe($.connect.reload());
});

// copy html from app to dist
gulp.task('html', function() {
  return gulp.src(app + 'index.html')
      .pipe(isProduction ? $.util.noop() : $.replace(/min./g, ''))
      .pipe(gulp.dest(dist))
      .pipe($.size({ title : 'html' }))
      .pipe($.connect.reload());
});

gulp.task('onsenui-styles', function () {
    return gulp.src([nodeModules + 'onsenui/css/**/*'], {
        base: nodeModules
    })
        .pipe($.if(isProduction, $.ignore.exclude('**/font-awesome.css')))
        .pipe($.if(isProduction, $.ignore.exclude('**/ionicons.css')))
        .pipe($.if(isProduction, $.ignore.exclude('**/material-design-iconic-font.css')))
        .pipe($.if(isProduction, $.ignore.exclude('**/onsen-css-components-*.css')))
        .pipe($.if(isProduction, $.if('*.css', $.cssnano())))
//        .pipe($.if(isProduction, $.if('*.svg', $.imagemin()))) Doesn't appear to work
        .pipe(gulp.dest(dist + 'lib/'))
        .pipe($.size({ title : 'onsenui-styles' }));
});


gulp.task('copy-assets', function() {
    var assets = {
        js: [
            nodeModules + 'framework7/dist/js/framework7.' + (isProduction ? 'min.' : '') + 'js',
            app + 'scripts/utils/oslook.js'
        ],
        css: [
            nodeModules + 'framework7/dist/css/framework7.ios.colors.' + (isProduction ? 'min.' : '') + 'css',
            nodeModules + 'framework7/dist/css/framework7.ios.' + (isProduction ? 'min.' : '') + 'css',
            nodeModules + 'framework7/dist/css/framework7.material.colors.' + (isProduction ? 'min.' : '') + 'css',
            nodeModules + 'framework7/dist/css/framework7.material.' + (isProduction ? 'min.' : '') + 'css'
        ],
        img: [
            nodeModules + 'framework7/dist/img/*.png',
            nodeModules + 'framework7/dist/img/*.svg'
        ]
    };
    _.forEach(assets, function (assets, type) {
        gulp.src(assets).pipe(gulp.dest(dist + 'lib/' + type));
    });
});

gulp.task('styles', function(cb) {
  // convert stylus to css
  return gulp.src([app + 'stylus/main.styl', app + 'stylus/platform/ios.styl', app + 'stylus/platform/android.styl'])
    .pipe($.stylus({
      // only compress if we are in production
      compress: isProduction,
      // include 'normal' css into main.css
      'include css' : true
    }))
    .pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe($.size({ title : 'css' }))
    .pipe($.connect.reload());

});

// add livereload on the given port
gulp.task('serve', function() {
  $.connect.server({
    root: dist,
    port: port,
    livereload: {
      port: 35730
    }
  });
});

gulp.task('fontIcons', function() {
  return gulp.src(app + '/less/font-icons/**')
      .pipe(gulp.dest(dist + 'css/font-icons'));
});

// copy images
gulp.task('images', function(cb) {
  return gulp.src(app + 'images/**/*.{png,jpg,jpeg,gif}')
    .pipe($.if(isProduction, $.imagemin()))
    .pipe($.size({ title : 'images' }))
    .pipe(gulp.dest(dist + 'images/'));
});

// Lint JS/JSX files
gulp.task('lint', function() {
    return gulp.src([app + 'scripts/**/*.js', app + 'scripts/**/*.jsx', app + 'test/**/*.js'])
        .pipe($.eslint({
            baseConfig: {
                "parser": "babel-eslint",
                "parserOptions": {
                    "sourceType": "module"
                },
                "ecmaFeatures": {
                    "jsx": true,
                    "arrowFunctions": true,
                    "blockBindings": true,
                    "generators": true,
                    "modules": true,
                    "experimentalObjectRestSpread": true
                },
                "env": {
                    "browser": true,
                    "node": true,
                    "es6": true,
                    "jasmine": true
                },
                "globals": {},
                "plugins": [
                    "react"
                ],
                "extends": [
                    "eslint:recommended",
                    "plugin:react/recommended"
                ],
                "rules": {
                    "arrow-parens": 2,
                    "curly": 2,
                    "no-var": 2,
                    "prefer-arrow-callback": 2,
                    "prefer-const": 2,
                    "prefer-spread": 2,
                    "prefer-template": 2,
                    "require-yield": 2,
                    semi: ["error", "always"]
                }
            }
        }))
        .pipe($.eslint.format())
        .pipe(isProduction ? $.eslint.failAfterError() : $.util.noop());
});

// watch styl, html and js file changes
gulp.task('watch', function() {
    gulp.watch(app + 'stylus/**/*.styl', ['styles']);
    gulp.watch(app + 'index.html', ['html']);
    gulp.watch(app + 'scripts/**/*.{js,jsx}', function(){ runSequence('scripts', 'lint') });
    gulp.watch(app + 'locale/**/*.po', ['html', 'scripts']);
    gulp.watch(app + 'images/**/*.{png,jpg,jpeg,gif}', ['images']);
});

// remove bundles
gulp.task('clean', function() {
    return del([dist]);
});

gulp.task('clean-ios', function() {
    return del([iosHtml], {force: true});
});

gulp.task('clean-android', function() {
    return del([androidAssets], {force: true});
});

gulp.task('copy-ios', ['clean-ios'], function () {
    return gulp.src([dist + '**/*'], {
        base: dist
    }).pipe(gulp.dest(iosHtml));
});

gulp.task('copy-android', ['clean-android'], function () {
    return gulp.src([dist + '**/*'], {
        base: dist
    }).pipe(gulp.dest(androidAssets));
});

gulp.task('default', ['build', 'serve', 'watch']);

// by default build project and then watch files in order to trigger livereload
gulp.task('build', function (cb) {
    runSequence('clean', 'lint', ['images', 'html', 'styles', 'scripts'], cb);
});

gulp.task('deploy', ['copy-ios', 'copy-android']);
