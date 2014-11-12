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
```javascript
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
```javascript
    /* page:public:start */
+  
+  // ### Contact Page
+  app.get('/contact', function (req, res) {
+    res.render('contact', { title: 'Contact', section: 'Contact', user: req.user });
+  });
    /* page:public:end */
```
Will modify `./views/partials/site-menu.jade` to append the new menu item to main menu
```jade
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
```javascript
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

Once you create the model and all the rest services you'll be able to generate a crud automatically. Let's imagine you need to create a CRUD for students.

```bash
$ grunt create:model:Student
$ grunt create:rest:Student
$ grunt create:crud:Student
```

If you go to to [http://localhost:3000/admin/panel](http://localhost:3000/admin/panel) login as administrator, and click on the `Crud` dropdown:

![Crud Dropdown](https://raw.githubusercontent.com/cortezcristian/anyandgo/master/templates/screenshots/crud-generation.png)

If you select Student, you'll be able to see the list where you can create, edit and delete:

![Crud List](https://raw.githubusercontent.com/cortezcristian/anyandgo/master/templates/screenshots/crud-list.png)

Just hit edit on one record

![Crud Edit](https://raw.githubusercontent.com/cortezcristian/anyandgo/master/templates/screenshots/crud-edit.png)

Now let's change our model `models/student.js` to add a new field called `age`:

```javascript
// Student Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//  
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var studentSchema = new Schema({
    name          : String, 
    age          : Number,  /* <-- add this line to the model */
	created       : Date         
});

// [...] More code here
```

After you save the file go to the administration panel again [http://localhost:3000/admin/panel](http://localhost:3000/admin/panel) you'll need to login again (if you have not enabled autologin yet). If you go to edit or create you'll see the form changed a little bit:

![Crud Form Automatic Generation](https://raw.githubusercontent.com/cortezcristian/anyandgo/master/templates/screenshots/crud-form-auto-generation.png)

As you can see the form has been autogenerated, to be according to your little change in the model.

### AutoLogin for developers
Is very annoying when you are developing that you need to login every time the server reloads, so we included a feature for autologin just go and modify `config/config-local.json` search for this property:

    
         "autologin": {
             "enabled" : true, <-- Set this to true, by default is false
             "username" : "admin@anyandgo.com",  
             "password" : "123456"  
         },
    

Setting autologin.enabled to `true` will automatically put user and password on the login form and hit login for you to be redirected to the last url you were looking in the adminnistration panel.

### Locale+Translation File generation

```bash
$  grunt create:locale:es-es
```

Creates a new file under translation folder called `./locales/es-es.json`.
Adds translation flag to the menu, modifying `./views/partials/site-menu.jade`:
```jade
            //public:translation:menu:start
            li
               a(href='#', langsupport="en-us") en-us
             li
               a(href='#', langsupport="es-ar") es-ar
+            li
+              a(href='#', langsupport='es-es') es-es
             //public:translation:menu:end
```
Also registers new language into `app.js`:
```javascript
i18n.configure({
   // setup some locales: other locales default to en silently
   locales:[
       //global:translation:start
+      'es-es',
       //global:translation:end
       'en-us', 
       'es-ar'],
```
See the result inmediately in your browser:

![i18n screenshot](https://raw.githubusercontent.com/cortezcristian/anyandgo/master/templates/screenshots/locale-i18n.png)

How to use translations just open a view file `views/index.jade`:

```jade
extends layout

block content
  .jumbotron
    h1=__("pick any·and·go")
    p ...
    p #{__("Welcome to anyandgo MEAN")}
```

Basically, everytime you call to function double underscore what you are passing as parameter is used as key for translation files. Translation files will auto populate it everytime you refresh the page calling the view.

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

### Translation Support

Internationalization support was added. To see the translations source files you can inspect the `./locales` folder:
```bash
$ tree locales/
locales/
├── en-us.json
└── es-ar.json
```

By default it loads `es-ar` translations, the configuration is inside `app.js` file:
```javascript
// i18n setup
i18n.configure({
  // setup some locales: other locales default to en silently
  locales:['en-us', 'es-ar'],
  // sets a custom cookie name to parse locale settings from  - defaults to NULL
  cookie: 'lang',
  // where to store json files - defaults to './locales' relative to modules directory
  directory: __dirname + '/locales',
  defaultLocale: 'es-ar'
});
```
Language preference is stored in a cookie, to test this is working you can try modifying the cookie on client side and reload the page:
```javascript
// Try running this in the js console
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

setCookie("lang","en-us", 2);
// and refresh the page, notice lang has changed to be en-us
```

### Fixtures

Fixtures are fixed datasets that helps us to populate mongo collections. We use fixtures during test, to ensure we have data to operate with. And also anyandgo uses fixtures on server start, to ensure certain collections are filled in before web app is launched. Take a look at `app.js`:

```javascript
// DB Fixtures
if (config.fixtures && config.fixtures === "enabled") {
 // Load Fixtures
 require('./fixtures');
}
```

For fixture loading we are using [mongoose-fixtures](https://github.com/powmedia/mongoose-fixtures). We basically load different datasets for each environment. You may want to take a look at `./fixtures` folder:

```bash
$ tree fixtures
fixtures/
├── dev
│   └── admins.js
├── index.js
├── local
│   └── admins.js
├── prod
│   └── admins.js
├── shared
│   └── admins.js
└── travisci
    └── admins.js

5 directories, 6 files
```
Notice that if flag "fixtures" is "enabled" in our config: anyandgo will autoload datasets for each collection ( note loading fixtures will clear the existing contents of a collection). In the treeview example shown above, we only are going to override admins collection. We are also adding a `shared` folder that is shared for all environments.

### CORS Support

See [CORS](http://www.w3.org/TR/cors/)

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
