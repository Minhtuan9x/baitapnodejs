const student = require("../models/student.js");

module.exports.findAll = function (req, res) {//find All
    student.find(function (err, data) {
        if (err) throw err;
        res.render("homepage.ejs", { listStudent: data });
    })
}

module.exports.viewAdd = function (req, res) {// render vỉew add
    res.render("viewadd.ejs");
}

module.exports.add = function (req, res) {//add
    var data = toObject(req.body);
    checkMssv(data.mssv, (result) => {
        if (result == null) {
            student.create(data, function (err) {
                if (err)
                    throw err;
                res.json({
                    "status": "success"
                });
                console.log("Insert Success!!!");
            });
        } else {
            res.json({
                "status": "fail"
            });
        }
    })
}
module.exports.delete = function (req, res) {//delete
    var stu = req.body.mssv;
    student.findOneAndRemove({ mssv: stu }, function (err, result) {
        if (err) throw err;
        if (result == null)
            console.log("fail!");
        else
            console.log("Delete Success!!!");
        res.json(result);
    })
}
module.exports.viewSearch = function (req, res) {//view search
    res.render("viewsearch.ejs");
}
module.exports.search = function (req, res) {//search
    var stu = checkSearchInput(req.query);
    student.findOne(stu, function (err, result) {
        if (err) throw err;
        console.log("Find success!!");
        res.json(result);
    })
}
module.exports.viewDelete = function (req, res) {//view delete
    res.render("viewdelete.ejs");
}
module.exports.viewUpdate = function (req, res) {//view update
    var id = req.params.id;
    res.render("viewupdate.ejs", { id: id });
}
module.exports.update = function (req, res) {
    var stu = toObject(req.body);
    student.updateOne({ mssv: req.params.id }, stu, function (err) {//update
        if (err) throw err;
        console.log("Update Success!!!");
        res.json(stu);
    })
}

//
function checkMssv(mssv, callBack) {
    student.findOne({ mssv: mssv }, function kq(err, result) {
        if (err) throw err;
        callBack(result);
    })
}

function toObject(body) {
    var sv =
    {
        "mssv": checkUndefined(body.mssv),
        "name": checkUndefined(body.name)
    }
    return sv;
}
function checkUndefined(inPut) {
    if (inPut == undefined)
        return null;
    return inPut;
}

function checkSearchInput(obj) {
    var result;
    if (obj.mssv == "" || obj.mssv == null) {
        result = {
            "name": obj.name
        }
        return result;
    }
    if (obj.name == "" || obj.name == null) {
        result = {
            "mssv": obj.mssv
        }
        return result;
    }
    return obj
}