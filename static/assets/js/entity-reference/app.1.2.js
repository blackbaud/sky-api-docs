( function() {
    "use strict";

    var app = angular.module('entityReferenceApp', ['sky', 'ui.bootstrap', 'LocalStorageModule']);

    app.controller('EntityReferenceCtrl', ['$window', '$http', '$sce', '$timeout', 'bbWait', 'localStorageService', '$rootScope', EntityReferenceCtrl]);
    app.controller('OperationEntityCtrl', ['$http', '$sce', 'bbWait', OperationEntityCtrl]);

    app.component('bbEntityTable', {
        templateUrl: '/assets/views/entitytable.html',
        bindings: {
            entity: '<',
            showRequired: '@',
        }
    });

    app.component('bbOperationEntityTable', {
        templateUrl: '/assets/views/operationentities.html',
        controller: 'OperationEntityCtrl as ctrl',
        bindings: {
            swaggerUrl: '@',
            operationId: '@',
            baseLinkUrl: '@'
        }
    });

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
            self.entities = getDisplayEntitiesFromSwagger(swagger, whiteList, blackList, self.showDescriptions, $sce);

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

    function OperationEntityCtrl($http, $sce, bbWait) {
        var self = this;
        this.$onInit = onInit;

        function onInit() {
            bbWait.beginPageWait({});
            $http.get(self.swaggerUrl)
              .then(handleSuccess, handleError)
              .finally(function() { bbWait.endPageWait(); });
        }

        function handleSuccess(response) {
            handleSwaggerResponseData(response.data);
        }

        function handleSwaggerResponseData(swagger) {
            self.swagger = swagger;
            var whiteList = getEntityNamesFromOperationId(swagger, self.operationId);
            var blackList = [];
            self.entities = getDisplayEntitiesFromSwagger(swagger, whiteList, blackList, true, $sce, self.baseLinkUrl);
        }

        function handleError(response) {
            self.showErrorMessage = true;
        }

        function getEntityNamesFromOperationId(swagger, operationId){
            return Object.keys(swagger.paths)
                .map(function(pathName) {
                    var entityNames = [],
                        path = swagger.paths[pathName];

                    Object.keys(path).forEach(function(methodName) {
                        var method = path[methodName];
                        if (method.operationId === operationId){
                            Object.keys(method.parameters)
                                .filter(function(parameterName) {
                                    var parameter = method.parameters[parameterName];
                                    return parameter.in === "body";
                                })
                                .map(function(parameterName) {
                                    var parameter = method.parameters[parameterName];
                                    entityNames.push(parameter.schema.$ref.replace("#/definitions/", ""))
                                });
                            return;
                        }
                    });
                    return entityNames;
                });
        }
    }

    function getDisplayEntitiesFromSwagger(swagger, whiteList, blackList, showDescriptions, $sce, baseLinkUrl) {
        return Object.keys(swagger.definitions)
            .map(function(name) {
                var definition = swagger.definitions[name];
                var entity = {
                    name: name,
                    displayName: definition['x-display-name'] || name,
                    displayId: definition['x-display-id'] || name,
                    details: definition,
                    description: showDescriptions ? definition.description : null,
                    additionalInfoHtml: $sce.trustAsHtml(definition['x-additional-info']),
                    hidden: !!definition.properties && !definition['x-hidden']
                };

                 Object.keys(entity.details.properties).forEach(function(propertyName) {
                    var property = entity.details.properties[propertyName];
                    appendPropertyDisplayFields(property, swagger.definitions, baseLinkUrl);
                    property.required = definition.required && definition.required.includes(propertyName);
                    property.descriptionHtml = $sce.trustAsHtml(property.description);
                 });

                return entity;
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
                return !!entity.hidden;
            })
            .sort(function(a, b) {
                var keyA = a.displayId;
                var keyB = b.displayId;

                if (keyA < keyB) {
                    return -1;
                }

                if (keyA > keyB) {
                    return 1;
                }

                // keys are equal (shouldn't happen in our swagger)
                return 0;
            });
    }

    function getRefDisplayName(ref, definitions) {
        if (ref) {
            return (definitions[ref]['x-display-name'] || definitions[ref]['x-display-name']).toLowerCase();
        }
    }

    function isArray(property){
        return property && property.type && property.type === "array";
    }

    function appendPropertyDisplayFields(property, definitions, baseLinkUrl) {
        var baseLink = baseLinkUrl ? baseLinkUrl + "#" : "#",
            displayName = "",
            refName;

        if (isArray(property) && property.items.$ref) {
            displayName = "array of ";
            refName = property.items.$ref.replace("#/definitions/", "");
        } else if (property.$ref) {
            refName = property.$ref.replace("#/definitions/", "");
        }

        if (refName){
            var refObject = definitions[refName];
            if (!refObject['x-hidden']){
                property.displayId = baseLink + (definitions[refName]['x-display-id'] || refName);
            }
            property.displayName = displayName + (definitions[refName]['x-display-name'] || refName).toLowerCase();
        } else {
            property.displayName = displayName + (property['x-display-name'] || getPropertyDisplayName(property));
        }
    }

    function getPropertyDisplayName(property) {

        // Conversion table for swagger format to display text. https://swagger.io/specification/#data-types-13
        var formatDisplayNames = {
            'date-time': 'dateTime',
            'date': 'date',
            'double': 'double',
            'float': 'float',
            'int64': 'long',
            'byte': 'byte',
            'binary': 'binary',
            'password': 'password'
        };

        if (property.format) {
            return formatDisplayNames[property.format] || property.type;
        } else if (property.type) {
            return property.type;
        }

        return property.name;
    }

})();