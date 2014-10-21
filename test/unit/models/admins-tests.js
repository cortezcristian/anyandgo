// Admins Test Cases
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
var assert = require('assert');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var Admins, admins;

// Unit Tests
describe('Model Test Admins', function(){
    before(function(){
        // Before all tests
        Admins = require("../../../models/admins.js");
    });

    describe('Admins', function(){
        // It show create a new document in the database
        it('add a admins', function(done){
            admins = new Admins({ name: 'admins'+Math.floor((Math.random() * 10) + 1)});
            admins.save(done);
        });

    });
});
