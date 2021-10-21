const express = require('express');
const app = express();
var fs = require("fs");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/mydb');
app.use(express.json());

var studentSchema = mongoose.Schema({
    mssv: Number,
    name: String
});
var student = mongoose.model("student", studentSchema);

app.get('/student/:mssv', (req, res) => {
    var stu = req.params.mssv;
    student.find({ mssv: stu }, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
});
app.put('/student/:mssv', (req, res) => {
    var stu = req.body;
    student.updateOne({ mssv: req.params.mssv }, stu, function (err) {
        if (err) throw err;
        console.log("Update Success!!!");
        res.json(stu);
    })
});
app.post('/student', (req, res) => {
    var stu = req.body;
    var data = getInPut(stu);
    student.insertMany(data, function (err) {
        if (err) throw err;
        res.json(stu);
        console.log("Insert Success!!!");
    })
});
app.delete('/student/:mssv', (req, res) => {
    var stu = req.params.mssv;
    console.log(stu);
    student.findOneAndRemove({ mssv: stu }, function (err) {
        if (err) throw err;
        res.json(stu);
        console.log("Delete Success!!!");
    })
});
function readFile() {
    fs.readFile('./data.json', function (err, data) {
        if (err) throw err;
        var stu = JSON.parse(data);
        student.insertMany(stu, function (err) {
            if (err) return handleError(err);
            console.log("Import Success!!!");
        });
    });
}
function getInPut(body) {
    var listSV = [];
    for (item of body) {
        listSV.push(
            {
                "mssv": checkUndefined(item.mssv),
                "name": checkUndefined(item.name)
            }
        )
    }
    return listSV;
}
function checkUndefined(inPut) {
    if (inPut == undefined)
        return null;
    return inPut;
}

app.listen(8081, () => {
    //readFile();
    console.log(`Server started on port`);
});