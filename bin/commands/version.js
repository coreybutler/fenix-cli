var p = require('path'),
  pkg = require(p.join(__dirname,'..','..','package.json')),
  fs = require('fs'),
	request = require('request');

require('colors');

request.get('http://127.0.0.1:33649/version',function(err,res,body){
	console.log('');
	if (err){
		if (err.message.indexOf('ECONNREFUSED') >= 0){
			console.log('Fenix is not currently running or could not be reached.'.red.bold);
		} else {
			throw err;
		}
	} else {
		console.log(('  Fenix v'+body).bold);
	}
	
	console.log(('  Fenix CLI v'+pkg.version).bold);
});