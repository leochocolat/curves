var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').get('server');
var replacePath = require('gulp-replace-path');

module.exports = function(gulp, plugins, config) {
    return function() {

        var dest = config.sass.dest;
        var src = config.sass.src;

        gulp.src(path.join(src, config.sass.entry))
            .pipe(sourcemaps.init())
            .pipe(plugins.plumber())
            .pipe(plugins.sass())
            .pipe(sourcemaps.write())
            .pipe(plugins.autoprefixer({browsers: ['last 2 versions', 'ie 11', 'safari >= 8', 'ios 9', 'android 4']}))
            .pipe(gulp.dest(dest))
            .pipe(browserSync.stream());
    };
};
