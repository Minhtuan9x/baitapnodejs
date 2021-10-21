var http = require('http');
var conn = require('./connectModule');
var con = conn.connect;
con.connect(function (err) {

    http.createServer(function (req, res) {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        if (err) throw err;
        con.query("SELECT * FROM news", function (err, result) {
            if (err) throw err;
            res.write("<p>Danh sach bao: </p>");
            for (var i = 0; i < result.length; i++) {
                res.write("<p>" + result[i].id + "<a> - </a>" + result[i].title + "</p>");
            }
            result.forEach(item => {
                console.log(item);
            });
        });
        con.query("SELECT * FROM category", function (err, result) {
            if (err) throw err;
            res.write("<p>Danh sach the loai: </p>");
            for (var i = 0; i < result.length; i++) {
                res.write("<p>" + result[i].code + "<a> - </a>" + result[i].name + "</p>");
            }
        });
    }).listen(8082);
});









