var express = require('express');
var expressValidator = require('express-validator');
var path = require('path');
var favicon = require('serve-favicon');
var fs = require('fs');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var i18n = require('i18n');
var helmet = require('helmet');
var csrf = require('csurf');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var methodOverride = require('method-override');
var utils = require('./utils');
var config = exports.config = require('./config');
var mail = exports.mail = require('./utils/mailer.js');
var anyandgo = exports.anyandgo = {};

// Anyandgo
anyandgo.models = [];

// Error
process.on('uncaughtException', function(err) {
      console.log("Exception", err.stack);
});

// Express 
var app = exports.app = express();

app.set("envflag", config.envflag || process.env.NODE_ENV);
app.set("autologin", config.autologin || {});

// Setup vars
app.use(function(req, res, next){
  res.locals.envflag = config.envflag || process.env.NODE_ENV;
  res.locals.autologin = config.autologin || {};
  // Analytics
  if (config.analytics && config.analytics.enabled) {
    res.locals.tracking = config.analytics.tracking;
  }
  next();
});

// Database Connection
var dbConex = exports.dbConex = utils.dbConnection(config.db.domain,config.db.name,config.db.user,config.db.pass);

// DB Fixtures
if (config.fixtures && config.fixtures === "enabled") {
// Load Fixtures
require('./fixtures');
}

// Security
if (config.security && config.security === "enabled") {
    app.use(helmet());
    app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
    app.use(helmet.noSniff());
    app.use(helmet.frameguard('deny'));
}

// i18n setup
i18n.configure({
  // setup some locales: other locales default to en silently
  locales:[
      //global:translation:start
      //global:translation:end
      'en-us', 
      'es-ar'],
  // sets a custom cookie name to parse locale settings from  - defaults to NULL
  cookie: 'lang',
  // where to store json files - defaults to './locales' relative to modules directory
  directory: __dirname + '/locales',
  defaultLocale: 'es-ar'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// stylus setup
app.use('/css', stylus.middleware({
  src: __dirname + '/views/stylus',
  dest: __dirname + '/public/css',
  compile: function (str, path) {
    return stylus(str)
      .set('filename', path)
      .set('compress', true);
  }
}));

// app.use(favicon(__dirname + '/public/img/favicon.ico'));

// Logs
// [Predefined Formats](https://github.com/expressjs/morgan#predefined-formats)
if (typeof config.app.logs !== 'undefined' && config.app.logs.enabled) {
    // create a write stream (in append mode)
    var accessLogStream = fs.createWriteStream(__dirname + '/' + config.app.logs.file, {flags: 'a'})

    // setup the logger
    app.use(logger(config.app.logs.format || 'dev', {stream: accessLogStream}));
    // remember to see the log:
    // $ touch access.log
    // $ tail -f access.log
} else {
    app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({
  extended: true
}));
// method override + restify settings
// https://www.npmjs.org/package/express-restify-mongoose
app.use(methodOverride());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
// i18n init parses req for language headers, cookies, etc.
app.use(i18n.init);
// Passport
app.use(session({ secret: 'secret', saveUninitialized: true, resave: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// CSRF Security
// http://stackoverflow.com/questions/23997572/error-misconfigured-csrf-express-js-4
if (config.csrf && config.csrf === "enabled") {
    //app.use(csrf({ cookie: { key: 'XSRF-TOKEN' } }));
    app.use(csrf());
    // Angular
    // https://github.com/expressjs/csurf/issues/13
    // AngularJS looks for a cookie named "XSRF-TOKEN" and sets the header as "X-XSRF-TOKEN"
    /*
    app.use(function (req, res, next) {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      next();
    });
    */
    app.use(function (req, res) {
        var token = req.csrfToken();
        // angular
        res.cookie('XSRF-TOKEN', req.csrfToken());
        // field
        res.locals._csrf = req.csrfToken();
        res.locals.csrf_form_html = '<input type="hidden" name="_csrf" value="' + req.csrfToken() + '" >';
        req.next();
    });
    // error handler
    app.use(function (err, req, res, next) {
      if (err.code !== 'EBADCSRFTOKEN') return next(err);

      // handle CSRF token errors here
      res.status(403);
      res.send('sorry your request was invalid');
    });
}

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Interceptors
app.use(function(req, res, next) {
    res.locals.user = req.user;
    res.locals.flash = req.flash();
    next();
});

// Routes
require('./routes/auth');
require('./routes/main');

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
