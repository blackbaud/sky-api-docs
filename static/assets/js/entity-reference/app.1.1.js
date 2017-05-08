(function(){
    "use strict";

    var app = angular.module('entityReferenceApp', ["sky", "ui.bootstrap"]);

    app.controller('EntityReferenceCtrl', ['$window', '$http', '$sce', '$timeout', 'bbWait', EntityReferenceCtrl]);

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

    function EntityReferenceCtrl($window, $http, $sce, $timeout, bbWait) {
        this.apiTitle = '';
        this.showErrorMessage = false;

        this.$onInit = onInit;

        function onInit() {
            bbWait.beginPageWait({});

            $http.get(this.swaggerUrl)
                .then(handleSuccess.bind(this), handleError.bind(this))
                .finally(function() { bbWait.endPageWait(); });
        }

        function handleSuccess(response) {
            var swagger = response.data;
            this.swagger = swagger;
            var whiteList = this.whiteList ? this.whiteList.split(',') : [];
            var blackList = this.blackList ? this.blackList.split(',') : [];
            this.entities = getEntitiesFromSwagger(swagger, whiteList, blackList);

            // Need to delay allowing digest cycle to run and additionally
            // give a little extra time to prevent rescrolling back to top due to 
            // angular loading sequence.
            return $timeout(function() {
                scrollToHash();
            }, 250);
        }

        function handleError(response) {
            this.showErrorMessage = true;
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
            var index = hash.indexOf('#');
            return index === -1 ? hash : hash.substr(index+1);
        }
    }
})();
