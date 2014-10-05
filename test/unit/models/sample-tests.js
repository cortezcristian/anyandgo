// Sample Test Cases
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
var assert = require('assert');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var Sample, sample;

// Unit Tests
describe('Model Test Sample', function(){
    before(function(){
        // Before all tests
        Sample = require("../../../models/sample.js");
    });

    describe('Sample', function(){
        // It show create a new document in the database
        it('add a sample', function(done){
            sample = new Sample({ name: 'sample'+Math.floor((Math.random() * 10) + 1)});
            sample.save(done);
        });

    });
});
