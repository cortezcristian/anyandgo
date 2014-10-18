'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:SampleNewCtrl
 * @description
 * # SampleNewCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('SampleNewCtrl', function ($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('samples').post($scope.sample).then(function(sample) {  
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/sample";
      } else {
        $location.path('/crud/sample');
      }
    });
  }
});
