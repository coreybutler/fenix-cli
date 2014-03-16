var cli = require('optimist'),
    request = require('request'),
    path = require('path'),
    fs = require('fs');

require('colors');

var timeout = setTimeout(function(){
	console.log('Fenix did not respond (timeout)'.magenta.bold);
	process.exit(1);
},3500);

request.get('http://127.0.0.1:33649/server/list',function(err,res,body){
	clearTimeout(timeout);
	if (err){
		if (err.message.indexOf('ECONNREFUSED') >= 0){
			console.log('Fenix is not currently running or could not be reached.'.red.bold);
			return;
		} else {
			throw err;
		}
	}

	console.log('\n  SERVERS:\n'.bold);
	JSON.parse(body).forEach(function(site){
		var ttl = site.name;
		ttl = (site.running ? (ttl+' [on]').green : ttl+' [off]'.grey).bold;// + (' (ID: '+site.id+')').grey;
		console.log('  '+ttl);
		console.log('   - '+(site.path).grey);
		console.log('   - '+('http://127.0.0.1:'+site.port.toString())[(site.running?'green':'red')]);
		if (site.publicUrl){
			console.log('   - '+site.publicUrl.cyan.bold);
		}
	});
});