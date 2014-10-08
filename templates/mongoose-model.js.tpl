// <%=modelname %> Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//  
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var <%=modelname.toLowerCase() %>Schema = new Schema({
    name          : String, 
	created       : Date         
});

// ### Hooks 
// #### Pre-Save
<%=modelname.toLowerCase() %>Schema.pre("save", function(next) {
    if(!this.created)
        this.created = new Date();
    next();
});

// ### Method:
<%=modelname.toLowerCase() %>Schema.method("instanceMethod", function(param, cb) {
    var <%=modelname.toLowerCase() %> = this;
    this.save(cb);
});

// ### Static:
<%=modelname.toLowerCase() %>Schema.statics.customMethod = function (paramid, cb) {
  var <%=modelname %> = this;
  <%=modelname %>.findOne({ _id: paramid}, function(err, <%=modelname.toLowerCase() %>){
      cb(err, <%=modelname.toLowerCase() %>);
  });
}

// Export module
module.exports = mongoose.model('<%=modelname %>', <%=modelname.toLowerCase() %>Schema);
