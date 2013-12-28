!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.funiframe=e():"undefined"!=typeof global?global.funiframe=e():"undefined"!=typeof self&&(self.funiframe=e())}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function createIframe(opts) {
    var url = opts.url,
        iframe = document.createElement('iframe');
    iframe.frameBorder = 0;
    iframe.width = opts.width || document.body.clientWidth || document.width;
    iframe.height = opts.height || document.body.clientHeight/2 || document.height/2;
    iframe.setAttribute('src', url);
    return iframe;
}

function open(opts) {
    var to = opts.to,
        iframe = createIframe(opts);
    to.appendChild(iframe);
    return {
        close: function() {
            to.removeChild(iframe);
        }
    };
};


module.exports = {
    open: open
};

},{}]},{},[1])
(1)
});