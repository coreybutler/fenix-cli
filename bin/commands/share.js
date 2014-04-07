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
},4500);

request.put('http://127.0.0.1:33649/server/'+server+'/share',function(err,res,body){
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

  if (res.statusCode === 404){
    console.log('Server does not exist. Auto-creating now...'.yellow.bold);
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
      var timeout = setTimeout(function(){
        console.log('Fenix did not respond (timeout)'.magenta.bold);
        process.exit(1);
      },4500);
      console.log('\n Sharing...'.yellow.bold);
      request.put('http://127.0.0.1:33649/server/'+data.id+'/share',function(err,res,body){
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
        console.log(res.statusCode,body);
        var _data = JSON.parse(body);
        console.log('\n  Server Shared:'.green.bold);
        console.log('  '+_data.publicUrl.cyan.bold);
      });
    });
  } else {
    var data = body;
    console.log('\n  Server Shared:'.green.bold);
    console.log('  '+(data.publicUrl||'Unknown').cyan.bold);
  }
});
