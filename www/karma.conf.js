module.exports = function(config) {
    config.set({
        browsers: [ 'Chrome' ], // run in Chrome
        singleRun: true, // just run once by default
        frameworks: [ 'mocha', 'chai' ], // use the mocha test framework
        files: [
            //'node_modules/onsenui/css/onsenui.css',
            //'node_modules/onsenui/css/onsen-css-components.css',
            'tests.webpack.js' // just load this file
        ],
        preprocessors: {
            'tests.webpack.js': [ 'webpack', 'sourcemap' ] // preprocess with webpack and our sourcemap loader
        },
        reporters: [ 'mocha' ], // report results in this format
        webpack: { // kind of a copy of your webpack config
            devtool: 'inline-source-map', // just do inline source maps instead of the default
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        loader: 'babel-loader',
                        exclude: [/node_modules/, /onsenui\.js/, /chai-enzyme/],
                        query: {
                            presets: ['es2015', 'stage-0', 'react']
                        }
                    },
                    {
                        test: /\.json$/,
                        loader: 'json'
                    }
                ]
            },
            resolve: {
                extensions: ['', '.js', '.jsx']
            },
            // fix issues with using enzyme
            externals: {
                jsdom: 'window',
                cheerio: 'window',
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': 'window',
                'react/addons': 'window',
                'text-encoding': 'window'
            }
        },
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // This configuration removes all output, except errors
            stats: {
                colors: true,
                hash: false,
                version: false,
                timings: false,
                assets: false,
                chunks: false,
                modules: false,
                reasons: false,
                children: false,
                source: false,
                errors: true,
                errorDetails: false, // If webpack shows cryptic errors then change this to ´true´ to show more details
                warnings: false,
                publicPath: false
            }
        },
        webpackServer: {
            noInfo: true // please don't spam the console when running in karma!
        }
    });
};

