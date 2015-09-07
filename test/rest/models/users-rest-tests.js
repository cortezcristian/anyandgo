// Users REST API
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
var User, user, agent, userId, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('REST API User '+d+"/api/v1/users", function(){
    before(function(done){
        // Before all tests
        User = require("../../../models/user.js");
        // It show create a new document in the database
        user = new User({ name: 'user'+Math.floor((Math.random() * 10) + 1)});
        user.save(function(err, doc){
            userId = doc._id;    
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

    describe('Users REST', function(){
        it('GET /api/v1/users', function(done){
            agent
              .get(d+'/api/v1/users')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.length>0);
                  done();
              });
        });
        it('GET /api/v1/users/count', function(done){
            agent
              .get(d+'/api/v1/users/count')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.count > 0);
                  done();
              });
        });
        it('POST /api/v1/users', function(done){
            agent
              .post(d+'/api/v1/users')
              .send({ name: 'Test Creation User' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Creation User');
                  done();
              });
        });
        it('PUT /api/v1/users/:userId', function(done){
            agent
              .put(d+'/api/v1/users/'+userId)
              .send({ name: 'Test Change User' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Change User');
                  done();
              });
        });
        it('DELETE /api/v1/users/:userId', function(done){
            agent
              .del(d+'/api/v1/users/'+userId)
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });
        it('DELETE /api/v1/users', function(done){
            agent
              .del(d+'/api/v1/users/')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });

    });
});
