var cli = require('optimist'),
    request = require('request'),
    path = require('path'),
    fs = require('fs');

require('colors');

var server = null;
server = cli.argv._.length > 1 ? cli.argv._[1] : require('path').resolve('./');

var timeout = setTimeout(function(){
	console.log('Fenix did not respond (timeout)'.magenta.bold);
	process.exit(1);
},3500);

request.put('http://127.0.0.1:33649/server/'+server+'/stop',function(err,res,body){
	clearTimeout(timeout);
	if (err){
		if (err.message.indexOf('ECONNREFUSED') >= 0){
			console.log('Fenix is not currently running or could not be reached.'.red.bold);
			return;
		} else {
			console.log(err.message);
			console.log(err.stack);
			return;
		}
	}
	console.log('\n  Server Stopped.'.green.bold);
});

