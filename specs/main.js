var mocha = require('./vendor/mocha-shim'),
    $ = require('jquery');
mocha.setup('bdd');
require('./all.specs');
$(document).ready(function(){
    mocha.run();
});
