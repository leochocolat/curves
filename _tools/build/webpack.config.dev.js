var path = require('path');
var webpack = require('webpack');
var browserSync = require('browser-sync').get('server');

module.exports = function(config) {
    return {
        mode: 'development',
        entry: [
            path.join(__dirname, 'browser/browsersync.js'),
            path.join(config.js.src, config.js.entry)
        ],
        output: {
            path: path.resolve(config.js.dest),
            filename: config.js.output
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
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: [
                                ['env', { modules: false }]
                            ],
                            plugins: [
                                'es6-promise'
                            ]
                        }
                    }]
                },
                {
                    test: /\.glsl$/,
                    use: 'webpack-glsl-loader'
                }
            ]
        },
        devtool: 'cheap-source-map',
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require(path.join(__dirname, 'dll', 'vendor-manifest.json'))
            }),
            new webpack.DefinePlugin({
                __BROWSERSYNC_SCRIPT__: browserSync.getOption('snippet').replace(/[\s\S]+(document\.write.+;)[\s\S]+/g, '$1'),
                __BROWSERSYNC_URL__: JSON.stringify(browserSync.getOption('urls').get('external'))
            })
        ]
    };
};
