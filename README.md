any·and·go [![Build Status](https://travis-ci.org/cortezcristian/anyandgo.svg)](https://travis-ci.org/cortezcristian/anyandgo) [![Dependencies](https://david-dm.org/cortezcristian/anyandgo.png)](https://david-dm.org/cortezcristian/anyandgo) [![Trello Board](http://img.shields.io/badge/board-trello-blue.svg)](https://trello.com/b/vanumUeW/anyandgo) [![Coverage Status](https://img.shields.io/coveralls/cortezcristian/anyandgo.svg)](https://coveralls.io/r/cortezcristian/anyandgo)
========

![Anyandgo](https://raw.githubusercontent.com/cortezcristian/anyandgo/master/public/img/anyandgo-logo.png)

### Pick any·and·go!

The MEAN Framework that doesn't suck. 

What is the MEAN stack? [Read More](http://addyosmani.com/blog/full-stack-javascript-with-mean-and-yeoman/)

The acronym stands for: 
* (M)ongoDB – a noSQL document datastore which uses JSON-style documents to represent data, 
* (E)xpress – a HTTP server framework on top of Node, 
* (A)ngular – as you know, the JS framework offering declarative, two-way databinding for webapps and 
* (N)ode – the platform built on V8’s runtime for easily building fast, scalable network applications.

Where is yeoman? See [generator-anyandgo](https://github.com/cortezcristian/generator-anyandgo)

## Best Practices
To start working you can simply run:
```bash
$ grunt
```
This will:
```
✓ Lint the js code
✓ Run the tests
✓ Start the server
✓ Open a web browser
✓ Watch for files changes, to trigger several tasks
```

To add front-end libraries you can simply run:
```bash
$ bower install --save jquery
```
This will:
```
✓ Register the dependency into bower.json
✓ Download the library inside ./public/components/
✓ Append the script into ./views/layout.jade
✓ Trigger page reload
```

## Grunt tasks

```bash
$ grunt
```
The default grunt task will start the server for you.

```bash
$ grunt jshint
```
Lint javascript files under models, routes and test folders

```bash
$ grunt mochaTests
```
Execute all mocha tests and display the specs report

```bash
$ grunt docco
```
Creates documentation functionallity under models, routes and test folders and put it inside docs folder

```bash
$ grunt wiredep
```
Appends javascript and css dependencies

## File Creation

### Model+Test generation
```bash
$ grunt create:model:Sample
```
Will create model and tests:
```
#	models/sample.js
#	test/unit/models/sample-tests.js
```
Will modify `./routes/main.js` to append the model as dependency
```
   // ## Models
   /* models:start */
+  Sample  = require('../models/sample.js'),
   /* models:end */

```
This will automatically crete the following tests:
```bash
$ mocha test/unit/
  Database Test
    MongoDB
      ✓ Should be up and running 

  Model Test Sample
    Sample
      ✓ add a sample 
```

### Page+Route generation

```bash
$ grunt create:page:Contact
```
Will create a public view file for the page:
```
#	views/contact.jade
```
Will modify `./routes/main.js` to append the model as dependency
```
    /* page:public:start */
+  
+  // ### Contact Page
+  app.get('/contact', function (req, res) {
+    res.render('contact', { title: 'Contact', section: 'Contact', user: req.user });
+  });
    /* page:public:end */
```
Will modify `./views/partials/site-menu.jade` to append the new menu item to main menu
```
         // public:page:menu:start
+        li
+          a(href='/contact') Contact
         // public:page:menu:end
```

### Rest+Test generation

```bash
$ grunt create:rest:Sample
```

Creates rest services for a particular model. 

Will modify `./routes/main.js` to append the model as dependency
```
/* rest:public:start */
+
+// GET /api/v1/samples
+restify.serve(app, Sample, {
+  lowercase: true,
+  lean: false,
+  prereq: function(req) {
+    console.log("pre req");
+    return true;
+  },
+  contextFilter: function(model, req, cb) {
+    console.log("context filter");
+    cb(model);
+  },
+  postProcess: function(req, res){
+    console.log("post process");
+  }
+});
/* rest:public:end */
```
Along with a test file:
```
#	test/rest/models/samples-rest-tests.js
```
This uses [superagent](http://visionmedia.github.io/superagent/) to test the new restful api:
```bash
$ mocha test/rest/
 Web Server
    Express
      ✓ Should be up and running (306ms)

  REST API Sample http://127.0.0.1:3000/api/v1/samples
    Samples REST
      ✓ GET /api/v1/samples 
      ✓ GET /api/v1/samples/count 
      ✓ POST /api/v1/samples 
      ✓ PUT /api/v1/samples/:sampleId 
      ✓ DELETE /api/v1/samples/:sampleId 
      ✓ DELETE /api/v1/samples 
```

This will enable the following urls:
```
GET      /api/v1/samples/count
GET      /api/v1/samples
PUT      /api/v1/samples
POST     /api/v1/samples
DELETE   /api/v1/samples

GET      /api/v1/samples/:id
PUT      /api/v1/samples/:id
POST     /api/v1/samples/:id
DELETE   /api/v1/samples/:id
```

Learn more about query, ordering, populate, and sorting with [Express-Restify-Mongoose](https://github.com/florianholzapfel/express-restify-mongoose).


### Crud+Test generation

```bash
$ grunt create:crud:Sample
```

Creates CRUD administration for a particular model. 
This uses [zombiejs](http://zombie.labnotes.org/API) to test the new crud functionality.

## Optimization

### Assets minification for production

```bash
$ grunt buildprod
```
Concatanates, compress, minify and link all javascripts and stylesheets. It creates a ./dist folder inside the public part:
```bash
$ tree public/dist/
public/dist/
├── scripts
│   ├── panel-app.min.js
│   ├── panel-vendors.min.js
│   └── site-vendors.min.js
└── styles
    ├── panel-styles.min.css
    └── site-styles.min.css
```
We use:
[grunt-usemin](https://github.com/yeoman/grunt-usemin) 
[grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean) 
[grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) 
[grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) 
[grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin) 
in order to do that.

And they get automatically linked just simply by setting a global flag, like in `./views/layout-admin.jade`:

```jade
 - if(settings.envflag !== "production") {
    //-<!-- build:css(public) styles/panel-styles.min.css -->
    //bower:css
    link(rel='stylesheet', href='/components/bootstrap/dist/css/bootstrap.css')
    link(rel='stylesheet', href='/components/font-awesome/css/font-awesome.css')
    link(rel='stylesheet', href='/components/metisMenu/dist/metisMenu.css')
    //-<!-- endbuild -->
    //endbower
    - } else {
    link(rel='stylesheet', href='/dist/styles/panel-styles.min.css')
    - }
```

The flag setup is in `./app.js`:
```javascript
app.set("envflag", process.env.NODE_ENV);
```

## Express 4.x
Facts about this implementation:
- Started from basic generation
- Jade template engine

Modules added:
+ [Stylus](http://learnboost.github.io/stylus/)
+ [i18n](https://github.com/mashpie/i18n-node)
+ [Mongoose](http://mongoosejs.com/)
+ [Express-Restify-Mongoose](https://github.com/florianholzapfel/express-restify-mongoose)

Front end assets:
+ [Bootstrap](http://angular-ui.github.io/bootstrap/)
+ [UI Bootstrap](http://angular-ui.github.io/bootstrap/)

## Quick Setup
How to get started with anyandgo?
```bash
$ npm install -g grunt-cli bower yo mocha
$ git clone git@github.com:cortezcristian/anyandgo.git
$ cd anyandgo
$ npm install && bower install && grunt
```

## Credits
[@cortezcristian](https://twitter.com/cortezcristian)
