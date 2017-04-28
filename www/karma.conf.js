//Webpack configuration
const webpack = require('webpack');
const webpackConf = require('./webpack.config.js');

// Fixes Enzyme & React compatibility issues
webpackConf.externals = {
    'cheerio': 'window',
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react'
};

webpackConf.plugins = [new webpack.ProvidePlugin({i18next: "i18next"})];

//Karma cinfiguration
module.exports = function (config) {
  config.set({
    browsers: [ 'Firefox' ],
    // karma only needs to know about the test bundle
    files: [
      './app/tests/tests.bundle.js'
    ],
    frameworks: [ 'chai', 'mocha' ],
    plugins: [
        'karma-webpack',
        'karma-chai',
        'karma-mocha',
        'karma-firefox-launcher',
        'karma-sourcemap-loader',
        'karma-mocha-reporter'
    ],
    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {
      './app/tests/tests.bundle.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha' ],
    // reporter options
    mochaReporter: {
        colors: {
            success: 'cyan',
            info: 'blue',
            warning: 'yellow',
            error: 'magenta'
        }
    },
    // web server port
    port: 9875,

    singleRun: true,

    // level of logging with possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // webpack config object
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true,
    },
    browserConsoleLogOptions: {
        terminal: true,
        level: ""
    }
  });
};
