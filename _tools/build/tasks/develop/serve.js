var browserSync = require('browser-sync').get('server');
var ip = require('ip');

module.exports = function(gulp, plugins, config) {
    return function() {
        browserSync.init({
            proxy: config.url,
            host: ip.address(),
            open: false,
            logLevel: 'ignore',
            notify: false,
            socket: {
                domain: ip.address() + ':3000'
            },
            scriptPath: function(path) {
                return '//' + ip.address() + ':3000' + path;
            }
        });
    };
};
