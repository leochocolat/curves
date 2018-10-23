var path = require('path');
var webpack = require('webpack');

module.exports = function(config) {
    return {
        mode: 'production',
        entry: {
            main: path.join(config.js.src, config.js.entry)
        },
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
                                'env'
                            ],
                            plugins: [
                                'es6-promise'
                            ]
                        }                      
                    }] 
                },
                {test: /\.glsl$/, use: 'webpack-glsl-loader'},
                {test: /\.js$/, loader: 'strip-loader?strip[]=console.log,strip[]=alert'}
            ],
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: '.',
                manifest: require(path.join(__dirname, 'dll', 'vendor-manifest.json'))
            })
        ]
    };
};
