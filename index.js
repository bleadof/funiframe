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
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvdGFybW8vRG9jdW1lbnRzL1Byb2plY3RzL2pzL2Z1bmlmcmFtZS9zcmMvZnVuaWZyYW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY3JlYXRlSWZyYW1lKG9wdHMpIHtcbiAgICB2YXIgdXJsID0gb3B0cy51cmwsXG4gICAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgIGlmcmFtZS5mcmFtZUJvcmRlciA9IDA7XG4gICAgaWZyYW1lLndpZHRoID0gb3B0cy53aWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIHx8IGRvY3VtZW50LndpZHRoO1xuICAgIGlmcmFtZS5oZWlnaHQgPSBvcHRzLmhlaWdodCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodC8yIHx8IGRvY3VtZW50LmhlaWdodC8yO1xuICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHVybCk7XG4gICAgcmV0dXJuIGlmcmFtZTtcbn1cblxuZnVuY3Rpb24gb3BlbihvcHRzKSB7XG4gICAgdmFyIHRvID0gb3B0cy50byxcbiAgICAgICAgaWZyYW1lID0gY3JlYXRlSWZyYW1lKG9wdHMpO1xuICAgIHRvLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdG8ucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG9wZW46IG9wZW5cbn07XG4iXX0=
(1)
});
