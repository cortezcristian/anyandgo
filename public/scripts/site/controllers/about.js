'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
