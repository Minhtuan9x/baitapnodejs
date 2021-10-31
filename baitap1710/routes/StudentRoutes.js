var express = require('express');
var router = express.Router();
var student = require("../models/StudentModels.js");


router.get('/', function (req, res) {//find All
    student.find(function (err, data) {
        if (err) throw err;
        res.render("homepage.ejs", { listStudent: data });
    })
});
router.get("/viewadd", function (req, res) {// render vỉew add
    res.render("viewadd.ejs");
});
router.post("/", function (req, res) {//add
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
});
router.delete("/", function (req, res) {//delete
    var stu = req.body.mssv;
    student.findOneAndRemove({ mssv: stu }, function (err, result) {
        if (err) throw err;
        if (result == null)
            console.log("fail!");
        else
            console.log("Delete Success!!!");
        res.json(result);
    })
});
router.get("/viewsearch", function (req, res) {//view search
    res.render("viewsearch.ejs");
});
router.get("/search", function (req, res) {//search
    var stu = checkSearchInput(req.query);
    student.findOne(stu, function (err, result) {
        if (err) throw err;
        console.log("Find success!!");
        res.json(result);
    })
});
router.get("/viewdelete", function (req, res) {//view delete
    res.render("viewdelete.ejs");
});
router.get("/:id/viewupdate", function (req, res) {//view update
    var id = req.params.id;
    res.render("viewupdate.ejs", { id: id });
});
router.put("/:id", function (req, res) {
    var stu = toObject(req.body);
    student.updateOne({ mssv: req.params.id }, stu, function (err) {//update
        if (err) throw err;
        console.log("Update Success!!!");
        res.json(stu);
    })
});
//
function checkMssv(mssv, callBack) {
    student.findOne({ mssv: mssv }, function kq(err, result) {
        if (err) throw err;
        callBack(result);
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
module.exports = router;