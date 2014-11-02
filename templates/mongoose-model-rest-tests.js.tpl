// <%=modelname %>s REST API
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
//  - SuperAgent (http://visionmedia.github.io/superagent/)
var assert = require('assert'),
    config = require('../../../config'),
    superagent = require('superagent');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var <%=modelname %>, <%=modelname.toLowerCase() %>, agent, <%=modelname.toLowerCase() %>Id, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('REST API <%=modelname %> '+d+"/api/v1/<%=modelname.toLowerCase() %>s", function(){
    before(function(done){
        // Before all tests
        <%=modelname %> = require("../../../models/<%=modelname.toLowerCase() %>.js");
        // It show create a new document in the database
        <%=modelname.toLowerCase() %> = new <%=modelname %>({ name: '<%=modelname.toLowerCase() %>'+Math.floor((Math.random() * 10) + 1)});
        <%=modelname.toLowerCase() %>.save(function(err, doc){
            <%=modelname.toLowerCase() %>Id = doc._id;    
        });
        // Get domain
        d = config.app.domain+":"+config.app.port;
        // Start agent
        agent = superagent.agent();
        // Login if necesary
        agent
          .post(d+'/admin')
          .send({ email: "admin@anyandgo.com", password: "123456" })
          .end(function(res) {
              assert.ok(res.ok);
              done();
          });
    });

    describe('<%=modelname %>s REST', function(){
        it('GET /api/v1/<%=modelname.toLowerCase() %>s', function(done){
            agent
              .get(d+'/api/v1/<%=modelname.toLowerCase() %>s')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.length>0);
                  done();
              });
        });
        it('GET /api/v1/<%=modelname.toLowerCase() %>s/count', function(done){
            agent
              .get(d+'/api/v1/<%=modelname.toLowerCase() %>s/count')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.count > 0);
                  done();
              });
        });
        it('POST /api/v1/<%=modelname.toLowerCase() %>s', function(done){
            agent
              .post(d+'/api/v1/<%=modelname.toLowerCase() %>s')
              .send({ name: 'Test Creation <%=modelname %>' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Creation <%=modelname %>');
                  done();
              });
        });
        it('PUT /api/v1/<%=modelname.toLowerCase() %>s/:<%=modelname.toLowerCase() %>Id', function(done){
            agent
              .put(d+'/api/v1/<%=modelname.toLowerCase() %>s/'+<%=modelname.toLowerCase() %>Id)
              .send({ name: 'Test Change <%=modelname %>' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Change <%=modelname %>');
                  done();
              });
        });
        it('DELETE /api/v1/<%=modelname.toLowerCase() %>s/:<%=modelname.toLowerCase() %>Id', function(done){
            agent
              .del(d+'/api/v1/<%=modelname.toLowerCase() %>s/'+<%=modelname.toLowerCase() %>Id)
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });
        it('DELETE /api/v1/<%=modelname.toLowerCase() %>s', function(done){
            agent
              .del(d+'/api/v1/<%=modelname.toLowerCase() %>s/')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });

    });
});
