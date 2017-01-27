/*global angular, window */
;(function (window, angular) {
    'use strict';

    var host,
        isDevelopment,
        needle;

    host = window.location.hostname;
    needle = 'blackbaud.com';
    isDevelopment = (host.indexOf(needle, host.length - needle.length) === -1);


    /**
     * Configures the Omnibar.
     */
    function ConfigOmnibar(OmnibarSearchSettingsProvider, bbOmnibarConfig) {

        // Configure Omnibar
        bbOmnibarConfig.serviceName = 'SKY API';
        bbOmnibarConfig.signInRedirectUrl = '/signin';
        bbOmnibarConfig.signOutRedirectUrl = (isDevelopment) ? 'https://developer.nxt.blackbaud-dev.com' : 'https://developer.sky.blackbaud.com';
        bbOmnibarConfig.enableSearch = true;

        // Configure search results.
        OmnibarSearchSettingsProvider.setSearchResultsTemplateUri('/assets/vendor/bb-omnibar-search/templates/bb-omnibar-search.hbs');
        if (isDevelopment) {
            OmnibarSearchSettingsProvider.setResultsBaseUri('https://apidocs.nxt.blackbaud-dev.com');
            OmnibarSearchSettingsProvider.setResourceUrl('//apidocs.nxt.blackbaud-dev.com/content.json');
        } else {
            OmnibarSearchSettingsProvider.setResultsBaseUri('https://apidocs.sky.blackbaud.com');
            OmnibarSearchSettingsProvider.setResourceUrl('https://apidocs.sky.blackbaud.com/content.json');
        }

        // Remove this line after Omnibar release, week of Feb 1, 2016
        OmnibarSearchSettingsProvider.setSearchFormClass('searchenabled');

        // Localhost configurations:
        //bbOmnibarConfig.url = '//bbauth-signin-cdev.blackbaudhosting.com/omnibar.min.js';
        //bbOmnibarConfig.appLookupUrl = 'http://localhost/apiapplookup';
    }

    function Run(bbOmnibarConfig) {
        var afterLoad;

        afterLoad = bbOmnibarConfig.afterLoad;

        bbOmnibarConfig.afterLoad = function () {

            if (typeof afterLoad === "function") {
                afterLoad();
            }

            angular.element(document).ready(function () {

                // Look into making this mirror the Angular directive:
                $('.productmenucontainer').append($('.navbar .navbar-nav').clone().toggleClass('nav-items bb-omnibar-productmenu'));

                if (isDevelopment) {
                    $('a.bb-omnibar-signinheader-signin').attr('href', 'https://developer.nxt.blackbaud-dev.com/signin/');
                } else {
                    $('a.bb-omnibar-signinheader-signin').attr('href', 'https://developer.sky.blackbaud.com/signin/');
                }
            });
        };
    }

    function APIMSubscribeButtonController($rootScope, bbModal) {
        var modalScope,
            self,
            subscribeButton;

        self  = this;

        modalScope = $rootScope.$new();
        modalScope.rendered = false;
        
        self.openSubscribeForm = function () {
            bbModal.open(
                {
                    controller: 'bbAPIMSubscribeModalController as subscribeCtrl',
                    templateUrl: 'subscribe.modalform.html',
                    $scope: modalScope
                }
            ).rendered.then(function() {
                modalScope.rendered = true;
            });
        };
    }

    function APIMSubscribeModalController($scope, $timeout) {
        var modalFooter,
            renderWatch,
            self,
            subscribeButton,
            termsEnd;

        self = this;
        self.agreeToTerms = false;
        self.disableAgreeToTermsChk = true;

        function agreeToTermsChange(agreeToTermsValue) {
            if (subscribeButton) {
                subscribeButton.prop("disabled", !agreeToTermsValue);
            }
        }

        function checkTermsRead() {
            if (!modalFooter || modalFooter.length == 0) {
                modalFooter = $(".bb-terms-modal-footer");
                termsEnd = $(".bb-terms-end-symbols");
            }

            if (modalFooter && modalFooter.length > 0) {
                if (termsEnd.offset().top <= modalFooter.offset().top) {
                    $timeout(function() {
                        self.disableAgreeToTermsChk = false;
                        $(".modal-body").off('scroll', checkTermsRead);
                    })
                }
            }
        }

        $scope.$watch(angular.bind(self, function () {
            return this.agreeToTerms;
        }), agreeToTermsChange);

        renderWatch = $scope.$watch('rendered', function() {
            var subscribeButtonEl = $("#bbHiddenSubscribeButton").clone().prependTo("#bbSubscribeBtnPlaceholder");
            subscribeButton = subscribeButtonEl.find('button');
            agreeToTermsChange(false); 

            $(".modal-body").scroll(checkTermsRead);
            renderWatch(); //Unregister watch
        });
    }

    // Dependencies.
    ConfigOmnibar.$inject = [
        'OmnibarSearchSettingsProvider',
        'bbOmnibarConfig'
    ];

    Run.$inject = [
        'bbOmnibarConfig'
    ];

    angular.module('azureApp', [
        'sky',
        'OmnibarSearch',
        'OmnibarSearch.templates'
    ]);

    APIMSubscribeButtonController.$inject = [
        '$rootScope', 
        'bbModal'
    ];

    APIMSubscribeModalController.$inject = [
        '$rootScope',
        '$timeout'
    ];

    // Initialize.
    angular.module('azureApp')
        .config(ConfigOmnibar)
        .run(Run)
        .controller("bbAPIMSubscribeButtonController", APIMSubscribeButtonController)
        .controller("bbAPIMSubscribeModalController", APIMSubscribeModalController);

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['azureApp']);
    });

}(window, window.angular));
