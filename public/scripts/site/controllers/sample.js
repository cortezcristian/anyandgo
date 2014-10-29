'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:SampleCtrl
 * @description
 * # SampleCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('SampleCtrl', function ($scope, Restangular) {
   $scope.samples = Restangular.all("samples").getList().$object;
  });
