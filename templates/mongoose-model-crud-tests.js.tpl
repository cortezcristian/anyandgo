// <%=modelname %>s CRUD
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
var <%=modelname %>, <%=modelname.toLowerCase() %>, browser, <%=modelname.toLowerCase() %>Id, <%=modelname.toLowerCase() %>Search, <%=modelname.toLowerCase() %>Edited, <%=modelname.toLowerCase() %>New, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('CRUD <%=modelname %> '+d+"/admin/panel#/crud/<%=modelname.toLowerCase() %>", function(){
    before(function(){
        // Before all tests
        <%=modelname %> = require("../../../models/<%=modelname.toLowerCase() %>.js");
        // It show create a new document in the database
        <%=modelname.toLowerCase() %> = new <%=modelname %>({ name: '<%=modelname.toLowerCase() %>cruditem'+Math.floor((Math.random() * 10) + 1)});
        <%=modelname.toLowerCase() %>.save(function(err, doc){
            <%=modelname.toLowerCase() %>Id = doc._id;
            <%=modelname.toLowerCase() %>Search = doc.name;
        });
        // Get domain
        d = 'http://'+config.app.domain+":"+config.app.port;
        // Start browser
        browser = new Browser({debug:false});
        // Login if necesary
    });

    describe('<%=modelname %>s CRUD', function(){
        it('List <%=modelname %>s', function(done){
            browser.visit(d+"/admin/panel#/crud/<%=modelname.toLowerCase() %>", function () {
               assert.ok(browser.success);
               assert.ok(browser.location.hash === "#/crud/<%=modelname.toLowerCase() %>");
               //console.log(browser.document.querySelectorAll('table')[0].innerHTML);
               assert.ok(browser.document.querySelectorAll('table tr td a[data-id="'+<%=modelname.toLowerCase() %>Id+'"]').length > 0,
                'Should show a recently added doc listed');
               done();
            });
        });

        it('Search <%=modelname %>s', function(done){
            browser.visit(d+"/admin/panel#/crud/<%=modelname.toLowerCase() %>", function () {
               assert.ok(browser.success);
               assert.ok(browser.location.hash === "#/crud/<%=modelname.toLowerCase() %>");
               browser.fill('input[ng-model="search"]', <%=modelname.toLowerCase() %>Search);
               browser.wait(function(){
                   //console.log(browser.document.querySelectorAll('table')[0].innerHTML);
                   assert.ok(browser.document.querySelectorAll('table tr td a[data-id="'+<%=modelname.toLowerCase() %>Id+'"]').length > 0,
                        'Should show a recently added doc listed');
                    done();
               });
            });
        });

        it('Update <%=modelname %>s', function(done){
           browser.visit(d+"/admin/panel#/crud/<%=modelname.toLowerCase() %>", function () {
              assert.ok(browser.success);
              assert.ok(browser.location.hash === "#/crud/<%=modelname.toLowerCase() %>");
              browser.clickLink('a[data-edit-id="'+<%=modelname.toLowerCase() %>Id+'"]', function(){
                //console.log(browser.document.querySelectorAll('form[name="myForm"]')[0].innerHTML);
                <%=modelname.toLowerCase() %>Edited = "<%=modelname.toLowerCase() %>"+new Date().getTime();
                //console.log("1--->", browser.userAgent);
                //console.log(browser.html());
                browser
                 .fill('form[name="myForm"] input[name="name"]', <%=modelname.toLowerCase() %>Edited)
                 .pressButton('button[ng-click="save()"]',function(err, b){
                   // https://github.com/angular/angular.js/issues/3915
                   //console.log("--->");
                   //console.log(browser.html());
                   browser.visit(d+"/admin/panel#/crud/<%=modelname.toLowerCase() %>", function () {
                       //console.log(browser.document.location.hash);
                       //console.log(browser.document.querySelectorAll('body')[0].innerHTML);
                       browser.fill('input[ng-model="search"]', <%=modelname.toLowerCase() %>Edited);
                       browser.wait(function(){
                           //console.log(browser.document.querySelectorAll('table')[0].innerHTML);
                           assert.ok(browser.document.querySelectorAll('table tr td a[data-id="'+<%=modelname.toLowerCase() %>Id+'"]').length > 0,
                                'Should show a recently modified doc listed');
                            done();
                       });
                   });
                });
              });
           });
        });

        it('Create <%=modelname %>s', function(done){
           browser.visit(d+"/admin/panel#/crud/<%=modelname.toLowerCase() %>", function () {
              //console.log("0--->", browser.text('[ng-view]'));
              assert.ok(browser.success);
              assert.ok(browser.location.hash === "#/crud/<%=modelname.toLowerCase() %>");
              browser.visit(d+'/admin/panel#/crud/<%=modelname.toLowerCase() %>-new', function(){
                //console.log("1--->", browser.text('[ng-view]'));
                <%=modelname.toLowerCase() %>New = "<%=modelname.toLowerCase() %>new"+new Date().getTime();
                browser
                 .fill('form[name="myForm"] input[name="name"]', <%=modelname.toLowerCase() %>New)
                 .pressButton('button[ng-click="save()"]',function(err, b){
                   //console.log("2--->", browser.text('[ng-view]'));
                   browser.visit(d+"/admin/panel#/crud/<%=modelname.toLowerCase() %>", function () {
                       browser.fill('input[ng-model="search"]', <%=modelname.toLowerCase() %>New);
                       browser.wait(function(){
                           //console.log(browser.html('table'));
                           assert.ok(browser.html('table').match(<%=modelname.toLowerCase() %>New) !== null,
                                'Should show a recently created doc listed');
                            done();
                       });
                   });
                });
              });
           });
        });

        it('Delete <%=modelname %>s', function(done){
           browser.visit(d+"/admin/panel#/crud/<%=modelname.toLowerCase() %>", function () {
              assert.ok(browser.success);
              assert.ok(browser.location.hash === "#/crud/<%=modelname.toLowerCase() %>");
              browser.clickLink('a[data-edit-id="'+<%=modelname.toLowerCase() %>Id+'"]', function(){
                //console.log(browser.document.querySelectorAll('form[name="myForm"]')[0].innerHTML);
                <%=modelname.toLowerCase() %>Edited = "<%=modelname.toLowerCase() %>"+new Date().getTime();
                //console.log("1--->", browser.userAgent);
                //console.log(browser.html());
                browser
                 .fill('form[name="myForm"] input[name="name"]', <%=modelname.toLowerCase() %>Edited)
                 .pressButton('button[ng-click="destroy()"]',function(err, b){
                   // https://github.com/angular/angular.js/issues/3915
                   //console.log("--->");
                   //console.log(browser.html());
                   browser.visit(d+"/admin/panel#/crud/<%=modelname.toLowerCase() %>", function () {
                       //console.log(browser.document.location.hash);
                       //console.log(browser.document.querySelectorAll('body')[0].innerHTML);
                       browser.fill('input[ng-model="search"]', <%=modelname.toLowerCase() %>Edited);
                       browser.wait(function(){
                           //console.log(browser.document.querySelectorAll('table')[0].innerHTML);
                           assert.ok(browser.html('table').match(<%=modelname.toLowerCase() %>New) === null,
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
