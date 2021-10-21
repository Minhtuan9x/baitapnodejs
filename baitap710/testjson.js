const express = require('express');
const app = express();
app.use(express.json());

app.post('/customer', (req, res) => {
    console.log(req.body);
});
app.listen(8082, () => {
    console.log(`Server started on port`);
});