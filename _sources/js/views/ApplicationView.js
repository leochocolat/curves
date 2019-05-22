import Superhero from '@shcc/superhero-js';

export default Superhero.LayoutView.extend({
    regions: {
        main: '.js-region-main'
    },

    ui: {
    },

    events: {
        'click a[href^="/"]:not(.prevent-default)': '_globalClickHandler'
    },

    initialize() {
    },

    onInitialized() {
        this._start();
    },

    _start() {
        Superhero.history.start({ pushState: true });
    },

    _globalClickHandler(e) {
        e.preventDefault();
        Superhero.history.navigate(e.delegateTarget.pathname, { trigger: true });
    }
});
