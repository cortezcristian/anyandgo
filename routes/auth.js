var app = module.parent.exports.app,
    passport = require('passport'),
    User = require('../models/user.js'),
    logger = exports.logger = module.parent.exports.logger,
    config = exports.config = module.parent.exports.config;

// Auth Strategies
/* authorizers:start */
var adminAuth = require('../auth/admin-auth.js');
var userAuth = require('../auth/user-auth.js');
/* authorizers:end */

// Authentication routes

// Local Strategy
// [Passport Local](https://github.com/jaredhanson/passport-local)
app.post('/admin',
  passport.authenticate('administrators', { successRedirect: '/admin/panel',
                                    failureRedirect: '/admin',
                                    failureFlash: true})
);

app.post('/user',
  passport.authenticate('usersLogin', { successRedirect: '/',
                                    failureRedirect: '/user',
                                    failureFlash: true})
);

// Facebook Routes
// [Passport Facebook](https://github.com/jaredhanson/passport-facebook)
if(typeof config.auth.facebook !== "undefined" 
    //&& config.auth.facebook.enabled
    && config.auth.facebook.clientid.length) {
app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

app.get('/unlink/facebook', userAuth.autorizer, function(req, res) {
        //var user            = req.user;
        User.findOne({ _id : req.user._id }, function(err, user) {
            user.facebook.token = undefined;
            user.save(function(err, user) {
                res.redirect('/user/profile');
            });
        });
    });


app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/user/profile',
        failureRedirect : '/user'
    }));
}

// Logout
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
