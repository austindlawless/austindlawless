'use strict';

angular.module('app.technology', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
      when('/technology', {
        templateUrl: 'technology/technology.html',
        controller: 'TechCtrl'
      });
  }])

  .controller('TechCtrl', ['$scope', '$http', function ($scope, $http) {
    console.log($scope);
  }]);