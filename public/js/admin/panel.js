'use strict';
$(document).ready(function(){
    $('#side-menu').metisMenu();
});


/**
 * @ngdoc overview
 * @name rdashboardTestApp
 * @description
 * # rdashboardTestApp
 *
 * Main module of the application.
 */
var app = angular
  .module('rdashboardTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
