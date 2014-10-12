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
  restify = require('express-restify-mongoose');

// ## 1. Public Routes
// --------------------------------------

// ### Home Page
app.get('/', function (req, res) {
    res.render('index', { title: 'Anyandgo', section: 'Home', user: req.user });
});

/* page:public:start */
  
// ### Contact Page
app.get('/contact', function (req, res) {
    res.render('contact', { title: 'Contact', section: 'Contact', user: req.user });
});
/* page:public:end */

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

// ## 3. Public Rest
// --------------------------------------
// https://github.com/florianholzapfel/express-restify-mongoose

/* rest:public:start */
// GET http://localhost:3000/api/v1/Samples
restify.serve(app, Sample, {
  lowercase: true,
  lean: false,
  prereq: function(req) {
    console.log("pre req");
    console.log(req.body, req.params);
    return true;
  },
  contextFilter: function(model, req, cb) {
    console.log("context filter");
    //console.log(model);
    cb(model);
  },
  postProcess: function(req, res){
    console.log("post process");
  }
});
/* rest:public:end */