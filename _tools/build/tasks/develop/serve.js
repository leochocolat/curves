var browserSync = require('browser-sync').get('server');
var ip = require('ip');

module.exports = function(gulp, config) {
    return function() {
        browserSync.init({
            proxy: config.url,
            host: ip.address(),
            open: false,
            logLevel: 'ignore',
            notify: false,
            ghostMode: false,
            socket: {
                domain: ip.address() + ':3000'
            },
            scriptPath: function(path) {
                return '//' + ip.address() + ':3000' + path;
            }
        });
    };
};
