var path = require('path');
var webpack = require('webpack');
var pkg = require('../../package.json');

module.exports = function(config) {
    return {
        mode: 'production',
        entry: {
            vendor: Object.keys(pkg.dependencies)
        },
        output: {
            filename: 'vendor.bundle.js',
            library: '[name]',
            path: path.resolve(config.js.dest)
        },
        resolve: {
            alias: config.js.alias,
            modules: [
                path.resolve(config.js.src),
                'node_modules'
            ]
        },
        module: {
            rules: [
                {test: /backbone\.js$/, loader: 'imports-loader?define=>false'}
            ],
        },
        externals: {
            'bowser': 'bowser'
        },
        plugins: [
            new webpack.DllPlugin({
                name: '[name]',
                path: path.join(__dirname, 'dll', '[name]-manifest.json'),
            })    
        ]
    };
};
