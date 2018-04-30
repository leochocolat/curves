var webpack = require('webpack');

module.exports = function(gulp, plugins, config) {
    return function(callback) {
        var webpackConfig = require('../../webpack-dll.config.dev.js')(config);
        webpack(webpackConfig, function(error, stats) {
            if (error) throw new plugins.util.PluginError('webpack', error);
            var statsErrors = stats.toString('errors-only');
            if (statsErrors) plugins.util.log('[webpack]', statsErrors);
            callback();
        });
    };
};
