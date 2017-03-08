/*global window, jQuery */
;(function ($, window) {
    "use strict";

    function doOnFind(callback, selector) {
        var $elem;
        $elem = $(selector);
        if ($elem.length > 0) {
            callback.call({}, $elem);
        } else {
            window.setTimeout(function () {
                doOnFind(callback, selector);
            }, 50);
        }
    }

    $(function () {
        var $body;

        $('head').append('<link rel="icon" href="//apidocs.sky.blackbaud.com/img/favicon.ico" type="image/ico">');

        $body = $('body');
        $body.find('.dropdown').on('mouseover', function () {
            $(this).addClass('open');
        }).on('mouseout', function () {
            $(this).removeClass('open');
        });

        doOnFind(function (elem) {
            elem.find('.dropdown-toggle').dropdown();
        }, '.bb-omnibar-productmenu');
    });
})(jQuery, window);
