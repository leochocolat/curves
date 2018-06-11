var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var minimist = require('minimist');
var gulpSync = require('gulp-sync')(gulp);
const logSymbols = require('log-symbols');


/**
 * Get CLI options
 */
var options = minimist(process.argv.slice(2));
var version = options.buildno || (new Date()).getTime();

/**
 * Load external config file
 */
var rawConfig = fs.readFileSync('./config.json');
var config = JSON.parse(substituteVersionNumber(rawConfig, version));
/**
 * Development tasks
 */
tasks({type: 'develop', sync: true, tasks: ['serve', 'assets', 'sass', 'fonts', 'data', 'javascript-dll', 'javascript-app', 'html'], callback: function() {
    gulp.watch(path.join(config.assets.src, '/**/*'), ['develop:assets']);
    gulp.watch(path.join(config.sass.src, '/**/*.{sass,scss,css}'), ['develop:sass']);
    gulp.watch(path.join(config.fonts.src, '/**/*'), ['develop:fonts']);
    gulp.watch(path.join(config.data.src, '/**/*.{json,xml}'), ['develop:data', 'develop:javascript-app']);
    gulp.watch(path.join(config.js.src, '/**/*.{js,frag,vert,glsl}'), ['develop:javascript-app']);
    gulp.watch(path.join(config.html.src, '**/*.{html,hbs}'), ['develop:html']);
    gulp.watch(path.join(config.lang.src, '**/*.json'), ['develop:html']);
    gulp.watch(path.join(config.temp.src, '/**/*.{json,xml}'), ['develop:javascript-app']);
    console.log(logSymbols.success, 'Watching... (CTRL+C to end)');
}});

/**
 * Release tasks
 */
tasks({type: 'release', sync: true, tasks: ['check-release', 'assets', 'sass', 'fonts', 'data', 'javascript-dll', 'javascript-app', 'html', 'remove-old-releases']});

/**
 * Other tasks
 */

gulp.task('optimize-images', require(path.resolve('tasks/develop/optimize-images'))(gulp, config, version));


/**
 * Utils
 */
function tasks(options) {
    var tasks = [];
    var task, name;

    for (var i = 0, len = options.tasks.length; i < len; i++) {
        task = options.tasks[i];
        name = options.type + ':' + task;
        gulp.task(name, require(path.resolve('tasks', options.type, task))(gulp, config, version));
        tasks.push(name);
    }

    var callback = options.callback || undefined;
    tasks = options.sync ? gulpSync.sync(tasks) : tasks;
    gulp.task(options.type, tasks, callback);
}

function substituteVersionNumber(content, version) {
    return content.toString().replace(/\[version\]/gi, version);
}