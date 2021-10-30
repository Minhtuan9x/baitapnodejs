const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/mydb');
var studentSchema = mongoose.Schema({
    mssv: Number,
    name: String
});
var student = mongoose.model("student", studentSchema);


module.exports.findAll = function (req, res) {

    student.find(function (err, data) {
        if (err) throw err;
        res.render("homepage.ejs", { listStudent: data });
    })
}

module.exports.viewadd = function (req, res) {
    res.render("viewadd.ejs");
}

module.exports.add = function (req, res) {
    var data = getInPut(req.body);
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

function checkMssv(mssv, callBack) {
    student.findOne({ mssv: mssv }, function kq(err, result) {
        if (err) throw err;
        callBack(result);
    })
}

module.exports.delete = function (req, res) {
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
module.exports.viewSearch = function (req, res) {
    res.render("viewsearch.ejs");
}
module.exports.search = function (req, res) {
    var stu = checkSearchInput(req.query);
    student.findOne(stu, function (err, result) {
        if (err) throw err;
        console.log("Find success!!");
        res.json(result);
    })
}
module.exports.viewdelete = function (req, res) {
    res.render("viewdelete.ejs");
}

module.exports.viewupdate = function (req, res) {
    var id = req.params.id;
    res.render("viewupdate.ejs", { id: id });
}
module.exports.update = function (req, res) {
    var stu = getInPut(req.body);
    student.updateOne({ mssv: req.params.id }, stu, function (err) {
        if (err) throw err;
        console.log("Update Success!!!");
        res.json(stu);
    })
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

function getInPut(body) {
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
