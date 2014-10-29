'use strict';

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
/**
 * @ngdoc directive
 * @name anyandgoApp.directive:langsupport
 * @description
 * # langsupport
 */
angular.module('anyandgoApp', ['ngCookies'])
  .directive('langsupport', ['$cookieStore', '$cookies', '$rootScope', '$browser', 
                             function ($cookieStore, $cookies, $rootScope, $browser) {
    console.log($cookieStore, "<<<");
    console.log($browser, $browser.cookies(), "<<<a");
    return {
      restrict: 'A',
      link: function($scope, element, attrs, ctrl) {
        element.on("click", function () {
          $cookieStore.put("lang", attrs.langsupport);
          console.log($cookieStore.get("lang"), "<--");
          console.log($browser, $browser.cookies(), "<<<a");
          // Angular cookie crap doesn't work
          // http://stackoverflow.com/questions/20246230/when-is-angularjs-cookiestore-updated-with-new-cookie
          setCookie("lang",attrs.langsupport, 2);
        });
        //console.log(scope, element, attrs);
        //$(element).metisMenu(scope.$eval(attrs.toolbarTip));
      }
    };
  }]);
