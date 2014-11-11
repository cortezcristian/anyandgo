'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:<%=modelname %>EditCtrl
 * @description
 * # <%=modelname %>EditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('<%=modelname %>EditCtrl', function ($scope, $location, Restangular, <%=modelname.toLowerCase() %>) {
  var original = <%=modelname.toLowerCase() %>;
  $scope.<%=modelname.toLowerCase() %> = Restangular.copy(original);
  

  $scope.isClean = function() {
    return angular.equals(original, $scope.<%=modelname.toLowerCase() %>);
  }

  $scope.destroy = function() {
    original.remove().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/<%=modelname.toLowerCase() %>";
      } else {
        $location.path('/crud/<%=modelname.toLowerCase() %>');
      }
    });
  };

  $scope.save = function() {
    $scope.<%=modelname.toLowerCase() %>.put().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/<%=modelname.toLowerCase() %>";
      } else {
        $location.path('/crud/<%=modelname.toLowerCase() %>');
      }
    });
  };
});
