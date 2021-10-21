var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "bao"
});
module.exports.connect = con;