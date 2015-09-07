'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:UserNewCtrl
 * @description
 * # UserNewCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('UserNewCtrl', function ($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('users').post($scope.user).then(function(user) {  
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/user";
      } else {
        $location.path('/crud/user');
      }
    });
  }
});
