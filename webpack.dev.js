const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        port: 8080,
        contentBase: './dist',
        hot: true,
        historyApiFallback: true,
        host: '0.0.0.0',
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        https: false,
    },
    devtool: 'eval',
});