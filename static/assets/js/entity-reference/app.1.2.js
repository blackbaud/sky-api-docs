( function() {
  'use strict';

  var app = angular.module('entityReferenceApp', ['sky', 'ui.bootstrap', 'LocalStorageModule']);

  app.controller('EntityReferenceCtrl', ['$window', '$http', '$sce', '$timeout', 'bbWait', 'localStorageService', '$rootScope', EntityReferenceCtrl]);
  app.controller('OperationEntityCtrl', ['$window', '$http', '$sce', 'bbWait','$rootScope', OperationEntityCtrl]);

  app.component('bbEntityTable', {
    template: '<div class="table-responsive">\
    <table class="table table-hover table-striped">\
        <thead>\
            <tr>\
                <th class="col-md-3"><strong>Property</strong></th>\
                <th ng-show="{{ $ctrl.showRequired }}" class="col-md-1"><strong>Required</strong></th>\
                <th class="col-md-1"><strong>Type</strong></th>\
                <th ng-show="{{ $ctrl.showRequired }}" class="col-md-7"><strong>Description</strong></th>\
                <th ng-show="{{ !$ctrl.showRequired }}" class="col-md-8"><strong>Description</strong></th>\
            </tr>\
        </thead>\
        <tbody>\
            <tr ng-repeat="(property_name, property) in $ctrl.entity.details.properties">\
                <td>{{property_name}}</td>\
                <td ng-show="{{ $ctrl.showRequired }}" class="col-md-1 text-center"><i ng-show="property.required" class="fa fa-check text-success" aria-hidden="true" title="Property is required"></i><span ng-show="property.required" class="sr-only">Property is required</span></td>\
                <td>\
                    <span ng-show="!property.displayId">{{property.displayName}}</span>\
                    <a ng-show="!!property.displayId" ng-href="{{property.displayId}}">{{property.displayName}}</a>\
                </td>\
                <td>\
                    <span ng-bind-html="property.descriptionHtml"></span>\
                </td>\
            </tr>\
        </tbody>\
    </table>\
</div>\
<div ng-if="$ctrl.entity.additionalInfoHtml" ng-bind-html="$ctrl.entity.additionalInfoHtml"></div>',
    bindings: {
      entity: '<',
      showRequired: '<',
    }
  });

  app.component('bbOperationEntityTable', {
    template: '<div name="{{entity.displayId}}" id="{{entity.displayId}}" ng-repeat="entity in ctrl.entities">\
    <p>{{entity.description}}<p>\
    <p>The <strong>{{entity.displayName}}</strong> entity has the following properties:</p>\
\
    <bb-entity-table entity=entity show-required="true" />\
</div>',
    controller: 'OperationEntityCtrl as ctrl',
    bindings: {
      swaggerUrl: '@',
      operationId: '@'
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
      showDescriptions: '<'
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
      self.entities = getDisplayEntitiesFromSwagger(swagger, whiteList, blackList, self.showDescriptions, $sce)
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

      // Need to delay allowing digest cycle to run and additionally
      // give a little extra time to prevent rescrolling back to top due to
      // angular loading sequence.
      return $timeout(function() {
        scrollToHash($window);
      });
    }

    function handleError(response) {
      self.showErrorMessage = true;
    }

    $rootScope.$on('$locationChangeSuccess', function (event, newUrl, oldUrl) {
      scrollToHash($window);
    });

  }

  function OperationEntityCtrl($window, $http, $sce, bbWait, $rootScope) {
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
      self.entities = getDisplayEntitiesFromSwagger(swagger, whiteList, blackList, true, $sce);
    }


    function handleError(response) {
      self.showErrorMessage = true;
    }

    function getEntityNamesFromOperationId(swagger, operationId) {
      var entityNames = [];

      Object.keys(swagger.paths).forEach(function(pathName) {
        var path = swagger.paths[pathName];
        Object.keys(path)
        .filter(function(methodName) {
          var method = path[methodName];
          if (method.operationId === operationId) {
            return true;
          }
        })
        .forEach(function(methodName) {
          var method = path[methodName];
          Object.keys(method.parameters)
          .filter(function(parameterName) {
            var parameter = method.parameters[parameterName];
            return parameter.in === 'body';
          })
          .map(function(parameterName) {
            var parameter = method.parameters[parameterName],
            parameterRefName,
            parameterRefObject;

            if (parameter.schema && parameter.schema.$ref) {
              parameterRefName = getRefNameFromRefAddress(parameter.schema.$ref);
              parameterRefObject = swagger.definitions[parameterRefName];
              if (parameterRefObject) { 
                if (!isArray(parameterRefObject)) {
                  if (!entityNames.contains(parameterRefName)) {
                    entityNames.push(parameterRefName);
                    getEntityNamesOfChildProperties(parameterRefObject, swagger, entityNames)
                  }
                } else {
                  if (parameterRefObject.items && parameterRefObject.items.$ref) {
                    parameterRefName = getRefNameFromRefAddress(parameterRefObject.items.$ref)
                    parameterRefObject = swagger.definitions[parameterRefName];
                    if (!entityNames.contains(parameterRefName)) {
                      entityNames.push(parameterRefName)
                      getEntityNamesOfChildProperties(parameterRefObject, swagger, entityNames)
                    }
                  }
                }
              }
            }
          });
        });
      });
      return entityNames;
    }

    function getEntityNamesOfChildProperties(entity, swagger, entityNames) {
      if (entity.properties) {
        Object.keys(entity.properties).forEach(function(propertyName) {
          var property = entity.properties[propertyName],
              refName,
              refObject;

          if (property.$ref) {
            refName = getRefNameFromRefAddress(property.$ref);
          } else if (isArray(property) && property.items.$ref) {
            refName = getRefNameFromRefAddress(property.items.$ref);
          }
          if (refName) {
            refObject = swagger.definitions[refName];
            if (refObject) {
              if (!entityNames.contains(refName)) {
                entityNames.push(refName);
                getEntityNamesOfChildProperties(refObject, swagger, entityNames);
              }
            }
          }
        });
      } else {
        if (isArray(entity)) {
          if (property.items.$ref) {
            refName = getRefNameFromRefAddress(property.items.$ref);
            refObject = swagger.definitions[refName];
            if (refObject) {
              entityNames.push(refName);
              getEntityNamesOfChildProperties(refObject, swagger, entityNames);
            }
          }
        }
      }
    }

    $rootScope.$on('$locationChangeSuccess', function (event, newUrl, oldUrl) {
      scrollToHash($window);
    });
  }

  function scrollToHash($window) {
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

  function getDisplayEntitiesFromSwagger(swagger, whiteList, blackList, showDescriptions, $sce) {
    var entities = Object.keys(swagger.definitions)
    .map(function(name) {
      var definition = swagger.definitions[name];
      var entity = {
        name: name,
        details: definition,
        hidden: !!definition.properties && !definition['x-hidden']
      };
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
    .map(function(entity) {
      if (entity.details) {
        var definition = entity.details;
        entity.displayName = definition['x-display-name'] || entity.name;
        entity.displayId = definition['x-display-id'] || entity.name;
        entity.description = showDescriptions ? definition.description : null;
        entity.additionalInfoHtml = $sce.trustAsHtml(definition['x-additional-info']);
        entity.hidden = !!definition.properties && !definition['x-hidden'];

        if (definition.properties) {
          Object.keys(definition.properties).forEach(function(propertyName) {
            var property = definition.properties[propertyName];
            appendPropertyDisplayFields(property, swagger.definitions);
            property.required = definition.required && definition.required.includes(propertyName);
            property.descriptionHtml = $sce.trustAsHtml(property.description);
          });
        }
      }
      return entity;
    });

    return reorderEntities(entities, whiteList);
  }

  function reorderEntities(entities, whiteList) {
    if (whiteList && whiteList.length > 0) {
      var newList = [];
      whiteList.forEach(function(entityName) {
        newList.push(entities.find(function(entity) {
          return entity.name == entityName;
        }));
      });
      return newList;
    }
    return entities;
  }

  function getRefDisplayName(ref, definitions) {
    if (ref) {
      return (definitions[ref]['x-display-name'] || definitions[ref]['x-display-name']).toLowerCase();
    }
  }

  function isArray(property) {
    return property && property.type && property.type === 'array';
  }

  function appendPropertyDisplayFields(property, definitions) {
    var displayProps;

    if (isArray(property)) {
      displayProps = createDisplayFields('array of ', property.items, definitions);
    } else {
      displayProps = createDisplayFields('', property, definitions);
    }
    property.displayName = displayProps.displayName;
    property.displayId = displayProps.displayId;
  }

  function createDisplayFields(displayNamePrefix, property, definitions) {
    var displayId,
    displayName,
    refName,
    refObject;

    if (property.$ref) {
      refName = getRefNameFromRefAddress(property.$ref);
      refObject = definitions[refName];
      displayName = displayNamePrefix + (refObject['x-display-name'] || refName).toLowerCase();
      displayId = '#' + (refObject['x-display-id'] || refName);
    } else {
      displayName = displayNamePrefix + getPropertyDisplayName(property);
    }

    return { 
      displayName: displayName,
      displayId: displayId
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

  function getRefNameFromRefAddress(ref) {
    return ref.replace('#/definitions/', '');
  }

})();