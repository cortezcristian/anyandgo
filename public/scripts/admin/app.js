'use strict';
/*
$(document).ready(function(){
    $('#side-menu').metisMenu();
    $('head').append('<link rel="stylesheet" type="text/css" href="http://visionmedia.github.io/mocha/example/mocha.css">');
    $.get('/tasks/test', function(data){
        $('.main-con .panel').html(data);
    });
});
*/

/**
 * @ngdoc overview
 * @name anyandgoApp
 * @description
 * # anyandgoApp
 *
 * Main module of the application.
 */
angular
  .module('anyandgoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular'
  ])
  .config(function ($routeProvider, RestangularProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'http://localhost:3000/scripts/admin/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/sample', {
        templateUrl: 'http://localhost:3000/scripts/admin/views/sample.html',
        controller: 'SampleCtrl'
      })
      .when('/sample-new', {
        templateUrl: 'http://localhost:3000/scripts/admin/views/sample-new.html',
        controller: 'SampleNewCtrl'
      })
      .when('/sample-edit/:id', {
        templateUrl: 'http://localhost:3000/scripts/admin/views/sample-edit.html',
        controller: 'SampleEditCtrl',
        resolve: {
          sample: function(Restangular, $route){
            return Restangular.one('samples', $route.current.params.id).get();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
      
      RestangularProvider.setBaseUrl('http://localhost:3000/api/v1');
      RestangularProvider.setRestangularFields({
        id: '_id'
      });
      
      RestangularProvider.setRequestInterceptor(function(elem, operation, what) {
        
        if (operation === 'put') {
          elem._id = undefined;
          return elem;
        }
        return elem;
      });
  });

