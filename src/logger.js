'use strict';

var _ = require('lodash');

function printFoundProcess(info) {
  var line = '';

  console.log('\x1B[1;34m' + info.name + '\x1B[0m');

  var output = info.description.split(' ');

  while(line.length < 80) {
    if((line + output[0]).length > 80) {
      console.log(line);
      line = '';
    }
    else if(output.length) {
      line += output.shift() + ' ';
    }
    else {
      if(line.replace(/\s/g, '').length) console.log(line);
      break;
    }
  }
}

function printNotFoundError(info) {
  console.log('\x1B[31m[Not Found] %s\x1B[0m', info);
}

_.extend(module.exports, {
  printFoundProcess: printFoundProcess,
  printNotFoundError: printNotFoundError
});