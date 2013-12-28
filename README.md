# FunIFrame
## ```open```
Opens the iframe in the given container with given URL and returns an object which exposes various iframe properties and convenience method to close it.
### Example

```javascript
var container = $('#funiframe'),
    iframe = funiframe.open({
      url: 'http://localhost:8080',
      to: container.get(0)
    });
iframe.close();

```
### Options:
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
