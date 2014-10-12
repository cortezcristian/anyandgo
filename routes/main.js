// # Site Routes 
// --------------------------------------
// contains all the routes of the site including pages, and rest api services.
//
// 1. Public Routes
// 2. Admin Routes
//
// requires
// * app
// * config
var app = module.parent.exports.app,
  config = module.parent.exports.config,
  // ## Models
  /* models:start */
  // Admins        = require('../models/admins.js'),
  Sample  = require('../models/sample.js'),
  /* models:end */
  // ### Authorizers
  // Mantain certains part from the application secure
  // preventing not authenticated actors access to private parts 
  // according to their roles
  /* authorizers:start */
  //adminAuth = require('../auth/admin-auth.js');
  /* authorizers:end */
  end;

// ## 1. Public Routes
// --------------------------------------

// ### Home Page
app.get('/', function (req, res) {
    res.render('index', { title: 'Anyandgo', section: 'Home', user: req.user });
});

// ## 2. Admin Routes
// --------------------------------------
// ### Login
app.get('/admin', function (req, res) {
    res.render('admin-index', { title: 'Anyandgo', section: 'Admin Login', user: req.user });
});

// ### Panel
app.get('/admin/panel', function (req, res) {
    res.render('admin-panel', { title: 'Anyandgo', section: 'Admin Panel', user: req.user });
});

