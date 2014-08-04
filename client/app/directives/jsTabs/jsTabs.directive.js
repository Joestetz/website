'use strict';

angular.module('websiteApp')
  .directive('jsTabs', function () {
    return {
      templateUrl: 'app/directives/jsTabs/jsTabs.html',
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function ($scope) {
        var tabs = $scope.tabs = [];
        
        $scope.select = function (tab) {
          angular.forEach(tabs, function(tab) {
            tab.selected = false;
          });
          
          tab.selected = true;
        };
        
        this.addTab = function (tab) {
          if (tabs.length === 0) {
            $scope.select(tab);
          }
          tabs.push(tab);
        };
      }
    };
  })
  .directive('jsTab', function () {
    return {
      template: '<div ng-show="selected" ng-transclude></div>',
      require: '^jsTabs',
      restrict: 'E',
      transclude: true,
      scope: {
        title: '@',
        additionalContent: '='
      },
      link: function (scope, element, attrs, ctrl) {
        ctrl.addTab(scope);
      }
    };
  });