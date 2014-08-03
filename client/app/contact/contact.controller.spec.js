'use strict';

describe('Controller: ContactCtrl', function () {

  // load the controller's module
  beforeEach(module('websiteApp'));

  var ContactCtrl, scope, $httpBackend, form;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, $compile) {
    $httpBackend = _$httpBackend_;
      
    scope = $rootScope.$new();
    ContactCtrl = $controller('ContactCtrl', {
      $scope: scope
    });
    
    var element = angular.element(
      '<form name="form">' +
        '<input ng-model="name" name="name" required />' +
      '</form>'
    );
    $compile(element)(scope);
    form = scope.form;
  }));

  it('should POST when send is clicked', function () {
    spyOn(scope, 'sendMessage').andCallThrough();
    scope.sendMessage(form);
  
    $httpBackend.expectPOST('/api/messages', { 
        name: 'Clark Kent',
        email: 'ckent@example.com',
        message: 'Hi Joe, your site is awesome!'
      }).respond(201);
      
    $httpBackend.verifyNoOutstandingRequest();
    expect(scope.sendMessage).toHaveBeenCalled();
  });
});
