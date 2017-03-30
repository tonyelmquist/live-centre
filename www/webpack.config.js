const path = require('path');
module.exports = {
    watch: true,
    devtool: 'inline-source-map',
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
};
