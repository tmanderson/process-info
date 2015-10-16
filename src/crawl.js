'use strict';

var _ = require('lodash');
var fs = require('fs');
var http = require('http');
var cheerio = require('cheerio');

process.stdout.write('\n\x1B[1mUpdating Process listing\x1B[?25l');
http.get('http://triviaware.com/macprocess/all', function(res) {
  var data = '';

  var dots = setInterval(function() {
    process.stdout.write('.');
  }, 100);

  res.on('data', function(chunk) {
    data += chunk;
  });

  res.on('end', function() {
    var $ = cheerio.load(data);
    var output = [];
    
    clearInterval(dots);

    $('.process').each(function() {
      var $this = $(this);
      var $name = $this.find('.process_description h3');
      var $desc = $name.next('p');
      var description = _.trim($desc.text()).split('\n');
      var search = $desc.find('a').attr('href');

      output.push({
        name: $name.text(),
        location: _.trim(description.length > 2 ? description[0] : ''),
        description: _.trim(description.length > 2 ? description[1] : description[0]).replace(/\s{2,}/g, ' ').replace(/[\n\t\r]+/g, ''),
        search: search
      });
    });

    fs.writeFileSync('./data/process-list.json', JSON.stringify(output));
    process.stdout.write('\x1B[1;32mDone\x1B[?25h\n');
  });
});