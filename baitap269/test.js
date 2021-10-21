var express = require('express');
var app = express();
var things = require("./things");

app.use("/hello",things);
app.listen(3000);