'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('MainCtrl', function ($scope, $timeout, toastr) {
    $scope.anyandgoversion = 'v1.0';
    toastr.info('Welcome to anyandgo v1.0', 'Information');
    var model = false;
    if (!model) {
      // set default model for demo purposes
      model = {
        title: "Dashboard",
        structure: "4-8",
        rows: [{
          columns: [{
            styleClass: "col-md-4",
            widgets: [{
              type: "weather",
              config: {
                location: "Rosario"
              },
              title: "Weather Rosario"
            }, {
              type: "weather",
              config: {
                location: "San Francisco"
              },
              title: "Weather San Francisco"
            }]
          }, {
            styleClass: "col-md-8",
            widgets: [{
              type: "clock",
              config: {
                timePattern: 'HH:mm:ss',
                datePattern: 'YYYY-MM-DD'
              },
              title: "Clock"
            }]
          }]
        }]
      };
    }
    $scope.model = model;
  });
