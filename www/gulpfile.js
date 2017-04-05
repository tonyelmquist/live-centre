'use strict'
const path = require('path');
const gulp = require('gulp');
const util = require('gulp-util');
const lintConfig = require('./eslint.config');
const Server = require('karma').Server;
const gulplog = require('gulplog');
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
const named = require('vinyl-named');
const del = require('del');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();

//Environment Setup & Check
const NODE_ENV = util.env.production ? 'production' : 'development';
const isDev = (NODE_ENV === 'development') ? true : false;
const DIST_FOLDER = 'dist';
const BUILD_FOLDER = 'build';
const DEST_FOLDER = isDev ? BUILD_FOLDER : DIST_FOLDER;
const FILE_NAME = isDev ? 'main' : 'main.min';

const ANDROID_ASSETS = '../android/app/src/main/assets/'; // Should Later Be Changed
const IOS_ASSETS = '../ios/Live Centre/html/'; // Should Later Be Changed



console.log('***************************');
console.log('* NODE_ENV: ', NODE_ENV, '*');
console.log('***************************');


//Processing Scripts
gulp.task('webpack', function(callback) {
    let firstBuildReady = false;
    const config = {
        watch: isDev,
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
                    loaders: [ 'style-loader', 'css-loader' ]
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
        //.pipe($.if(!isDev, $.uglify()))
        .pipe(gulp.dest(DEST_FOLDER + '/js'))
        .on('data', function() {
            if (isDev && firstBuildReady && !callback.called) {
                callback.called = true;
                callback();
            }
        })
});

//Process Stylus Files
gulp.task('stylus', function() {

    return gulp.src('app/stylus/**')
        .pipe($.plumber({
            errorHandler: $.notify.onError()
        }))
        .pipe($.if(isDev, $.sourcemaps.init()))
        .pipe($.stylus({
            // only compress if we are in production
            compress: !isDev,
            // include 'normal' css into main.css
            'include css': true
        }))
        .pipe($.autoprefixer())
        .pipe($.concat(FILE_NAME + '.css'))
        .pipe($.if(isDev, $.sourcemaps.write()))
        .pipe(gulp.dest(DEST_FOLDER + '/css'));
})

//Copy Assets to Relevant Folders
gulp.task('html', function() {
    return gulp.src('app/**/*.html')
        // .gulp.src('app/**/*.html', {
        //         since: gulp.lastRun('html')
        //     })
        .pipe($.if(!isDev, $.htmlReplace({
            'css': 'css/' + FILE_NAME + '.css',
            'js': 'js/' + FILE_NAME + '.js'
        })))
        .pipe($.if(isDev, $.newer(BUILD_FOLDER), $.newer(DIST_FOLDER)))
        .pipe($.if(isDev, gulp.dest(BUILD_FOLDER), gulp.dest(DIST_FOLDER)));
})

gulp.task('assets', function() {
    return gulp.src('app/img/**/*.*', {base: 'app'})
        .pipe($.if(isDev, $.newer(BUILD_FOLDER), $.newer(DIST_FOLDER)))
        .pipe($.if(isDev, gulp.dest(BUILD_FOLDER), gulp.dest(DIST_FOLDER)));
})


//Linting

gulp.task('eslint', () => {
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


gulp.task('watch', function() {
    gulp.watch('app/stylus/**', ['stylus']);
});

// Static Server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: BUILD_FOLDER
        },
        port: 3778,
        open: "external"
    });
    browserSync.watch(BUILD_FOLDER + '/**').on('change', browserSync.reload)
});


//Cleaning directories
gulp.task('clean:build', function() {
    return del(BUILD_FOLDER + '/**');
});

gulp.task('clean:deploy', function() {
    return del(DIST_FOLDER + '/**');
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
    return gulp.src([DIST_FOLDER + '/**/*.*'], {
        base: DIST_FOLDER
    }).pipe(gulp.dest(IOS_ASSETS));
});

gulp.task('copy:android', ['clean:android'], function() {
    return gulp.src([DIST_FOLDER + '/**/*.*'], {
        base: DIST_FOLDER
    }).pipe(gulp.dest(ANDROID_ASSETS));
});

//tests
gulp.task('karma', function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});


//Sequence of Tasks
gulp.task('build', $.sequence('eslint', 'clean:build', ['stylus', 'assets', 'html', 'webpack'], ['watch', 'serve']));
gulp.task('deploy', $.sequence('eslint', 'clean:deploy', ['stylus', 'assets', 'html', 'webpack']));

//Default taks: depends on DEV environment
gulp.task('default', isDev ? ['build'] : ['deploy']);


// Gulp 4 Syntax:
// gulp.task('default', gulp.series('eslint', 'clean:build', gulp.parallel('stylus', 'html', 'webpack'), gulp.parallel('watch', 'serve')));
// gulp.task('deploy', gulp.series('clean:deploy', gulp.parallel('stylus', 'html', 'webpack')));
