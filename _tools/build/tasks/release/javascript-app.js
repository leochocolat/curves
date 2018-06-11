var path = require('path');
var webpack = require('webpack');

module.exports = function(gulp, config) {
    return function(callback) {
        var src = config.js.src;
        var dest = config.js.dest;

        var webpackConfig = require('../../webpack.config.js')(config);
        webpack(webpackConfig, function(error, stats) {
            if (error) throw Error('webpack', error);
            var statsErrors = stats.toString('errors-only');
            if (statsErrors) console.log('[webpack]', statsErrors);
            callback();
        });
    };
};
