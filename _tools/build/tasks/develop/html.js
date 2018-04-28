var path = require('path');
var htmlrender = require('gulp-htmlrender');

htmlrender.addTemplate('template',
    '<script type="text/template" id="{{id}}">'+
        '<%include src="{{src}}"%>'+
    '</script>');

module.exports = function (gulp, plugins, config, version) {
    return function () {
        var src = config.html.src;
        var dest = config.html.dest;

        var html = path.join(src + '/index.html');

        gulp.src(html)
            .pipe(htmlrender.decorator().vars({version:version}).apply())
            .pipe(htmlrender.cache())
            .pipe(htmlrender.render())
            .on('error', function(){
                console.error(arguments);
            })
            .pipe(gulp.dest(dest));
    };

};
