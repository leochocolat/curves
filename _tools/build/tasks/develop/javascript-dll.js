var webpack = require('webpack');
var util = require('gulp-util');

module.exports = function(gulp, config) {
    return function(callback) {
        var webpackConfig = require('../../webpack-dll.config.dev.js')(config);
        webpack(webpackConfig, function(error, stats) {
            if (error) throw new util.PluginError('webpack', error);
            var statsErrors = stats.toString('errors-only');
            if (statsErrors) util.log('[webpack]', statsErrors);
            callback();
        });
    };
};
