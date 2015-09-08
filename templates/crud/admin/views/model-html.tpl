<header class="row">
  <h1>
    <div class="col-xs-12 col-sm-6"><span><%=modelname %></span></div>
      <div class="col-xs-12 col-sm-6">
        <div class="input-group custom-search-form">
          <input type="text" ng-model="search" placeholder="Search..." class="form-control">
          <span class="input-group-btn">
            <button type="button" class="btn btn-default"><i class="fa fa-search"></i></button>
          </span>
        </div>
      </div>
  </h1>
</header>
<hr>
  <table class="table">
    <thead>
    <tr>
      <th>Nombre</th>
      <th><a class="btn btn-success" href="#/crud/<%=modelname.toLowerCase() %>-new"><i class="icon-plus-sign">Nuevo</i></a></th>
    </tr>
    </thead>
    <tbody>
      <tr dir-paginate="<%=modelname.toLowerCase() %> in <%=modelname.toLowerCase() %>s | filter:search | orderBy:'id' | itemsPerPage:itemspage" ng-init="itemspage=7"  ng-show="<%=modelname.toLowerCase() %>._id">
        <td>
          <a href="#/crud/<%=modelname.toLowerCase() %>-edit/{{<%=modelname.toLowerCase() %>._id}}" data-id="{{<%=modelname.toLowerCase() %>._id}}">{{<%=modelname.toLowerCase() %>.name}}</a>
        </td>
        <td>
          <a class="btn btn-link"  data-edit-id="{{<%=modelname.toLowerCase() %>._id}}" href="#/crud/<%=modelname.toLowerCase() %>-edit/{{<%=modelname.toLowerCase() %>._id}}"><i class="icon-pencil">Editar</i></a>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="table-pagination">
    <dir-pagination-controls
      max-size="5"
      direction-links="true"
      boundary-links="true" >
    </dir-pagination-controls>
  </div>