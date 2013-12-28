# FunIFrame
## ```open```
Opens the iframe in the given container with given URL and returns an object which exposes various iframe properties and convenience method to close it.
### ```open``` example

```javascript
var funiframe = require('funiframe'),
    container = document.getElementById('funiframe'),
    iframe = funiframe.open({
      url: 'http://localhost:8080',
      to: container
    });
iframe.close();

```
### ```open``` options:
* url
 * is the url which will opened with the iframe
* to
 * is the element which in the iframe is created
* width
 * is the width of the iframe
 * default: document width
* height
 * is the height of the iframe
 * default: document height / 2
