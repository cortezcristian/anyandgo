// User Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//  
var mongoose = require('mongoose'), 
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    name          : String, 
    email         : String,
    password      : String,
    role          : { type: String, default: 'user' },
    longins       : { type: Number, default: 0 },
	last_login    : Date,
	created       : Date         
});

// ### Hooks 
// #### Pre-Save
userSchema.pre("save", function(next) {
    if(this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
    }
    if(!this.created) {
        this.created = new Date();
    }
    next();
});

// ### Method: authenticate
userSchema.method('authenticate', function(password) {
    return bcrypt.compareSync(password, this.password);
});

// ### Static:
userSchema.statics.customMethod = function (paramid, cb) {
  var User = this;
  User.findOne({ _id: paramid}, function(err, user){
      cb(err, user);
  });
}

// Export module
module.exports = mongoose.model('User', userSchema);
