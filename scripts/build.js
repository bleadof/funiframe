var fs         = require('fs'),
    path       = require('path'),
    _          = require('lodash'),
    Bacon      = require('baconjs'),
    browserify = require('browserify'),
    createSpecRequireFile = function(to, requiredFiles) {
        var content = requiredFiles.map(function(file) {
            return 'require(\''+ file.split('.js')[0] +'\');';
        }).join('');
        fs.writeFile(to, content, function(err) {
            if(err) console.log(err);
        });
        return to;
    },
    walk = function(opts) {
        var dir = opts.dir,
            basedir = opts.basedir || opts.dir,
            ignoredFiles = opts.filter || function() { return true; },
            filesToProcess = Bacon
                .fromNodeCallback(fs.readdir, dir)
                .map(function(files) {
                    return files.filter(ignoredFiles);
                }),
            filesAndFolderStatus = filesToProcess.flatMapLatest(function(files) {
                var fileAndStatusStreams = _.map(files, function(file) {
                    return Bacon.combineTemplate({
                        file: file,
                        isFolder: Bacon
                            .fromNodeCallback(fs.stat, dir + path.sep + file)
                            .map(function(stat) {
                                return stat.isDirectory();
                            })
                    }).toEventStream();
                });
                return Bacon.when(fileAndStatusStreams, function() {
                    return _.map(arguments, function(status) {
                        return status;
                    });
                });
            }),
            filesToAdd = filesAndFolderStatus
                .map(function(files) {
                    var filtered = _.filter(files, function(file) {
                        return !file.isFolder;
                    });
                    return _.map(filtered, function(file) {
                        return basedir + path.sep + file.file;
                    });
                }),
            subFoldersToProcessWithFolderStatus = filesAndFolderStatus
                .map(function(files) {
                    var filtered = _.filter(files, function(file) {
                        return file.isFolder;
                    });
                    return _.map(filtered, function(file) {
                        return file.file;
                    });
                }),
            processedSubFolders = subFoldersToProcessWithFolderStatus.map(function(files) {
                return _.map(files, function(file) {
                    return walk({
                        dir: file,
                        basedir: basedir
                    });
                });
            }),
            subFolders = processedSubFolders.flatMapLatest(function(subFolderStreams) {
                if(_.isEmpty(subFolderStreams)) return Bacon.once([]);
                return Bacon.when(subFolderStreams, function() {
                    return _.reduce(arguments, function(allSubFolders, subFolder) {
                        return allSubFolders.concat(subFolder);
                    }, []);
                });
            }),
            allFiles = Bacon
                .combineTemplate({
                    subFolders: subFolders,
                    filesToAdd: filesToAdd
                })
                .map(function(combined) {
                    return combined.subFolders.concat(combined.filesToAdd);
                })
                .take(1);
        return allFiles;
    };

module.exports = function build() {
    var index = browserify('./src/funiframe.js'),
        ignored = ['index.js', 'specs/all.specs.js', 'specs/built.js'],
        ignoredForSpecs = _.clone(ignored)
            .slice(-2)
            .map(function(path) {
                return path.replace('specs/', '');
            }).concat(['main.js']),
        specsOpts  = {
            basedir: './specs',
            noParse: [
                './specs/vendor/mocha.js'
            ],
            debug: true
        },
        allSpecFiles;
    index
        .bundle({'standalone': 'funiframe'})
        .pipe(fs.createWriteStream('./index.js'));
    allSpecFiles = walk({
        dir:'./specs',
        basedir: '.',
        filter: function(path) {
            return ignoredForSpecs
                .filter(function(p) {
                    return p === path;
                }).length === 0 &&
                path.indexOf('.js') > -1 &&
                path.indexOf('vendor') === -1;
        }
    });
    allSpecFiles.onValue(function(files) {
        var allSpecsFileName = createSpecRequireFile('./specs/all.specs.js', files),
            specs = browserify(specsOpts);
        specs
            .add('./main.js')
            .bundle()
            .pipe(fs.createWriteStream('./specs/built.js'));
    });
    allSpecFiles.onError(function(error) {
        console.error(error);
    });
    return ['index.js', 'specs/all.specs.js', 'specs/built.js'];
};
