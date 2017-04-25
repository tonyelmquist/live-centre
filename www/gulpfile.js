/* eslint-disable */
'use strict';
const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const util = require('gulp-util');
const lintConfig = require('./eslint.config');
// const Server = require('karma').Server;
const karma = require('karma').Server;
const gulplog = require('gulplog');
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
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
        watch: WATCH ? WATCH : false,
        devtool: isDev ? 'cheap-module-inline-source-map' : null,
        plugins: !isDev ? [
            new webpack.NoErrorsPlugin(),
            new webpack.DefinePlugin({
                // Lots of library source code (like React) are based on process.env.NODE_ENV
                // (all development related code is wrapped inside a conditional that can be dropped if equal to "production"
                // this way you get your own react.min.js build)
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
            })
        ],
        module: {
            loaders: [{
                    test: /.jsx?$/,
                    include: path.join(__dirname, "app/scripts"),
                    exclude: path.join(__dirname, "app/tests"),
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react', 'stage-0']
                    }
                },
                {
                    test: /\.css$/,
                    loaders: [ 'style-loader', 'css-loader' ],
                    exclude: /flexboxgrid/
                },
                {
                    test: /\.css$/,
                    loaders: [ 'style-loader', 'css-loader' ],
                    include: /flexboxgrid/
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    loader: 'url-loader',
                    options: {
                      limit: 10000
                    }
                },
                {
                    test: /\.po$/,
                    loaders: ['i18next-po-loader']
                }
            ]
        }

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

    return gulp.src('app/scripts/index.js')
        .pipe($.plumber())
        .pipe(named(function(file) {
            return FILE_NAME
        }))
        .pipe(webpackStream(config, null, done))
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
            'js': 'js/' + FILE_NAME + '.js'
        })))
        .pipe($.newer(DEST_FOLDER))
        .pipe(gulp.dest(DEST_FOLDER));
})

gulp.task('assets', function() {
    return gulp.src('app/img/**/*.*', {base: 'app'})
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

// Static Server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: DEST_FOLDER
        },
        port: 3778,
        open: "external"
    });
    browserSync.watch(DEST_FOLDER + '/**').on('change', browserSync.reload);
});


//tests
gulp.task('test', function(done) {
    // new Server({
    //     configFile: __dirname + '/karma.conf.js',
    //     singleRun: !WATCH
    // }, done).start();
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: !WATCH
    }, done);
});


//Sequence of Tasks
// gulp.task('build', $.sequence('lint', 'clean', ['stylus', 'assets', 'html', 'webpack'], ['watch', 'serve']));
gulp.task('build', $.sequence('lint', 'clean', ['stylus', 'assets', 'html', 'webpack'], (WATCH) ? ['watch'] : []));
gulp.task('deploy', ['copy:ios', 'copy:android']);

// console.log($.sequence);
const SERVE_FOLDER = fs.existsSync(path.resolve(__dirname, DEST_FOLDER));
gulp.task('start', ['serve']);

//Default taks: depends on DEV environment
gulp.task('default', ['build']);


// Gulp 4 Syntax:
// gulp.task('default', gulp.series('lint', 'clean:build', gulp.parallel('stylus', 'html', 'webpack'), gulp.parallel('watch', 'serve')));
// gulp.task('deploy', gulp.series('clean:deploy', gulp.parallel('stylus', 'html', 'webpack')));
