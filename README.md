anyandgo
========

The Node.JS Framework that doesn't suck.

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

```bash
$ grunt create:model:Sample
```
Will create model and tests:
```
#	models/sample.js
#	test/unit/models/sample-tests.js
```

