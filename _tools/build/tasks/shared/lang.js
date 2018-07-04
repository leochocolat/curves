var fs = require('fs');
var mkdirp = require('mkdirp');
var browserSync = require('browser-sync').get('server');

module.exports = function(gulp, config, version) {

    return function() {

        var src = config.lang.src;
        var dest = config.lang.dest;

        // create path if not existing
        mkdirp.sync(dest + '/', function(err) {
            if (err) {
                throw new Error('Coulnd\'t create destination folder: ');
            }
            else {}
        });

        //Load in master language file!
        var masterContents = JSON.parse(fs.readFileSync(src + '/master.json'));

        //Create templatedata object and add version variable
        var baseTemplateData = Object.assign({}, masterContents, {version: version});

        //Look for other locales files, loop through them and export json file for each
        fs.readdir(src, function(err, items) {
            items.forEach(function(item) {
                if (!item.match(/\.json$/gi) || item.match(/master\.json/gi)) return;
                var locale = item.replace('.json', '');
                var localeContents = JSON.parse(fs.readFileSync(src + '/' + item));

                //Merge locale contents with master file, so it falls back
                var templateData = Object.assign({}, baseTemplateData, localeContents);

                writeFile(locale, dest, templateData);
            });
        });

        function writeFile(locale, dest, templateData) {

            // remove line breaks (added by PO-editor)
            fs.writeFile(dest + '/' + locale + '.json', JSON.stringify(templateData).replace(/\\n/g, ''), function(e) {
                // done
            });

        }

        console.log(logSymbols.success, 'Lang files succesfully written');

        browserSync.reload();

    };

};