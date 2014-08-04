'use strict';

describe('Directive: jsTabs', function () {

  // load the directive's module and view
  beforeEach(module('websiteApp'));
  beforeEach(module('app/directives/jsTabs/jsTabs.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<js-tabs></js-tabs>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the jsTabs directive');
  }));
});