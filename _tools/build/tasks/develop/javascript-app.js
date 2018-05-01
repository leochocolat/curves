var path = require('path');
var webpack = require('webpack');
var util = require('gulp-util');
var browserSync = require('browser-sync').get('server');

module.exports = function(gulp, config) {
    return function(callback) {
        var src = config.js.src;
        var dest = config.js.dest;

        var webpackConfig = require('../../webpack.config.dev.js')(config);
        webpack(webpackConfig, function(error, stats) {
            if (error) throw new util.PluginError('webpack', error);
            var statsErrors = stats.toString('errors-only');
            if (statsErrors) util.log('[webpack]', statsErrors);
            browserSync.reload();
            callback();
        });
    };
};
