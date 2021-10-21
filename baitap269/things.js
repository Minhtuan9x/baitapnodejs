var express = require('express');
var router = express.Router();

router.get('/hi', function(req, res){
   res.send('GET route on things.');
});
router.post('/', function(req, res){
   res.send('POST route on things.');
});
router.all('*', (req, res, next) => {
   res.send("error");
});

//export this router to use in our index.js
module.exports = router;