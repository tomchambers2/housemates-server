'use strict';

/**
 * @ngdoc directive
 * @name roommatesServerApp.directive:flashMessage
 * @description
 * # flashMessage
 */
angular.module('roommatesServerApp')
  .directive('flashMessage', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the flashMessage directive');
      }
    };
  });
