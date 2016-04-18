'use strict';

angular.module('app.about', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
      when('/about', {
        templateUrl: 'about/index.html',
        controller: 'AboutCtrl'
      });
  }])

  .controller('AboutCtrl', [function () {
  }]);