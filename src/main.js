'use strict';

var _ = require('lodash');
var fs = require('fs');
var exec = require('child_process').exec;
var processInfo = JSON.parse(fs.readFileSync('./data/process-list.json'));
var logger = require('./logger');
var processes = process.argv.slice(2);

function getProcessListInfo(processes) {
  var checked = [];
  var found = [];
  var notfound = [];

  _.each(processes, function(name) {
    var info = _.find(processInfo, function(info) {
      if(info.name.indexOf(name) >= 0) return true;
    });

    if(checked.indexOf(name) >= 0) return;
    checked.push(name);

    if(!info) {
      notfound.push({ name: name });
      return;
    }
    else if(_.find(found, 'name', info.name)) {
      return;
    }

    found.push(info);
  });
  
  if(process.argv.length > 2) {
    _.each(found, logger.printFoundProcess);

    if(notfound.length) {
      logger.printNotFoundError( _.pluck(notfound, 'name').join(', ') );
    }
  }
  else {
    console.log('---------- Process Info -----------');
    console.log('  Total Processes: \x1B[1m%d\x1B[0m', processes.length);
    console.log('  \x1B[32mProcesses found: \x1B[1m%d\x1B[0m', found.length);
    console.log('  \x1B[31mProcess not found: \x1B[1m%d\x1B[0m',notfound.length);
  }
}

if(!processes.length) {
  exec('ps -A -c -o command', function(err, stdout) {
    getProcessListInfo(
      _.map(
        stdout.split('\n').slice(1),
        function(v) {
          return v.replace(/-/g, '');
        }
      )
    );
  });
}
else {
  getProcessListInfo(processes);
}