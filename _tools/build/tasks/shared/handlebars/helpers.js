const handlebars = require('gulp-compile-handlebars');

const helpers = {
    template: (context) => {
        if (!context.hash.id || !context.hash.src) return '';
        let templateContents = `{{> ${context.hash.src}}}`;        
        return new handlebars.Handlebars.SafeString(handlebars.Handlebars.compile(`<script type="text/template" id="${context.hash.id}">${templateContents}</script>`)(context.data.root));
    },
    get: (context, options) => {
        return new handlebars.Handlebars.SafeString(handlebars.Handlebars.compile(`{{${context}}}`)(options.data.root));
    },
    where: (context, options) => {
        var hash = options.hash;
        var searchKey = Object.keys(hash)[0];
        var searchQuery = hash[searchKey];

        for (var key in context) {
            if (context[key][searchKey] && context[key][searchKey] === searchQuery) {
                return options.fn(context[key]);
            }
        }

        return null;
    }
};

module.exports = helpers;