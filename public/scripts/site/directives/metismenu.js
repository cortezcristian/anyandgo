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
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        $(element).metisMenu(scope.$eval(attrs.toolbarTip));
      }
    };
  });
