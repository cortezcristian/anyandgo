any·and·go [![Build Status](https://travis-ci.org/cortezcristian/anyandgo.svg)](https://travis-ci.org/cortezcristian/anyandgo) [![Dependencies](https://david-dm.org/cortezcristian/anyandgo.png)](https://david-dm.org/cortezcristian/anyandgo)
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

## Express 4.x
Facts about this implementation:
- Started from basic generation
- Jade template engine

Modules added:
+ [Stylus](http://learnboost.github.io/stylus/)
+ [i18n](https://github.com/mashpie/i18n-node)
+ [Mongoose](http://mongoosejs.com/)

Front end assets:
+ [Bootstrap](http://angular-ui.github.io/bootstrap/)
+ [UI Bootstrap](http://angular-ui.github.io/bootstrap/)

## Credits
[@cortezcristian](https://twitter.com/cortezcristian)
