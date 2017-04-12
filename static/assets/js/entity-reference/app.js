(function(){
    "use strict";

    var app = angular.module('entityReferenceApp', []);

    app.config(['$locationProvider', function($locationProvider){
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);

    app.controller('EntityReferenceCtrl', ['$http', '$sce', '$timeout', '$anchorScroll', EntityReferenceCtrl]);

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

    var formatDisplayNames = {
        'date-time': 'dateTime'
    };

    function EntityReferenceCtrl($http, $sce, $timeout, $anchorScroll) {
        this.apiTitle = '';
        this.showErrorMessage = false;

        $http.get(this.swaggerUrl).then(handleSuccess.bind(this), handleError.bind(this));

        function handleSuccess(response) {
            var swagger = response.data;
            this.swagger = swagger;
            var whiteList = this.whiteList ? this.whiteList.split(',') : [];
            var blackList = this.blackList ? this.blackList.split(',') : [];
            this.entities = getEntitiesFromSwagger(swagger, whiteList, blackList);

            $timeout(function() {
                $anchorScroll();
            });
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
            if (property.format) {
                return formatDisplayNames[property.format] || property.type;
            } else {
                return property.type;
            }
        }
    }
})();
