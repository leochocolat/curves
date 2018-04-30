const Superhero = require('@shcc/superhero-js');
const HomeView = require('views/pages/HomeView');

module.exports = Superhero.Router.extend({

    routes: {
        '': '_home',
    },

    _home: function() {

        Superhero.RegionManager.get('main').show(HomeView);

    }

});
