// Samples REST API
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
//  - Zombie.js (http://zombie.labnotes.org/)
var assert = require('assert'),
    config = require('../../../config'),
    Browser = require("zombie");

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var Sample, sample, browser, sampleId, sampleSearch, sampleEdited, sampleNew, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('CRUD Sample '+d+"/admin/panel#/crud/sample", function(){

    before(function(done){
        // Before all tests
        Sample = require("../../../models/sample.js");
        // It show create a new document in the database
        sample = new Sample({ name: 'samplecruditem'+Math.floor((Math.random() * 10) + 1)});
        sample.save(function(err, doc){
            sampleId = doc._id;
            sampleSearch = doc.name;
        });
        // Get domain
        d = 'http://'+config.app.domain+":"+config.app.port;
        // Start browser
        browser = new Browser({debug:false});
        // Login if necesary
        browser.visit(d+"/admin", function () {
          browser
            .fill("email", "admin@anyandgo.com")
            .fill("password", "123456")
            .pressButton("Login", function(){
                done();
            });
        });
    });

    describe('Samples CRUD', function(){
        it('List Samples', function(done){
            browser.visit(d+"/admin/panel#/crud/sample", function () {
               assert.ok(browser.success);
               assert.ok(browser.location.hash === "#/crud/sample");
               //console.log(browser.document.querySelectorAll('table')[0].innerHTML);
               assert.ok(browser.document.querySelectorAll('table tr td a[data-id="'+sampleId+'"]').length > 0,
                'Should show a recently added doc listed');
               done();
            });
        });

        it('Search Samples', function(done){
            browser.visit(d+"/admin/panel#/crud/sample", function () {
               assert.ok(browser.success);
               assert.ok(browser.location.hash === "#/crud/sample");
               browser.fill('input[ng-model="search"]', sampleSearch);
               browser.wait(function(){
                   //console.log(browser.document.querySelectorAll('table')[0].innerHTML);
                   assert.ok(browser.document.querySelectorAll('table tr td a[data-id="'+sampleId+'"]').length > 0,
                        'Should show a recently added doc listed');
                    done();
               });
            });
        });

        it('Update Samples', function(done){
           browser.visit(d+"/admin/panel#/crud/sample", function () {
              assert.ok(browser.success);
              assert.ok(browser.location.hash === "#/crud/sample");
              browser.clickLink('a[data-edit-id="'+sampleId+'"]', function(){
                //console.log(browser.document.querySelectorAll('form[name="myForm"]')[0].innerHTML);
                sampleEdited = "sample"+new Date().getTime();
                //console.log("1--->", browser.userAgent);
                //console.log(browser.html());
                browser
                 .fill('form[name="myForm"] input[name="name"]', sampleEdited)
                 .pressButton('button[ng-click="save()"]',function(err, b){
                   // https://github.com/angular/angular.js/issues/3915
                   //console.log("--->");
                   //console.log(browser.html());
                   browser.visit(d+"/admin/panel#/crud/sample", function () {
                       //console.log(browser.document.location.hash);
                       //console.log(browser.document.querySelectorAll('body')[0].innerHTML);
                       browser.fill('input[ng-model="search"]', sampleEdited);
                       browser.wait(function(){
                           //console.log(browser.document.querySelectorAll('table')[0].innerHTML);
                           assert.ok(browser.document.querySelectorAll('table tr td a[data-id="'+sampleId+'"]').length > 0,
                                'Should show a recently modified doc listed');
                            done();
                       });
                   });
                });
              });
           });
        });

        it('Create Samples', function(done){
           browser.visit(d+"/admin/panel#/crud/sample", function () {
              //console.log("0--->", browser.text('[ng-view]'));
              assert.ok(browser.success);
              assert.ok(browser.location.hash === "#/crud/sample");
              browser.visit(d+'/admin/panel#/crud/sample-new', function(){
                //console.log("1--->", browser.text('[ng-view]'));
                sampleNew = "samplenew"+new Date().getTime();
                browser
                 .fill('form[name="myForm"] input[name="name"]', sampleNew)
                 .pressButton('button[ng-click="save()"]',function(err, b){
                   //console.log("2--->", browser.text('[ng-view]'));
                   browser.visit(d+"/admin/panel#/crud/sample", function () {
                       browser.fill('input[ng-model="search"]', sampleNew);
                       browser.wait(function(){
                           //console.log(browser.html('table'));
                           assert.ok(browser.html('table').match(sampleNew) !== null,
                                'Should show a recently created doc listed');
                            done();
                       });
                   });
                });
              });
           });
        });

        it('Delete Samples', function(done){
           browser.visit(d+"/admin/panel#/crud/sample", function () {
              assert.ok(browser.success);
              assert.ok(browser.location.hash === "#/crud/sample");
              browser.clickLink('a[data-edit-id="'+sampleId+'"]', function(){
                //console.log(browser.document.querySelectorAll('form[name="myForm"]')[0].innerHTML);
                sampleEdited = "sample"+new Date().getTime();
                //console.log("1--->", browser.userAgent);
                //console.log(browser.html());
                browser
                 .fill('form[name="myForm"] input[name="name"]', sampleEdited)
                 .pressButton('button[ng-click="destroy()"]',function(err, b){
                   // https://github.com/angular/angular.js/issues/3915
                   //console.log("--->");
                   //console.log(browser.html());
                   browser.visit(d+"/admin/panel#/crud/sample", function () {
                       //console.log(browser.document.location.hash);
                       //console.log(browser.document.querySelectorAll('body')[0].innerHTML);
                       browser.fill('input[ng-model="search"]', sampleEdited);
                       browser.wait(function(){
                           //console.log(browser.document.querySelectorAll('table')[0].innerHTML);
                           assert.ok(browser.html('table').match(sampleNew) === null,
                                'Should not show a recently deleted doc listed');
                            done();
                       });
                   });
                });
              });
           });
        });

    });
});
