'use strict';

/**
 * @ngdoc directive
 * @name anyandgoApp.directive:loading
 * @description
 * # loading
 */
angular.module('anyandgoApp')
  .directive('loadingmessage', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        $(window).load(function() {
          //element.find('.preloading-message').addClass('animated bounceOutUp');
          $timeout(function(){
            element.addClass('animated flipOutX');
            //element.hide();
          }, 2000)
        });
      }
    };
  });
