(function(){
    "use strict";

    var app = angular.module('entityReferenceApp', []);

    app.controller('EntityReferenceCtrl', ['$http', EntityReferenceCtrl]);

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

    function EntityReferenceCtrl($http) {
        this.title = 'Entity Reference';
        this.showErrorMessage = false;

        $http.get(this.swaggerUrl).then(handleSuccess.bind(this), handleError.bind(this));

        function handleSuccess(response) {
            var swagger = response.data;
            this.swagger = swagger;
            var whiteList = this.whiteList ? this.whiteList.split(',') : [];
            var blackList = this.blackList ? this.blackList.split(',') : [];
            this.entities = getEntitiesFromSwagger(swagger, whiteList, blackList);
        }

        function handleError(response) {
            this.showErrorMessage = true;
        }

        function getEntitiesFromSwagger(swagger, whiteList, blackList) {
            return Object.keys(swagger.definitions)
                .sort()
                .map(function(name) {
                    return { name: name, details: swagger.definitions[name] };
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
                    return entity;
                })
                .map(setDisplayTypesOnEntity);
        }

        function setDisplayTypesOnEntity(entity) {
            Object.keys(entity.details.properties).forEach(function(propertyName) {
                var property = entity.details.properties[propertyName];

                if (property.type == "array") {
                    var ref = property.items.$ref.replace("#/definitions/", "").toLowerCase();
                    property.displayType = "array of " + ref;
                } else if (property.$ref != undefined) {
                    var ref = property.$ref.replace("#/definitions/", "").toLowerCase();
                    property.displayType = ref;
                } else {
                    property.displayType = property.type;
                }
            });
            return entity;
        }
    }
})();
