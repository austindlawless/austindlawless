'use strict';

angular.module('app', [
  'ngRoute',
  'app.home',
  'app.god',
  'app.technology',
  'app.about'
]).
  config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
  }]);
