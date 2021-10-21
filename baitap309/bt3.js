const express = require('express');
const app = express();
// const url = require("url");

app.get('/:firstNam/:lastName', (req, res) => {
    res.send("Hello "+req.params.lastName+" "+req.params.firstNam);
});

app.get('/', (req, res) => {
    // var q = url.parse(req.url,true).query;
    // res.send("Hello "+q.lastName+" "+q.firstName);
    res.send("Hello "+req.query.lastName+" "+req.query.firstName);
});
app.listen(3000, () => {
    console.log(`Server started on port`);
});