var chokidar = require('chokidar'),
    build = require('./build'),
    id = 0,
    buildQueue = [],
    queue = function(opts) {
        var event = opts.event,
            path = opts.path;
        buildQueue.push(id++);
        builtFiles = build(function() {
            console.log('\uD83D\uDC40 ', buildQueue.shift(), event, path, 'build done');
        });
        return builtFiles;
    },
    builtFiles = queue({event:'start', path:'.'}),
    ignoreGit = function(path) {
        return path.indexOf('.git/') > -1;
    },
    ignoreBuiltFiles = function ignoreBuiltFiles(path) {
        return builtFiles.filter(function(builtFile) { return builtFile === path;}).length > 0;
    },
    ignore = function ignore(path, stat) {
        return path.match(/[\/\\]\./) !== null || ignoreBuiltFiles(path) || ignoreGit(path);
    },
    watcher = undefined;

module.exports = function buildOnFileChange(buildPath) {
    watcher = chokidar.watch(buildPath, {ignored: ignore, persistent: true, ignoreInitial: true});

    watcher.on('all', function(event, path) {
        queue({event: event, path: path});
    });
};
