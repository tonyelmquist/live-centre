// Karma configuration
// Generated on Wed Mar 29 2017 16:39:27 GMT+0200 (W. Europe Daylight Time)
let path = require('path');

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai', 'sinon'],


        // list of files / patterns to load in the browser
        files: [
            // 'app/scripts/index.js',
            './app/tests/**/*test.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            // 'app/scripts/**/*.js': ['webpack', 'sourcemap'],
            // './app/tests/**/*test.js': ['babel']
            './app/tests/**/*test.js': ['webpack', 'sourcemap']
        },

        babelPreprocessor: {
            options: {
                'presets': ['es2015', 'stage-0'],
                "plugins": ["transform-es2015-modules-umd"]
            }
        },
        webpack: {

            module: {
                loaders: [{
                    test: /.jsx?$/,
                    include: path.join(__dirname, "app/scripts"),
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'stage-0', 'react']
                    }
                }]
            }
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            noInfo: true,
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],

        // reporter options
        mochaReporter: {
            colors: {
                success: 'green',
                info: 'blue',
                warning: 'yellow',
                error: 'bgRed'
            }
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Firefox'],
        customLaunchers: {
            ChromeCustom: {
                base: 'Chrome',
                chromeDataDir: path.resolve(__dirname, '.chrome'),
                flags: ['--disable-web-security']
            }
        },



        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        // concurrency: Infinity
    })
}
