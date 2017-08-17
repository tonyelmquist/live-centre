const webpack = require('webpack');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }, {
                test: /\.css$/,
                loaders: [
                    'style-loader', 'css-loader',
                ],
                exclude: /flexboxgrid/,
            }, {
                test: /\.css$/,
                loaders: [
                    'style-loader', 'css-loader',
                ],
                include: /flexboxgrid/,
            }, {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 9000000,
                },
            }, {
                test: /\.po$/,
                loaders: ['i18next-po-loader']
            },
        ],
    },
};
