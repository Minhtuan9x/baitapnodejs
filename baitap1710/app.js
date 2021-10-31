const express = require('express');
const app = express();
const rou = require("./controller/StudentControllers.js");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use("/student",rou);
app.use("/*",rou);

app.listen(8082, () => {
    console.log(`Server started on port`);
});
