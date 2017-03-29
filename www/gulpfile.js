'use strict'
const path = require('path');
const gulp = require('gulp');
const util = require('gulp-util');
const lintConfig = require('./eslint.config');
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
const DEST_FOLDER = isDev ? 'build' : 'dist';
const FILE_NAME = isDev ? 'main' : 'main.min';



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
            })
        ] : [],
        module: {
            loaders: [{
                test: /.jsx?$/,
                include: path.join(__dirname, "app/scripts"),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }]
        }

    }

    function done(err, stats) {
        firstBuildReady = true;
        if (err) {
            return;
        }
        if (isDev) {
            if (stats.hasErrors()){
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
        .pipe($.if(isDev, $.newer('build'), $.newer('dist')))
        .pipe($.if(isDev, gulp.dest('build'), gulp.dest('dist')));
})

//Linting

gulp.task('eslint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src('app/**/*.js')
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe($.eslint(lintConfig))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe($.eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe($.eslint.failAfterError());
});


gulp.task('watch', function() {
    gulp.watch('app/stylus/**', ['stylus']);
});

// Static Server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "build"
        }
    });
    browserSync.watch('build/**').on('change', browserSync.reload)
});


//Cleaning directories
gulp.task('clean:build', function() {
    return del('build/**');
});

gulp.task('clean:deploy', function() {
    return del('dist/**');
});

//Sequence of Tasks
gulp.task('build', $.sequence('eslint', 'clean:build', ['stylus', 'html', 'webpack'], ['watch', 'serve']));
gulp.task('deploy', $.sequence('clean:deploy', ['stylus', 'html', 'webpack']));

//Default taks: depends on DEV environment
gulp.task('default', isDev ? ['build'] : ['deploy']);


// Gulp 4 Syntax:
// gulp.task('default', gulp.series('eslint', 'clean:build', gulp.parallel('stylus', 'html', 'webpack'), gulp.parallel('watch', 'serve')));
// gulp.task('deploy', gulp.series('clean:deploy', gulp.parallel('stylus', 'html', 'webpack')));
