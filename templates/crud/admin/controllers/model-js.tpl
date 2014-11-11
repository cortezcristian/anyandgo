'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:<%=modelname %>Ctrl
 * @description
 * # <%=modelname %>Ctrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('<%=modelname %>Ctrl', function ($scope, Restangular) {
   $scope.<%=modelname.toLowerCase() %>s = Restangular.all("<%=modelname.toLowerCase() %>s").getList().$object;
  });
