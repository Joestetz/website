'use strict';

angular.module('websiteApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, Message, $modal, socket) {
    
    // init some scope variables and set up a watch
    $scope.messages = [];
    $scope.unreadCount = 0;
    $scope.$watch('messages', function() {
      var filtered = jQuery.grep($scope.messages, function(m) {
        return !m.isRead;
      });
      $scope.unreadCount = filtered.length;
    }, true);
    
    $scope.isAuthorized = Auth.getCurrentUser().role == 'admin';
  
    // fetch data
    $http.get('/api/users').success(function(users) {
      $scope.users = users;
    });
    
    $http.get('/api/messages').success(function(messages) {
      $scope.messages = messages;
      socket.syncUpdates('message', $scope.messages);
    });

    // user tab functions
    $scope.deleteUser = function(user) {
      var conf = confirm('Are you sure you want to delete this user?');
      if(!conf) return;
      
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
    
    // message tab functions
    $scope.deleteMessage = function(message) {
      var conf = confirm('Are you sure you want to delete this message?');
      if(!conf) return;
      
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
    
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('messages');
    });
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
