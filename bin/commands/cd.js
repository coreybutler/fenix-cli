/**
 * This command is not yet useful because there is no decent way to change the path of the shell.
 * This will be saved as a placeholder for now.
 */
var cli = require('optimist'),
    request = require('request'),
    path = require('path'),
    fs = require('fs');

require('colors');

var timeout = setTimeout(function(){
  console.log('Fenix did not respond (timeout)'.magenta.bold);
  process.exit(1);
},3500);

var rserver = cli.argv._.splice(1,cli.argv._.length-1).join(' ').trim();

console.log('http://127.0.0.1:33649/server/'+encodeURIComponent(rserver)+'/list');
request.get('http://127.0.0.1:33649/server/'+encodeURIComponent(rserver)+'/list',function(err,res,body){
  clearTimeout(timeout);
  if (err){
    if (err.message.indexOf('ECONNREFUSED') >= 0){
      console.log('Fenix is not currently running or could not be reached.'.red.bold);
      return;
    } else {
      throw err;
    }
  }

  if (res.statusCode !== 200){
    if (res.statusCode === 404){
      console.log('Could not find a server named '.magenta.bold+rserver.toString().magenta.bold);
      return;
    } else {
      console.log(('ERROR: Received status code '+res.statusCode.toString()).red.bold);
      return;
    }
  }

  // This only changes the cwd of the current process, not the shell
  process.chdir(JSON.parse(body).path);
});
