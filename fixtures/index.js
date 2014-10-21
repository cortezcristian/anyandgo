var config = module.parent.exports.config,
    fixtureLoader = require('mongoose-fixtures');

// Load from shared first
fixtureLoader.load('./shared');

// And then override
switch(process.env.NODE_ENV) {
    case 'development':
        fixtureLoader.load('./dev');
    break;
    case 'production':
        fixtureLoader.load('./prod');
    break;
    case 'travisci':
        fixtureLoader.load('./travisci');
    break;
    default:
        fixtureLoader.load('./local');
        process.env.NODE_ENV = 'development';
    break;
}
