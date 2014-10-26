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
  anyandgo = module.parent.exports.anyandgo,
  // ## Models
  /* models:start */
  // Admins        = require('../models/admins.js'),
  Sample  = require('../models/sample.js'),
  Admins  = require('../models/admins.js'),
  /* models:end */
  // ### Authorizers
  // Mantain certains part from the application secure
  // preventing not authenticated actors access to private parts 
  // according to their roles
  /* authorizers:start */
  //adminAuth = require('../auth/admin-auth.js');
  /* authorizers:end */
  restify = require('express-restify-mongoose'),
  mongooseForms = require('mongoose-forms'),
  Handlebars = require('handlebars'),
  shell = require('shelljs');

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

// ### Admin Page
app.get('/admin', function (req, res) {
    res.render('admin', { title: 'Admin', section: 'Admin', user: req.user });
});
/* page:public:end */

// ## 2. Admin Routes
// --------------------------------------
// ### Login
app.get('/admin', function (req, res) {
    res.render('admin-index', { title: 'Anyandgo', section: 'Admin Login', user: req.user });
});

// ### Panel
app.get('/admin/config', function (req, res) {
    res.render('admin-config', { title: 'Anyandgo', section: 'Admin Panel', user: req.user });
});

// ### Panel
app.get('/admin/panel', function (req, res) {
    res.render('admin-panel', { title: 'Anyandgo', section: 'Admin Panel', user: req.user });
});

// ## 3. Public Rest
// --------------------------------------
// https://github.com/florianholzapfel/express-restify-mongoose

// CORS Interceptors
if (config.cors && config.cors === "enabled") {
  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  app.options('/api/v1/*', function(req, res){
    res.end();
  });
}

/* rest:public:start */

// GET /api/v1/samples
restify.serve(app, Sample, {
  lowercase: true,
  lean: false,
  prereq: function(req) {
    console.log("pre req");
    return true;
  },
  contextFilter: function(model, req, cb) {
    console.log("context filter");
    cb(model);
  },
  postProcess: function(req, res){
    console.log("post process");
  }
});
/* rest:public:end */


// ## 4. Crud Forms
// --------------------------------------
// https://github.com/oJshua/mongoose-forms
app.get('/forms/sample/create', function (req, res) {
    mongooseForms.bindHelpers(Handlebars, 'bootstrap');
    var SampleForm = mongooseForms.Form(Sample);
    var form = mongooseForms.Bridge(new Sample(), SampleForm).getForm();
    var formHTMl = Handlebars.helpers.renderForm(form);
    
    console.log(formHTMl);
    res.render('forms', { title: 'Anyandgo', section: 'Form', user: req.user, form: formHTMl });
});

app.get('/forms/sample/edit', function (req, res) {
    mongooseForms.bindHelpers(Handlebars, 'bootstrap');
    var SampleForm = mongooseForms.Form(Sample);
    Sample.findOne({}, function(err, doc){
        var form = mongooseForms.Bridge(doc, SampleForm).getForm();
        var formHTMl = Handlebars.helpers.renderForm(form);
    
        console.log(formHTMl);
        res.render('forms', { title: 'Anyandgo', section: 'Form', user: req.user, form: formHTMl });
    });
});

// ## 5. Super Admin Tasks
// --------------------------------------
app.get('/tasks/test', function (req, res) {
    shell.exec('./node_modules/mocha/bin/mocha --reporter doc', function(code, output) {
        console.log('Exit code:', code);
        console.log('Program output:', output);
        res.end(output);
    });
});
/*
// TODO: prevent auto-reboot when running with grunt, securitize mname parameter
app.get('/tasks/create/model/:mname', function (req, res) {
    shell.exec('grunt create:model:'+req.params.mname, function(code, output) {
        console.log('Exit code:', code);
        console.log('Program output:', output);
        res.end(output);
    });
});
*/

