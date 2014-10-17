'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:SampleEditCtrl
 * @description
 * # SampleEditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('SampleEditCtrl', function ($scope, $location, Restangular, sample) {
  var original = sample;
  $scope.sample = Restangular.copy(original);
  

  $scope.isClean = function() {
    return angular.equals(original, $scope.sample);
  }

  $scope.destroy = function() {
    original.remove().then(function() {
      $location.path('/sample');
    });
  };

  $scope.save = function() {
    $scope.sample.put().then(function() {
      $location.path('/sample');
    });
  };
});
