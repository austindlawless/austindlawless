'use strict';

angular.module('app.home', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
      });
  }])

  .controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
  }]);