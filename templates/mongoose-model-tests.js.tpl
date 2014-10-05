// <%=modelname %> Test Cases
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
var assert = require('assert');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var <%=modelname %>, <%=modelname.toLowerCase() %>;

// Unit Tests
describe('Model Test <%=modelname %>', function(){
    before(function(){
        // Before all tests
        <%=modelname %> = require("../../../models/<%=modelname.toLowerCase() %>.js");
    });

    describe('<%=modelname %>', function(){
        // It show create a new document in the database
        it('add a <%=modelname.toLowerCase() %>', function(done){
            <%=modelname.toLowerCase() %> = new <%=modelname %>({ name: '<%=modelname.toLowerCase() %>'+Math.floor((Math.random() * 10) + 1)});
            <%=modelname.toLowerCase() %>.save(done);
        });

    });
});
