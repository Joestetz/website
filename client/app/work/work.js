'use strict';

angular.module('websiteApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/work', {
        templateUrl: 'app/work/work.html',
        controller: 'WorkCtrl'
      });
  });
