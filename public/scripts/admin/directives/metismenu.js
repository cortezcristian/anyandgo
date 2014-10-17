'use strict';

/**
 * @ngdoc directive
 * @name anyandgoApp.directive:metismenu
 * @description
 * # metismenu
 */
angular.module('anyandgoApp')
  .directive('metismenu', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the metismenu directive');
      }
    };
  });
