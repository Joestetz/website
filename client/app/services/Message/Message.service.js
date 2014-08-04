'use strict';

angular.module('websiteApp')
  .factory('Message', function ($resource) {
    return $resource('/api/messages/:id/:controller', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
