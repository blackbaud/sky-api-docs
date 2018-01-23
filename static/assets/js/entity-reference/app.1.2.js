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
            swaggerUrlDev: '@',
            whiteList: '@',
            blackList: '@',
            showDescriptions: '@'
        }
    });

    function EntityReferenceCtrl($window, $http, $sce, $timeout, bbWait, localStorageService, $rootScope) {
        var self = this;
        this.showErrorMessage = false;

        if (this.showDescriptions == null)
        {
            // default showDescriptions to false, since not all APIs have user friendly descriptions
            this.showDescriptions = false;
        }
        this.$onInit = onInit;

        function onInit() {
            self.isDev = window.location.search.toString().toLowerCase().indexOf('env=dev') >= 0 && self.swaggerUrlDev;
            this.swaggerCacheName = 'swaggerResponseCache-' + (self.isDev ? 'DEV-' : '') + self.apiTitle;
            var swaggerResponseCache = localStorageService.get(self.swaggerCacheName);
            bbWait.beginPageWait({});

            // Get a new swagger response if one is not cached or the cache has expired
            if (!swaggerResponseCache || Date.now() >= swaggerResponseCache.expirationDate) {
              $http.get(self.isDev ? self.swaggerUrlDev : self.swaggerUrl)
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
                .sort(function(a, b) {
                    var keyA = getRefDisplayName(a, swagger.definitions);
                    var keyB = getRefDisplayName(b, swagger.definitions);

                    if (keyA < keyB) {
                        return -1;
                    }

                    if (keyA > keyB) {
                        return 1;
                    }

                    // keys are equal (shouldn't happen in our swagger)
                    return 0;
                })
                .map(function(name) {
                    var definition = swagger.definitions[name];
                    return {
                        name: name,
                        displayName: definition['x-display-name'] || name,
                        displayId: definition['x-display-id'] || name,
                        details: definition,
                        description: self.showDescriptions ? definition.description : null,
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
                    property.displayType = getRefDisplayName(property.ref, definitions) || getTypeFormattedName(property);
                    property.displayId = getRefDisplayId(property.ref, definitions) || getTypeFormattedName(property);
                } else {
                    property.ref = property.$ref && property.$ref.replace("#/definitions/", "");
                    property.displayType = getRefDisplayName(property.ref, definitions) || getTypeFormattedName(property);
                    property.displayId = getRefDisplayId(property.ref, definitions) || getTypeFormattedName(property);
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

        function getRefDisplayId(ref, definitions) {
            if (ref) {
                return (definitions[ref]['x-display-id'] || ref);
            }
        }

        function getTypeFormattedName(property) {

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
