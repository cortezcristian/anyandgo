var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  config = module.parent.exports.config,
  Administrator = require('../models/admins.js'),
  adminAuth = {};

// Route Authorizer
adminAuth.autorizer = function(req, res, next){
    console.log(req.user);
    //authorize role
    if(typeof req.user != "undefined" && typeof req.user.role != "undefined" && req.user.role == "admin"){
        next();
    }else{
        //Not authorized go to the login form
        res.redirect('/admin');
    }
};

// Rest Authorizer
adminAuth.rest = {};
adminAuth.rest.prereq = function(req){
    // pre-request analisys
    if(typeof req.user != "undefined" && typeof req.user.role != "undefined" && req.user.role == "admin"){
        return true;
    }else{
        //Not authorized
        return false;
    }
};

// Auth Strategy
adminAuth.strategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    Administrator.findOne({ email: username }, function(err, admin) {
      if (err) { 
          done(null, false, { message: 'There was an error with the auth.' });
      }
      if (!admin) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!admin.authenticate(password)) {
        console.log("admin auth failure");
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log("admin auth success");
      admin.nLogins++;
      admin.last_login = Date.now();
      admin.provider = 'adminlocal';
      admin.role = 'admin';
      admin.save(function(err){
          if(err){
              console.log("Error guardando usuario >>", err);
          }else{
              console.log("Usuario guardado")
          }
      });
      return done(null, admin);
    });
  }
);

// Use Strategy
passport.use('administrators', adminAuth.strategy);

module.exports = adminAuth;
