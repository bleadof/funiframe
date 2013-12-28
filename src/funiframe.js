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
