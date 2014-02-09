var $ = require('jquery'),
    chai = require('chai'),
    chaiJquery = require('chai-jquery'),
    expect = chai.expect,
    funiframe = require('../index.js');

chai.use(function(chai, utils) {
    chaiJquery(chai, utils, $);
});

describe('FunIFrame', function() {
    afterEach(function() {
        $('#funiframe').empty();
    });
    describe('open', function() {
        it('creates an iframe inside given container', function() {
            var $container = $('#funiframe'),
                iframe = funiframe.open({
                    url: 'http://localhost:8080',
                    to: $container.get(0)
                });
            expect($container).to.have('iframe');
        });
        it('returns an object with close that removes added iframe from container', function() {
            var $container = $('#funiframe'),
                iframe = funiframe.open({
                    url: 'http://localhost:8080',
                    to: $container.get(0)
                });
            iframe.close();
            expect($container).to.not.have('iframe');
        });
    });
});
