const path = require('path');
const handlebars = require('gulp-compile-handlebars');
const fs = require('fs');
const browserSync = require('browser-sync').get('server');


module.exports = function(gulp, config, version) {
    return function() {
        
        const src = config.html.src;
        const dest = config.html.dest;        

        const handlebarsOptions = {
            helpers: {
                template: (context) => {
                    if (!context.hash.id || !context.hash.src) return '';
                    let templateContents = `{{> ${context.hash.src}}}`;
                    return new handlebars.Handlebars.SafeString(handlebars.Handlebars.compile(`<script type="text/template" id="${context.hash.id}">${templateContents}</script>`)(context.data.root));
                }
            },
            batch: [path.resolve(src)]
        };

        function renderHTML(locale, templateData, dest) { //TODO: rename dest

            //Last variables to add
            templateData.version = version; 
            templateData.locale = locale;
            templateData.lang = locale.replace(/^([a-z]{2})-.*/gi, '$1');

            gulp.src(src + '/*.html')
                .pipe(handlebars(templateData, handlebarsOptions))
                .on('error', function(e){
                    console.error('Error rendering template for locale ' + locale + ': ' + e.message);
                })
                .pipe(gulp.dest(dest)); 
        }

        function getMaster() {
            return JSON.parse(fs.readFileSync(config.lang.src + '/master.json')); //TODO: retrieve from config
        }

        function getTranslations(master) {
            const files =  fs.readdirSync(config.lang.src);
            let translations = {};
            files.forEach((file) => {
                if (!file.match(/\.json$/gi) || file.match(/master\.json/gi)) return;
                let locale = file.replace('.json', '');
                let jsonData = JSON.parse(fs.readFileSync(config.lang.src + '/' + file));                                
                translations[locale] = Object.assign({}, master, jsonData);
            });

            return translations;
        }

        function getData() {
            const files =  fs.readdirSync(config.data.src);
            let data = {};
            files.forEach((file) => {
                if (!file.match(/\.json$/gi)) return;
                let name = file.replace('.json', '');
                let jsonData = JSON.parse(fs.readFileSync(config.data.src + '/' + file));                
                data[name] = jsonData;
            });

            return data;
        }

        const master = getMaster();
        const translations = getTranslations(master);
        const data = getData();       

        //Render translations
        Object.keys(translations).forEach((locale) => {
            renderHTML(locale, Object.assign({}, translations[locale], {data: data}), dest + '/' + locale);
        });

        //Render the master language
        renderHTML(config.lang.default_locale, Object.assign({}, getMaster(), {data: data}), dest);        

        browserSync.reload();
    };

};
