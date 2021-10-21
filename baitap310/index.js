const express = require('express');
const app = express();
const fs = require("fs");

app.use(express.json());

app.get('/listStudents', (req, res) => {
    fs.readFile(__dirname + "/" + "students.json", "utf-8", function (err, data) {
        console.log(data)
        res.send(data);
    });
});
app.post('/addStudent', (req, res) => {

    fs.readFile(__dirname + "/" + "students.json", 'utf8', function (err, data) {
        var list = JSON.parse(data);
        list.push(req.body);
        res.send(JSON.stringify(list));
        fs.writeFile("./students.json", JSON.stringify(list), function (err) {
            if (err) throw err;
            console.log('Save!!!!');
        });
    });

});

app.delete('/deleteStudent', (req, res) => {

    fs.readFile(__dirname + "/" + "students.json", 'utf8', function (err, data) {
        var list = JSON.parse(data);
        list.forEach(item => {
            if (item.id == req.body.id) {
                delete list[list.indexOf(item)];
            }
        });
        list = list.filter(checkList);
        res.send(JSON.stringify(list));
        fs.writeFile("./students.json", JSON.stringify(list), function (err) {
            if (err) throw err;
            console.log('Delete!!!!');
        });
    });

});
function checkList(params) {
    if (params != null)
        return params;
}

app.listen(8082, () => {
    console.log(`Server started on port`);
});