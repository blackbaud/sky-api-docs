( function() {
    "use strict";

    var app = angular.module('entityReferenceApp', ['sky', 'ui.bootstrap', 'LocalStorageModule']);

    app.controller('EntityReferenceCtrl', ['$window', '$http', '$sce', '$timeout', 'bbWait', 'localStorageService', '$rootScope', EntityReferenceCtrl]);

    app.component('bbEntityReference', {
        templateUrl: '/assets/views/entities.html',
        controller: 'EntityReferenceCtrl as ctrl',
        bindings: {
            apiTitle: '@',
            lastUpdatedDate: '@',
            getStartedUrl: '@',
            swaggerUrl: '@',
            whiteList: '@',
            blackList: '@'
        }
    });

    function EntityReferenceCtrl($window, $http, $sce, $timeout, bbWait, localStorageService, $rootScope) {
        var self = this;
        this.showErrorMessage = false;
        this.swaggerCacheName = 'swaggerResponseCache-' + this.apiTitle;

        this.$onInit = onInit;

        function onInit() {
            var swaggerResponseCache = localStorageService.get(self.swaggerCacheName);
            bbWait.beginPageWait({});

            // Get a new swagger response if one is not cached or the cache has expired
            if (!swaggerResponseCache || Date.now() >= swaggerResponseCache.expirationDate) {
              $http.get(self.swaggerUrl)
                  .then(handleSuccess, handleError)
                  .finally(function() { bbWait.endPageWait(); });
            }
            else {
              handleSwaggerResponseData(swaggerResponseCache.swaggerResponseData);
              bbWait.endPageWait();
            }
        }

        function handleSuccess(response) {
            // Represents the number of hours until the cache expires
            var swaggerCacheHourLimit = 12;

            localStorageService.set(self.swaggerCacheName, {
              'swaggerResponseData': response.data,
              'expirationDate': Date.now() + (swaggerCacheHourLimit * 36e5)
            });
            handleSwaggerResponseData(response.data);
        }

        function handleSwaggerResponseData(swagger) {
            self.swagger = swagger;
            var whiteList = self.whiteList ? self.whiteList.split(',') : [];
            var blackList = self.blackList ? self.blackList.split(',') : [];
            self.entities = getEntitiesFromSwagger(swagger, whiteList, blackList);

            // Need to delay allowing digest cycle to run and additionally
            // give a little extra time to prevent rescrolling back to top due to
            // angular loading sequence.
            return $timeout(function() {
              scrollToHash();
            });
        }

        $rootScope.$on('$locationChangeSuccess', function (event, newUrl, oldUrl) {
            scrollToHash();
        });

        function handleError(response) {
            self.showErrorMessage = true;
        }

        function getEntitiesFromSwagger(swagger, whiteList, blackList) {
            return Object.keys(swagger.definitions)
                .sort()
                .map(function(name) {
                    var definition = swagger.definitions[name];
                    return {
                        name: name,
                        displayName: definition['x-display-name'] || name,
                        details: definition,
                        additionalInfoHtml: $sce.trustAsHtml(definition['x-additional-info'])
                    };
                })
                .filter(function(entity) {
                    if (whiteList.length > 0) {
                        return whiteList.find(function(name) {
                            return entity.name == name;
                        });
                    }
                    if (blackList.length > 0) {
                        return !blackList.find(function(name) {
                            return entity.name == name;
                        });
                    }
                    return !!entity.details.properties && !entity.details['x-hidden'];
                })
                .map(function(entity)
                {
                    return setDisplayTypesOnEntity(entity, swagger.definitions);
                });
        }

        function setDisplayTypesOnEntity(entity, definitions) {
            Object.keys(entity.details.properties).forEach(function(propertyName) {
                var property = entity.details.properties[propertyName];
                property.isArray = (property.type === "array");

                if (property.isArray) {
                    property.ref = (property.items.$ref && property.items.$ref.replace("#/definitions/", ""));
                    property.displayType = getRefDisplayName(property.ref, definitions) || getTypeDisplayName(property.items);
                } else {
                    property.ref = property.$ref && property.$ref.replace("#/definitions/", "");
                    property.displayType = getRefDisplayName(property.ref, definitions) || getTypeDisplayName(property);
                }

                property.descriptionHtml = $sce.trustAsHtml(property.description);
            });
            return entity;
        }

        function getRefDisplayName(ref, definitions) {
            if (ref) {
                return (definitions[ref]['x-display-name'] || ref).toLowerCase();
            }
        }

        function getTypeDisplayName(property) {

            // Conversion table for swagger format to display text.
            var formatDisplayNames = {
                'date-time': 'dateTime'
            };

            if (property.format) {
                return formatDisplayNames[property.format] || property.type;
            } else {
                return property.type;
            }
        }

        function scrollToHash() {
            // Cannot use $location with anchors or links will be broken without html5Mode.
            // Cannot $autoScroll due to it requiring $location without html5Mode.
            // Cannot enable html5Mode or external links will be broken.

            // Unfortunately, this means we need to manually scroll window to element.
            // See https://github.com/angular/angular.js/issues/114

            var document = $window.document;
            var hash = getHash($window.location);

            var elem = document.getElementsByName(hash)[0];

            if (elem) {
                elem.scrollIntoView();
            } else {
                $window.scrollTo(0, 0);
            }
        }

        function getHash(location) {
            var hash = location.hash || '';
            var index = hash.indexOf('#!#'); // This was indexOf('#') before the angular 1.6 upgrade.
            return index === -1 ? hash : hash.substr(index+3); // This was +1 before 1.6. If we do something to remove the #! prefix, change this back
        }
    }
})();
