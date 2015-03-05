'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:UserEditCtrl
 * @description
 * # UserEditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('UserEditCtrl', function ($scope, $location, Restangular, user) {
  var original = user;
  $scope.user = Restangular.copy(original);
  

  $scope.isClean = function() {
    return angular.equals(original, $scope.user);
  }

  $scope.destroy = function() {
    original.remove().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/user";
      } else {
        $location.path('/crud/user');
      }
    });
  };

  $scope.save = function() {
    $scope.user.put().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/user";
      } else {
        $location.path('/crud/user');
      }
    });
  };
});
