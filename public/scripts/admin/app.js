'use strict';
$(document).ready(function(){

    var findBootstrapEnvironment = function() {
        var envs = ['xs', 'sm', 'md', 'lg'];

        var el = $('<div>');
        el.appendTo($('body'));

        for (var i = envs.length - 1; i >= 0; i--) {
            var env = envs[i];

            el.addClass('hidden-'+env);
            if (el.is(':hidden')) {
                el.remove();
                return env
            }
        };
    }

    var env;
    var panels = function(){
      var ho = 0;
      var h = $(window).height() - ho;
      env = findBootstrapEnvironment();
      
      $('#side-col, #content-col').css({
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

     // Start as collapsed for small devices
    if(env === 'xs' || env === 'sm'){
        $("#side-col").toggleClass('do-collapse');
    }

    $('a.collapser').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#side-col").toggleClass('do-collapse');
        if($("#side-col").hasClass('do-collapse')){
            $("#side-col").width('40px');
            $("#content-col").innerWidth(($(window).width()-41)+'px');
            if(env === 'xs' || env === 'sm'){
                $("#side-col").css('z-index', '1');
                //$("#content-col").css('left', '');
            }
            //console.info($("#content-col").width(), $(window).width()-41);
        } else {
            $("#side-col").width('');
            $("#content-col").width('');
            if(env === 'xs' || env === 'sm'){
                $("#side-col").css('z-index', '3');
                //$("#content-col").css('left', '260px');
            }
        }
    });
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
    'toastr',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'toggle-switch',
    'adf',
    'adf.structures.base',
    'adf.widget.clock',
    'adf.widget.weather',
    'cfp.hotkeys',
    'restangular'
  ])
  .config(function ($routeProvider, $locationProvider, RestangularProvider, hotkeysProvider, toastrConfig) {

    // Hotkeys killswitch
    // see https://github.com/chieffancypants/angular-hotkeys#configuration
    hotkeysProvider.includeCheatSheet = true;

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
      .when('/crud/user', {
        templateUrl: '/scripts/admin/views/user.html',
        controller: 'UserCtrl'
      })
      .when('/crud/user-new', {
        templateUrl: '/forms/user/create',
        controller: 'UserNewCtrl'
      })
      .when('/crud/user-edit/:id', {
        templateUrl: '/forms/user/create',
        controller: 'UserEditCtrl',
        resolve: {
          user: function(Restangular, $route){
            return Restangular.one('users', $route.current.params.id).get();
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

      angular.extend(toastrConfig, {
        autoDismiss: false,
        containerId: 'toast-container',
        maxOpened: 0,    
        newestOnTop: true,
        positionClass: 'toast-bottom-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body'
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

