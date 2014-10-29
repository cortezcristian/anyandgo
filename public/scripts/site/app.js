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
  .config(function ($routeProvider, $locationProvider, RestangularProvider) {
    //$locationProvider.html5Mode(true).hashPrefix('!');
    //$cookies.lang = "en-us";
    
    $routeProvider
      .when('/', {
        templateUrl: '/scripts/admin/views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

