/*jslint browser: true, es5: true*/
/*global jQuery*/

(function ($) {
    'use strict';

    function doOnFind(callback, selector) {
        var $elem;
        $elem = $(selector);
        if ($elem.length > 0) {
            callback.call({}, $elem);
        } else {
            setTimeout(function () {
                doOnFind(callback, selector);
            }, 50);
        }
    }

    $(function () {
        doOnFind(function (elem) {
            elem.find('.dropdown-toggle').dropdown();
        }, '.bb-omnibar-productmenu');

        $(".clickable-row").click(function () {
            window.document.location = $(this).data("url");
        });
    });
}(jQuery));

window.sr = ScrollReveal({ reset: true });

sr.reveal('.slide-animate', {
  duration: 500,
  reveal: false,
  reset: false,
  scale: 1,
  opacity: 0,
  viewFactor: 0.1
});


sr.reveal('.tutorial-button', {
  duration: 1000,
  reveal: false,
  viewFactor: 0.4,
  reset: false,
  opacity: 0
}, 300);

