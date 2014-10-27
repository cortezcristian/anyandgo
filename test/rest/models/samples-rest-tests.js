// Samples REST API
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
var Sample, sample, agent, sampleId, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('REST API Sample '+d+"/api/v1/samples", function(){
    before(function(done){
        // Before all tests
        Sample = require("../../../models/sample.js");
        // It show create a new document in the database
        sample = new Sample({ name: 'sample'+Math.floor((Math.random() * 10) + 1)});
        sample.save(function(err, doc){
            sampleId = doc._id;    
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

    describe('Samples REST', function(){
        it('GET /api/v1/samples', function(done){
            agent
              .get(d+'/api/v1/samples')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.length>0);
                  done();
              });
        });
        it('GET /api/v1/samples/count', function(done){
            agent
              .get(d+'/api/v1/samples/count')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.count > 0);
                  done();
              });
        });
        it('POST /api/v1/samples', function(done){
            agent
              .post(d+'/api/v1/samples')
              .send({ name: 'Test Creation Sample' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Creation Sample');
                  done();
              });
        });
        it('PUT /api/v1/samples/:sampleId', function(done){
            agent
              .put(d+'/api/v1/samples/'+sampleId)
              .send({ name: 'Test Change Sample' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Change Sample');
                  done();
              });
        });
        it('DELETE /api/v1/samples/:sampleId', function(done){
            agent
              .del(d+'/api/v1/samples/'+sampleId)
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });
        it('DELETE /api/v1/samples', function(done){
            agent
              .del(d+'/api/v1/samples/')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });

    });
});
