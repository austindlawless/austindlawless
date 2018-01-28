'use strict';

angular.module('app.post', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
      when('/blog-post/:postUrl', {
        templateUrl: 'blog-post/index.html',
        controller: 'PostCtrl'
      });
  }])

  .controller('PostCtrl', ['$scope', '$routeParams', '$http', '$filter', '$sce', function ($scope, $routeParams, $http, $filter, $sce) {
    var postUrl = $routeParams.postUrl;
    console.log(postUrl);
    $http.get('blogs.json').success(function (data) {
      $scope.post = $filter('filter')(data, function (d) {
        return d.url === postUrl;
      })[0];
      $scope.postBody = $sce.trustAsHtml($scope.post.body);
    });
  }]);