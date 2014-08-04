'use strict';

angular.module('websiteApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, Message, $modal) {
  
    $scope.isAuthorized = Auth.getCurrentUser().role != 'admin';
  
    $http.get('/api/users').success(function(users) {
      $scope.users = users;
    });
    
    $http.get('/api/messages').success(function(messages) {
      $scope.messages = messages;
    });

    $scope.deleteUser = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
    
    $scope.deleteMessage = function(message) {
      Message.remove({ id: message._id });
      angular.forEach($scope.messages, function(m, i) {
        if (m === message) {
          $scope.messages.splice(i, 1);
        }
      });
    };
    
    $scope.markRead = function(message) {
      message.isRead = true;
      Message.update(message);
    };
    
    $scope.markUnread = function(message) {
      message.isRead = false;
      Message.update(message);
    };
    
    $scope.openMessage = function(message) {
      $scope.markRead(message);
      
      var modalInstance = $modal.open({
        templateUrl: 'messageModal.html',
        controller: 'MessageModalCtrl',
        resolve: {
          currentMessage: function () {
            return message;
          }
        }
      });
    };
  })
  .controller('MessageModalCtrl', function ($scope, $modalInstance, Message, currentMessage) {
    $scope.currentMessage = currentMessage;
    
    $scope.close = function () {
      $modalInstance.dismiss('close');
    };
    
    $scope.markUnread = function(message) {
      message.isRead = false;
      Message.update(message);
      $modalInstance.dismiss('marked unread');
    };
  })
  .directive('stopEvent', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        element.bind('click', function (e) {
          e.stopPropagation();
        });
      }
    };
 });
