
// Require basic config files and DB connection
var config = require('../config')
    , utils = require('../utils')
// Database Connection
var dbConex = exports.dbConex = utils.dbConnection(config.db.domain,config.db.name,config.db.user,config.db.pass);
