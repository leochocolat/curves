var path = require('path');
var htmlrender = require('gulp-htmlrender');
var template = require('gulp-template');
var fs = require('fs');

htmlrender.addTemplate('template',
    '<script type="text/template" id="{{id}}">'+
        '<%include src="{{src}}"%>'+
    '</script>');

module.exports = function (gulp, plugins, config, version) {
    return function () {
        var src = config.html.src;
        var dest = config.html.dest;

        var html = path.join(src + '/index.html');

        //Load in master language file!
        var masterContents = JSON.parse(fs.readFileSync(config.lang.src + '/master.json'));

        //Create templatedata object and add version variable
        var baseTemplateData = Object.assign({}, masterContents, {version:version});

        //Render default HTML template
        renderHTML('', dest, baseTemplateData);

        //Look for other locales files, loop through them and export html templates for each
        fs.readdir(config.lang.src, function(err, items) {
            items.forEach(function(item) {
                if(!item.match(/\.json$/gi) || item.match(/master\.json/gi)) return;
                var locale = item.replace('.json', '');
                var localeDest = (locale) ? dest + locale : dest;

                var localeContents = JSON.parse(fs.readFileSync(config.lang.src + '/' + item));

                //Merge locale contents with master file, so it falls back
                var templateData = Object.assign({}, baseTemplateData, localeContents);

                renderHTML(locale, localeDest, templateData);
            })
        })

        function renderHTML(locale, dest, templateData) {

            gulp.src(html, {read:false})
                .pipe(htmlrender.render())
                .pipe(template(Object.assign({}, templateData, {locale:locale}), {
                    evaluate:    /\{\{(.+?)\}\}/g,
                    interpolate: /\{\{(.+?)\}\}/g,
                    escape:      /\{\{-(.+?)\}\}/g
                }))
                .on('error', function(e){
                    console.error('Error rendering template for locale ' + locale + ': ' + e.message);
                })
                .pipe(gulp.dest(dest));
        }

    };

};
