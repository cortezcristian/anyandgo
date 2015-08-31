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
    
    var glyph_opts = {
        map: {
          doc: "glyphicon glyphicon-file",
          docOpen: "glyphicon glyphicon-file",
          checkbox: "glyphicon glyphicon-unchecked",
          checkboxSelected: "glyphicon glyphicon-check",
          checkboxUnknown: "glyphicon glyphicon-share",
          dragHelper: "glyphicon glyphicon-play",
          dropMarker: "glyphicon glyphicon-arrow-right",
          error: "glyphicon glyphicon-warning-sign",
          expanderClosed: "glyphicon glyphicon-plus-sign",
          expanderLazy: "glyphicon glyphicon-plus-sign",  // glyphicon-expand
          expanderOpen: "glyphicon glyphicon-minus-sign",  // glyphicon-collapse-down
          folder: "glyphicon glyphicon-folder-close",
          folderOpen: "glyphicon glyphicon-folder-open",
          loading: "glyphicon glyphicon-refresh"
        }
      };
    $('#topics').fancytree({
        extensions: ["glyph"],
        activate: function(event, data){
            var node = data.node,
                orgEvent = data.originalEvent;

            if(node.data.href){
                $('#content').scrollTo(node.data.href);
                //window.location.href=node.data.href;    
            }
        },
        glyph: glyph_opts

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

