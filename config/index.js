var config = {};

switch (process.env.NODE_ENV) {
    case 'development':
        config = require('./config-dev.json');
    break;
    case 'production':
        config = require('./config-prod.json');
    break;
    case 'nodejitsu':
        config = require('./config-nodejitsu.json');
    case 'travisci':
        config = require('./config-travisci.json');
    break;
    default:
        config = require('./config-local.json');
        process.env.NODE_ENV = 'development';
    break;
}

config.envflag = process.env.NODE_ENV;

module.exports = config;
