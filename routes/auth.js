var app = module.parent.exports.app,
    passport = require('passport'),
    config = exports.config = module.parent.exports.config;

// Auth Strategies
/* authorizers:start */
var adminAuth = require('../auth/admin-auth.js');
/* authorizers:end */

// Authentication routes

// ## Local Strategy
// * [Passport Local](https://github.com/jaredhanson/passport-local)
app.post('/admin', 
  passport.authenticate('administrators', { successRedirect: '/admin/panel',
                                    failureRedirect: '/admin'})
);

// Logout
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


