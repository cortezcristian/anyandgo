var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  GitHubStrategy = require('passport-github').Strategy,
  LinkedInStrategy = require('passport-linkedin').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  config = module.parent.exports.config,
  logger = module.parent.exports.logger,
  User = require('../models/user.js'),
  userAuth = {};

// Route Authorizer
userAuth.autorizer = function(req, res, next){
    //authorize role
    if(typeof req.user != "undefined" && typeof req.user.role != "undefined" && req.user.role == "user"){
        next();
    }else{
        //Not authorized
        res.redirect('/user');
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
    logger.info("user login", username);
    User.findOne({ email: username }, function(err, user) {
      if (err) {
          done(null, false, { message: 'There was an error with the auth.' });
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.authenticate(password)) {
        logger.info("user auth failure");
        return done(null, false, { message: 'Incorrect password.' });
      }
      user.logins++;
      user.last_login = Date.now();
      user.provider = 'userlocal';
      user.role = 'user';
      user.save(function(err){
          if(err){
              logger.info('Error saving user', err);
          }else{
              logger.info('User information saved')
          }
      });
      return done(null, user);
    });
  }
);

// Facebook Strategy
if(typeof config.auth.facebook !== "undefined" 
    //&& config.auth.facebook.enabled
    && config.auth.facebook.clientid.length) {
userAuth.facebookStrategy = new FacebookStrategy({
  clientID: config.auth.facebook.clientid,
  clientSecret: config.auth.facebook.clientsecret,
  callbackURL: config.auth.facebook.callback,
  enableProof: false,
  passReqToCallback : true
  }, function(req, token, refreshToken, profile, done) {
    process.nextTick(function(){ //async
      if(!req.user) {
        // User not loggedd in
        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
            if(user){
                // if there's no token, link again
                if (!user.facebook.token) {
                    logger.info("profile>>", profile);
                    user.facebook.token = token;
                    user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                    user.save(function(err, user) {
                        return (err) ? done(err) : done(null, user);
                    });
                } else {
                    // user found
                    return done(null, user);
                }
            }else{
                // create new user
                // TODO: Verify email
                var email = (profile.emails[0].value || '').toLowerCase();
                var user = new User({email: email, password: '12345678'});
                logger.info("profile>>", profile);
                user.facebook.id = profile.id;
                user.facebook.token = token;
                user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = email;
                user.facebook.profile = profile;
                user.avatar = 'http://graph.facebook.com/'+profile.id+'/picture';

                user.save(function(err, user) {
                    return (err) ? done(err) : done(null, user);
                });
            }
        });
      } else {
        // Link account
        User.findOne({ '_id' : req.user._id }, function(err, user) {

            //var user = req.user;
            //logger.info("req.user", req.user);

            logger.info("profile>>", profile);
            logger.info("user>>", user);
            user.facebook = {};
            user.facebook.id = profile.id;
            user.facebook.token = token;
            user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
            user.facebook.email = (profile.emails[0].value || '').toLowerCase();
            user.facebook.profile = profile;
            user.avatar = 'http://graph.facebook.com/'+profile.id+'/picture';

            user.save(function(err, user) {
                return (err) ? done(err) : done(null, user);
            });

        });
      }
    });
});
// Use Strategy
passport.use(userAuth.facebookStrategy);
}


// Use Strategy
passport.use('usersLogin', userAuth.strategy);

module.exports = userAuth;
