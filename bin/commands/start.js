var cli = require('optimist'),
    request = require('request'),
    path = require('path'),
    fs = require('fs');

require('colors');

var server = null;
server = cli.argv._.length > 1 ? cli.argv._.splice(1,cli.argv._.length-1).join(' ') : require('path').resolve('./');

var timeout = setTimeout(function(){
  console.log('Fenix did not respond (timeout)'.magenta.bold);
  process.exit(1);
},3500);

request.put('http://127.0.0.1:33649/server/'+server+'/start',function(err,res,body){
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

  // If the server doesn't exist, create it automatically on the first avialable port.
  if (res.statusCode === 404){
    var json = {path:path.resolve('./')};
    if (fs.existsSync(path.resolve('./.fenix.json'))){
      json = require(path.resolve('./.fenix.json'));
    }
    json.name = json.name || path.basename(path.resolve('./'));
    json.port = !isNaN(parseInt(server)) ? parseInt(server) : (json.port || null);
    json.path = json.path || server;
    request.post('http://127.0.0.1:33649/server',{
      json:json
    },function(err,res,body){
      var data = body;
      console.log(('\n  '+data.name+' Started: ').green.bold);
      console.log('  http://127.0.0.1:'+data.port.toString());
    });
  } else {
    var data = JSON.parse(body);
    console.log('\n  Server Started:'.green.bold);
    console.log('  http://127.0.0.1:'+data.port.toString());
    if (data.shared){
      console.log('  '+data.publicUrl.cyan.bold);
    }
  }
});
