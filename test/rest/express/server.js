// Express WebServer
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
//  - SuperAgent (http://visionmedia.github.io/superagent/)
var assert = require('assert'),
    config = require('../../../config'),
    superagent = require('superagent');

// Global Variables for the test case
var d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('Web Server', function(){
    before(function(){
        // Before all tests
        // Get domain
        d = config.app.domain+":"+config.app.port;
        // Start agent
        agent = superagent.agent();
        // Login if necesary
    });

    describe('Express', function(){
        it('Should be up and running', function(done){
            agent
              .get(d)
              .end(function(res) {
                  assert.ok(res.ok);
                  done();
              });
        });
    });
});
