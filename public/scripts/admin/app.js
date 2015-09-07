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
    'toggle-switch',
    'restangular',
    'angularUtils.directives.dirPagination'
  ])
  .config(function ($routeProvider, $locationProvider, RestangularProvider) {
    //$locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider
      .when('/', {
        templateUrl: '/scripts/admin/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/crud/sample', {
        templateUrl: '/scripts/admin/views/sample.html',
        controller: 'SampleCtrl'
      })
      .when('/crud/sample-new', {
        templateUrl: '/forms/sample/create',
        controller: 'SampleNewCtrl'
      })
      .when('/crud/sample-edit/:id', {
        templateUrl: '/forms/sample/create',
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
      
      RestangularProvider.setBaseUrl('/api/v1');
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
  }).run(function ($rootScope, $location, $route, $timeout, $http, $cookies) {

    /*
    */

    $rootScope.config = {};
    $rootScope.config.app_url = $location.url();
    $rootScope.config.app_path = $location.path();
    $rootScope.layout = {};
    $rootScope.layout.loading = false;

    if(!navigator.userAgent.match(/Zombie/)) {

    $rootScope.$on('$routeChangeStart', function () {
        console.log('$routeChangeStart');
        //show loading gif
        $timeout(function(){
          $rootScope.layout.loading = true;          
        });
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        console.log('$routeChangeSuccess');
        //hide loading gif
        $timeout(function(){
          $rootScope.layout.loading = false;
        }, 200);
    });
    $rootScope.$on('$routeChangeError', function () {

        //hide loading gif
        console.log('error');
        $rootScope.layout.loading = false;

    });

    }

  });

