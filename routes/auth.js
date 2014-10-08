var app = module.parent.exports.app,
    passport = require('passport'),
    config = exports.config = module.parent.exports.config;

// Auth Strategies
// require('../auth/auth-passport-local-admin.js');

// Authentication routes

// ## Local Strategy
// * [Passport Local](https://github.com/jaredhanson/passport-local)
// app.post('/admin', 
//   passport.authenticate('administrators', { successRedirect: '/panel',
//                                    failureRedirect: '/admin'})
// );

// Logout
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


