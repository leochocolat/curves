module.exports = function(gulp, plugins, config, version) {
    return function() {
        if (!version || !version.toString().match(/^[0-9]+$/gi)) { // Release ID
            throw new Error('Missing version number of incorrect format');
        }
    };
};
