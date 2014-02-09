var chokidar = require('chokidar'),
    build = require('./build'),
    builtFiles = build(),
    id = 0,
    buildQueue = [],
    ignoreGit = function(path) {
        return path.indexOf('.git/') > -1;
    },
    ignoreBuiltFiles = function ignoreBuiltFiles(path) {
        return builtFiles.filter(function(builtFile) { return builtFile === path;}).length > 0;
    },
    ignore = function ignore(path, stat) {
        return path.match(/[\/\\]\./) !== null || ignoreBuiltFiles(path) || ignoreGit(path);
    },
    queue = function(opts) {
        var event = opts.event,
            path = opts.path;
        buildQueue.push(id++);
        builtFiles = build();
        console.log('\uD83D\uDC40 ', buildQueue.pop(), event, path, 'build done');
    },
    watcher = undefined;

module.exports = function buildOnFileChange(buildPath) {
    watcher = chokidar.watch(buildPath, {ignored: ignore, persistent: true, ignoreInitial: true});

    watcher.on('all', function(event, path) {
        queue({event: event, path: path});
    });
};
