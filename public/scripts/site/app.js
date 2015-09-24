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
      var ho = 45;
      var h = $(window).height() - ho;
      env = findBootstrapEnvironment();
      
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


    // Start as collapsed for small devices
    if(env === 'xs' || env === 'sm'){
        $("#side").toggleClass('do-collapse');
    }

    $('a.collapser').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#side").toggleClass('do-collapse');
        if($("#side").hasClass('do-collapse')){
            //$("#side").width('40px');
            $("#content").innerWidth(($(window).width()-41)+'px');
            if(env === 'xs' || env === 'sm'){
                $("#side").css('z-index', '1');
                //$("#content").css('left', '');
            }
            //console.info($("#content").width(), $(window).width()-41);
        } else {
            $("#side").width('');
            $("#content").width('');
            if(env === 'xs' || env === 'sm'){
                $("#side").css('z-index', '3');
                //$("#content").css('left', '260px');
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
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'youtube-embed',
    'cfp.hotkeys',
    'restangular'
  ])
  .config(function ($routeProvider, $locationProvider, RestangularProvider, hotkeysProvider) {

    // Hotkeys killswitch
    // see https://github.com/chieffancypants/angular-hotkeys#configuration
    hotkeysProvider.includeCheatSheet = true;

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
  }).run(function ($rootScope, $location, $route, $timeout, $http, $cookies, $anchorScroll, youtubeEmbedUtils) {

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

    // Videos
    // $rootScope.modalPlayer = {};
    $rootScope.modalVideo = '';

    $rootScope.openVideoModal = function(video){
      //
      // var id = youtubeEmbedUtils.getIdFromURL(video.url);
      $rootScope.modalVideo = video;
      $('#modalViewVideo').modal('show');
    }


    $rootScope.closeVideoModal = function(video){
      // Stop video
      $rootScope.modalPlayer.stopVideo();
    }

    $('#modalViewVideo').on('hidden.bs.modal', function () {
      $rootScope.modalPlayer.stopVideo();
    });

    
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

