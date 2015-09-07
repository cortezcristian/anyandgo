'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('UserCtrl', function ($scope, Restangular) {
   $scope.users = Restangular.all("users").getList().$object;
  });
