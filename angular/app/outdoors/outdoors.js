'use strict';

angular.module('app.outdoors', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
      when('/outdoors', {
        templateUrl: 'outdoors/outdoors.html',
        controller: 'OutdoorsCtrl'
      });
  }])

  .controller('OutdoorsCtrl', ['$scope', '$http', function ($scope, $http) {
  }]);