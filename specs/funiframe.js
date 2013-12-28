var $ = require('jquery'),
    expect = require('chai').expect,
    funiframe = require('../index.js');

describe('FunIFrame', function() {
    describe('open', function() {
        it('creates an iframe inside given container', function() {
            var container = $('#funiframe'),
                iframe = funiframe.open({
                    url: 'http://localhost:8080',
                    to: container.get(0)
                });
            expect(container.find('iframe')).to.have.length(1);
            iframe.close();
        });
        it('returns an object with close that removes added iframe from container', function() {
            var container = $('#funiframe'),
                iframe = funiframe.open({
                    url: 'http://localhost:8080',
                    to: container.get(0)
                });
            iframe.close();
            expect(container.find('iframe')).to.have.length(0);
        });
    });
});
