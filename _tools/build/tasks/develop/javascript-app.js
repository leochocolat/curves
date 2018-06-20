var webpack = require('webpack');
var browserSync = require('browser-sync').get('server');
const logSymbols = require('log-symbols');

module.exports = function(gulp, config) {
    return function(callback) {

        var webpackConfig = require('../../webpack.config.dev.js')(config);
        webpack(webpackConfig, function(error, stats) {
            if (error) throw new Error('webpack error', error);
            var statsErrors = stats.toString('errors-only');
            if (statsErrors) console.log(logSymbols.error, statsErrors);
            console.log(logSymbols.success, 'Application JavaScript succesfully generated');
            browserSync.reload();
            callback();
        });
    };
};
