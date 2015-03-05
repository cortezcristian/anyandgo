var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  config = module.parent.exports.config,
  User = require('../models/user.js'),
  userAuth = {};

// Route Authorizer
userAuth.autorizer = function(req, res, next){
    //console.log(req.user);
    //authorize role
    if(typeof req.user != "undefined" && typeof req.user.role != "undefined" && req.user.role == "user"){
        next();
    }else{
        //Not authorized go to the login form
        res.redirect('/');
    }
};

// Rest Authorizer
userAuth.rest = {};
userAuth.rest.prereq = function(req){
    // pre-request analisys
    if(typeof req.user != "undefined" && typeof req.user.role != "undefined" && req.user.role == "user"){
        return true;
    }else{
        //Not authorized
        return false;
    }
};

// Auth Strategy
userAuth.strategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function(err, user) {
      if (err) { 
          done(null, false, { message: 'There was an error with the auth.' });
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.authenticate(password)) {
        console.log("user auth failure");
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log("user auth success");
      user.nLogins++;
      user.last_login = Date.now();
      user.provider = 'userlocal';
      user.role = 'user';
      user.save(function(err){
          if(err){
              console.log("Error guardando usuario >>", err);
          }else{
              console.log("Usuario guardado")
          }
      });
      return done(null, user);
    });
  }
);

// Use Strategy
passport.use('users', userAuth.strategy);

module.exports = userAuth;
