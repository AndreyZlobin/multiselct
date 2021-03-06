const path = require('path')

module.exports = {
    entry: {
        index: path.resolve(__dirname, './index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
}
