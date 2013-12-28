var fs         = require('fs'),
    path       = require('path'),
    _          = require('lodash'),
    browserify = require('browserify'),
    specsOpts  = {
        basedir: './specs',
        noParse: [
            './specs/vendor/mocha.js'
        ],
        debug: true
    },
    createSpecRequireFile = function(to, requiredFiles) {
        var content = requiredFiles.map(function(file) {
            return 'require(\''+ file +'\');';
        }).join('');
        fs.writeFile(to, content, function(err) {
            if(err) console.log(err);
        });
        return to;
    },
    specsWalkDone = {
        err: function err(err) {
            console.error(err);
        },
        success: function done(files) {
            var allSpecsFileName = createSpecRequireFile('./specs/all.specs.js', files),
                specs = browserify(specsOpts);
            specs
                .add('./main.js')
                .bundle()
                .pipe(fs.createWriteStream('./specs/built.js'));
        }
    },
    walk = function(opts) {
        var dir = opts.dir,
            done = opts.done,
            basedir = opts.basedir || opts.dir,
            filter = opts.filter || function() { return true; },
            results = [];
        fs.readdir(dir, function(err, list) {
            if (err) return done.err(err);
            var filteredList = list.filter(filter),
                pending = filteredList.length;
            if (!pending) return done.success(results);
            filteredList.forEach(function(file) {
                file = basedir + path.sep + file;
                fs.stat(file, function(err, stat) {
                    if (stat && stat.isDirectory()) {
                        walk({
                            dir: file,
                            basedir: basedir,
                            done: {
                                success: function(res) {
                                    results = results.concat(res);
                                    if (!--pending) done.success(results);
                                },
                                err: function(err) {
                                    console.error(err);
                                }
                            }
                        });
                    } else {
                        results.push(file);
                        if (!--pending) done.success(results);
                    }
                });
            });
        });
    };

module.exports = function build() {
    var index = browserify('./src/funiframe.js'),
        ignored = ['index.js', 'specs/all.specs.js', 'specs/built.js'],
        ignoredForSpecs = _.clone(ignored)
            .slice(-2)
            .map(function(path) {
                return path.replace('specs/', '');
            });
    ignoredForSpecs.push('main.js');
    index
        .bundle({'standalone': 'funiframe'})
        .pipe(fs.createWriteStream('./index.js'));
    walk({
        dir:'./specs',
        basedir: '.',
        done: specsWalkDone,
        filter: function(path) {
            return ignoredForSpecs
                .filter(function(p) {
                    return p === path;
                }).length === 0 &&
                path.indexOf('.js') > -1 &&
                path.indexOf('vendor') === -1;
        }
    });
    return ['index.js', 'specs/all.specs.js', 'specs/built.js'];
};
