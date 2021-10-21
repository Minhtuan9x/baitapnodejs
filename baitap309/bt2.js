const express = require('express');
var app = express();

app.get('/:code', (req, res) => {
    res.send("hello "+req.params.code);
});

app.listen(3000, () => {
    console.log(`Server started on port`);
});