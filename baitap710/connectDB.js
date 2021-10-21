const MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";

module.exports.add = function (myobj) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mysql");
        if (myobj.length == 1) {
            dbo.collection("customers").insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log("insert oke!");
                db.close();
            })
        } else {
            console.log("multi");
            dbo.collection("customers").insertMany(myobj, function (err, res) {
                if (err) throw err;
                console.log("insert oke!");
                db.close();
            })
        }
    })
}
var find;



function findAll() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mysql");
        dbo.collection("customers").find({}).toArray(function (err, result) {
            if (err) throw err;
            find = result;
        })
    })
}

module.exports.find = find;