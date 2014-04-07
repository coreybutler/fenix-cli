var request = require('request'),
    path = require('path');

require('colors');

var timeout = setTimeout(function(){
  console.log('Fenix did not respond (timeout)'.magenta.bold);
  process.exit(1);
},3500);

request.put('http://127.0.0.1:33649/close',function(err,res,body){
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
  if (res.statusCode !== 200){
    console.log(res);
    console.log('UNKNOWN ERROR'.red.bold);
    return;
  }
  console.log('\n  Closing Fenix...'.yellow.bold);
});

