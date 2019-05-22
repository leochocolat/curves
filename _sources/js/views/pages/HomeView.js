import Superhero from '@shcc/superhero-js';

export default Superhero.View.extend({
    className: 'page page-home',
    template: 'pages/home',

    ui: {
        title: '.js-title'
    },

    initialize() {
    },

    onInitialized() {
    },

    onClose() {
    }
});
