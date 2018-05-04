var path = require('path');
var handlebars = require('gulp-compile-handlebars');
var fs = require('fs');
var browserSync = require('browser-sync').get('server');

module.exports = function (gulp, config, version) {
    return function () {
        var src = config.html.src;
        var dest = config.html.dest;

        var html = path.join(src + '/index.html');

        //Load in master language file!
        var masterContents = JSON.parse(fs.readFileSync(config.lang.src + '/master.json'));

        //Create templatedata object and add version variable
        var baseTemplateData = Object.assign({}, masterContents, {version:version});

        var locales = [];

        //Look for other locales files, loop through them and export html templates for each
        fs.readdir(config.lang.src, function(err, items) {
            items.forEach(function(item) {
                if(!item.match(/\.json$/gi) || item.match(/master\.json/gi)) return;
                var locale = item.replace('.json', '');
                locales.push(locale);
                var localeDest = (locale) ? dest + locale : dest;

                var localeContents = JSON.parse(fs.readFileSync(config.lang.src + '/' + item));

                //Merge locale contents with master file, so it falls back
                var templateData = Object.assign({}, baseTemplateData, localeContents);

                renderHTML(locale, localeDest, templateData);
            })
        })

        function renderHTML(locale, dest, templateData) {

            var options = {
                helpers: {
                    template:(context, options) => {
                        if(!context.hash.id || !context.hash.src) return '';
                        let templateContents = `{{> ${context.hash.src}}}`;
                        return new handlebars.Handlebars.SafeString(handlebars.Handlebars.compile(`<script type="text/template" id="${context.hash.id}">${templateContents}</script>`)(context.data.root));
                    }
                },
                batch: [path.resolve(src)]
            }

            gulp.src(src + '/*.html')
                .pipe(handlebars(Object.assign({}, templateData, {locale:locale, locales:locales}), options))
                .on('error', function(e){
                    console.error('Error rendering template for locale ' + locale + ': ' + e.message);
                })
                .pipe(gulp.dest(dest));


        }

        //Render default HTML template
        renderHTML(config.lang.default_locale, dest, baseTemplateData);

        browserSync.reload();

    };

};
