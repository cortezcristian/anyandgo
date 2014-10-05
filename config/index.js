var config = {};

switch(process.env.NODE_ENV) {
    case 'development':
        config = require('./config-dev.json');
    break;
    case 'production':
        config = require('./config-prod.json');
    break;
    default:
        config = require('./config-local.json');
        process.env.NODE_ENV = 'development';
}

module.exports = config;
