var path = require('path');

module.exports = function(gulp, plugins, config) {
    return function() {
        var dest = config.assets.dest;
        var src = config.assets.src;

        gulp.src(path.join(src, '/**/*'), {base: src})
            .pipe(gulp.dest(dest));

    };
};
