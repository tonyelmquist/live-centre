/* eslint-disable */
'use strict';
const fs = require('fs');
const url = require("url")
const path = require('path');
const gulp = require('gulp');
const util = require('gulp-util');
const lintConfig = require('./eslint.config');
// const Server = require('karma').Server;
const KarmaServer = require('karma').Server;
const gulplog = require('gulplog');
const webpackStream = require('webpack-stream');
// const webpack = webpackStream.webpack;
const webpack = require('webpack'); // Webpack 2
const webpackConfig = require('./webpack.config.js');
const named = require('vinyl-named');
const del = require('del');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();
const poUpdate = require('./poedit');


//Environment Setup & Check
const NODE_ENV = util.env.production ? 'production' : 'development';
const isDev = (NODE_ENV === 'development') ? true : false;

//No watching in 'Production' MODE
const WATCH = (isDev) ? util.env.watch : false;


const DEST_FOLDER = 'dist'
const FILE_NAME = isDev ? 'bundle' : 'bundle.min';

const ANDROID_ASSETS = '../android/app/src/main/assets/'; // Should Later Be Changed
const IOS_ASSETS = '../ios/Live Centre/html/'; // Should Later Be Changed



console.log('****************************');
console.log('* Build Mode: ', NODE_ENV, '*');
console.log('****************************');


//Processing Scripts
gulp.task('webpack', function(callback) {
    let firstBuildReady = false;
    const config = {
        module: webpackConfig.module,
        devServer: {
            historyApiFallback: true,
        },
        resolve: {
        extensions: ['.js', '.jsx'],
        },
        watch: WATCH ? WATCH : false,
        plugins: !isDev ? [

            new webpack.NoErrorsPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(NODE_ENV),
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: true
                }
            }),
            new webpack.ProvidePlugin({
                i18next: "i18next",
            })
        ] : [
            new webpack.ProvidePlugin({
                i18next: "i18next",
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(NODE_ENV),
                }
            })
        ]
    }
    //Add sourcemaps/pathinfo in development mode
    if (isDev) {
        config.devtool = 'cheap-module-inline-source-map';
        config.output = {'pathinfo' : true};
    }

    function done(err, stats) {
        firstBuildReady = true;
        if (err) {
            return;
        }
        if (isDev) {
            if (stats.hasErrors()) {
                gulplog['error'](stats.toString({
                    colors: true
                }));
            }
        }
    }

    return gulp.src('app/scripts/index.jsx')
        .pipe($.plumber())
        .pipe(named(function(file) {
            return FILE_NAME
        }))
        .pipe(webpackStream(config, webpack, done))
        .pipe(gulp.dest(DEST_FOLDER + '/js'))
        .on('data', function() {
            if (WATCH && isDev && firstBuildReady && !callback.called) {
                callback.called = true;
                callback();
            }
        })
});

//Process Stylus Files
gulp.task('stylus', function() {

    return gulp.src('app/stylus/main.styl')
        .pipe($.plumber({
            errorHandler: $.notify.onError()
        }))
        .pipe($.if(isDev, $.sourcemaps.init()))
        .pipe($.stylus({
            // only compress if we are in production
            compress: !isDev,
            // include 'normal' css into main.css
            //'include css': true
        }))
        .pipe($.autoprefixer())
        .pipe($.concat(FILE_NAME + '.css'))
        .pipe($.if(isDev, $.sourcemaps.write()))
        .pipe(gulp.dest(DEST_FOLDER + '/css'));
})

//Copy Assets to Relevant Folders
gulp.task('html', function() {
    return gulp.src('app/**/*.html')
        .pipe($.if(!isDev, $.htmlReplace({
            'css': 'css/' + FILE_NAME + '.css',
            'js': 'js/' + FILE_NAME + '.js#'+new Date().toISOString(),
            'jsx': 'js/' + FILE_NAME + '.jsx'
        })))
        .pipe($.if(isDev, $.htmlReplace({
            'css': 'css/' + FILE_NAME + '.css?buildDate='+new Date().toISOString(),
            'js': 'js/' + FILE_NAME + '.js?buildDate='+new Date().toISOString(),
        })))
        .pipe($.newer(DEST_FOLDER))
        .pipe(gulp.dest(DEST_FOLDER));
})

gulp.task('assets', function() {
    return gulp.src('app/img/**/*.*', {base: 'app'})
        .pipe($.newer(DEST_FOLDER))
        .pipe(gulp.dest(DEST_FOLDER));
})

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*.*')
        .pipe($.newer(DEST_FOLDER))
        .pipe(gulp.dest(DEST_FOLDER + '/fonts'));
})

gulp.task('htaccess', function() {
    return gulp.src('.htaccess')
        .pipe($.newer(DEST_FOLDER))
        .pipe(gulp.dest(DEST_FOLDER));
})

//Watch Assets
gulp.task('watch', function() {
    gulp.watch('app/stylus/**', ['stylus']);
});

//Linting
gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['app/**/*.js', '!app/tests/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe($.eslint(lintConfig))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe($.eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe($.if(isDev, util.noop(), $.eslint.failAfterError()));

});

//Cleaning directories
gulp.task('clean', function() {
    return del(DEST_FOLDER + '/**');
});

gulp.task('clean:ios', function() {
    return del([IOS_ASSETS], {
        force: true
    });
});

gulp.task('clean:android', function() {
    return del([ANDROID_ASSETS], {
        force: true
    });
});

//Copy Mobile App Assets
gulp.task('copy:ios', ['clean:ios'], function() {
    return gulp.src([DEST_FOLDER + '/**/*.*'], {
        base: DEST_FOLDER
    }).pipe(gulp.dest(IOS_ASSETS));
});

gulp.task('copy:android', ['clean:android'], function() {
    return gulp.src([DEST_FOLDER + '/**/*.*'], {
        base: DEST_FOLDER
    }).pipe(gulp.dest(ANDROID_ASSETS));
});

//Locale files
gulp.task('po:upload', function(){
    //running gulp po:upload --o will overwrite the remote translations
    //running gulp po:upload --p will sync remote file with the uploaded one
    return poUpdate('UPLOAD', util.env.o, util.env.p);
});

gulp.task('po:import', function(){
    return poUpdate('IMPORT');
});

var defaultFile = "index.html"
// Static Server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: DEST_FOLDER
        },
        middleware: function(req, res, next) {
                var fileName = url.parse(req.url);
                fileName = fileName.href.split(fileName.search).join("");
                var fileExists = fs.existsSync(DEST_FOLDER + fileName);
                if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
                    req.url = "/" + defaultFile;
                }
                return next();
            },
        port: 3778,
        open: "external"
    });
    browserSync.watch(DEST_FOLDER + '/**').on('change', browserSync.reload);
});


//tests
gulp.task('test', function(done) {
//     new KarmaServer({
//         configFile: __dirname + '/karma.conf.js',
//         singleRun: !WATCH
//     }, done).start();

    KarmaServer.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: !WATCH
    }, function(exitCode){
        console.log(exitCode !== 0 ? 'Error in Gulp OR test failed!':'');
        done();
        if ( exitCode!==0 && !isDev ) process.exit(exitCode);
    });

});


//Sequence of Tasks
// gulp.task('build', $.sequence('lint', 'clean', ['stylus', 'assets', 'html', 'webpack'], ['watch', 'serve']));
gulp.task('build', $.sequence( !isDev && 'test','lint', 'clean', ['stylus', 'assets', 'html', 'htaccess', 'fonts', 'webpack'], (WATCH) ? ['watch'] : []));
gulp.task('deploy', ['copy:ios', 'copy:android']);

// const SERVE_FOLDER = fs.existsSync(path.resolve(__dirname, DEST_FOLDER));
gulp.task('start', ['serve']);

//Default taks: depends on DEV environment
gulp.task('default', ['build']);


// Gulp 4 Syntax:
// gulp.task('default', gulp.series('lint', 'clean:build', gulp.parallel('stylus', 'html', 'webpack'), gulp.parallel('watch', 'serve')));
// gulp.task('deploy', gulp.series('clean:deploy', gulp.parallel('stylus', 'html', 'webpack')));
