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

request.del('http://127.0.0.1:33649/server/'+server,function(err,res,body){
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
    console.log('Server not found.'.red.bold);
    return;
  }
  console.log('\n  Server Removed.'.green.bold);
});

