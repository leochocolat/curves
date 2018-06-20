var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

module.exports = function(gulp, config) {
    return function() {

        var dest = config.sass.dest;
        var src = config.sass.src;

        gulp.src(path.join(src, config.sass.entry))
            .pipe(sourcemaps.init())
            .pipe(plumber())
            .pipe(sass({outputStyle: 'compressed'}))            
            .pipe(autoprefixer({browsers: ['last 2 versions', 'ie 11', 'safari >= 8', 'ios 10', 'android 4']}))
            .pipe(gulp.dest(dest));            
    };
};
