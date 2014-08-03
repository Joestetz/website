'use strict';

angular.module('websiteApp')
  .controller('ContactCtrl', function ($scope, $http) {
    $scope.error = '';
    
    $scope.sendMessage = function(form) {
      $scope.submitted = true;
      
      if(form.$invalid) {
        return;
      }
      
      $http.post('/api/messages', { 
          name: $scope.name,
          email: $scope.email,
          message: $scope.message
        }).error(function () {
          $scope.error = 'Oops! It looks like I messed something up and your message couldn\'t be delivered.';
        });
        
      $scope.name = '';
      $scope.email = '';
      $scope.message = '';
      
      $scope.submitted = false;
    };
  });
