var path = require('path');
var tinypng = require('gulp-tinypng-compress');

module.exports = function(gulp, plugins, config) {
    return function() {
        var src = config.images.src;
        var assetsSrc = config.assets.src;
        var dest = config.images.dest;

        gulp.src([path.join(src, '/**/*.{png,jpg,jpeg}'), '!' + path.join(assetsSrc, '/img/optimized'), '!' + path.join(assetsSrc, '/img/optimized/**/*')])
            .pipe(tinypng({
                key: 'OUfZVoqF4TgxY9yFmg22s4r3sYj5ubME',
                sigFile: path.join(src, '/tinypng-sigs'),
                log: true
            }))
            .pipe(gulp.dest(dest));
    };
};
