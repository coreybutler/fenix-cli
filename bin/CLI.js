#!/usr/bin/env node

var path = require('path'),
    fs = require('fs'),
    optimist = require('optimist'),
    exec = require('child_process').exec,
    user = require('./lib/permissions'),
    pkg = require(path.join(process.mainModule.paths[0],'..','..','package.json'));

// Add colors for pretty output
require('colors');

// AVAILABLE CLI OPTIONS
var base = {
  //'cd': 'Change directories to the specified server\'s root.',
  'close': 'Close the Fenix desktop application.',
  'list': 'List all available servers.',
  'browse': 'Open a server using the default web browser.',
  'remove': 'Remove a server.',
  'start': 'Start or create an existing server by name, port, ID, or path.',
  'status': 'Retrieve the status of a specific server.',
  'stop': 'Stop a running server by name, port, ID, or path.',
  'share': 'Share a server over the internet.',
  'unshare': 'Stop sharing a server over the internet.',
  'version': 'Print the current version of Fenix.'
};

// Shortcuts
var shortcuts = {
  'v': 'version',
  'h': 'help',
  'l': 'list',
  'rm': 'remove'
};

Object.keys(shortcuts).forEach(function(sc){
  if (base.hasOwnProperty(shortcuts[sc])){
    base[shortcuts[sc]] = base[shortcuts[sc]]+' (-'+sc+')';
  }
});

var opts = {};
for(var o in base){
  opts[o] = base[o];
}

// Placeholder for the selected command
var cmd = null;

// CLI REQUIREMENTS
// Make sure at least one command option is selected.
var minOptions = function(argv){
  if (argv._.length > 0){
    cmd = argv._[0];
    argv[cmd] = argv._[1] || true;
    return true;
  }
  for (var term in opts){
    if (argv.hasOwnProperty(term)){
      cmd = term;
      return true;
    }
  }
  for (var _term in argv){
    if (_term !== '_' && _term !== '$0'){
      cmd = _term;
      break;
    }
  }

  optimist.describe(opts);
  if (cmd == null){
    throw('');
  }

  if (cmd in shortcuts){
    cmd = shortcuts[cmd];
    return true;
  }

  throw('"'+cmd+'" is not a valid option.');
};

var priv = function(){
  if (!user.isElevatedUser()){
    throw('Insufficient privileges to run this command.\nPlease run this command '+(require('os').platform() == 'win32' ? 'with and admin account' : 'as root (or sudo)')+'.');
  }
};

// Make sure the command option has the appropriate parameters which
// are required to run.
var validOption = function(argv){
  switch (cmd.trim().toLowerCase()){
    case 'stop':
    case 'start':
    case 'share':
    case 'status':
    case 'unshare':
    case 'version':
//    case 'cd':
    case 'list':
    case 'remove':
    case 'browse':
      return true;
    // All other options do not require additional parameters, or they
    // are not valid.
    default:
      // If the command options object contains the command, it is
      // recognized and processing continues.
      if (opts.hasOwnProperty(cmd)) {
        return true;
      }

      // If the command is not recognized, the list of valid commands
      // is described and the usage/error is displayed.
      optimist.describe(opts);
      throw('"'+cmd+'" is not a valid option.');
  }
  return true;
};

// ARGUMENTS
var argv = optimist
      .usage('Usage: fenix <option>')
      .wrap(80)
      .check(minOptions)
      .check(validOption)
      .argv,
  p    = require('path'),
  cwd  = process.cwd(),
  root = p.dirname(process.mainModule.filename);

// Include the appropriate command
if (cmd in base){
  require(require('path').join(__dirname,'commands',cmd));
} else {
  for (var pkg in opt){
    if (opt[pkg][cmd] !== undefined){
      require(require('path').join(__dirname,'..','..',pkg))[cmd]();
      break;
    }
  }
}
return;
