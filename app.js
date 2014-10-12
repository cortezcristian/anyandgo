var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var i18n = require('i18n');
var methodOverride = require('method-override');
var utils = require('./utils');
var config = exports.config = require('./config')

// Error
process.on('uncaughtException', function(err) {
      console.log("Exception", err.stack);
});

// Express 
var app = exports.app = express();

// Database Connection
var dbConex = exports.dbConex = utils.dbConnection(config.db.domain,config.db.name,config.db.user,config.db.pass);

// i18n setup
i18n.configure({
  // setup some locales: other locales default to en silently
  locales:['en', 'es'],
  // where to store json files - defaults to './locales' relative to modules directory
  directory: __dirname + '/locales',
  defaultLocale: 'en',
  // sets a custom cookie name to parse locale settings from  - defaults to NULL
  cookie: 'lang'
});
app.use(i18n.init);

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
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// method override + restify settings
// https://www.npmjs.org/package/express-restify-mongoose
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
