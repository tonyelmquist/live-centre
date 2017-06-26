//Webpack configuration
const path = require('path');
process.env.NODE_ENV = 'test';
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
    browsers: [ 'Chrome' ],
    // karma only needs to know about the test bundle
    files: [
      './app/tests/tests.bundle.js'
    ],
    frameworks: [ 'chai', 'mocha' ],
    plugins: [
        'karma-webpack',
        'karma-chai',
        'karma-mocha',
        'karma-chrome-launcher',
        'karma-sourcemap-loader',
        'karma-mocha-reporter',
        'karma-coverage-istanbul-reporter'
    ],
    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {
      './app/tests/tests.bundle.js': [ 'webpack', 'sourcemap']
    },
    reporters: [ 'mocha', 'coverage-istanbul' ],
    // reporter options
    mochaReporter: {
        colors: {
            success: 'cyan',
            info: 'blue',
            warning: 'yellow',
            error: 'magenta'
        }
    },
    coverageIstanbulReporter: {
        // reports can be any that are listed here: https://github.com/istanbuljs/istanbul-reports/tree/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib
      reports: ['html', 'lcovonly', 'text-summary'],

       // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
      dir: path.join(__dirname, 'coverage'),

       // if using webpack and pre-loaders, work around webpack breaking the source path
      fixWebpackSourcePaths: true,

      // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
      skipFilesWithNoCoverage: true,
      // Most reporters accept additional config options. You can pass these through the `report-config` option
      'report-config': {

        // all options available at: https://github.com/istanbuljs/istanbul-reports/blob/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib/html/index.js#L135-L137
        html: {
          // outputs the report in ./coverage/html
          subdir: 'html'
        }

      }
    },
    // web server port
    port: 9875,
    //Kill process
    singleRun: false,
    // autoWatch: true,
    // level of logging with possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // webpack config object
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true,
    },
    browserConsoleLogOptions: {
        terminal: true,
        level: "log"
    }
  });
};
