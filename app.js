'use strict';

angular.module('app', [
  'ngRoute',
  'app.home',
  'app.god',
  'app.technology',
  'app.about',
  'app.post'
]).
  config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }]);