var path = require('path');

module.exports = function(gulp, config) {
    return function() {
        var src = config.data.src;
        var dest = config.data.dest;

        gulp.src(path.join(src, '/**/*'), {base: src})
            .pipe(gulp.dest(dest));
    };
};
