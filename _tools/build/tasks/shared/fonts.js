var path = require('path');

module.exports = function(gulp, config) {
    return function() {
        var src = config.fonts.src;
        var dest = config.fonts.dest;

        gulp.src(path.join(src, '/**/*'), {base: src})
            .pipe(gulp.dest(dest));
    };
};
