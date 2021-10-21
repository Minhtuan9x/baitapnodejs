const express = require('express');
const app = express();
const conn = require("./connectDB.js");

app.use(express.json());

app.post('/customer', (req, res) => {
    var myobj = req.body;
    conn.add(myobj);
    res.json(myobj);
});
app.get('/customer', (req, res) => {
    var result = conn.find;
    res.json(result);
});

app.listen(8082, () => {
    console.log(`Server started on port`);
});