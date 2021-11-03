const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/mydb');
var studentSchema = mongoose.Schema({
    mssv: Number,
    name: String
});
var student = mongoose.model("student", studentSchema);
module.exports = student;

