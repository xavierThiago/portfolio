/* lazyload.js (c) Lorenzo Giuliani
 * MIT License (http://www.opensource.org/licenses/mit-license.html)
 *
 * expects a list of:
 * `<img src="blank.gif" data-src="my_image.png" width="600" height="400" class="lazy">`
 *
 * lightweight version (c) Thiago Jampaulo Xavier
 * MIT License (http://www.opensource.org/licenses/mit-license.html)
 *
 */

(function (w, doc) {
    "use strict";

    var images = Array.prototype.slice.call(doc.querySelectorAll("img.lazy"));

    function loadImage(element, callback) {
        var img = new Image();
        var src = element.getAttribute("data-src");

        img.onload = function () {
            if (!!element.parent) {
                element.parent.replaceChild(img, element);
            } else {
                element.src = src;
            }

            if (callback && typeof callback === "function") {
                callback();
            }
        };

        img.src = src;
    }

    function isElementInViewport(element) {
        var visibleArea = element.getBoundingClientRect();

        return (
            visibleArea.top >= 0 && visibleArea.left >= 0 &&
            visibleArea.top <= (w.innerHeight || doc.documentElement.clientHeight)
        );
    }

    function processScroll() {
        images.forEach(function (element, i, me) {
            if (isElementInViewport(element)) {
                loadImage(element, function () {
                    me.splice(i, i);
                });
            }
        });
    }

    processScroll();
    w.addEventListener("scroll", processScroll);

}(window, document));
