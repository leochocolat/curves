var webpack = require('webpack');
var util = require('gulp-util');

module.exports = function(gulp, config) {
    return function(callback) {
        var webpackConfig = require('../../webpack-dll.config.js')(config);
        webpack(webpackConfig, function(error, stats) {
            if (error) throw new Error('webpack', error);
            var statsErrors = stats.toString('errors-only');
            if (statsErrors) console.log(logSymbols.error, statsErrors);
            callback();
        });
    };
};
