module.exports.getConfig = function (type, partner) {
    var webpack = require("webpack");

    var isDev = type === 'development';

    var config = {
        entry: './app/scripts/index.js',
        output: {
            path: __dirname,
            filename: 'main.js'
        },
        debug: isDev,
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(type),
                    'LOCAL_PARTNER': JSON.stringify(partner || 'something') // Useful for custom build changes/settings
                }
            })
        ],
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query:
                    {
                        // Work around https://phabricator.babeljs.io/T2877#78089
                        passPerPreset: true,
                        presets: [
                            { plugins: [ "transform-runtime" ] },
                            {
                                passPerPreset: false,
                                presets: [ "es2015", "stage-0", "react" ]
                            }
                        ]
                    }
                },
                {
                    test: /\.less$/,
                    loader: 'style-loader!css-loader!less-loader'
                },
                {
                    test: /\.po$/,
                    loader: 'json!po?format=mf'
                },
                {
                    test: /\.css$/,
                    loader: 'style!css!postcss'
                },
                {
                    test: /\.styl$/,
                    loader: 'style!css!postcss!stylus?paths=node_modules'
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "url-loader?limit=10000&minetype=application/font-woff"
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "file-loader"
                }/*,
                {
                    test: /\.(jpe?g|png|gif)$/i,
                    loaders: [
                        'file?hash=sha512&digest=hex&name=[hash].[ext]',
                        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                    ]
                }*/

            ]
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    };

    if (isDev) {
        config.devtool = 'source-map';
    }

    return config;
}
