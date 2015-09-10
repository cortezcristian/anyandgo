'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:SampleEditCtrl
 * @description
 * # SampleEditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('SampleEditCtrl', function ($scope, $location, Restangular, toastr, sample) {
  var original = sample;
  $scope.sample = Restangular.copy(original);
  

  $scope.isClean = function() {
    return angular.equals(original, $scope.sample);
  }

  $scope.destroy = function() {
    original.remove().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/sample";
      } else {
        $location.path('/crud/sample');
      }
    });
  };

  $scope.save = function() {
    $scope.sample.put().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/sample";
      } else {
        toastr.success('Document was saved', 'Success');
        $location.path('/crud/sample');
      }
    });
  };
});
