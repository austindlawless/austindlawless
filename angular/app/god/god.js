'use strict';

angular.module('app.god', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
      when('/god', {
        templateUrl: 'god/god.html',
        controller: 'GodCtrl'
      });
  }])

  .controller('GodCtrl', ['$scope', '$http', function ($scope, $http) {
  }]);