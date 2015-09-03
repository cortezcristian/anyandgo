'use strict';
$(document).ready(function(){

    var panels = function(){
      var ho = 45;
      var h = $(window).height() - ho;
      
      $('#side, #content').css({
          'height': h+'px',
          'top': ho+'px'
      });

      $('.ps-scroller')
          .perfectScrollbar();

    }

    panels();
    $(window).resize(function(){
        panels();
    });

    setTimeout(function(){
      $('.github-btn-con').removeClass('hide');
      $('.github-btn-con').css("margin-top","8px");
    }, 1200);
    
});

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
    /*
    $routeProvider
      .when('/', {
        templateUrl: '/scripts/admin/views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      }); */
  }).run(function ($rootScope, $location, $route, $timeout, $http, $cookies, $anchorScroll) {

    /*
    */

    $rootScope.config = {};
    $rootScope.config.app_url = $location.url();
    $rootScope.config.app_path = $location.path();
    $rootScope.layout = {};
    $rootScope.layout.loading = false;
      
    //$anchorScroll.yOffset = 50;

    $rootScope.gotoAnchor = function(x) {
      var newHash = x;
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash(x);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }
    }; 

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

