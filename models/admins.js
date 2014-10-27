// Admins Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//  
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema,
    crypto = require('crypto');

var adminsSchema = new Schema({
    name          : String, 
	email         : String,      
	password      : String,      
    role          : {type: String, default: "admin"},
	created       : Date         
});

// ### Hooks 
// #### Pre-Save
adminsSchema.pre("save", function(next) {
    if(this.isModified('password'))
        this.password = crypto.createHash('md5')
            .update(this.password)
            .digest("hex");
    if(!this.created)
        this.created = new Date();
    next();
});

// ### Method:
// #### Authenticate
// Checks password match
adminsSchema.method('authenticate', function(password) {
    return crypto.createHash('md5').update(password).digest("hex") === this.password;
});

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
