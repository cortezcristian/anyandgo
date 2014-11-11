  <div class="input-group custom-search-form">
    <input type="text" ng-model="search" placeholder="Search..." class="form-control"><span class="input-group-btn"><button type="button" class="btn btn-default"><i class="fa fa-search"></i></button></span>
  </div>
  <table class="table">
    <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th><a href="#/crud/<%=modelname.toLowerCase() %>-new"><i class="icon-plus-sign">New</i></a></th>
    </tr>
    </thead>
    <tbody>
    <tr ng-repeat="<%=modelname.toLowerCase() %> in <%=modelname.toLowerCase() %>s | filter:search | orderBy:'name'" ng-show="<%=modelname.toLowerCase() %>._id">
      <td><a href="#/crud/<%=modelname.toLowerCase() %>-edit/{{<%=modelname.toLowerCase() %>._id}}" data-id="{{<%=modelname.toLowerCase() %>._id}}" target="_blank">{{<%=modelname.toLowerCase() %>.name}}</a></td>
      <td>{{<%=modelname.toLowerCase() %>.name}}</td>
      <td>
        <a data-edit-id="{{<%=modelname.toLowerCase() %>._id}}" href="#/crud/<%=modelname.toLowerCase() %>-edit/{{<%=modelname.toLowerCase() %>._id}}"><i class="icon-pencil">Edit</i></a>
      </td>
    </tr>
    </tbody>
  </table>
