![Anyandgo](https://raw.githubusercontent.com/cortezcristian/anyandgo/master/public/img/anyandgo-logo.png)
Pick any·and·go!

any·and·go [![Build Status](https://travis-ci.org/cortezcristian/anyandgo.svg)](https://travis-ci.org/cortezcristian/anyandgo)
========

The Node.JS MEAN Framework that doesn't suck. 

What is the MEAN stack? [Read More](http://addyosmani.com/blog/full-stack-javascript-with-mean-and-yeoman/)

The acronym stands for: 
* (M)ongoDB – a noSQL document datastore which uses JSON-style documents to represent data, 
* (E)xpress – a HTTP server framework on top of Node, 
* (A)ngular – as you know, the JS framework offering declarative, two-way databinding for webapps and 
* (N)ode – the platform built on V8’s runtime for easily building fast, scalable network applications.

Where is yeoman? See [generator-anyandgo](https://github.com/cortezcristian/generator-anyandgo)

## Grunt tasks

```bash
$ grunt
```
The default grunt task will start the server for you.

```bash
$ grunt jshint
```
Will lint the javascript files under models, routes and test folders

```bash
$ grunt mochaTests
```
Will execute all mocha tests and display the specs report

```bash
$ grunt docco
```
Will document functionallity under models, routes and test folders and put it inside docs folder

## File Creation
```bash
$ grunt create:model:Sample
```
Will create model and tests:
```
#	models/sample.js
#	test/unit/models/sample-tests.js
```
## Express 4.x
Facts about this implementation:
- Started from basic generation
- Jade template engine

Modules added:
+ Stylus
+ Mongoose

## Credits
[@cortezcristian](https://twitter.com/cortezcristian)
