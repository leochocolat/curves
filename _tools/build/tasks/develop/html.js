const path = require('path');
const handlebars = require('gulp-compile-handlebars');
const fs = require('fs');
const browserSync = require('browser-sync').get('server');


module.exports = function(gulp, config, version) {
    return function() {
        
        const src = config.html.src;
        const dest = config.html.dest;

        const entry = src + config.html.entry;

        function getMaster() {
            return JSON.parse(fs.readFileSync(config.lang.src + '/master.json')); //TODO: retrieve from config
        }

        function getTranslations() {
            const files =  fs.readdirSync(config.lang.src);
            let translations = {};
            files.forEach((file) => {
                if (!file.match(/\.json$/gi) || file.match(/master\.json/gi)) return;
                let locale = file.replace('.json', '');
                let translation = JSON.parse(fs.readFileSync(config.lang.src + '/' + file));
                translation.locale = locale;
                translations[locale] = translation;
            });

            return translations;
        }

        const translations = getTranslations();
        const data = {};

        const handlebarsOptions = {
            helpers: {
                template: (context) => {
                    if(!context.hash.id || !context.hash.src) return '';
                    let templateContents = `{{> ${context.hash.src}}}`;
                    return new handlebars.Handlebars.SafeString(handlebars.Handlebars.compile(`<script type="text/template" id="${context.hash.id}">${templateContents}</script>`)(context.data.root));
                }
            },
            batch: [path.resolve(src)]
        };

        Object.keys(translations).forEach((locale) => {
            gulp.src(src + '/*.html')
                .pipe(handlebars(Object.assign({}, data, translations[locale]), handlebarsOptions))
                .on('error', function(e){
                    console.error('Error rendering template for locale ' + locale + ': ' + e.message);
                })
                .pipe(gulp.dest(dest + '/' + locale)); //TODO: this could be done better
        });

        

    };

};
