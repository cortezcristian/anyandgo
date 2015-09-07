// User Test Cases
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
var assert = require('assert');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var User, user;

// Unit Tests
describe('Model Test User', function(){
    before(function(){
        // Before all tests
        User = require("../../../models/user.js");
    });

    describe('User', function(){
        // It show create a new document in the database
        it('add a user', function(done){
            user = new User({ name: 'user'+Math.floor((Math.random() * 10) + 1)});
            user.save(done);
        });

    });
});
