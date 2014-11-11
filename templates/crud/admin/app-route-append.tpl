.when('/crud/<%=modelname.toLowerCase() %>', {
        templateUrl: '/scripts/admin/views/<%=modelname.toLowerCase() %>.html',
        controller: '<%=modelname %>Ctrl'
      })
      .when('/crud/<%=modelname.toLowerCase() %>-new', {
        templateUrl: '/forms/<%=modelname.toLowerCase() %>/create',
        controller: '<%=modelname %>NewCtrl'
      })
      .when('/crud/<%=modelname.toLowerCase() %>-edit/:id', {
        templateUrl: '/forms/<%=modelname.toLowerCase() %>/create',
        controller: '<%=modelname %>EditCtrl',
        resolve: {
          <%=modelname.toLowerCase() %>: function(Restangular, $route){
            return Restangular.one('<%=modelname.toLowerCase() %>s', $route.current.params.id).get();
          }
        }
      })
      .otherwise({
