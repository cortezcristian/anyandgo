'use strict';

/**
 * @ngdoc directive
 * @name anyandgoApp.directive:hero
 * @description
 * # hero
 */
angular.module('anyandgoApp')
  .directive('hero', function () {
    return {
      restrict: 'A',
      link: function postLink($scope, element, attrs) {
        //$(element).metisMenu(scope.$eval(attrs.toolbarTip));
        $scope.carousel = $(element).carousel();

        $scope.doAnimations = function (elems) {
          // http://www.sitepoint.com/bootstrap-carousel-with-css3-animations/
          var animEndEv = 'webkitAnimationEnd animationend';
          
          elems.each(function () {
            var $this = $(this),
                $animationType = $this.data('animation');

            // Add animate.css classes to
            // the elements to be animated 
            // Remove animate.css classes
            // once the animation event has ended
            $this.addClass($animationType).one(animEndEv, function () {
              $this.removeClass($animationType);
            });
          });
        }

        // Animate the first time
        var $animatingElems = $($scope.carousel)
                            .find("[data-animation ^= 'animated']");
        $scope.doAnimations($animatingElems);

        $scope.carousel.on('slide.bs.carousel', function (e) { 
          // Select the elements to be animated inside the active slide 
          var $animatingElems = $(e.relatedTarget)
                                .find("[data-animation ^= 'animated']");
          $scope.doAnimations($animatingElems);
        });
      }
    };
  });
