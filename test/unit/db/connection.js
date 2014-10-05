// Database Connection
// -----------------------------

// Require basic config files and DB connection
var config = require('../../../config'),
    utils = require('../../../utils')
// Database Connection
var dbConex = exports.dbConex = utils.dbConnection(config.db.domain,config.db.name,config.db.user,config.db.pass);


// Global Variables for the test case
var mongoose, Admin, dbConex;

// Unit Tests
describe('Database Test', function(){
    before(function(){
        // Before all tests
        mongoose = require('mongoose');
        Admin = mongoose.mongo.Admin;
    });

    describe('MongoDB', function(){
        it('Should be up and running', function(done){
            connection = mongoose.createConnection(utils.dbConnectionString(config.db.domain,config.db.name,config.db.user,config.db.pass));
            connection.on('open', function() {
                // connection established
                new Admin(connection.db).listDatabases(function(err, result) {
                    if(!err){
                        // database list stored in result.databases
                        var allDatabases = result.databases;    
                        done();
                    } else {
                       throw new Error('Unable to list DB');
                    } 
                });
            });
        });
    });
});
