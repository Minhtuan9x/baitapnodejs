var http = require('http');
var dt = require('./module');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(dt.caucadao());
    res.end('Như mây với núi, biệt ly không đành.');
  }).listen(8085);