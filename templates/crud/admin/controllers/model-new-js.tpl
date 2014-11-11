'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:<%=modelname %>NewCtrl
 * @description
 * # <%=modelname %>NewCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('<%=modelname %>NewCtrl', function ($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('<%=modelname.toLowerCase() %>s').post($scope.<%=modelname.toLowerCase() %>).then(function(<%=modelname.toLowerCase() %>) {  
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/<%=modelname.toLowerCase() %>";
      } else {
        $location.path('/crud/<%=modelname.toLowerCase() %>');
      }
    });
  }
});
