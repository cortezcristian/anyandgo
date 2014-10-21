// Admins Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//  
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var adminsSchema = new Schema({
    name          : String, 
	created       : Date         
});

// ### Hooks 
// #### Pre-Save
adminsSchema.pre("save", function(next) {
    if(!this.created)
        this.created = new Date();
    next();
});

// ### Method:
adminsSchema.method("instanceMethod", function(param, cb) {
    var admins = this;
    this.save(cb);
});

// ### Static:
adminsSchema.statics.customMethod = function (paramid, cb) {
  var Admins = this;
  Admins.findOne({ _id: paramid}, function(err, admins){
      cb(err, admins);
  });
}

// Export module
module.exports = mongoose.model('Admins', adminsSchema);
