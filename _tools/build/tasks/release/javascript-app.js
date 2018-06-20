var webpack = require('webpack');

module.exports = function(gulp, config) {
    return function(callback) {

        var webpackConfig = require('../../webpack.config.js')(config);
        webpack(webpackConfig, function(error, stats) {
            if (error) throw new Error('webpack', error);
            var statsErrors = stats.toString('errors-only');
            if (statsErrors) console.log('[webpack]', statsErrors);
            callback();
        });
    };
};
