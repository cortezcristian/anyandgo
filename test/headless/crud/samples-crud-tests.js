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
var Sample, sample, browser, sampleId, sampleSearch, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('CRUD Sample '+d+"/admin/panel#/crud/sample", function(){
    before(function(){
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
                  /*
                  browser.clickLink("a[data-userid='39645576TW']", function(){
                     done();
                  });
                  */
               });
            });
        });

    });
});
