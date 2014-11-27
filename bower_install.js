var bower = require('bower'),
    path = require('path');

// Error
process.on('uncaughtException', function(err) {
      console.log("Exception", err.stack);
});

bower.commands
.install([path.resolve(".")+"/bower.json"])
.on('end', function (installed) {
    console.log(installed);
});
