// Sample Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//  
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var sampleSchema = new Schema({
    name          : String, 
    template      : { type: String, ngoform: { control: 'Textarea' } },
    live          : { type: Boolean, default: true, ngoform: { control: 'Toggle' } },
	created       : Date         
});

// ### Hooks 
// #### Pre-Save
sampleSchema.pre("save", function(next) {
    if(!this.created)
        this.created = new Date();
    next();
});

// ### Method:
sampleSchema.method("instanceMethod", function(param, cb) {
    var sample = this;
    this.save(cb);
});

// ### Static:
sampleSchema.statics.customMethod = function (paramid, cb) {
  var Sample = this;
  Sample.findOne({ _id: paramid}, function(err, sample){
      cb(err, sample);
  });
}

// Export module
module.exports = mongoose.model('Sample', sampleSchema);
