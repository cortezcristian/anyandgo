var mongoose = require('mongoose');
/**
 * Utils
 */

exports.dbConnection = function(url,dbname,dbuser,dbpass){

	var connStr ='mongodb://'; 
	
	if(dbuser != "" || dbpass != "") {
		connStr += dbuser+':'+dbpass+'@'+url+'/'+dbname;
	} else {
		connStr += url+'/'+dbname;
	}
	
	//console.log("Connecting to %s ...\n",connStr);
	
	return mongoose.connect(connStr, function (err) {
		if (err) {
			//console.log('Connection to MongoDB error', err);
			//return err;
		} else {
			//console.log("Connection to MongoDB successful");
		}
	});

	
};

exports.dbConnectionString = function(url,dbname,dbuser,dbpass){

	var connStr ='mongodb://'; 
	
	if(dbuser != "" || dbpass != "") {
		connStr += dbuser+':'+dbpass+'@'+url+'/'+dbname;
	} else {
		connStr += url+'/'+dbname;
	}

    return connStr;
};
