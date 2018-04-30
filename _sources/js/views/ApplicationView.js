const _ = require('underscore');
const Superhero = require('@shcc/superhero-js');

module.exports = Superhero.LayoutView.extend({

    regions: {
        main: '.js-region-main'
    },

    ui: {

    },

    events: {
        'click a[href^="/"]:not(.prevent-default)': '_globalClickHandler'
    },

    initialize: function() {

    },

    onInitialized: function() {

        this._start();

    },

    _start: function() {

        Superhero.history.start({pushState: true});

    },

    _globalClickHandler: function(e) {

        e.preventDefault();
        Superhero.history.loadUrl(e.delegateTarget.pathname, {trigger: true});

    }

});
