import Superhero from '@shcc/superhero-js';
import HomeView from 'views/pages/HomeView';

export default Superhero.Router.extend({

    routes: {
        '': '_home',
    },

    _home: function() {

        Superhero.RegionManager.get('main').show(HomeView);

    }

});
